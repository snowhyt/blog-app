import pkg from "pg";
import dotenv from "dotenv";
dotenv.config();
const { Pool } = pkg;



const POOL = new Pool({
    host: "db",
    user: "postgres",
    database: "blog-db",
    port: parseInt(process.env.DB_PORT || "5432"),  
    password: process.env.DB_PASSWORD
    
});

export default POOL;
