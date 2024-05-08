//Mygtuko "patvirtinti" elementas
//Sukūrė: Karolis Momkus

'use client'

import { useFormStatus } from "react-dom";

export function SubmitButton({value}: {value: string}) { 
    const { pending } = useFormStatus();

    return(
        <button className="border-solid border-2 rounded p-1 hover:border-black hover:bg-[#e4e4e4] w-full" type="submit" aria-disabled={pending}>
            {value}
        </button>
    )
}