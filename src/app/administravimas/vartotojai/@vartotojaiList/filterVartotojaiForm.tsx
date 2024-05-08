// Vartotojų sąrašo filtravimo forma
// Sukūrė: Karolis Momkus

import { SubmitButton } from "@/components/SubmitButton";
import ListItem from "@/components/listItem";


// Pagrindinė vartotojų sąrašo filtro funkcija
export async function FilterVartotojaiForm({ searchParams }: {
    searchParams: {
        ElPastas: string,
        Admin: string,
    }}) {

    let ElPastas: string = "";
    let Admin: string = "";

    // Randama paga kuriuos parametrus buvo filtruojama (tikrina kurie URL kintamieji yra pilni / tušti)
    if(searchParams.ElPastas !== undefined && searchParams.ElPastas != ""){
            ElPastas = searchParams.ElPastas;
    }
    if(searchParams.Admin !== undefined && searchParams.Admin != ""){
            Admin = searchParams.Admin;
    }

    // Grąžinama Forma, kur galima pasirinkit El paštą bei rolę (vartotojų sąrašo filtravimas)
    return(
        <ListItem>
            <form className="flex flex-row p-1">
                <div className="text-center p-1">
                    <label htmlFor="pavadinimas">El. Paštas:</label><br />
                    <input className="border-solid border-2 rounded hover:border-black" type="text" id="ElPastas" name="ElPastas" defaultValue={ElPastas}></input>
                </div>
                <div className="text-center p-1">
                    <label htmlFor="kategorija">Admin:</label><br />
                    <select className="border-solid border-2 rounded hover:border-black" id="Admin" name="Admin">
                        <option value="">---</option>
                        <option value="1">Taip</option>
                        <option value="0">Ne</option>
                    </select>
                </div>
                <SubmitButton value={'Filtruoti'}/>
            </form>
        </ListItem>
    );
}