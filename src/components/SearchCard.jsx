import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";

const SearchCard = () => {
  return (
    <Card className="w-full max-w-4/12 bg-[linear-gradient(135deg,#E0F7FA,#E0F2FE,#E0E7FF)] text-slate-900 rounded-2xl shadow-2xl">
      <CardContent className="p-3 space-y-4">
        <h2 className="text-2xl font-semibold text-center text-blue-950 ">
          Where are you going today?
        </h2>
        <div className="flex gap-1 flex-row">
          <Input
            placeholder="Start location"
            className="bg-white/90 text-slate-900 placeholder:text-slate-500 shadow-sm"
          />
          <Input
            placeholder="End location"
            className="bg-white/90 text-slate-900 placeholder:text-slate-500 shadow-sm"
          />
        </div>
        <div className="flex gap-1 flex-row">
          <Input
            type="text "
            placeholder="Date (Optional)"
            className="bg-white/90 text-slate-900 placeholder:text-slate-500 shadow-sm"
          />
          <Button className="bg-[linear-gradient(135deg,#22D3EE,#38BDF8,#2563EB)] text-white">
            Search Ride
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default SearchCard;
