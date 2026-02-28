import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import AvailableRidesSkeleton from "@/src/loadingSkeleton/AvailableRidesSkeleton";
import { useAvailableRides } from "@/src/reactQuery/rideHooks";
import { useNavigate } from "react-router-dom";

const AvailableRides = () => {
  const { data = [], isLoading, error } = useAvailableRides();
  const navigate = useNavigate();

  const now = Date.now();

  const upCommingRides = data.filter((ride) => {
    if (!ride) return null;
    return new Date(ride.time) > now;
  });

  const shortLocation = (label) => {
    if (!label) return "";
    return label.split(",")[0];
  };

  if (isLoading) return <AvailableRidesSkeleton />;

  if (error)
    return (
      <div className="flex flex-col items-center justify-center py-20 text-center">
        <div className="bg-red-50 border border-red-200 rounded-2xl p-10 shadow-md max-w-md">
          <h2 className="text-2xl font-bold text-red-600 mb-4">
            Something went wrong
          </h2>
          <p className="text-slate-600 mb-6">
            We couldn’t load available rides at the moment. Please try again
            later.
          </p>
          <Button
            onClick={() => window.location.reload()}
            className="bg-[linear-gradient(135deg,#22D3EE,#38BDF8,#2563EB)] text-white"
          >
            Retry
          </Button>
        </div>
      </div>
    );

  if (!data || data.length === 0)
    return (
      <div className="flex flex-col items-center justify-center py-24 text-center">
        <div className="bg-white/80 backdrop-blur-md border border border-gray-200 rounded-2xl p-12 shadow-md max-w-lg">
          <h2 className="text-2xl font-bold text-blue-900 mb-4">
            No Rides Available
          </h2>
          <p className="text-slate-600 mb-6 pl-7 pr-7">
            There are no upcoming rides for you...
            <br />
            Try searching after some time.
          </p>
          <Button
            onClick={() => navigate("/user-dashboard")}
            className="bg-[linear-gradient(135deg,#22D3EE,#38BDF8,#2563EB)] text-white"
          >
            Search Again
          </Button>
        </div>
      </div>
    );

  return (
    <div className="max-w-7xl mx-auto px-6 md:px-10 py-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
      {upCommingRides.map((ride) => {
        const rideDate = new Date(ride.time);

        if (isNaN(rideDate.getTime())) return null;
        console.log(rideDate);
        return (
          <Card
            key={ride.$id}
            className="h-full bg-white/90 backdrop-blur-xl border border-gray-200 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300"
          >
            <CardHeader className="pb-3 text-center">
             <h3 className="text-lg font-semibold text-gray-800 flex items-center justify-center">
                {" "}
                <span className="text-slate-800">
                  {shortLocation(ride.startLabel)}
                </span>
                <span className="mx-2 text-cyan-500 font-bold text-lg">→</span>
                <span className="text-slate-800">
                  {shortLocation(ride.endLabel)}
                </span>
              </h3>
            </CardHeader>
            <CardContent className="space-y-2 text-sm text-slate-700 pt-1 flex justify-center">
              <div className="w-full space-y-3">
                <div className="grid grid-cols-[100px_1fr] items-center py-1">
                  <span className="text-gray-500 text-sm">Date</span>
                  <span className="font-medium text-base">
                    {rideDate.toLocaleDateString()}
                  </span>
                </div>

                <div className="grid grid-cols-[100px_1fr] items-center py-1">
                   <span className="text-gray-500 text-sm">Time</span>
                  <span className="font-medium text-base">
                    {rideDate.toLocaleTimeString()}
                  </span>
                </div>

                <div className="grid grid-cols-[100px_1fr] items-center py-1">
                   <span className="text-gray-500 text-sm">Seats</span>
                  <span className="font-medium text-base">
                    {ride.availableSeats}
                  </span>
                </div>

                <div className="grid grid-cols-[100px_1fr] items-center py-1">
                  <span className="font-medium text-base">Price</span>
                  <span className="font-semibold text-emerald-600 text-base">
                    ₹{ride.price}
                  </span>
                </div>
                <Button
               className="mt-4 w-full h-11 rounded-xl bg-gradient-to-r from-cyan-400 via-sky-500 to-indigo-600 text-white font-medium shadow-lg hover:opacity-90 transition-all duration-300"
                  onClick={() => navigate(`/user-dashboard/rides/${ride.$id}`)}
                >
                  View Ride
                </Button>
              </div>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
};

export default AvailableRides;
