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
  const [seats, setSeats] = useState(1);
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
    <div className="bg-white border rounded-xl p-6 space-y-5 h-full">

      <h2 className="text-lg font-semibold flex items-center gap-2">
        ➕ Offer a New Ride
      </h2>

      {/* From / To */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="relative">
          <Input
            placeholder="From (e.g. Bangalore)"
            value={startText}
            onChange={(e) => handleStartChange(e.target.value)}
          />
          {startSuggestions.length > 0 && (
            <div className="absolute z-10 w-full bg-white border rounded shadow">
              {startSuggestions.map((item) => (
                <div
                  key={item.label}
                  className="px-3 py-2 cursor-pointer hover:bg-gray-100"
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
            placeholder="To (e.g. Chennai)"
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
        <Input type="date" value={date} onChange={(e) => setDate(e.target.value)} />
        <Input type="time" value={time} onChange={(e) => setTime(e.target.value)} />
      </div>

      {/* Seats / Price */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Input
          type="number"
          min={1}
          placeholder="Seats Available"
          value={seats}
          onChange={(e) => setSeats(e.target.value)}
        />
        <Input
          type="number"
          min={0}
          placeholder="Price per Seat (₹)"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
        />
      </div>

      <Button
        className="w-full"
        onClick={handleSubmit}
        disabled={createRideMutation.isPending}
      >
        {createRideMutation.isPending ? "Publishing..." : "Publish Ride"}
      </Button>
    </div>
  );
};

export default OfferRideCard;
