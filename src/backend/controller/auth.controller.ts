
import { Request, Response } from "express";



export const signup = async (req: Request, res: Response) => {
    try {
        const {id, username, firstname, lastname, gender, email, password, confirmPassword, role, created_at, updated_at, image_url} = req.body;
        if(password !== confirmPassword){

        }
    } catch (error) {
        
    }
    



}



export const login = (req:Request, res:Response): void => { 
    console.log("loginUser");
}


export const logout = (req:Request, res:Response): void => { 
    console.log("logoutUser");
}
