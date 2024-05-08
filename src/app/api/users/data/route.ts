//Gražina vartotojo duomenis iš session token
//Sukūrė: Karolis Momkus

import { getDataFromToken } from "@/helpers/getDataFromToken";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {

    try {
        const userData = await getDataFromToken(request);
        
        return NextResponse.json({
            message: "Sėkmingai gauti vartotojo duomenys",
            success: true,
            data: userData
        })
    } catch (error: any) {
        return NextResponse.json({error: "Nepavyko gauti duomenų"}, {status: 400})
    }

}