import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './pages/login/Login';
import Home from './pages/home/Home';
import Signup from './pages/signup/Signup';
import Landing from './pages/landing/landing';
import { Toaster } from 'react-hot-toast';
function App() {
  return (
    <div className='h-screen '>
    <Router>

     <Routes>
          
          <Route path="/login" element={<Login />} /> {/* Route for the Login page */}
          <Route path="/signup" element={<Signup />} /> {/* Route for the Signup page */}
          <Route path="/home" element={<Home />} /> {/* Route for the Home page */}
          <Route path="/" element={<Landing />} /> {/* Route for the Landing page */}
          <Toaster/>
        </Routes>
 
    </Router>
   
    </div>
  );
}

export default App;
