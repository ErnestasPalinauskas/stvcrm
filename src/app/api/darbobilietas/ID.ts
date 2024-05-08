import { NextApiRequest, NextApiResponse } from "next";
import dbConnection from "@/app/db";
import { ResultSetHeader } from "mysql2";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === "DELETE") {
    try {
      const { ID, SukureID } = req.query;

      const [result] = await dbConnection.query("DELETE FROM darbobilietas WHERE ID = ? AND SukureID = ?", [ID, SukureID]);

      const deleteResult = result as ResultSetHeader;
      if (deleteResult.affectedRows === 0) {
        return res.status(404).json({ error: "Darbo bilietas nerastas" });
      }

      console.log("Sėkmingas ištrinimas");
      return res.status(200).json({ message: "Darbo bilietas sėkmingai ištrintas" });
    } catch (error: any) {
      console.error("Failed to delete data: ", error);
      return res.status(500).json({ error: "Nepavyko ištrinti darbo bilieto" });
    }
  }
}
