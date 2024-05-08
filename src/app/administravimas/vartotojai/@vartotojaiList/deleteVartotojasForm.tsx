// Forma skirta vartotojo ištinimui
// Sukūrė: Karolis Momkus

'use client'

import { SubmitButton } from "@/components/SubmitButton";
import { useFormState } from "react-dom";
import { DeleteVartotojai } from "../vartotojaiSQL";

// Pradinė būsena, tai yra žinutė, kuri rodo ar sėkmingai buvo ištrintas įrašas
const initialState = {
    message: "",
}


// Pagrindinė forma ištrinanti vartotoją
// Forma kuriama dinamiškai, jai nustatomas paslėptas duomuo – vartotojo ID 
export function DeleteVartotojasForm({id}: {id: string}){
    const [state, formAction] = useFormState(DeleteVartotojai, initialState)

    return(
        <form action={formAction}>
            <input type="hidden" name="id" value={id} />
            <SubmitButton value={'Trinti'}/>
            <p aria-live="polite" className="sr-only" role="status">
                {state?.message}
            </p>
        </form>
    );
}
