//Pagrindinis vartotojų puslapis
// Sukūrė: Karolis Momkus

import React from "react";


// Kuriami metaduomenys, puslapio pavadinimas bei aprašymas
export const metadata = {
    title: 'Vartotojai',
    description: 'Šiaulių apskrities televizijos programų planavimo sistemos vartotojų sąrašas.'
}


// Pagrindinė Vartotojų puslapio funkcija,gražinanti šio puslapio komponentus
function Vartotojai() {
    return (
        <div className="p-5">
            <h1 className="text-center font-bold">Vartotojų sąrašo valdymas</h1>
        </div> 
    );
}

export default Vartotojai;