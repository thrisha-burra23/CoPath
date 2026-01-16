import { useEffect } from "react";
import { useVerification } from "../reactQuery/authHooks";
import { Card } from "@/components/ui/card";

const VerifyEmail = () => {
  const urlParams = new URLSearchParams(window.location.search);
  const secret = urlParams.get("secret");
  const userId = urlParams.get("userId");
  const verifyMutation = useVerification();

  useEffect(() => {
    if (userId && secret) {
      verifyMutation.mutate({userId, secret});
    }
  }, [userId, secret]);

  return (
    <Card className="w-full max-w-sm p-6 text-center">
      {verifyMutation.isPending
        ? "Verifying your email..."
        : "Processing verification"}
    </Card>
  );
};

export default VerifyEmail;
