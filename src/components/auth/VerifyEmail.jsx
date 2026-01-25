import { useEffect } from "react";
import { Card } from "@/components/ui/card";
import { useVerification } from "@/src/reactQuery/authHooks";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const VerifyEmail = () => {
  const navigate = useNavigate();

  const urlParams = new URLSearchParams(window.location.search);
  const secret = urlParams.get("secret");
  const userId = urlParams.get("userId");
  const verifyMutation = useVerification();

  useEffect(() => {
    if (!userId || !secret) {
      toast.error("Invalid or expired verification link");
      navigate("/login");
      return;
    }
    verifyMutation.mutate({ userId, secret });
  }, [userId, secret, navigate]);

  return (
    <Card className="w-full max-w-sm p-6 text-center">
      {verifyMutation.isPending ? "Verifying your email..." : "Redirecting..."}
    </Card>
  );
};

export default VerifyEmail;
