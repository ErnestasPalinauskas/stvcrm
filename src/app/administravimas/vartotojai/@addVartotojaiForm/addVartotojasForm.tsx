// Vartotojo pridėjimo forma
// Sukūrė: Karolis Momkus

'use client'

import ListItem from "@/components/listItem";
import { useFormState } from "react-dom";
import { SubmitButton } from "@/components/SubmitButton";
import { CreateVartotojai } from "../vartotojaiSQL";

const initialState = {
    message: ""
}

// Pagrindinė vartotojo pridėjimo formos funkcija
export function AddVartotojasForm(){
    const [state, formAction] = useFormState(CreateVartotojai, initialState)

    return(
        <ListItem>
            <form className="w-full p-5" action={formAction}>

                {/* Vartotojo vardo įvedimo laskas */}
                <div className="flex flex-row pb-2">
                    <div className="w-1/3">
                        <label htmlFor="VartotojoVardas">Vardas: </label>
                    </div>
                    <div className="w-2/3">
                        <input className="border-solid border-2 rounded hover:border-black w-full" type="text" id="VartotojoVardas" name="VartotojoVardas" defaultValue='' maxLength={256} required></input>
                    </div>
                </div>

                {/* El. Pašto įvedimo laskas */}
                <div className="flex flex-row pb-2">
                    <div className="w-1/3">
                        <label htmlFor="El_Pastas">El. Paštas: </label>
                    </div>
                    <div className="w-2/3">
                        <input className="border-solid border-2 rounded hover:border-black w-full" type="text" id="El_pastas" name="El_pastas" defaultValue='' maxLength={256} required></input>
                    </div>
                </div>

                {/* Slaptažodžio įvedimo laukas */}
                <div className="flex flex-row pb-2">
                    <div className="w-1/3">
                        <label htmlFor="SlaptazodisHash">Slaptažodis: </label>
                    </div>
                    <div className="w-2/3">
                        <input className="border-solid border-2 rounded hover:border-black w-full" type="text" id="SlaptazodisHash" name="SlaptazodisHash" defaultValue='' maxLength={256} required></input>
                    </div>
                </div>

                {/* Rolės įvedimo laukas */}
                <div className="flex flex-row pb-2">
                    <div className="w-1/3">
                        <label htmlFor="Admin">Admin: </label>
                    </div>
                    <div className="w-2/3">
                        <select className="border-solid border-2 rounded hover:border-black w-full" id="Admin" name="Admin">
                            <option value="0">Ne</option>
                            <option value="1">Taip</option>
                        </select>
                    </div>
                </div>

                {/* Patvitinimo mygukas */}
                <div className="flex flex-row justify-center">
                    <SubmitButton value={'Pridėti'}/>
                </div>

                {/* Tekstas parodantis vartotojo sukūrimo stadiją */}
                <p className="text-lime-700 font-bold">
                    {state?.message}
                </p>
            </form>
        </ListItem>
    );
}