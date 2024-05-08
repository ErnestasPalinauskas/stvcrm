import { NextRequest, NextResponse } from "next/server";
import dbConnection from "@/app/db";
import { parse } from "url";
import Calendar from "@/components/calander";
import { NextApiRequest, NextApiResponse } from "next";
import { ResultSetHeader } from "mysql2";

export async function GET(request: NextRequest) {
  try {
    const { query } = parse(request.url, true);
    const { Nuo, Iki, SukureID } = query;

    const [rows] = await dbConnection.execute("SELECT * FROM darbobilietas WHERE Nuo >= ? AND Iki <= ? AND SukureID = ?", [Nuo, Iki, SukureID]);

    return NextResponse.json(rows);
  } catch (error: any) {
    return NextResponse.json({ error: "Nepavyko gauti darbo bilietų" }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const reqBody = await request.json();
    const { SukureID, Pavadinimas, Aprasymas, Nuo, Iki } = reqBody;

    // Adjust the Nuo and Iki dates to the local timezone
    const nuoDate = new Date(Nuo);
    const ikiDate = new Date(Iki);
    const adjustedNuo = new Date(nuoDate.getTime() - nuoDate.getTimezoneOffset() * 60000).toISOString().slice(0, -1);
    const adjustedIki = new Date(ikiDate.getTime() - ikiDate.getTimezoneOffset() * 60000).toISOString().slice(0, -1);

    const [result] = await dbConnection.execute("INSERT INTO darbobilietas (SukureID, Pavadinimas, Aprasymas, Nuo, Iki) VALUES (?, ?, ?, ?, ?)", [
      SukureID,
      Pavadinimas,
      Aprasymas,
      adjustedNuo,
      adjustedIki,
    ]);

    return NextResponse.json({ message: "Darbo bilietas sėkmingai pridėtas" });
  } catch (error: any) {
    return NextResponse.json({ error: "Nepavyko pridėti darbo bilieto" }, { status: 500 });
  }
}
