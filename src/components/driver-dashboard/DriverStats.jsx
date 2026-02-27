import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const DriverStats = ({ rides, requests }) => {
  const activeRides = rides.filter((r) => r.status === "ACTIVE").length;
  const completed = rides.filter((r) => r.status === "COMPLETED");
  const total = completed.reduce((s, r) => s + (r.price || 0), 0);

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      <Stats title="Active Rides" value={activeRides} />
      <Stats title="Pending Requests" value={requests.length} />
      <Stats title="Earnings" value={total} />
    </div>
  );

  function Stats({ title, value }) {
    return (
      <Card className="bg-white/80 backdrop-blur-xl border border-gray-200 shadow-lg rounded-2xl hover:shadow-xl transition-all duration-300">
        <CardHeader className="pb-2">
          <CardTitle className="text-xs uppercase tracking-wide text-gray-500 font-medium">{title}</CardTitle>
        </CardHeader>
        <CardContent className="text-3xl font-bold text-gray-800">{value}</CardContent>
      </Card>
    );
  }
};

export default DriverStats;
