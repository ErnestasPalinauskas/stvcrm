//Atsijungimo mygtukas
//Sukūrė: Karolis Momkus

'use client'

import axios from "axios";
import { useRouter } from "next/navigation";
import { useState } from "react";

function LogoutButton(){

    const router = useRouter();
    const [processing, setProcessing] = useState(false);

    const onSubmit = async () => {
        try {
            //setProcessing(true);
            const response = await axios.get("/api/users/logout");
            console.log("Atsijungta", response.data);

            //setProcessing(false);
            router.push("/prisijungti");

        } catch (error: any) {
            console.log("Atsijungti nepavyko", error.message);
        }
    }
    

    return(
            <button className="ml-5 rounded p-1 hover:bg-[#e4e4e4] hover:text-black text-white w-full"
                onClick={onSubmit}>
                {processing ? "Atsijungiama" : "Atsijungti"}
            </button>
    )
}

export default LogoutButton;