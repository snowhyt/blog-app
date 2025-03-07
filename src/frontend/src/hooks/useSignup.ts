import { useState } from "react";
import toast from "react-hot-toast";





const useSignup = () => {
    const[loading, setLoading] = useState(false);



    const signup = async({username, email, password, firstName, lastName, gender}) => {
        const success = handleInputErrors({username, email, password, firstName, lastName, gender});
        if (!success) return;
    }


    }

    export default useSignup;



    function handleInputErrors({username, email, password, firstName, lastName, gender}) {
        if (!username || !email || !password || !firstName || !lastName || !gender) {
            return false;
            toast.error("Please fill in all the fields");

        }
        if(password !== confirmPassword){
            toast.error("Passwords do not match");
            return false;
        }
        return true;
    
    }


    



    