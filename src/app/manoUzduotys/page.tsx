//Dare Ernestas Palinauskas

import Link from "next/dist/client/link"; // Importuojame Link iš next bibliotekos
import React from "react";
import MenuUser from "@/components/menuUser";
import VartotojaiList from "@/app/administravimas/vartotojai/@vartotojaiList/page";

export default function manoUzduotys() {
  return (
    <div>
      <h1>Darbuotojas / administratorius</h1>
      <div className="flex flex-col items-center justify-center border-2 border-black font-bold p-5 mb-5 mx-2 w-64 p-4 m-5 ml-7 rounded">
        <div className="mb-2">
          <MenuUser />
        </div>

        <h1 className="underline text-blue-500">Darbuotojas / administratorius</h1>
        <div className="flex mr-5 ml-5">
          <span className="underline text-blue-500 ml-2 m-2">Profilis</span>

          <span className="underline text-blue-500 m-2">Atsijungti</span>
        </div>
      </div>

      <div className="flex flex-col items-center justify-center border-2 border-black font-bold p-5 mb-5 mx-2 w-64 p-4 m-5 ml-7 rounded">
        <div className="mb-2">Valdymo skydas</div>

        {/* Nuveda į sukurtas užduotis */}
        <Link href="/manoUzduotys">
          <span className="underline text-blue-500">Mano uzduotys</span>
        </Link>
        <div className="flex mr-5 ml-5">
          <span className="underline text-blue-500 ml-2 m-2">Sukurtos uzduotys</span>
        </div>
      </div>
    </div>
  );
}
