//Duomenų bazės prisijungimas
//Sukūrė: Karolis Momkus

import mysql from "mysql2/promise";

const dbConnection = await mysql.createConnection({
    host: 'localhost',
    database: 'stvcrm',
    user: 'root',
    //password: 'password',
});

export default dbConnection;