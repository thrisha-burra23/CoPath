import { useLocation, useNavigate, useOutletContext } from "react-router-dom";
import logo from "../../assets/logo.png";
import { Home, UserRound } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useProfile } from "@/src/reactQuery/profileHooks";

const Header = ({ user, onProfileClick }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const { data: profile } = useProfile(user?.$id);
  const isDriverArea = location.pathname.includes("offer-ride");
  const isDriverApproved = profile?.driverApproved;

  const renderButton = () => {
    if (isDriverArea) {
      return (
        <>
          <Button onClick={() => navigate("/user-dashboard")} variant="outline">
            Find a Ride
          </Button>
        </>
      );
    }
    if (!isDriverApproved) {
      return (
        <>
          <Button
            variant="outline"
            onClick={() => navigate("/request-to-offer-ride")}
          >
            Offer a Ride
          </Button>
        </>
      );
    }
    return (
      <>
        <Button variant="outline" onClick={() => navigate("/offer-ride")}>
          Offer a Ride
        </Button>
      </>
    );
  };

  return (
    <header className=" flex justify-between items-center px-8 py-6 bg-blue-50">
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
      <div className="font-serif text-2xl">Welcome {user.name}</div>
      <div className="flex flex-row gap-6 justify-center items-center">
        <Button onClick={() => navigate("/user-dashboard")}>
          <Home />
        </Button>
        {renderButton()}
        <Button variant="outline" onClick={() => navigate("/my-bookings")}>
          My Bookings
        </Button>
        <Button onClick={onProfileClick} className="cursor-pointer">
          <UserRound />
        </Button>
      </div>
    </header>
  );
};

export default Header;
