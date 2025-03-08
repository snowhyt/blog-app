//Home.tsx

import CardContainer from "../../components/card-container";
import NavBar from "../../components/navBar";
const Home = () => {
  return (
    


    <div className="flex flex-col items-center min-h-screen bg-amber-50">
     
     <NavBar />
      <div
        className="w-full h-[350px] flex items-center justify-center"
        id="loginBackground"
      >
        <div className="flex flex-col items-center justify-center text-center">
          <h1 className="text-4xl font-bold text-black">
            Welcome to Simple Blog App
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl">
            This is a simple blog app built with PostgreSQL, React, Tailwind
            CSS, Express and Docker.
          </p>
        </div>
      </div>

      {/* Card Section */}
      <div className="flex flex-col items-center justify-center p-8">



        <div className="bg-red-200 w-[1080px] h-auto">

        <CardContainer />


        </div>
      </div>
    </div>
  );
};

export default Home;
