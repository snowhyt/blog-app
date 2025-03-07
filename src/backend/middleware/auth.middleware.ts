import jwt from "jsonwebtoken";
import { Request, Response, NextFunction } from "express";
import pool from "../../db";

declare global {
    namespace Express {
        interface Request {
            user?: {
                id: number;
                username: string;
                role: string;
            };
        }
    }
}

export const protectRoute = async (req: Request, res: Response, next: NextFunction) => {
try {
    const token = req.cookies.jwt;
    if (!token){
    return res.status(401).json({ message: "Unauthorized. No token provided." });
    }
    const decoded = jwt.verify(token, process.env.JWT_SECRET!) as 
    { 
        userId: number; 
        username: string; 
        role: string 
    };
    
    if (!decoded) {
        return res.status(401).json({ message: "Invalid token." });
    }
    const userResult = await pool.query("SELECT id, username, role FROM users WHERE id = $1", [decoded.id]);

    if(userResult.rows.length === 0){
        return res.status(401).json({ message: "User not found." });
    }

    const user = userResult.rows[0];

    req.user = user;
   
    next();



} catch (error) {
    console.error("Error in auth middleware:", error);
    res.status(500).json({ message: "Internal server error" });
    
}

}
