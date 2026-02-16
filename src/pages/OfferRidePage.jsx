import Header from "../components/userDashboard/Header";
import { useOutletContext } from "react-router-dom";
import { useProfile } from "../reactQuery/profileHooks";
import {
  useCreateDriverRequest,
  useDriverRequest,
} from "../reactQuery/adminRequestHooks";
import RequestPending from "../components/driver/RequestPending";
import RequestOfferRide from "../components/driver/RequestOfferRide";
import OfferRideCard from "../components/driver-dashboard/OfferRideCard";
import { useCreateVehicle } from "../reactQuery/vehicleHooks";
import DriverDashboard from "../components/driver-dashboard/DriverDashboard";

const OfferRide = () => {
  const { user } = useOutletContext();

  const { data: profile, isLoading } = useProfile(user?.$id);
  const { data: driverRequest } = useDriverRequest(user?.$id);
  const createDriverRequestMutation = useCreateDriverRequest();
  const createVehicleMutation = useCreateVehicle(); 

  if (isLoading) {
    return (
      <>
        <div>
          <p>Loading</p>
        </div>
      </>
    );
  }

  if (!profile?.driverApproved && driverRequest) {
    return (
      <>
              <RequestPending />
      </>
    );
  }

  if (!profile?.driverApproved) {
    return (
      <>
        <RequestOfferRide
          isLoading={createDriverRequestMutation.isPending}
          onSubmit={(data) => {
            createDriverRequestMutation.mutate({
              userId: user?.$id,
              type:"DRIVER"
            });
            createVehicleMutation.mutate(data);
          }}
        />
      </>
    );
  }

  return (
    <>     
     <DriverDashboard/>
    </>
  );
};

export default OfferRide;
