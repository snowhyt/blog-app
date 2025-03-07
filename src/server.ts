import express, { Request, Response } from "express";
import dotenv from "dotenv";
import cors from "cors";
import authRoutes from "./backend/routes/auth.routes";
import blogRoutes from "./backend/routes/blog.routes";
dotenv.config();
import pool from "./db";
import cookieParser from "cookie-parser";

const app = express();
const PORT = process.env.PORT || 4000;







// Middlewares
app.use(cors({
  origin: "http://localhost:5173",
  credentials: true,
}));

app.use(express.json());


app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());



app.use("/api/auth", authRoutes);
app.use("/api/blog", blogRoutes);

// Check DB connection
async function connectToDB() {
  let client;
  try {
    client = await pool.connect();
    console.log("Successfully obtained a client from the pool.");

    // test connection
     const result = await pool.query('SELECT NOW()');
        console.log('Database connected:', result.rows[0].now);

  } catch (err) {
    console.error("Failed to connect to PostgreSQL:", err);
  }
}




app.listen(PORT, () => {
  connectToDB();
  console.log(`Server is running on port ${PORT}`);
});






//api-db checker
app.get("/api/test-connection", async (req: Request, res: Response) => {
  try {
      const testResult = await pool.query('SELECT NOW()');
      res.status(200).json({ message: "Database connection successful", timestamp: testResult.rows[0].now });
  } catch (err) {
      console.error("Failed to test database connection:", err);
      res.status(500).json({ message: "Failed to connect to the database" });
  }
});


//insert data to db (POST /insertDataDB)
app.post("/insertDataDB", async(req: Request, res: Response) => {
  try {
      const { username, firstname, lastname, gender, email, password,   role, image_url } = req.body;

      // Basic input validation
      if (!username || !firstname || !lastname || !gender || !email || !password || !role || !image_url) {
          return res.status(400).json({ message: "Missing required fields" });
      }


      // if (password ! == confirmPassword){
      //   return res.status(400).json({message: "Password do not match. Please try again."});
      // }


      const existingUser = await pool.query("SELECT * FROM users WHERE username = $1 OR email = $2", [username, email]);
      if (existingUser.rows.length > 0) {
          return res.status(409).json({ message: "User already exists" });
      }

      const insertQuery = `INSERT INTO users (username, first_name, last_name, gender, email, password, role, image_url) 
          VALUES ($1, $2, $3, $4, $5, $6, $7, $8) RETURNING *`;

      const result = await pool.query(insertQuery, [username, firstname, lastname, gender, email, password, role, image_url]);

      res.status(201).json({ message: "User created successfully", user: result.rows[0] });
  } catch (err) {
      console.error("Error inserting data:", err);
      res.status(500).json({ message: "Internal Server Error" });
  }
});

//view data from db (GET /viewDataDB)
app.get("/viewDataDB", async (req: Request, res: Response) => {
  try {
      const result = await pool.query('SELECT * FROM users');
      res.status(200).json(result.rows);
  } catch (err) {
      console.error("Error fetching data:", err);
      res.status(500).json({ message: "Internal Server Error" });
  }
});


