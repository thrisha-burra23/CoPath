import { Button } from "@/components/ui/button";
import logo from "../../assets/logo.png";
import { UserRound } from "lucide-react";
import { useLogout } from "@/src/reactQuery/authHooks";
import { useNavigate } from "react-router-dom";

const DriverHeader = () => {
    const logoutMutation = useLogout();
  const navigate = useNavigate();

  const handleLogout = () => {
    console.log("logout clicked");
    logoutMutation.mutate();
  };
  return (
     <header className="bg-white border-b px-8 py-4 flex justify-between items-center">
        <div className="flex flex-row items-center justify-center  ">
        <img src={logo} alt="CoPath" className="w-12 h-12 mb-2" />
        <div className="flex flex-col items-center text-center mb-2">
          <h1 className="text-3xl font-bold text-black">
            <span className="bg-linear-to-r from-cyan-400 via-sky-400 to-indigo-600 bg-clip-text text-transparent">
              Co
            </span>
            Path
          </h1>
          <p className="text-lg text-black/80 ">Smarter Carpooling</p>
        </div>
      </div>
      <div className="flex flex-row gap-6 justify-center items-center">
        <Button variant="ghost" onClick={() => navigate("/user-dashboard")}>
          Find Ride
        </Button>        
        <UserRound />
        <Button variant="outline" onClick={handleLogout}>
          Logout{" "}
        </Button>
      </div>
     </header>
  )
}

export default DriverHeader