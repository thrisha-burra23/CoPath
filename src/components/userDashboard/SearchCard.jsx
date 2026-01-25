import { Input } from "@/components/ui/input";
import { useAuthUser } from "@/src/reactQuery/authHooks";
import { useState } from "react";

export default function SearchCard() {
  const { data: user, isLoading } = useAuthUser();
  const [text, setText] = useState("");
  const [showSuggestions, setShowSuggestions] = useState(false);

  const isDisabled = isLoading || !user;

  const suggestions = ["Bangalore", "Chennai", "Hyderabad"];

  return (
    <div className="p-4">
      <div className="relative max-w-sm">
        <Input
          disabled={isDisabled}
          className="bg-white text-black"
          placeholder={isDisabled ? "Login to search" : "Start location"}
          value={text}
          onChange={(e) => {
            setText(e.target.value);
            setShowSuggestions(e.target.value.length >= 2);
          }}
        />

        {!isDisabled && showSuggestions && (
          <div className="absolute top-full left-0 right-0 mt-1 bg-white border rounded shadow">
            {suggestions.map((item) => (
              <div
                key={item}
                className="px-3 py-2 cursor-pointer hover:bg-gray-100"
                onClick={() => {
                  setText(item);
                  setShowSuggestions(false);
                }}
              >
                {item}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
