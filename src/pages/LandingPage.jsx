import { Button } from "@/components/ui/button";
import bgImage from "../assets/bgImage.png";
import logo from "../assets/logo.png"
import { Link } from "react-router-dom";
import LandingHeader from "../components/LandingHeader";

const LandingPage = () => {
  return (
    <div
      className="min-h-screen bg-cover bg-center"
      style={{ backgroundImage: `url(${bgImage})` }}
    >
      <LandingHeader />

      <div className="flex flex-col items-center text-center mb-10">
        <img src={logo} alt="CoPath" className="w-24 h-24 mb-4" />
        <h1 className="text-4xl font-bold">CoPath</h1>
        <p className="text-lg text-white/80 mt-2">Smarter Carpooling</p>
      </div>
    </div>
  );
};

export default LandingPage;
