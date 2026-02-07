import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const LandingHeader = () => {
  return (
    <header className=" flex justify-between items-center px-8 ">
      <h2 className=" text-lg font-semibold text-white">CoPath</h2>
      <div className=" flex gap-4">
        <Button  className="text-white">
          <Link  to={"/login"}>Login</Link>
        </Button>
        <Button className="text-white">
          <Link to={"/register"}>Register</Link>
        </Button>
      </div>
    </header>
  );
};

export default LandingHeader;
