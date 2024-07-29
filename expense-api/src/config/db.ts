import "dotenv/config"
import mysql from "mysql2"

const db = mysql.createPool({
    host: 'localhost',
    user: process.env.DATABASE_USERNAME,
    password: process.env.DATABASE_PASSWORD,
    database: process.env.DATABASE_NAME
})

export default db