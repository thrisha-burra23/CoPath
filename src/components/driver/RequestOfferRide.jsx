import React, { useState } from "react";
import Header from "../userDashboard/Header";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { toast } from "react-toastify";
import { Button } from "@/components/ui/button";
import { useOutletContext } from "react-router-dom";

const RequestOfferRide = ({ onSubmit, isLoading }) => {
  const { user } = useOutletContext();

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
  };

  return (
    <>
      <Header />
      <div className="w-full max-w-md border rounded-lg p-6 space-y-4">
        <h2 className="text-xl font-semibold">Request to Become a Driver</h2>

        <div className="space-y-2">
          <Label>Driving License Number</Label>
          <Input value={license} onChange={(e) => setLicense(e.target.value)} />
        </div>

        <div className="space-y-2">
          <Label>Vehicle Model</Label>
          <Input value={model} onChange={(e) => setModel(e.target.value)} />
        </div>

        <div className="space-y-2">
          <Label>Number Plate</Label>
          <Input
            value={numberPlate}
            onChange={(e) => setNumberPlate(e.target.value)}
          />
        </div>

        <div className="space-y-2">
          <Label>Seats</Label>
          <Input
            type="number"
            min={1}
            value={seats}
            onChange={(e) => setSeats(Number(e.target.value))}
          />
        </div>

        <Button
          onClick={handleSubmit}
          disabled={isLoading}
          variant="outline"
          className="w-full"
        >
          {isLoading ? "Submitting..." : "Submit Request"}
        </Button>
      </div>
    </>
  );
};

export default RequestOfferRide;
