import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import AvailableRidesSkeleton from "@/src/loadingSkeleton/AvailableRidesSkeleton";
import { useSearchRides } from "@/src/reactQuery/rideHooks";
import { useNavigate, useSearchParams } from "react-router-dom";

const SearchRides = () => {
  const [params] = useSearchParams();
  const navigate = useNavigate();

  const start = params.get("start");
  const end = params.get("end");
  const date = params.get("date");

  const { data = [], isLoading, error } = useSearchRides({ start, end, date });

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
        <div className="bg-white/80 backdrop-blur-md border border-blue-100 rounded-2xl p-12 shadow-md max-w-lg">
          <h2 className="text-2xl font-bold text-blue-900 mb-4">
            No Rides Available
          </h2>
          <p className="text-slate-600 mb-6">
            There are no upcoming rides for your selected route. Try searching a
            different date or location.
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
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {upCommingRides.map((ride) => {
        const rideDate = new Date(ride.time);

        if (isNaN(rideDate.getTime())) return null;
        console.log(rideDate);
        return (
          <Card
            key={ride.$id}
            className="h-full bg-white/90 backdrop-blur-md border border-blue-100 rounded-2xl shadow-md hover:shadow-xl transition duration-300"
          >
            <CardHeader className="pb-3 text-center">
              <h3 className="text-xl font-bold text-blue-900 tracking-wide flex items-center justify-center">
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
              <div className="w-65 space-y-2">
                <div className="grid grid-cols-[100px_1fr] items-center py-1">
                  <span className="text-slate-500 text-xl">Date</span>
                  <span className="font-medium text-xl">
                    {rideDate.toLocaleDateString()}
                  </span>
                </div>

                <div className="grid grid-cols-[100px_1fr] items-center py-1">
                  <span className="text-slate-500 text-xl">Time</span>
                  <span className="font-medium text-xl">
                    {rideDate.toLocaleTimeString()}
                  </span>
                </div>

                <div className="grid grid-cols-[100px_1fr] items-center py-1">
                  <span className="text-slate-500 text-xl">Seats</span>
                  <span className="font-medium text-xl">
                    {ride.availableSeats}
                  </span>
                </div>

                <div className="grid grid-cols-[100px_1fr] items-center py-1">
                  <span className="text-slate-500 text-xl">Price</span>
                  <span className="font-semibold text-emerald-600 text-xl">
                    ₹{ride.price}
                  </span>
                </div>
                <Button
                  className="mt-3 w-full bg-[linear-gradient(135deg,#22D3EE,#38BDF8,#2563EB)] text-white hover:scale-[1.02] transition-transform shadow-md"
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

export default SearchRides;
