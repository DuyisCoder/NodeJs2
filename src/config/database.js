import mysql from "mysql2/promise"

console.log('Connection Database Success!');
const connection = mysql.createPool({
    host: 'localhost',
    user: 'root',
    database: 'nodejs'
})


export default connection;