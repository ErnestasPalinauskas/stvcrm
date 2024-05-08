// Vartotojo atnaujinimo forma
// Sukūrė: Karolis Momkus

'use client'

import ListItem from "@/components/listItem";
import { useFormState } from "react-dom";
import { SubmitButton } from "@/components/SubmitButton";
import { UpdateVartotojas, Vartotojai } from "../vartotojaiSQL";

const initialState = {
    message: "",
}

// Rolių tipas
interface adminTypes {
    text: string,
    value: string
}

// Pagrindinė vartotojų atnuajinimo formos funkcija
export function UpdateVartotojasForm({vartotojas}: {vartotojas: Vartotojai}){
    const [state, formAction] = useFormState(UpdateVartotojas, initialState)

    // Rolės pasirinkimo masyvas sukuriamas tam tikra tvarka, kad pirma būtų rodomas toks tipas, kuris atspindi vartotojo rolę.
    let admin: adminTypes[]
    if(vartotojas.Role == "1"){
        admin = [{text: "Administratorius", value: "1"}, {text: "Vartotojas", value: "0"}];
        console.log(vartotojas.Role);
        
    } else {
        admin = [{text: "Vartotojas", value: "0"}, {text: "Administratorius", value: "1"}];
    }

    return(
        <ListItem>
            <form className="w-full p-5" action={formAction}>

                <input type="hidden" id="id" name="id" value={vartotojas.ID}></input>

                {/* Vartotojo vardo įvedimo laukas */}
                <input type="hidden" id="id" name="id" value={vartotojas.ID}></input>
                <div className="flex flex-row pb-2 w-[600px]">
                    <div className="w-1/3">
                        <label htmlFor="VartotojoVardas">Vardas: </label>
                    </div>
                    <div className="w-2/3">
                        <input className="border-solid border-2 rounded hover:border-black w-full"
                            type="text"
                            id="VartotojoVardas"
                            name="VartotojoVardas"
                            defaultValue={vartotojas.VartotojoVardas} maxLength={256}>
                        </input>
                    </div>
                </div>

                {/* El. Pašto įvedimo laukas, kurio negalima koreguoti */}
                <div className="flex flex-row pb-2 w-[600px]">
                    <div className="w-1/3">
                        <label htmlFor="ElPastas">El. paštas (negalima keisti): </label>
                    </div>
                    <div className="w-2/3">
                        <input className="border-solid border-2 rounded hover:border-black w-full"
                            type="text"
                            id="ElPastas"
                            name="ElPastas"
                            defaultValue={vartotojas.ElPastas}
                            maxLength={256}
                            readOnly>
                        </input>
                    </div>
                </div>

                {/* Naujo slaptažodžio įvedimo laukas, galima ir nepildyti */}
                <div className="flex flex-row pb-2 w-[600px]">
                    <div className="w-1/3">
                        <label htmlFor="SlaptazodisHash"> Naujas slaptažodis: </label>
                    </div>
                    <div className="w-2/3">
                        <input className="border-solid border-2 rounded hover:border-black w-full"
                            type="password"
                            id="SlaptazodisHash"
                            name="SlaptazodisHash"
                            defaultValue=''
                            maxLength={256}>
                        </input>
                    </div>
                </div>

                {/* Vartotojo rolės nustatymo laukas */}
                <div className="flex flex-row pb-2">
                    <div className="w-1/3">
                        <label htmlFor="Role">Rolė: </label>
                    </div>
                    <div className="w-2/3">
                        <select className="border-solid border-2 rounded hover:border-black w-full"
                            id="Role"
                            name="Role"
                            defaultValue=''>
                            {
                                admin.map((type) => (
                                    <option key={type.value} value={type.value}>{type.text}</option>
                                ))
                            }
                        </select>
                    </div>
                </div>

                {/* Patvirtinimo mygtukas */}
                <div className="flex flex-row justify-center">
                    <SubmitButton value={'Atnaujinti'}/>
                </div>

                {/* Tekstas parodantis vartotojo atnaujinimo stadiją */}
                <p className="text-lime-700 font-bold">
                    {state?.message}
                </p>
            </form>
        </ListItem>
    );
}