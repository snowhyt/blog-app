import express, { Request, Response } from "express";
import dotenv from "dotenv";
import authRoutes from "./backend/routes/auth.routes"
dotenv.config(); 
import pool from "./db";

const app = express();
const PORT = process.env.PORT ||4000;
app.use(express.json());



async function connectToDB() {
  try {
    await pool.connect();
    console.log("Connected to PostgreSQL.");
  } catch (err) {
    console.error("Failed to connect to PostgreSQL:", err);
  }
}





// Routes
app.get("/", (req: Request, res: Response) => {
  res.sendStatus(200);
});


app.get("/test", (req, res) => {
  res.send("test success");
});

//for testing purposes
app.get("/test/repo/gagi", (req, res) => {
  res.send("test repo gagi success");
});  


//root route
app.use("/api/auth", authRoutes);












//request in database
app.post("/", async (req: Request, res: Response) => {
  try {
    const data = await pool.query("SELECT * FROM schools");
    res.status(200).json(data.rows);
  } catch (error) {
    console.error("Database query failed:", error);
    res.sendStatus(500);
  }
});


app.get("/setup", async (req: Request, res: Response) => {
  try {
    await pool.query(`
      CREATE TABLE IF NOT EXISTS schools (
        id SERIAL PRIMARY KEY, 
        name VARCHAR(255), 
        location VARCHAR(255)
      )
    `);
    res.status(200).send("Successfully created a new table");
  } catch (error) {
    console.error("Database setup failed:", error);
    res.sendStatus(500);
  }
});

app.listen(PORT, () => {
  //check db connection
 connectToDB();
  
  //localhost connection
  console.log(`Server is running on port ${PORT}`);

});
