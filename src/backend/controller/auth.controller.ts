import e, { Request, Response } from "express";
import pool from "../../db";
import crypto from "crypto";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
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

            if(password != password){
                return res.status(400).json({message: "Password do not match. Please try again."});
            }
            //MD5 Hashing
            const hashedPassword = crypto.createHash('md5').update(password).digest('hex');
            //check for existing user
            const existingUser = await pool.query("SELECT * FROM users WHERE username = $1 OR email = $2", [username, email]);
            if (existingUser.rows.length > 0) {
                return res.status(409).json({message: "User already exists"});
            }
            
            //into insert user
            const insertQuery = `INSERT INTO users (username, first_name, last_name, gender, email, password, role, image_url) 
                VALUES ($1, $2, $3, $4, $5, $6, $7, $8) RETURNING *`;
            
            const result = await pool.query(insertQuery, [username, firstname, lastname, gender, email, password, role, image_url]);

            res.status(201).json({message: "User created successfully", user: result.rows[0]});
            
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
        const token = jwt.sign({  userId: userData.id, username: userData.username,  role: userData.role }, process.env.JWT_SECRET! || "secret",{expiresIn: "1h"});

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

export const logout = async (req:Request, res: Response) => {
    const {token} = req.body;

    try {
        //verify token
        const decoded = jwt.verify(token, process.env.JWT_SECRET || "secret");
        if(!decoded){
            return res.status(401).json({message: "Invalid token"});
        }

        //delete token
        const deleteToken = await pool.query("DELETE FROM sessions WHERE token = $1", [token]);
        if(deleteToken.rowCount === 0){
            return res.status(401).json({message: "Invalid token"});
        }
        res.status(200).json({message: "Logout successful"});
    } catch (error) {
        console.log("Database query failed:", error);
        return res.status(500).json({message: "Server Error in Logout"});
        
    }

    
}





