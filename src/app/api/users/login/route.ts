//Prisijungimo logika
//Sukūrė: Karolis Momkus

import { NextRequest, NextResponse } from "next/server";
import dbConnection from "@/app/db";
import { RowDataPacket } from "mysql2";
import { EncryptSHA256 } from "@/app/encryption";
import { SignJWT } from 'jose'

export interface Vartotojas extends RowDataPacket{
    //ID
    ID: string;
    //Vartotojo vardas,
    VartotojoVardas: string;
    //ElPastas,
    ElPastas: string;
    //SlaptazodisHash
    SlatazodisHash: string;
    //Salt
    Salt: string;
    //Role
    Role: string;
}

export async function POST(request: NextRequest){
    try {
        const reqBody = await request.json();
        const {email, password} = reqBody;
        
        //tikrina ar vartotojas jau yra
        const query = "SELECT * FROM vartotojas WHERE ElPastas = '" + email + "';"
        const [user] = await dbConnection.execute<Vartotojas[]>(query);
        //console.log(user);
        
        
        if(!user){
            return NextResponse.json({error: "Tokio vartotojo nėra"}, {status: 400});
        }
        
        //tikrina ar tinkamas slaptazodis
        const insertedPasswordHash = EncryptSHA256(password, user[0].Salt);
        
        if(insertedPasswordHash != user[0].SlatazodisHash){
            console.log(insertedPasswordHash);
            console.log(user[0].SlatazodisHash);
            
            
            return NextResponse.json({error: "Netinkamas slaptažodis"}, {status: 400});
        }
        
        
        
        //Kuriami token duomenys
        const tokenData = {
            id: user[0].ID,
            userName: user[0].VartotojoVardas,
            email: user[0].ElPastas,
            role: user[0].Role
        }

        //Kuriamas token
        const iat = Math.floor(Date.now() / 1000);
        const exp = iat + 60 * 60; //viena valanda

        const token = await new SignJWT(tokenData)
            .setProtectedHeader({alg: 'HS256', typ: 'JWT'})
            .setExpirationTime(exp)
            .setIssuedAt(iat)
            .setNotBefore(iat)
            .sign(new TextEncoder().encode(process.env.TOKEN_SECRET!));

        const response = NextResponse.json({
            message: "Pavyko prisijungti",
            succes: true
        })

        response.cookies.set("token", token, {httpOnly: true});

        return response;



    } catch (error: any) {
        return NextResponse.json({error: "Nepavyko prisijungti"}, {status: 500});
    }
}