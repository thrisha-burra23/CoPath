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
    const data = await fetchSuggestions(value);
    setStartSuggestions(data);
  };

  const handleEndChange = async (value) => {
    setEndText(value);
    setEndLocation(null);

    if (value.length < 2) {
      setEndSuggestions([]);
      return;
    }
    const data = await fetchSuggestions(value);
    setEndSuggestions(data);
  };

  const handleSubmit = () => {
    if (!startLocation || !endLocation || !date || !time) return;

    createRideMutation.mutate({
      driverId: user.$id,
      startLabel: startLocation.label,
      startLat: startLocation.lat,
      startLng: startLocation.lng,
      endLabel: endLocation.label,
      endLat: endLocation.lat,
      endLng: endLocation.lng,
      date: new Date(date).toISOString(),
      time,
      availableSeats: Number(seats),
      price: Number(price || 0),
      status: "ACTIVE",
    });
  };

  return (
    <div className="max-w-lg mx-auto p-6 space-y-4">
      <h2 className="text-2xl font-semibold text-center">Offer a Ride</h2>

      <div className="relative">
        <Input
          placeholder="Start Location"
          value={startText}
          onChange={(e) => handleStartChange(e.target.value)}
        />
        {startSuggestions.length > 0 && (
          <div className="absolute w-full bg-white border rounded shadow z-10">
            {startSuggestions.map((item) => (
              <div
                key={item.label}
                className="px-3 py-2 hover:bg-gray-100 cursor-pointer"
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
          placeholder="End Location"
          value={endText}
          onChange={(e) => handleEndChange(e.target.value)}
        />
        {endSuggestions.length > 0 && (
          <div className="absolute w-full bg-white border rounded shadow z-10">
            {endSuggestions.map((item) => (
              <div
                key={item.label}
                className="px-3 py-2 hover:bg-gray-100 cursor-pointer"
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

      <Input
        type="date"
        value={date}
        onChange={(e) => setDate(e.target.value)}
      />
      <Input
        type="time"
        value={time}
        onChange={(e) => setTime(e.target.value)}
      />
      <Input
        type="number"
        min={1}
        placeholder="Available Seats"
        value={seats}
        onChange={(e) => setSeats(e.target.value)}
      />
      <Input
        type="number"
        min={0}
        placeholder="Price per seat (optional)"
        value={price}
        onChange={(e) => setPrice(e.target.value)}
      />

      <Button
        className="w-full"
        onClick={handleSubmit}
        disabled={createRideMutation.isPending}
      >
        {createRideMutation.isPending ? "Posting..." : "Post Ride"}
      </Button>
    </div>
  );
};

export default OfferRideCard;
