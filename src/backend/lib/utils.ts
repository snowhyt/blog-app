import jwt from "jsonwebtoken";
import { Response } from "express";
import dotenv from "dotenv";
dotenv.config();


//JWT_SECRET is defined here
// Define a type for userData to improve type safety
interface UserData {
  id: number;
  username: string;
  role: string;
}

export const generateToken = (userData: UserData, res: Response) => {
  // Check if JWT_SECRET is defined
  if (!process.env.JWT_SECRET) {
    console.error("JWT_SECRET is not defined in environment variables.");
    return; // Or throw an error if you prefer
  }

  const token = jwt.sign(
    { userId: userData.id, username: userData.username, role: userData.role },
    process.env.JWT_SECRET, // Now we know it exists
    { expiresIn: "1h" }
  );

  res.cookie("jwt", token, {
    maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days in milliseconds
    httpOnly: true,
    sameSite: "strict",
    secure: process.env.NODE_ENV !== "development", // Secure only in production
  });

  return token
};

export const clearToken = (res: Response) => {
    res.clearCookie("jwt", {
      httpOnly: true,
      sameSite: "strict",
      secure: process.env.NODE_ENV !== "development",
    });
  };
