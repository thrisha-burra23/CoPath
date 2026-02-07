import { Button } from "@/components/ui/button";
import bgImage from "../assets/bgImage.png";
import logo from "../assets/logo.png";
import LandingHeader from "../components/landingPage/LandingHeader";
import { IndianRupee,  Route, Shield, Users } from "lucide-react";
import SearchCardOriginal from "../components/userDashboard/SearchCardOriginal";

const LandingPage = () => {
  return (
    <div
      className="min-h-screen bg-cover bg-center flex flex-col relative "
      style={{ backgroundImage: `url(${bgImage})` }}
    >
      <div>
        <LandingHeader />
      </div>

      <div className="flex flex-col mt-20">
        <div className="flex flex-row items-center justify-center  ">
          <img src={logo} alt="CoPath" className="w-38 h-38 mb-4" />
          <div className="flex flex-col items-center text-center mb-5">
            <h1 className="text-7xl font-bold text-white">
              <span className="bg-linear-to-r from-cyan-400 via-sky-400 to-indigo-600 bg-clip-text text-transparent">
                Co
              </span>
              Path
            </h1>
            <p className="text-lg text-white/80 mt-2">Smarter Carpooling</p>
          </div>
        </div>
        <div className="flex justify-center items-center">
          <SearchCardOriginal/>
        </div>
      </div>

      <div className="flex flex-row gap-8  items-center justify-center absolute  bottom-6 left-1/2 -translate-x-1/2">
        <div className=" flex flex-row gap-1">
          <IndianRupee className="text-white" />
          <span className="text-white">Save Money</span>
        </div>
        <div className="flex flex-row gap-1">
          <Users className="text-white"/>
          <span className="text-white">Travel together</span>
        </div>
        <div className="flex flex-row gap-1">
          <Route className="text-white"/>
          <span className="text-white"> Smart routes</span>
        </div>
        <div className="flex flex-row gap-1">
          <Shield className="text-white"/>
          <span className="text-white">Safe rides</span>
        </div>
      </div>
    </div>
  );
};

export default LandingPage;
