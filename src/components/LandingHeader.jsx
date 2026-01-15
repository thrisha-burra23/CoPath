import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const LandingHeader = () => {
  return (
    <header className=" flex justify-between items-center px-8 ">
      <h2 className=" text-lg font-semibold">CoPath</h2>
      <div className=" flex gap-4">
        <Button variant="ghost">
          <Link  to={"/login"}>Login</Link>
        </Button>
        <Button variant="ghost">
          <Link to={"/register"}>Register</Link>
        </Button>
      </div>
    </header>
  );
};

export default LandingHeader;
