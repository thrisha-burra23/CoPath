import React from "react";

const ButtonStyles = () => {
  return (
    <div>
      <Button className="bg-primary text-primary-foreground hover:opacity-90">
        Search Ride
      </Button>
      <Button className="bg-[linear-gradient(135deg,#22D3EE,#38BDF8,#2563EB)] text-white">
        Search Ride
      </Button>
      <Button variant="outline">Register</Button>
      <Button variant="link" className="text-secondary">
        Log in
      </Button>
    </div>
  );
};

export default ButtonStyles;
