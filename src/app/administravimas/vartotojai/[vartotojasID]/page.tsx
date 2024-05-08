// Detalaus vartotojo duomneų parodymo puslapis (galima atnaujinti vartotojo duomenis)
// Sukūrė: Karolis Momkus

import { Metadata } from "next";
import dbConnection from "@/app/db";
import Card from "@/components/card";
import Link from "next/link";
import { Vartotojai } from "../vartotojaiSQL";
import { UpdateVartotojasForm } from "./updateVartotojasForm";


// Generuojami Metaduomenys
export const metadata = {
    title: 'Vartotojas',
    description: 'Šiaulių apskrities televizijos programų planavimo sistemos vartotojo duomenys.'
}

// Pagrindinė detalaus vartotojo duomenų keitimo formos funkcija
async function VartotojasID({
    searchParams
}: {
    searchParams: {
        ID: string;
    }
}) {

    // Gaunami vartotjo duomenys
    const [data] = await dbConnection.execute<Vartotojai[]>("SELECT * FROM vartotojas WHERE ID = '" + searchParams.ID + "';");

    return (
        <div>
            <div className="fixed top-14 left-0 p-5">
                {/* Mygtukas grąžinantis atgal į vartotojų sąrašo puslapį */}
                <div className="border-solid border-2 rounded p-1 hover:border-black hover:bg-[#e4e4e4] w-full">
                    <Link className="p-5" href="/administravimas/vartotojai">Grįžti</Link>
                </div>
            </div>
            <div className="flex justify-center">
                {/* Vartotojo duomenų naujinimo forma */}
                <Card>
                    <h1 className="text-center font-bold">Vartotojo &quot;{data[0].VartotojoVardas}&quot; informacija</h1>
                    <UpdateVartotojasForm vartotojas={data[0]}/>
                </Card>
            </div>
        </div>
        
        
    )
}

export default VartotojasID;