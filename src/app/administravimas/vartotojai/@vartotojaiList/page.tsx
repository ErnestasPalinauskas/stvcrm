// Vartotojų sąrašo puslapis (prop)
// Sukūrė: Karolis Momkus

import ListItem from "@/components/listItem";
import Link from "next/link";
import { GetVartotojai, Vartotojai } from "../vartotojaiSQL";
import { FilterVartotojaiForm } from "./filterVartotojaiForm";
import { DeleteVartotojasForm } from "./deleteVartotojasForm";


//Vartotojų sąrašo funkcija
async function VartotojaiList({ searchParams }: {
    searchParams: {
        ElPastas: string,
        Admin: string,
    }}) {

    // Gaunamas vartotojų sąrašas priklausomai nuo filtro parametrų
    const data = await GetVartotojai(searchParams.ElPastas, searchParams.Admin) as Vartotojai[];
    
    //Grąžinami puslapio komponentai
    return (
        <div className="w-full">
            <h1 className="text-center font-bold" >Vartotojų sąrašas</h1>

            {/* Vartotojų sąrašo filtras, galima filtroti pagal El. Paštą bei rolę */}
            <FilterVartotojaiForm searchParams={searchParams} />
            <br />

            {/* Elementas parodantis kokios tipo duomenys yra vartootjų sąraše */}
            <ListItem>
                <div className="ml-1 mr-1 text-center border-r-2 pr-2 w-1/12">
                    <span className="font-bold">ID: </span>
                </div>
                <div className="ml-1 mr-1 text-center border-r-2 pr-2 w-2/12">
                    <span className="font-bold">Vardas: </span>
                </div>
                <div className="ml-1 mr-1 text-center border-r-2 pr-2 w-6/12">
                    <span className="font-bold">El. Paštas: </span>
                </div>
                <div className="ml-1 mr-1 text-center border-r-2 pr-2 w-2/12">
                    <span className="font-bold">Admin: </span>
                </div>
                <div className="ml-1 mr-1 text-center w-2/12"></div>
            </ListItem>

            {/* Elementas parodantis kokios tipo duomenys yra vartootjų sąraše */}
            <ul>
                { 
                
                    /* Dinamiškai sukuriamas vartotojų sąrašas, pagal gautus duomneis iš duomneų bazės */
                    data.map((vartotojas) => (
                        <li key={vartotojas.ID}>
                            <ListItem>
                                <div className="ml-1 mr-1 text-center border-r-2 pr-2 w-1/12">
                                    <span>{vartotojas.ID} </span>
                                </div>
                                <div className="ml-1 mr-1 text-center border-r-2 pr-2 w-2/12">
                                    <span>{vartotojas.VartotojoVardas}</span>
                                </div>
                                <div className="ml-1 mr-1 text-center border-r-2 pr-2 w-6/12">
                                    <span>{vartotojas.ElPastas}</span>
                                </div>
                                <div className="ml-1 mr-1 text-center border-r-2 pr-2 w-2/12">
                                    <span>{vartotojas.Role ? "Administratorius" : "Vartotojas"}</span>
                                </div>
                                <div className="ml-1 mr-1 text-center w-1/12">

                                    {/* Dinamiška nuoroda nuvedanti į detalesnį vartotojo duomenų puslapį */}
                                    <Link className="border-solid border-2 rounded p-1 hover:border-black hover:bg-[#e4e4e4] w-full pl-4 pr-4"
                                    href={{
                                        pathname: `/administravimas/vartotojai/${(vartotojas.ID)}`,
                                        query: {
                                            ID: `${vartotojas.ID}`
                                        },
                                    }}>Keisti</Link>
                                </div>
                                <div className="text-center w-1/12">
                                    <DeleteVartotojasForm id={vartotojas.ID}/>
                                </div>
                            </ListItem>
                        </li>
                    ))
                }
            </ul>
        </div>
    )
}

export default VartotojaiList;