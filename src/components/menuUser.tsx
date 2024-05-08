//Prisijungusio vartotojo vardo rodymas
//Darė Ernestas Palinauskas

"use client";

import axios from "axios";
import { useEffect, useState } from "react";
import VartotojaiList from "@/app/administravimas/vartotojai/@vartotojaiList/page";

function MenuUser() {
  const [userData, setUserData] = useState({
    id: "",
    userName: "",
    email: "",
    Role: "",
  });

  const UpdateUserData = async () => {
    const res = await axios.get("api/users/data");
    setUserData(res.data.data);
  };

  useEffect(() => {
    UpdateUserData();
  }, []);

  return (

    <div className="flex-1">
      <div className="text-center">
        <span className="text-black">{userData.userName === "" ? "Kraunama" : userData.userName}</span>
      </div>

    </div>
  );
}

export default MenuUser;
