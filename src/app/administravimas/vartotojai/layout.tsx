// Vartotojo puslapių išdėstymas
// Sukūrė: Karolis Momkus

'use client'

import Card from "@/components/card";
import React from "react";
import { usePathname } from "next/navigation";


// Pagrindinė išdėstymo funkcija, gražinanti išdėstymo elementus
// Naudojami papildomi Props, vartotojų sąrašui, bei jų pridėjimo formai
export default function VartotojasLayout( {
    children,
    vartotojaiList,
    addVartotojaiForm
}: {
    children: React.ReactNode;
    vartotojaiList: React.ReactNode;
    addVartotojaiForm: React.ReactNode;
} ) {

    // Priklausomai nuo puslapio nuorodos, grąžinami išdėstymo komponentai
    const pathName = usePathname();
    if(pathName === '/administravimas/vartotojai'){
        return (
            <div>
                <div>{children}</div>
                <div className="flex justify-center">
                    <div className="w-2/3">
                        <Card>{vartotojaiList}</Card>
                    </div>
                    <div className="flex-1 w-1/3">
                        <Card>{addVartotojaiForm}</Card>
                    </div>
                </div>
            </div>
        );
    } else {
        return (
            <div>
                <div>{children}</div>
            </div>
        );
    }
}