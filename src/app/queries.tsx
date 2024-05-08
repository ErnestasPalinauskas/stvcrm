import { RowDataPacket } from "mysql2";
import connection from "./db";
import { z } from "zod";
import { revalidatePath } from "next/cache";

export interface Vartotojas extends RowDataPacket {
  ID: string;
  ElPastas: string;
  SlaptazodisHash: string;
  Salt: string;
  Admin: string;
}

export interface DarboBilietas extends RowDataPacket {
  ID: string;
  Pavadinimas: string;
  Aprasymas: string;
  Nuo: string;
  Iki: string;
}

export async function addDarboBilietas(prevState: any, formData: FormData) {
  const schema = z.object({
    Pavadinimas: z.string().nonempty(),
    Aprasymas: z.string().nonempty(),
    Nuo: z.string().nonempty(),
    Iki: z.string().nonempty(),
  });
  const data = schema.parse({
    Pavadinimas: formData.get("Pavadinimas"),
    Aprasymas: formData.get("Aprasymas"),
    Nuo: formData.get("Nuo"),
    Iki: formData.get("Iki"),
  });

  const query =
    "insert into DarboBilietas (SukureID,PatvirtinoID, Pavadinimas, Aprasymas, Nuo, Iki) values (1,1,'" +
    data.Pavadinimas +
    "','" +
    data.Aprasymas +
    "','" +
    data.Nuo +
    "','" +
    data.Iki +
    "');";

  try {
    await connection.execute<DarboBilietas[]>(query);
    revalidatePath("/");
    return { message: "Darbo bilietas pridėtas" };
  } catch (error) {
    console.log(error);
    return { message: "Darbo bilietas nepridėtas" };
  }
}

export async function getVartotojai() {
  const query = "select * from vartotojas;";

  try {
    const [rows] = await connection.execute<Vartotojas[]>(query);
    return rows;
  } catch (error) {
    console.log(error);
  }
}
