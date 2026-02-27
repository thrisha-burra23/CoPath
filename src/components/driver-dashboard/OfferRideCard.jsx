import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { fetchSuggestions } from "@/src/api/map";
import { useCreateRide } from "@/src/reactQuery/rideHooks";
import { useState } from "react";
import { useOutletContext } from "react-router-dom";

const OfferRideCard = () => {
  const { user } = useOutletContext();
  const createRideMutation = useCreateRide();

  const [startText, setStartText] = useState("");
  const [endText, setEndText] = useState("");
  const [startLocation, setStartLocation] = useState(null);
  const [endLocation, setEndLocation] = useState(null);
  const [startSuggestions, setStartSuggestions] = useState([]);
  const [endSuggestions, setEndSuggestions] = useState([]);
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [seats, setSeats] = useState("");
  const [price, setPrice] = useState("");

  const handleStartChange = async (value) => {
    setStartText(value);
    setStartLocation(null);

    if (value.length < 2) {
      setStartSuggestions([]);
      return;
    }
    setStartSuggestions(await fetchSuggestions(value));
  };

  const handleEndChange = async (value) => {
    setEndText(value);
    setEndLocation(null);

    if (value.length < 2) {
      setEndSuggestions([]);
      return;
    }
    setEndSuggestions(await fetchSuggestions(value));
  };

  const handleSubmit = () => {
    if (!startLocation || !endLocation || !date || !time) return;

    // ✅ Combine date + time into ONE datetime
    const rideDateTime = new Date(`${date}T${time}`).toISOString();

    createRideMutation.mutate({
      driverId: user.$id,
      startLabel: startLocation.label,
      startLat: startLocation.lat,
      startLng: startLocation.lng,
      endLabel: endLocation.label,
      endLat: endLocation.lat,
      endLng: endLocation.lng,
      time: rideDateTime, // ✅ matches DB schema
      availableSeats: Number(seats),
      price: Number(price || 0),
      status: "ACTIVE",
    });
  };

  return (
    <div className="bg-white/80 backdrop-blur-xl border border-gray-200 shadow-xl rounded-2xl p-8 space-y-6 h-full transition-all duration-300">
      <h2 className="text-xl font-semibold text-gray-800 flex items-center gap-2">
        ➕ Offer a New Ride
      </h2>

      {/* From / To */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="relative">
          <Input
            className="h-11 rounded-xl border-gray-300 focus:ring-2 focus:ring-cyan-400 focus:border-cyan-400"
            placeholder="From (e.g. Bangalore)"
            value={startText}
            onChange={(e) => handleStartChange(e.target.value)}
          />
          {startSuggestions.length > 0 && (
            <div className="absolute z-20 w-full mt-2 bg-white border border-gray-200 rounded-xl shadow-lg max-h-48 overflow-y-auto">
              {startSuggestions.map((item) => (
                <div
                  key={item.label}
                  className="px-4 py-2 text-sm cursor-pointer hover:bg-cyan-50 transition"
                  onClick={() => {
                    setStartText(item.label);
                    setStartLocation(item);
                    setStartSuggestions([]);
                  }}
                >
                  {item.label}
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="relative">
          <Input
            className="h-11 rounded-xl border-gray-300 focus:ring-2 focus:ring-cyan-400 focus:border-cyan-400"
            placeholder="From (e.g. Bangalore)"
            value={endText}
            onChange={(e) => handleEndChange(e.target.value)}
          />
          {endSuggestions.length > 0 && (
            <div className="absolute z-10 w-full bg-white border rounded shadow">
              {endSuggestions.map((item) => (
                <div
                  key={item.label}
                  className="px-3 py-2 cursor-pointer hover:bg-gray-100"
                  onClick={() => {
                    setEndText(item.label);
                    setEndLocation(item);
                    setEndSuggestions([]);
                  }}
                >
                  {item.label}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Date / Time */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Input
          className="h-11 rounded-xl border-gray-300 focus:ring-2 focus:ring-cyan-400 focus:border-cyan-400"
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
        />
        <Input
          className="h-11 rounded-xl border-gray-300 focus:ring-2 focus:ring-cyan-400 focus:border-cyan-400"
          type="time"
          value={time}
          onChange={(e) => setTime(e.target.value)}
        />
      </div>

      {/* Seats / Price */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Input
          className="h-11 rounded-xl border-gray-300 focus:ring-2 focus:ring-cyan-400 focus:border-cyan-400"
          placeholder="Seats Available (e.g. 3)"
          type="number"
          min={1}
          value={seats}
          onChange={(e) => setSeats(e.target.value)}
        />
        <Input
          className="h-11 rounded-xl border-gray-300 focus:ring-2 focus:ring-cyan-400 focus:border-cyan-400"
          placeholder="Price per Seat (₹) (e.g. 300)"
          type="number"
          min={0}
          value={price}
          onChange={(e) => setPrice(e.target.value)}
        />
      </div>

      <Button
        className="w-full h-12 rounded-xl text-white font-medium bg-gradient-to-r from-cyan-400 via-sky-500 to-indigo-600 hover:opacity-90 shadow-lg shadow-cyan-500/20 transition-all duration-300" onClick={handleSubmit}
        disabled={createRideMutation.isPending}
      >
        {createRideMutation.isPending ? "Publishing..." : "Publish Ride"}
      </Button>
    </div>
  );
};

export default OfferRideCard;
