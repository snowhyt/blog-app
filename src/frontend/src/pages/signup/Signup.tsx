//Signup.tsx
import React, { useState } from "react";
import { Link } from "react-router-dom";
import GenderCheckBox from "./GenderCheckBox";
import useSignup from "../../hooks/useSignup";

const Signup = () => {
  const { loading, signup } = useSignup();

  const [inputs, setInputs] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
    firstName: "",
    lastName: "",
    gender: "",
  });

  const handleCheckBoxChange = (gender) => {
    setInputs({ ...inputs, gender });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await signup(inputs);
  };

  return (
    <div
      className="flex flex-col items-center justify-center min-h-screen"
      id="loginBackground"
    >
      <div className="bg-amber-50 rounded-3xl w-[800px] flex flex-col items-center p-8 text-black">
        <div className="text-center">
          <h1 className="text-5xl font-bold pt-5">Sign Up</h1>
          <p className="text-xl mt-4">
            Please enter your details to create an account.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="form-control w-full max-w-md">
          {/* Username */}
          <div className="flex flex-col mt-4">
            <label htmlFor="username" className="label block text-left">
              <span className="label-text text-black">Username</span>
            </label>
            <label className="input validator w-full bg-white rounded-xl border border-gray-600 ">
              <svg
                className="h-[1em] opacity-50"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
              >
                <g
                  strokeLinejoin="round"
                  strokeLinecap="round"
                  strokeWidth="2.5"
                  fill="none"
                  stroke="currentColor"
                >
                  <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"></path>
                  <circle cx="12" cy="7" r="4"></circle>
                </g>
              </svg>
              <input
                type="input"
                id="username"
                className="input input-bordered text-black bg-white w-full rounded-xl"
                placeholder="Username"
                pattern="[A-Za-z][A-Za-z0-9\-]*"
                minLength="3"
                maxLength="30"
                title="Only letters, numbers or dash"
                required
                value={inputs.username}
                onChange={(e) =>
                  setInputs({ ...inputs, username: e.target.value })
                }
              />
            </label>
            <p className="validator-hint hidden">
              Must be 3 to 30 characters
              <br />
              containing only letters, numbers or dash
            </p>
          </div>

          {/* Email */}
          <div className="flex flex-col mt-4">
            <label htmlFor="email" className="label block text-left">
              <span className="label-text text-black">Email</span>
            </label>
            <label className="input validator bg-white  border-gray-600 rounded-xl w-full">
              <svg
                className="h-[1em] opacity-50"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
              >
                <g
                  strokeLinejoin="round"
                  strokeLinecap="round"
                  strokeWidth="2.5"
                  fill="none"
                  stroke="currentColor"
                >
                  <rect width="20" height="16" x="2" y="4" rx="2"></rect>
                  <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"></path>
                </g>
              </svg>
              <input
                type="email"
                id="email"
                className="input input-bordered text-black bg-white rounded-xl  w-full"
                placeholder="mail@site.com"
                required
                value={inputs.email}
                onChange={(e) =>
                  setInputs({ ...inputs, email: e.target.value })
                }
              />
            </label>
            <div className="validator-hint hidden">
              Enter valid email address
            </div>
          </div>

          {/* Password */}
          <div className="flex flex-col mt-4">
            <label htmlFor="password" className="label block text-left">
              <span className="label-text text-black">Password</span>
            </label>
            <label className="input validator bg-white  border-gray-600 rounded-xl  w-full">
              <svg
                className="h-[1em] opacity-50"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
              >
                <g
                  strokeLinejoin="round"
                  strokeLinecap="round"
                  strokeWidth="2.5"
                  fill="none"
                  stroke="currentColor"
                >
                  <path d="M2.586 17.414A2 2 0 0 0 2 18.828V21a1 1 0 0 0 1 1h3a1 1 0 0 0 1-1v-1a1 1 0 0 1 1-1h1a1 1 0 0 0 1-1v-1a1 1 0 0 1 1-1h.172a2 2 0 0 0 1.414-.586l.814-.814a6.5 6.5 0 1 0-4-4z"></path>
                  <circle
                    cx="16.5"
                    cy="7.5"
                    r=".5"
                    fill="currentColor"
                  ></circle>
                </g>
              </svg>
              <input
                type="password"
                id="password"
                className="input input-bordered text-black bg-white rounded-xl w-full"
                placeholder="Password"
                required
                minLength="8"
                pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}"
                title="Must be more than 8 characters, including number, lowercase letter, uppercase letter"
                value={inputs.password}
                onChange={(e) =>
                  setInputs({ ...inputs, password: e.target.value })
                }
              />
            </label>
            <p className="validator-hint hidden">
              Must be more than 8 characters, including
              <br />
              At least one number
              <br />
              At least one lowercase letter
              <br />
              At least one uppercase letter
            </p>
          </div>
          {/* confirmPassword */}
          <div className="flex flex-col mt-4">
            <label htmlFor="confirmPassword" className="label block text-left">
              <span className="label-text text-black">confirmPassword</span>
            </label>
            <label className="input validator bg-white  border-gray-600 rounded-xl  w-full">
              <input
                type="password"
                id="confirmPassword"
                className="input input-bordered text-black bg-white rounded-xl w-full"
                placeholder="Confirm your Password"
                required
                minLength="8"
                pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}"
                title="Must be more than 8 characters, including number, lowercase letter, uppercase letter"
                value={inputs.confirmPassword}
                onChange={(e) =>
                  setInputs({ ...inputs, confirmPassword: e.target.value })
                }
              />
            </label>
          </div>

          {/* First Name */}
          <div className="flex flex-col mt-4">
            <label htmlFor="firstName" className="label block text-left">
              <span className="label-text text-black">First Name</span>
            </label>
            <input
              type="text"
              id="firstName"
              className="input input-bordered text-black bg-white  border-gray-600 rounded-xl  w-full"
              placeholder="Enter your first name"
              value={inputs.firstName}
              onChange={(e) =>
                setInputs({ ...inputs, firstName: e.target.value })
              }
            />
          </div>

          {/* Last Name */}
          <div className="flex flex-col mt-4">
            <label htmlFor="lastName" className="label block text-left">
              <span className="label-text text-black">Last Name</span>
            </label>
            <input
              type="text"
              id="lastName"
              className="input input-bordered text-black bg-white  border-gray-600 rounded-xl  w-full"
              placeholder="Enter your last name"
              value={inputs.lastName}
              onChange={(e) =>
                setInputs({ ...inputs, lastName: e.target.value })
              }
            />
          </div>

          <div className="flex flex-col mt-4">
            <label htmlFor="gender" className="label block text-left mb-1">
              <span className="label-text text-black">Gender</span>
            </label>
            <GenderCheckBox
              onCheckboxChange={handleCheckBoxChange}
              selectedGender={inputs.gender}
            />
          </div>

          <div className="flex flex-col mt-4 pb-5">
            <button className="btn btn-accent mt-4 rounded-xl" disabled={loading}>
              {loading ? "Signing up..." : "Sign Up"}
            </button>
            <Link to="/" className="btn btn-outline mt-4 rounded-xl">
              Go Back
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Signup;
