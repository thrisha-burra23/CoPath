import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Popover, PopoverContent } from "@/components/ui/popover";
import { useAuthUser } from "@/src/reactQuery/authHooks";
import { useCallback, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const SearchCardOriginal = ({ selectedDate, setSelectedDate }) => {
 // const { data: user, isLoading } = useAuthUser();
  const [startText, setStartText] = useState("");
  const [endText, setEndText] = useState("");
  const [openStart, setOpenStart] = useState(false);
  const [openEnd, setOpenEnd] = useState(false);


  // const checkAuth = useCallback(() => {
  //   if (isLoading) return false;

  //   // if (!user) {
  //   //   toast.info("Please Login to search a ride");
  //   //   //navigate("/login");
  //   //   return false;
  //   // }
  //   return true;
  // }, [user, isLoading, navigate]);

  return (
    <Card className="w-full max-w-4/12 bg-[linear-gradient(135deg,#E0F7FA,#E0F2FE,#E0E7FF)] text-slate-900 rounded-2xl shadow-2xl">
      <CardContent className="p-3 space-y-4">
        <h2 className="text-2xl font-semibold text-center text-blue-950">
          Where are you going today?
        </h2>

       
        <div className="flex gap-2">
         
          <div className="relative flex-1">
            <Input
              placeholder="Start Location"
              value={startText}
              // onFocus={checkAuth}
              onChange={(e) => {
                setStartText(e.target.value);
                setOpenStart(true);
              }}
              className="bg-white"
            />

            <Popover open={openStart} onOpenChange={setOpenStart} modal={false}>
              <PopoverContent className="p-2 w-72 text-sm text-muted-foreground">
                Start typing to see suggestions…
              </PopoverContent>
            </Popover>
          </div>

         
          <div className="relative flex-1">
            <Input
              placeholder="End Location"
              value={endText}
              // onFocus={checkAuth}
              onChange={(e) => {
                setEndText(e.target.value);
                setOpenEnd(true);
              }}
              className="bg-white"
            />

            <Popover open={openEnd} onOpenChange={setOpenEnd}>
              <PopoverContent className="p-2 w-72 text-sm text-muted-foreground">
                Start typing to see suggestions…
              </PopoverContent>
            </Popover>
          </div>
        </div>

        {/* Date + Button */}
        <div className="flex gap-2">
          <Input
            type="date"
            value={selectedDate || ""}
            // onFocus={checkAuth}
            onChange={(e) => setSelectedDate(e.target.value || "")}
            className="bg-white"
          />

          <Button className="bg-[linear-gradient(135deg,#22D3EE,#38BDF8,#2563EB)] text-white">
            Search Ride
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default SearchCardOriginal