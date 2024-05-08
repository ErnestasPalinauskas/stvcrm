// Adminsitravimo puslapis
// Šiame puslapyje galima pasirinkti ką administruoti: vartotojus bei prašymus
// Sukūrė: Karolis Momkus

import Card from "@/components/card";
import Link from "next/link";
import Image from "next/image";

function Administravimas() {
  return (
    <div className="flex justify-center h-max">
      <Card>
        <h1 className="text-center font-bold">Administravimas</h1>
        <div className="flex">
          <Link
            className="border-solid border-2 rounded p-1 hover:border-black hover:bg-[#e4e4e4] w-full text-center m-2"
            href="/administravimas/vartotojai"
          >
            <Image className="m-auto p-2" src="/user.png" width={80} height={80} alt="Vartotojo nuotrauka" />
            Vartotojų administravimas
          </Link>
          <Link
            className="border-solid border-2 rounded p-1 hover:border-black hover:bg-[#e4e4e4] w-full text-center m-2"
            href="/administravimas/prasymai"
          >
            <Image className="m-auto p-2" src="/envelope.png" width={80} height={80} alt="laiško nuotrauka" />
            Prašymų administravimas
          </Link>
        </div>
      </Card>
    </div>
  );
}

export default Administravimas;
