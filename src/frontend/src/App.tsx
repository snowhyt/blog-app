import React from 'react';
import { Navigate, Route, Routes } from "react-router-dom";
//import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './pages/login/Login';
import Home from './pages/home/Home';
import Landing from './pages/landing/landing';
import Signup from './pages/signup/Signup';
import {useAuthContext} from "./context/authContext";
import { Toaster } from 'react-hot-toast';
function App() {
  
  
  const {authUser} = useAuthContext();
  
  return (
    <div className='h-screen '>
    <div className='p-4 h-screen flex items-center justify-center'>
  
     <Routes>
          
          <Route path="/" element={authUser ? <Home/> : <Navigate to={"/login"}/>} />
          <Route path="/login" element={authUser ? <Navigate to="/" /> : <Login/>} />
          <Route path="/signup" element={authUser ? <Navigate to="/"/> : <Signup/>} />
    
         
        </Routes>
        <Toaster/>
        
   
    </div>
    </div>
  );
}

export default App;