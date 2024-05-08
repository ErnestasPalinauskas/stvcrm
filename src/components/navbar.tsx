//Navigacijos juostos elementas
//Sukūrė: Karolis Momkus

"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";
import { useEffect, useState } from "react";
import axios from "axios";

function NavBar() {
  const pathName = usePathname();
  const [userRole, setUserRole] = useState(0);

  const UpdateUserRole = async () => {
    const res = await axios.get("api/users/data");
    setUserRole(res.data.data.role);
  };

  useEffect(() => {
    UpdateUserRole();
  }, []);

  const kalendorius = pathName.startsWith("/kalendorius");
  const laidos = pathName.startsWith("/laidos");

  if (!userRole) {
    return (
      <nav className="ml-5 h-60px">
        <ul className="h-full flex flex-row item-center">
          <li key="kalendorius" className={kalendorius ? "flex h-full pl-3 pr-3 bg-[#223a86]" : "flex h-full pl-3 pr-3 bg-none"}>
            <Link
              className={kalendorius ? "text-white font-bold m-auto h-full flex items-center" : "text-white m-auto h-full flex items-center"}
              href="/kalendorius"
              key="kalendorius"
            >
              <span className="m-auto">kalendorius</span>
            </Link>
          </li>
        </ul>
      </nav>
    );
  } else {
    const administravimas = pathName.startsWith("/administravimas");

    return (
      <nav className="ml-5 h-60px">
        <ul className="h-full flex flex-row item-center">
          <li key="kalendorius" className={kalendorius ? "flex h-full pl-3 pr-3 bg-[#223a86]" : "flex h-full pl-3 pr-3 bg-none"}>
            <Link
              className={kalendorius ? "text-white font-bold m-auto h-full flex items-center" : "text-white m-auto h-full flex items-center"}
              href="/kalendorius"
              key="kalendoriusa"
            >
              <span className="m-auto">Kalendorius</span>
            </Link>
          </li>

          <li key="adminsitravimas" className={administravimas ? "flex h-full pl-3 pr-3 bg-[#223a86]" : "flex h-full pl-3 pr-3 bg-none"}>
            <Link
              className={administravimas ? "text-white font-bold m-auto h-full flex items-center" : "text-white m-auto h-full flex items-center"}
              href="/administravimas"
              key="administravimas"
            >
              <span className="m-auto">Administravimas</span>
            </Link>
          </li>
        </ul>
      </nav>
    );
  }
}

export default NavBar;
