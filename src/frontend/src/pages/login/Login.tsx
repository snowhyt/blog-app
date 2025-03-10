//Login.tsx
import React from "react";
import { Link } from "react-router-dom";

const Login = () => {
  return (
    <div className="flex h-screen">
      <div
        className="w-6/10 fle22x flex-col gap-4 p-8 pt-40 "
        id="loginBackground"
      >
        {/* Left Side (Login Form) - 60% width */}
        <h1 className="text-7xl font-bold text-white gap-4 text-center">
          Login to your Account
        </h1>
        <p className="text-2xl text-white text-center mt-2 mb-7">
          Please enter your credentials to access your account.
        </p>

        <form className="form-control gap-4 w-full max-w-md mx-auto">
          <div className="grid grid-cols-1">
            <label htmlFor="username" className="label block">
              <span className="label-text text-white">Email</span>
            </label>
            <input
              type="username"
              id="username"
              className="input input-bordered bg-white rounded-xl text-black  w-full"
              placeholder="Enter your email"
            />
          </div>

          <div className="grid grid-cols-1 mt-4">
            <label htmlFor="password" className="label block">
              <span className="label-text text-white ">Password</span>
            </label>
            <input
              type="password"
              id="password"
              className="input input-bordered bg-white rounded-xl text-black  w-full"
              placeholder="Enter your password"
            />
          </div>

          <div className="flex flex-col items-center mt-12 gap-2">
            <button className=" btn btn-accent rounded-xl w-full">Login</button>
            <Link to="/" className="btn btn-outline rounded-xl text-white w-full">
              Go Back
            </Link>
          </div>
        </form>
      </div>

      <div className="w-4/10 bg-white flex flex-col justify-center items-center p-8">
        {/* Right Side (New Here?) - 40% width */}
        <h1 className="text-5xl text-gray-700 font-bold">New Here?</h1>
        <p className="text-3xl text-gray-400 my-4 text-center">
          Sign Up for a free account. To see awesome things.
        </p>
        <Link to="/signup" className="text-lg px-10 py-5 btn btn-accent rounded-xl mt-12">
          Sign Up
        </Link>
      </div>
    </div>
  );
};

export default Login;
