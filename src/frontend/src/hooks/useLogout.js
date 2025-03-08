import { useState } from "react";
import toast from "react-hot-toast";
import {useAuthContext} from '../context/authContext';


const useLogout = () =>{
    const [loading, setLoading] = useState(false);
    const{setAuthUser} = useAuthContext();//useAuthContext is a hook from the context/authContext.tsx file

    const logout = async () =>{
        setLoading(true);//setLoading is a state variable that is used to show the loading spinner
        try {
            const res = await fetch("/api/auth/logout", {//fetch is a function that is used to make a request to the server
                method: "POST", //method is the type of request, in this case it is a POST request
                headers: { //headers is an object that contains the headers of the request
                    "Content-Type": "application/json", //Content-Type is the header that specifies the type of data being sent in the request          

                    },
                });
                const data = await res.json();
                if(data.error){
                    throw new Error(data.error);
                } 
                localStorage.removeItem("chat-user");
                setAuthUser(null);

            } catch (error) {
                toast.error(error.message);
            } finally{
                setLoading(false);
            }
            };  

            return {loading, logout};
            };
            export default useLogout;