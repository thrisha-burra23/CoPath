import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import DriverRideRow from "./DriverRideRow";

const DriverRides = ({ rides }) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>My Rides</CardTitle>
      </CardHeader>
      <CardContent className="space-y-3 text-sm">
        {rides.length === 0 && <p className="text-gray-500">No rides yet</p>}
        {rides.map((ride) => {
          <DriverRideRow key={ride.$id} ride={ride} />;
        })}
      </CardContent>
    </Card>
  );
};

export default DriverRides;
