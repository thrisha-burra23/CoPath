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
    <header className="sticky top-0 z-50 flex justify-between items-center px-8 py-4 bg-white/80 backdrop-blur-xl border-b border-gray-200 shadow-sm">
      <div className="flex items-center gap-3">
        <img src={logo} alt="CoPath" className="w-12 h-12 mb-2" />
        <div className="flex flex-col leading-tight">
          <h1 className="text-3xl font-bold text-black">
            <span className="bg-linear-to-r from-cyan-400 via-sky-400 to-indigo-600 bg-clip-text text-transparent">
              Co
            </span>
            Path
          </h1>
          <p className="text-xs text-gray-500">Smarter Carpooling</p>
        </div>
      </div>
      <div className="text-lg font-medium text-gray-700">
        Welcome {user.name}
      </div>
      <div className="flex items-center gap-4">
        <Button
          size="icon"
          variant="outline"
          className="rounded-full border-gray-300 hover:bg-gray-100 transition"
          onClick={() => navigate("/user-dashboard")}
        >
          <Home className="w-4 h-4" />
        </Button>
        {renderButton()}
        <Button variant="outline" onClick={() => navigate("/my-bookings")}>
          My Bookings
        </Button>
        <Button
          size="icon"
          className="rounded-full bg-gradient-to-r from-cyan-400 to-indigo-500 text-white hover:opacity-90 transition"
          onClick={onProfileClick}
        >
          <UserRound className="w-4 h-4" />
        </Button>
      </div>
    </header>
  );
};

export default Header;
