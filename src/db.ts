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



















// Create a new PostgreSQL pool instance with a connection string from environment variables
// const POOL = new Pool({
//   connectionString: process.env.DATABASE_URL || "postgres://postgres:admin123@db:5432/blog-db",
// });

// Test the database connection
// POOL.query("SELECT NOW()", (error, result) => {
//   if (error) {
//     console.error("Database Connection Error:", error);
//   } else {
//     console.log("Database Connected:", result.rows[0].now);
//   }
// });