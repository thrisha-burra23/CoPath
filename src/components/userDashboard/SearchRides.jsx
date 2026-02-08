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

  if (error) return <p> Failed to load......</p>;

  if (!data || data.length === 0) return <p> No available rides found...</p>;

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {upCommingRides.map((ride) => {
        const rideDate = new Date(ride.time);

        if (isNaN(rideDate.getTime())) return null;
        console.log(rideDate);
        return (
          <Card key={ride.$id} className="h-full">
            <CardHeader>
              <h3 className="font-semibold">
                {" "}
                {shortLocation(ride.startLabel)} →{" "}
                {shortLocation(ride.endLabel)}
              </h3>
            </CardHeader>
            <CardContent className="space-y-1">
              <p>Date: {rideDate.toLocaleDateString()}</p>
              <p>Time: {rideDate.toLocaleTimeString()}</p>
              <p>Seats available: {ride.availableSeats}</p>
              <p>Price: ₹{ride.price}</p>
              <Button
                className="mt-2"
                onClick={() => navigate(`/user-dashboard/rides/${ride.$id}`)}
              >
                View Ride
              </Button>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
};

export default SearchRides;
