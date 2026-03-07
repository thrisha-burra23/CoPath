import { useEffect } from "react";
import { Card } from "@/components/ui/card";
import { useVerification } from "@/src/reactQuery/authHooks";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { Loader2, CheckCircle, XCircle } from "lucide-react";

const VerifyEmail = () => {
  const navigate = useNavigate();
  const verifyMutation = useVerification();

  const urlParams = new URLSearchParams(window.location.search);
  const secret = urlParams.get("secret");
  const userId = urlParams.get("userId");

  useEffect(() => {
    if (!userId || !secret) {
      toast.error("Invalid or expired verification link");
      navigate("/login");
      return;
    }

    verifyMutation.mutate(
      { userId, secret },
      {
        onSuccess: () => {
          toast.success("Email verified successfully!");
          setTimeout(() => navigate("/login"), 2000);
        },
        onError: () => {
          toast.error("Verification failed or link expired.");
          setTimeout(() => navigate("/login"), 2000);
        },
      }
    );
  }, [userId, secret]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 via-slate-50 to-gray-100 px-6">
      <Card className="w-full max-w-md p-10 text-center shadow-xl rounded-3xl border border-gray-200">
        
        {verifyMutation.isPending && (
          <>
            <Loader2 className="mx-auto mb-4 animate-spin text-indigo-600" size={36} />
            <h2 className="text-lg font-semibold text-gray-800">
              Verifying your email...
            </h2>
          </>
        )}

        {verifyMutation.isSuccess && (
          <>
            <CheckCircle className="mx-auto mb-4 text-green-600" size={36} />
            <h2 className="text-lg font-semibold text-gray-800">
              Email verified successfully!
            </h2>
            <p className="text-sm text-gray-500 mt-2">
              Redirecting to login...
            </p>
          </>
        )}

        {verifyMutation.isError && (
          <>
            <XCircle className="mx-auto mb-4 text-red-600" size={36} />
            <h2 className="text-lg font-semibold text-gray-800">
              Verification failed
            </h2>
            <p className="text-sm text-gray-500 mt-2">
              The link may have expired. Redirecting...
            </p>
          </>
        )}
      </Card>
    </div>
  );
};

export default VerifyEmail;