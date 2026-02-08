import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { fetchSuggestions } from "@/src/api/map";
import { useAuthUser } from "@/src/reactQuery/authHooks";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function SearchCard({ onSearch }) {
  const { data: user, isLoading } = useAuthUser();
  const isDisabled = isLoading || !user;
  const navigate=useNavigate();

  

  const [startText, setStartText] = useState("");
  const [endText, setEndText] = useState("");

  const [startLocation, setStartLocation] = useState(null);
  const [endLocation, setEndLocation] = useState(null);

  const [startSuggestions, setStartSuggestions] = useState([]);
  const [endSuggestions, setEndSuggestions] = useState([]);

  const [date, setDate] = useState("");

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

  const handleSearch = () => {
    if (!startLocation || !endLocation) {
      return;
    }
    onSearch({
      startLocation,
      endLocation,
      date,
    });

    const params = new URLSearchParams({
      start: startLocation.label.split(",")[0],
      end: endLocation.label.split(",")[0],
    });
    if (date) params.append("date", date);

    navigate(`/user-dashboard/search?${params.toString()}`)
  };

  return (
    <div className="w-full  max-w-sm space-y-4">
      <div className="relative">
        <Input
          disabled={isDisabled}
          placeholder="Start Location"
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
          disabled={isDisabled}
          placeholder="End Location"
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

      <Input
        type="date"
        value={date}
        onChange={(e) => setDate(e.target.value)}
      />

      <Button
        onClick={handleSearch}
        className="w-full text-white bg-[linear-gradient(135deg,#22D3EE,#38BDF8,#2563EB)]"
        variant="outline"
        disabled={isDisabled || !startLocation || !endLocation}
      >
        Search Ride
      </Button>
    </div>
  );
}
