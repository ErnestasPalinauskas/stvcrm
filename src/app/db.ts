//Duomenų bazės prisijungimas
//Sukūrė: Karolis Momkus

import mysql from "mysql2/promise";

const dbConnection = await mysql.createConnection({
    host: '84.32.214.92',
    database: 'stvcrm',
    user: 'crmuser',
    password: 'stvcrm2',
});

export default dbConnection;
