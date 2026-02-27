import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const LandingHeader = () => {
  return (
    <header className=" flex justify-between items-center px-8 fixed top-0 left-0 w-full z-50 bg-[#0e2a66]/80 backdrop-blur-md border-b border-white/10">
      <h2 className=" text-lg font-semibold text-white">CoPath</h2>
      <nav className="flex items-center gap-8 text-white">
  <a href="#how" className="hover:text-cyan-400 transition">
    How it Works
  </a>

  <a href="#why" className="hover:text-cyan-400 transition">
    Why CoPath
  </a>

  <a href="#driver" className="hover:text-cyan-400 transition">
    For Drivers
  </a>
</nav>
      <div className=" flex gap-4">
        <Button className="text-white">
          <Link to={"/login"}>Login</Link>
        </Button>
        <Button className="text-white">
          <Link to={"/register"}>Register</Link>
        </Button>
      </div>
    </header>
  );
};

export default LandingHeader;
