import { useOutletContext } from "react-router-dom";
import RequestPending from "../components/driver/RequestPending";
import { useCreateDriverRequest, useDriverRequest } from "../reactQuery/adminRequestHooks";
import RequestOfferRide from "../components/driver/RequestOfferRide";
import DriverRejected from "../components/driver-dashboard/DriverRejected";
import DriverDashboard from "../components/driver-dashboard/DriverDashboard";

const OfferRide = () => {
  const { user } = useOutletContext();
  const { data: driverRequest, isLoading } = useDriverRequest(user?.$id);
  const createRequest = useCreateDriverRequest();

  if (isLoading) return null;

  if (!driverRequest) {
    return   <RequestOfferRide
      onSubmit={createRequest.mutate}
      isLoading={createRequest.isPending}
    />
  }

  // ✅ Then check status
  if (driverRequest.status === "PENDING") {
    return <RequestPending />;
  }

  if (driverRequest.status === "REJECTED") {
    return (
      <DriverRejected
        reason={driverRequest.rejectedReason}
        requestId={driverRequest.$id}
      />
    );
  }

  if (driverRequest.status === "APPROVED") {
    return <DriverDashboard />;
  }

  return null;
};

export default OfferRide