//Prisijungusio vartotojo duomneų elementas
//Sukūrė: Karolis Momkus

'use client'

import axios from "axios";
import { useEffect, useState } from "react"



function UserDetails() {
    const [userData, setUserData] = useState({
        id: "",
        userName: "",
        email: "",
        Role: "",
    });

    const UpdateUserData = async () => {
        const res = await axios.get("api/users/data");
        setUserData(res.data.data);
    }

    useEffect(() => {
        UpdateUserData();
    }, [])

    return (
        <div className="flex-1">
            <div className="text-center">
                <span className="text-white">{userData.userName === "" ? "Kraunama" : userData.userName}</span>
            </div>
            <div className="text-center">
                <span className="text-white ">{userData.email === "" ? "Kraunama" : userData.email}</span>
            </div>
        </div>
    )
}

export default UserDetails