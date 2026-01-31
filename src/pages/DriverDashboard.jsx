import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";

export default function DriverDashboard() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* ================= Header ================= */}
      <header className="bg-white border-b px-8 py-4 flex items-center justify-between">
        <h1 className="text-xl font-semibold text-gray-800">CoPath 🚗</h1>

        <nav className="flex items-center gap-6 text-sm text-gray-600">
          <span className="font-medium text-gray-900">Dashboard</span>
          <span>My Rides</span>
          <span>Earnings</span>
          <span>Reviews</span>
        </nav>

        <div className="flex items-center gap-3">
          <Badge variant="secondary">Driver Mode</Badge>
          <span className="text-sm font-medium">Rahul</span>
        </div>
      </header>

      {/* ================= Main ================= */}
      <main className="p-8 space-y-8">
        {/* Welcome */}
        <div>
          <h2 className="text-2xl font-semibold text-gray-800">
            Good Morning, Rahul 👋
          </h2>
          <p className="text-gray-500">
            Manage your rides, passengers, and earnings.
          </p>
        </div>

        {/* ================= Stats ================= */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card>
            <CardHeader>
              <CardTitle className="text-sm text-gray-500">
                🚗 Active Rides
              </CardTitle>
            </CardHeader>
            <CardContent className="text-2xl font-bold">2</CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-sm text-gray-500">
                👥 Passengers Today
              </CardTitle>
            </CardHeader>
            <CardContent className="text-2xl font-bold">5</CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-sm text-gray-500">
                💰 Earnings Today
              </CardTitle>
            </CardHeader>
            <CardContent className="text-2xl font-bold">₹1,250</CardContent>
          </Card>
        </div>

        {/* ================= Offer Ride ================= */}
        <Card>
          <CardHeader>
            <CardTitle>➕ Offer a New Ride</CardTitle>
          </CardHeader>
          <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Input placeholder="From (e.g. Bangalore)" />
            <Input placeholder="To (e.g. Chennai)" />
            <Input type="date" />
            <Input type="time" />
            <Input placeholder="Seats Available" />
            <Input placeholder="Price per Seat (₹)" />

            <div className="md:col-span-2">
              <Button className="w-full">Publish Ride</Button>
            </div>
          </CardContent>
        </Card>

        {/* ================= My Rides ================= */}
        <Card>
          <CardHeader>
            <CardTitle>📋 My Rides</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3 text-sm">
            <RideRow
              route="Bangalore → Chennai"
              date="20 Feb"
              seats="3"
              price="₹450"
              status="Active"
            />
            <RideRow
              route="Bangalore → Mysore"
              date="22 Feb"
              seats="2"
              price="₹300"
              status="Upcoming"
            />
            <RideRow
              route="Chennai → Bangalore"
              date="10 Feb"
              seats="4"
              price="₹500"
              status="Completed"
            />
          </CardContent>
        </Card>

        {/* ================= Passenger Requests ================= */}
        <Card>
          <CardHeader>
            <CardTitle>👥 Passenger Requests</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3 text-sm">
            <PassengerRow name="Ankit Sharma" rating="4.5" seats="1" />
            <PassengerRow name="Priya Verma" rating="4.8" seats="2" />
          </CardContent>
        </Card>

        {/* ================= Earnings ================= */}
        <Card>
          <CardHeader>
            <CardTitle>💰 Earnings</CardTitle>
          </CardHeader>
          <CardContent className="text-sm space-y-2">
            <p>This Week: <strong>₹3,450</strong></p>
            <p>This Month: <strong>₹12,200</strong></p>
            <p className="text-gray-500">Last payout: ₹2,000 (12 Feb 2026)</p>
          </CardContent>
        </Card>

        {/* ================= Footer Actions ================= */}
        <div className="flex justify-between">
          <Button variant="outline">Switch to User Mode</Button>
          <Button variant="destructive">Logout</Button>
        </div>
      </main>
    </div>
  );
}

/* ================= Helper Components ================= */

function RideRow({ route, date, seats, price, status }) {
  const statusColor =
    status === "Active"
      ? "bg-green-100 text-green-700"
      : status === "Upcoming"
      ? "bg-blue-100 text-blue-700"
      : "bg-gray-100 text-gray-600";

  return (
    <div className="flex items-center justify-between border rounded-lg p-3">
      <div>
        <p className="font-medium">{route}</p>
        <p className="text-gray-500 text-xs">{date} • {seats} seats • {price}</p>
      </div>
      <Badge className={statusColor}>{status}</Badge>
    </div>
  );
}

function PassengerRow({ name, rating, seats }) {
  return (
    <div className="flex items-center justify-between border rounded-lg p-3">
      <div>
        <p className="font-medium">{name}</p>
        <p className="text-xs text-gray-500">
          ⭐ {rating} • {seats} seat(s)
        </p>
      </div>
      <div className="flex gap-2">
        <Button size="sm">Approve</Button>
        <Button size="sm" variant="outline">
          Reject
        </Button>
      </div>
    </div>
  );
}
