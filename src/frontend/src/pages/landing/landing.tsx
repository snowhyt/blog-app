//Landing.tsx
import { Link } from "react-router-dom";
import NavBar from "../../components/navBar";

const Landing = () => {
  return (
    <div className="flex flex-col items-center h-screen">
      {/* Navigation Bar */}
      <nav className="w-full">
        <NavBar />
      </nav>

      {/* Hero Section */}
      <section className="flex flex-col items-center justify-center flex-1 gap-8 px-4 text-center">
        <h1 className="text-6xl font-bold text-gray-800">
          Welcome to Simple Blog App
        </h1>
        <p className="text-xl text-gray-600 max-w-2xl">
          Discover, share, and connect with the world through our simple and
          intuitive blogging platform. Built with PostgreSQL, React, Tailwind
          CSS, and DaisyUI.
        </p>
        <div className="flex gap-6">
          <Link to="/login" className="btn btn-primary">
            Login
          </Link>
          <Link to="/signup" className="btn btn-secondary">
            Sign Up
          </Link>
        </div>
      </section>
    </div>
  );
};

export default Landing;
