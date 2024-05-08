//Pagalbinis kodas gaunantis vartotojo duomenis
//Sukūrė: Karolis Momkus

import { NextRequest } from "next/server"
import { jwtVerify } from "jose";

export const getDataFromToken = async (request: NextRequest) => {
    try {
        const token = request.cookies.get("token")?.value || "";
        const decodedToken: any = await jwtVerify(token, new TextEncoder().encode(process.env.TOKEN_SECRET!));
        
        return decodedToken.payload;
    } catch (error: any) {
        throw new Error("Nepavyko gauti vartotojo duomenų")
        
    }
}