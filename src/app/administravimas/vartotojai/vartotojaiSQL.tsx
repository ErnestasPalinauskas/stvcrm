// Vartotojų lentelės, duomenų bazėje valdymas (CRUD)
// Sukūrė: Karolis Momkus

'use server'

import { RowDataPacket } from "mysql2";
import { z } from 'zod';
import { revalidatePath } from "next/cache";
import dbConnection from "@/app/db";
import { EncryptSHA256, GenerateSalt } from "@/app/encryption";


// Vartotojo duomenų tipas, naudojamas gaunant duomenis iš duomenų bazės
export interface Vartotojai extends RowDataPacket{
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


// Tuščia funkcija be jos neveikia vartotojo duomenų atnaujinimas, nežinau kodėl, netrinti !!!!
export async function emptyFunction() {};


// Funkcija gaunanti Vartotojų duomenis iš duomenų bazės
export async function GetVartotojai(ElPastas: string, Admin: string) {

    // Kuriama SQL užklausa, pagal pateiktus duomenis
    let query: string = "SELECT * FROM vartotojas";
    let where = false;

    if(ElPastas != "" && ElPastas !== undefined){
        if(where){
            query += " AND El_pastas like '%" + ElPastas + "%'";
        } else {
            query += " WHERE El_pastas like '%" + ElPastas + "%'";
            where = true;
        }
    }
    if(Admin != "" && Admin !== undefined){
        if(where){
            query += " AND Admin = '" + Admin + "'";
        } else {
            query += " WHERE Admin = '" + Admin + "'";
            where = true;
        }
    }
    query += ";";

    // Vykdoma SQL užklausa
    try {
        const [data] = await dbConnection.execute<Vartotojai[]>(query);
        
        return data;
    } catch (error) {
        console.log(error);
    }
}


// Funkcija sukurianti naują vartototjo įrašą duomenų bazėje
export async function CreateVartotojai(prevState: any, formData: FormData){

    // Tikrinami duomenys, gauti iš formos, naudojama 'zod' biblioteka
    const schema = z.object({
        VartotojoVardas: z.string().nonempty(),
        El_pastas: z.string().nonempty(),
        SlaptazodisHash: z.string().nonempty(),
        Admin: z.string().nonempty(),
    })
    const data = schema.parse({
        VartotojoVardas: formData.get('VartotojoVardas'),
        El_pastas: formData.get('El_pastas'),
        SlaptazodisHash: formData.get('SlaptazodisHash'),
        Admin: formData.get('Admin')
    })

    // Sukuriamas salt ir užkoduojamas pateiktas slaptažodis, naudojant SHA256 algoritmą
    const salt: String = GenerateSalt();
    const hash: String = EncryptSHA256(data.SlaptazodisHash, salt);

    // Sukuriama SQL užklausa, pagal pateiktus duomenis
    const query = "INSERT INTO vartotojas (VartotojoVardas, ElPastas, SlatazodisHash, Salt, Role) VALUES ('" + data.VartotojoVardas + "', '" + data.El_pastas + "', '" + hash + "', '" + salt + "', '" + data.Admin + "');"
    

    // Vykdoma SQL užklausa
    try {
        await dbConnection.execute(query);
        revalidatePath('/')
        return { message: `Vartotojas pridėtas sėkmingai`}
    } catch (e) {
        return { message: `Nepavyko pridėti vartotojo!`}
    }
}


// Funkcija atnaujinanti vartototjo duomenis duomenų bazėje
export async function UpdateVartotojas(prevState: any, formData: FormData){

    // Tikrinami duomenys, gauti iš formos, naudojama 'zod' biblioteka
    const schema = z.object({
        ID: z.string().nonempty(),
        VartotojoVardas: z.string().nonempty(),
        El_pastas: z.string().nonempty(),
        SlaptazodisHash: z.string(),
        Role: z.string().nonempty(),
    })
    const data = schema.parse({
        ID: formData.get('id'),
        VartotojoVardas: formData.get('VartotojoVardas'),
        El_pastas: formData.get('ElPastas'),
        SlaptazodisHash: formData.get('SlaptazodisHash'),
        Role: formData.get('Role')
    })

    // Sukuriama SQL užklausa, pagal pateiktus duomenis
    let query;
        // Užklausa priklauso nuo to ar buvo įvestas naujas slaptažodis
        if(data.SlaptazodisHash == ""){
            query = "UPDATE vartotojas SET " +
            "VartotojoVardas = '" + data.VartotojoVardas +  
            "', ElPastas = '" + data.El_pastas +  
            "', Role = '" + data.Role + 
            "' WHERE ID = '" + data.ID + "';";
        } else {

            // Įvesdus naują slaptažodį, jis yra užkoduojamas naudojant SHA256, naudojant salt
            const salt: String = GenerateSalt();
            const hash: String = EncryptSHA256(data.SlaptazodisHash, salt);

            query = "UPDATE vartotojas SET " +
            "VartotojoVardas = '" + data.VartotojoVardas +  
            "', ElPastas = '" + data.El_pastas + 
            "', SlaptazodisHash = '" + hash +
            "', Salt = '" + salt +
            "', Role = '" + data.Role +
            "' WHERE ID = '" + data.ID + "';";
        }
        

    // Vykdoma SQL užklausa
    try {
        await dbConnection.execute(query);
        revalidatePath('/')
        return { message: `Vartotojas atnaujintas sėkmingai`}
    } catch (e) {
        return { message: `Nepavyko atnaujinti vartotojo!`}
    }
}


// Funkcija, panaikinanti vartotojo įrašą duomenų bazėje
export async function DeleteVartotojai(prevState: any, formData: FormData){
    // Tikrinami duomenys, gauti iš formos, naudojama 'zod' biblioteka
    const schema = z.object({
        id: z.string().nonempty(),
    })
    const data = schema.parse({
        id: formData.get('id'),
    })

    // Sukuriama SQL užklausa, pagal pateiktus duomenis
    const query = "DELETE FROM vartotojas WHERE ID = " + data.id + ";";

    // Vykdoma SQL užklausa
    try {
        await dbConnection.execute(query);
        revalidatePath('/')
        return { message: `Vartotojas ištrintas sėkmingai`}
    } catch (e) {
        return { message: `Nepavyko ištrinti vartotojo!`}
    }
}