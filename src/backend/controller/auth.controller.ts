import e, { Request, Response } from "express";
import { clearToken, generateToken } from "../lib/utils";
import cloudinary from "../../backend/lib/cloudinary";
import pool from "../../db";
import crypto from "crypto";
import dotenv from "dotenv";
import multer from "multer";
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

dotenv.config();



//signup
export const signup = async (req:Request, res: Response) => {
    
     //for validation of input if all filled up
    const { username, firstname, lastname, gender, email, password,   role, image_url } = req.body;

    //for authentication confirm password
   // const confirmPassword = req.body.password;
    
    try {
            if (!username || !firstname || !lastname || !gender || !email || !password || !role || !image_url) {
                return res.status(400).json({message: "Missing required fields"});
            }

            // if(password != password){
            //     return res.status(400).json({message: "Password do not match. Please try again."});
            // }

            //MD5 Hashing
            const hashedPassword = crypto.createHash('md5').update(password).digest('hex');
            //check for existing user
            const existingUser = await pool.query("SELECT * FROM users WHERE username = $1 OR email = $2", [username, email]);
            if (existingUser.rows.length > 0) {
                return res.status(409).json({message: "User already exists"});
            }
            
            //into insert user, kinda messy cause I am just using psql directly
            const insertQuery = `INSERT INTO users (username, first_name, last_name, gender, email, password, role, image_url) 
                VALUES ($1, $2, $3, $4, $5, $6, $7, $8) RETURNING *`;
            
            const result = await pool.query(insertQuery, [username, firstname, lastname, gender, email, password, role, image_url]);
            
            const insertedUser = result.rows[0];

            //jwt token, now we use the user data
            generateToken( {id: insertedUser.id, username: insertedUser.username, role: insertedUser.role} , res);
        
            
            res.status(201).json({message: "User created successfully", user: insertedUser});
            
    } catch (error) {
        console.error("Error inserting data:", error);
        res.status(500).json({message: "Signup Internal Server Error"});
    }   
}

//login
export const login = async (req:Request, res: Response) => {
    const { username, password } = req.body;
    try {
        //check username and password if match
        const user = await pool.query("SELECT * FROM users WHERE username = $1 OR email = $2", [username, password]);
        if (user.rows.length === 0) {
            return res.status(404).json({message: "User not found"});
        }
        const userData = user.rows[0];

        const hashedPassword = crypto.createHash('md5').update(password).digest('hex');
        if (hashedPassword !== userData.password) {
            return res.status(401).json({ message: "Invalid credentials" });
        }

        //jwt token
        const token = generateToken({  id: userData.id, username: userData.username,  role: userData.role }, res);

        res.status(200).json({
                message: "Login successful", 
                    id: userData.id,
                    token: token,
                    user: userData.username,
                    email: userData.email,
                    role: userData.role,

                }
            );  
       
    } catch (error) {
        console.log("Database query failed:", error);
        return res.status(500).json({message: "Server Error in Login"});
    }
}
//logout
export const logout = (req:Request, res: Response) => {
    const {token} = req.body;

    try {
        clearToken(res);
        res.status(200).json({message: "Logout successful"});

    } catch (error) {
        console.log("Error in Logging out:", error);
        return res.status(500).json({message: "Server Error in Logout"});
        
    }

    
}

//update
export const updateProfile = async (req:Request, res: Response) => {

    try {
       const {image_url} = req.body;
        const userId = req.user.id;

        if (!image_url) {
            return res.status(400).json({message: "Missing required fields"});
        }

        const uploadResponse = await cloudinary.uploader.upload(image_url);
        const updatedUser = await pool.query("UPDATE users SET image_url = $1 WHERE id = $2", 
            [uploadResponse.secure_url, userId], {new: true});
            
            res.status(200).json(updatedUser);
    } catch (error) {
        console.error("Error updating profile:", error);
        res.status(500).json({message: "Server Error in Updating Profile"});   
    }
}




