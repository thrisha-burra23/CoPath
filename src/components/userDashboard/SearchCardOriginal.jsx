
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const SearchCardOriginal = () => {
  const navigate = useNavigate();
  const handleSearch = () => {    
      toast.info("Please login to search a ride");
      navigate("/login");
    }
  

  return (
    <Card className="w-full max-w-4/12 bg-[linear-gradient(135deg,#E0F7FA,#E0F2FE,#E0E7FF)] text-slate-900 rounded-2xl shadow-2xl">
      <CardContent className="p-3 space-y-4">
        <h2 className="text-2xl font-semibold text-center text-blue-950">
          Where are you going today?
        </h2>

        {/* Start + End */}
        <div className="flex gap-2">
          <div className="relative flex-1">
            <Input
              placeholder="Start Location"
              className="bg-white"
            />
          </div>

          <div className="relative flex-1">
            <Input
              placeholder="End Location"
                        
              className="bg-white"
            />

          </div>
        </div>

      
        <div className="flex gap-2">
          <Input
            type="date"           
            onChange={(e) => setSelectedDate(e.target.value || "")}
            className="bg-white"
          />

          <Button
            onClick={handleSearch}
            className="bg-[linear-gradient(135deg,#22D3EE,#38BDF8,#2563EB)] text-white"
          >
            Search Ride
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default SearchCardOriginal;
