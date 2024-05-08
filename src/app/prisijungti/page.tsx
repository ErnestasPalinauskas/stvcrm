//Prisijungimo forma
//Sukūrė : Karolis Momkus

'use client'

import { useEffect, useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { log } from "console";
import axios from "axios";

// Pagrindinė funkcija
function Prisijungti(){
    const router = useRouter();

    const [loginButtonEnabled, setloginButton] = useState(false)
    const [processingState, setProcessingState] = useState(false)
    const [user, setUser] = useState({
        email: "",
        password: ""
    })

    // Nustato ar galima prisijungti ar ne (galima spausti mygtuką ar ne)
    useEffect(() => {
        if(user.email.length > 7 && user.password.length > 0){
            setloginButton(true)
        } else{
            setloginButton(false)
        }
    }, [user])

    // Funkcija tikrinanti prisijungimo duomenis
    const onSubmit = async () => {
        if(loginButtonEnabled){
            try {
                setProcessingState(true);
                const response = await axios.post("/api/users/login", user);
                console.log("Prisijungta", response.data);
                
                router.push("/kalendorius");
            } catch (error: any) {
                console.log("Prisijungti nepavyko", error.message);
            } finally {
                setProcessingState(false);
            }
        }
    }


    return (
        <div className="w-full flex justify-center">
            <div className="w-3/12">
                <div>
                    <div className="w-full flex justify-center">
                    </div>
                    <h1 className="text-center font-bold mt-5">{processingState ? "Jungiamasi" : "Prisijungimas"}</h1>
                    <div className="mt-2 flex">
                        <label className="w-1/3" htmlFor="eMail">El. Paštas:</label>
                        <input className="w-2/3 border-solid border-2 rounded hover:border-black w-full"
                            type="text"
                            id="eMail"
                            name="eMail"
                            placeholder="jusupastas@stv.lt"
                            required
                            maxLength={256}
                            pattern="[a-z0-9._%+\-]+@[a-z0-9.\-]+\.[a-z]{2,}$"
                            onChange={(e) => setUser({...user, email: e.target.value})}
                        >
                        </input>
                    </div>
                    <div className="flex mt-2">
                        <label className="w-1/3" htmlFor="password">Slaptažodis:</label>
                        <input className="w-2/3 border-solid border-2 rounded hover:border-black w-full"
                            type="password"
                            id="password"
                            name="password"
                            placeholder="slaptazodis123"
                            required
                            maxLength={256}
                            onChange={(e) => setUser({...user, password: e.target.value})}
                        >
                        </input>
                    </div>
                    <button className="mt-5 border-solid border-2 rounded hover:border-black w-full" onClick={onSubmit}>
                        {loginButtonEnabled ? "Prisijungti" : "Įveskite tinkamus duomenis"}
                    </button>
                </div>
            </div>
        </div>
    )
}

export default Prisijungti;