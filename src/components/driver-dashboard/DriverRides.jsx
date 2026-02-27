import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import DriverRideRow from "./DriverRideRow";

const DriverRides = ({ rides }) => {
  console.log("DriverRides.jsx", rides);
  return (
    <Card className="bg-white/80 backdrop-blur-xl border border-gray-200 shadow-xl rounded-2xl">
      <CardHeader className="pb-3 border-b border-gray-100">
        <CardTitle className="text-lg font-semibold text-gray-800 flex items-center justify-between">
          My Rides
          <span className="text-sm font-normal text-gray-500">
            {rides.length}
          </span>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4 text-sm max-h-[350px] overflow-y-auto pr-2">
        {rides.length === 0 && (
          <p className="text-gray-400 text-center py-8">
            No rides posted yet 🚗
          </p>
        )}
        {rides.map((ride) => (
          <DriverRideRow key={ride.$id} ride={ride} />
        ))}
      </CardContent>
    </Card>
  );
};

export default DriverRides;
