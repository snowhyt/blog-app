import { useState } from "react";
import toast from "react-hot-toast";
import {useAuthContext} from '../context/authContext';

const useSignup = () => {

    const [loading, setLoading] = useState(false);
    const{setAuthUser} = useAuthContext();


    const signup = async ({username, first_name, last_name, gender, email, password}) => {
        const success = handleInputErrors({username, first_name, last_name, gender, email, password});
        if(!success) return;

        setLoading(true);
        try {
                //dito yung url (create a proxy to the vite config )
            const res = await fetch("/api/auth/signup",{
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    username,
                    first_name,
                    last_name,
                    gender,
                    email,
                    password,
                }),
            });

            const data = await res.json();
            if(data.error){
                throw new Error(data.error);
            } 
            localStorage.setItem("chat-user", JSON.stringify(data));
            setAuthUser(data);

        } catch (error) {
            toast.error(error.message);
        } finally{
            setLoading(false);
        }
    };


    return {loading, signup};


};




export default useSignup;

function handleInputErrors({username, first_name, last_name, gender, email, password}){
        if(!username || !first_name || !last_name || !gender || !email || !password){
            toast.error("Please fill all the fields");
            return false;
        } 
        return true;
    }

