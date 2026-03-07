import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useCancelDriverRequest } from "@/src/reactQuery/adminRequestHooks";
import { useNavigate } from "react-router-dom";

const DriverRejected = ({ reason, requestId }) => {
  const navigate = useNavigate();
  const cancelMutation = useCancelDriverRequest();

  const handleApplyAgain = async () => {
    await cancelMutation.mutateAsync(requestId);
    navigate("/offer-ride");
  };
  const params = new URLSearchParams(window.location.search);
  const reset = params.get("reset");

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 via-slate-50 to-gray-100 px-4">
      <Card className="p-8 text-center rounded-3xl shadow-xl max-w-md w-full space-y-4">
        <div className="text-4xl text-red-500">❌</div>

        <h2 className="text-xl font-semibold text-red-600">
          Driver Request Rejected
        </h2>

        <div className="bg-red-50 border border-red-200 text-red-700 text-sm p-3 rounded-xl">
          <strong>Reason:</strong> {reason || "No reason provided"}
        </div>

        <Button
          className="bg-amber-300"
          onClick={handleApplyAgain}
          disabled={cancelMutation.isPending}
        >
          {cancelMutation.isPending ? "Processing..." : "Apply Again"}
        </Button>
      </Card>
    </div>
  );
};

export default DriverRejected;
