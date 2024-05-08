import Link from "next/dist/client/link";
import React from "react";
import MenuUser from "./menuUser";

export default function Menu() {
  return (
    <div className="flex flex-col items-center justify-center border-2 border-black font-bold p-2 mb-5 mx-2 w-64 p-4 m-5 ml-7 rounded">
      <div className="mb-2">
        <h1>Sveiki!, </h1>
        <MenuUser />
      </div>
      <div className="flex flex-col items-center justify-center border-2 border-black font-bold p-2 mb-5 mx-2 w-50 p-4 m-5 ml-7 rounded">
        <div className="mb-2">Valdymo skydas</div>
        <Link href="/manoUzduotys">
          <span className="underline text-blue-500">Mano uzduotys</span>
        </Link>
      </div>
    </div>
  );
}
