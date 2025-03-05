import pkg from "pg";
import dotenv from "dotenv";
dotenv.config();
const { Pool } = pkg;


const POOL = new Pool({
    host: process.env.DB_HOST || "db",
    user: process.env.DB_USER|| "postgres",
    database: process.env.DB_NAME || "blog-db",
    password: process.env.DB_PASSWORD || "admin123",
    port: parseInt(process.env.DB_PORT || "5432")  
    
});

export default POOL;
