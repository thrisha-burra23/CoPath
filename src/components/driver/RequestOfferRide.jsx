import React, { useState } from "react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { toast } from "react-toastify";
import { Button } from "@/components/ui/button";
import { useNavigate, useOutletContext } from "react-router-dom";

const RequestOfferRide = ({ onSubmit, isLoading }) => {
  const { user } = useOutletContext();
  const navigate = useNavigate();

  const [license, setLicense] = useState("");
  const [model, setModel] = useState("");
  const [numberPlate, setNumberPlate] = useState("");
  const [seats, setSeats] = useState("");

  const handleSubmit = () => {
    if (!license || !numberPlate || !seats || !model) {
      toast.info("Please fill all fields");
      return;
    }
    onSubmit({
      userId: user?.$id,
      license,
      model,
      numberPlate,
      seats,
    });
    navigate("/request-pending");
  };

  return (
    <>
      <div className="min-h-screen bg-gradient-to-br from-gray-50 via-slate-50 to-gray-100 flex items-center justify-center px-4">
        <div className="w-full max-w-lg bg-white/90 backdrop-blur-xl border border-gray-200 rounded-2xl shadow-2xl p-8 space-y-6">
          <h2 className="text-2xl font-bold text-gray-800">
            Request to Become a Driver
          </h2>

          <div className="space-y-2">
            <Label className="text-sm font-medium text-gray-700">
              Driving License Number
            </Label>
            <Input
              className="h-11 rounded-xl border-gray-300 focus:ring-2 focus:ring-indigo-400 focus:border-indigo-400 transition"
              value={license}
              onChange={(e) => setLicense(e.target.value)}
            />
          </div>

          <div className="space-y-2">
            <Label className="text-sm font-medium text-gray-700">
              Vehicle Model
            </Label>
            <Input
              className="h-11 rounded-xl border-gray-300 focus:ring-2 focus:ring-indigo-400 focus:border-indigo-400 transition"
              value={model}
              onChange={(e) => setModel(e.target.value)}
            />
          </div>

          <div className="space-y-2">
            <Label className="text-sm font-medium text-gray-700">
              Number Plate
            </Label>
            <Input
              className="h-11 rounded-xl border-gray-300 focus:ring-2 focus:ring-indigo-400 focus:border-indigo-400 transition"
              value={numberPlate}
              onChange={(e) => setNumberPlate(e.target.value)}
            />
          </div>

          <div className="space-y-2">
            <Label className="text-sm font-medium text-gray-700">Seats</Label>
            <Input
              className="h-11 rounded-xl border-gray-300 focus:ring-2 focus:ring-indigo-400 focus:border-indigo-400 transition"
              type="number"
              min={1}
              value={seats}
              onChange={(e) => setSeats(Number(e.target.value))}
            />
          </div>

          <Button
            className="w-full h-11 rounded-xl bg-gradient-to-r from-cyan-400 via-sky-500 to-indigo-600 text-white font-medium shadow-lg hover:opacity-90 transition-all duration-300"
            onClick={handleSubmit}
            disabled={isLoading}
            variant="outline"
          >
            {isLoading ? "Submitting..." : "Submit Request"}
          </Button>
        </div>
      </div>
    </>
  );
};

export default RequestOfferRide;
