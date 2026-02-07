import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const DriverStats = ({ rides, requests }) => {
  const activeRides = rides.filter((r) => r.status === "ACTIVE").length;
  const completed = rides.filter((r) => r.status === "COMPLETED");
  const total = completed.reduce((s, r) => s + (r.price || 0), 0);

  return (
    <div className="grid grid-cols-3 mid:grid-cols-3 gap-3">
      <Stats title="Active Rides" value={activeRides} />
      <Stats title="Pending Requests" value={requests.length} />
      <Stats title="Earnings" value={total} />
    </div>
  );

  function Stats({ title, value }) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="text-sm text-gray-500">{title}</CardTitle>
        </CardHeader>
        <CardContent className="text-2xl font-bold">{value}</CardContent>
      </Card>
    );
  }
};

export default DriverStats;
