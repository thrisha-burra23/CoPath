import { Card } from "@/components/ui/card";

const Dashboard = () => {
  const stats = [
    {
      title: "Total Users",
      value: "1,240",
      color: "from-blue-500 to-indigo-600",
    },
    {
      title: "Approved Drivers",
      value: "320",
      color: "from-green-500 to-emerald-600",
    },
    {
      title: "Active Rides",
      value: "58",
      color: "from-orange-400 to-amber-500",
    },
    {
      title: "Revenue",
      value: "₹45,000",
      color: "from-purple-500 to-pink-500",
    },
  ];

  const recentUsers = [
    { name: "Rahul Kumar", email: "rahul@gmail.com" },
    { name: "Priya Sharma", email: "priya@gmail.com" },
    { name: "Arjun Reddy", email: "arjun@gmail.com" },
  ];

  const recentRides = [
    { from: "Hyderabad", to: "Bangalore", driver: "Rahul" },
    { from: "Chennai", to: "Hyderabad", driver: "Arjun" },
  ];

  return (
    <div className="p-6 space-y-8 bg-gray-50 min-h-screen">

      {/* Header */}
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-800">
          Admin Dashboard
        </h1>

        <span className="text-sm text-gray-500">
          Welcome back, Admin 👋
        </span>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <div
            key={index}
            className={`p-6 rounded-2xl text-white shadow-lg bg-gradient-to-r ${stat.color} transform hover:scale-105 transition duration-300`}
          >
            <h2 className="text-sm opacity-80">{stat.title}</h2>
            <p className="text-3xl font-bold mt-2">{stat.value}</p>
          </div>
        ))}
      </div>

      {/* Grid Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

        {/* Recent Users */}
        <Card className="p-6 shadow-md rounded-2xl border">
          <h2 className="text-lg font-semibold text-gray-800 mb-4">
            Recent Users
          </h2>

          <div className="space-y-3">
            {recentUsers.map((user, index) => (
              <div
                key={index}
                className="flex justify-between items-center p-3 rounded-lg hover:bg-gray-100 transition"
              >
                <span className="font-medium text-gray-700">
                  {user.name}
                </span>

                <span className="text-sm text-gray-500">
                  {user.email}
                </span>
              </div>
            ))}
          </div>
        </Card>

        {/* Recent Rides */}
        <Card className="p-6 shadow-md rounded-2xl border">
          <h2 className="text-lg font-semibold text-gray-800 mb-4">
            Recent Rides
          </h2>

          <div className="space-y-3">
            {recentRides.map((ride, index) => (
              <div
                key={index}
                className="flex justify-between items-center p-3 rounded-lg hover:bg-gray-100 transition"
              >
                <span className="font-medium text-gray-700">
                  {ride.from} → {ride.to}
                </span>

                <span className="text-sm text-gray-500">
                  Driver: {ride.driver}
                </span>
              </div>
            ))}
          </div>
        </Card>

      </div>
    </div>
  );
};

export default Dashboard;