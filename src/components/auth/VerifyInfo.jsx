import { MailCheck } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

const VerifyInfo = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 via-slate-50 to-gray-100 px-6">
      <div className="bg-white shadow-xl rounded-3xl p-10 max-w-md w-full text-center border border-gray-200">
        
        <div className="flex justify-center mb-6">
          <div className="bg-indigo-100 p-4 rounded-full">
            <MailCheck className="text-indigo-600" size={32} />
          </div>
        </div>

        <h2 className="text-2xl font-bold text-gray-800 mb-3">
          Verify Your Email
        </h2>

        <p className="text-gray-600 mb-6">
          We’ve sent a verification link to your email.  
          Please check your inbox and verify your account to continue.
        </p>

        <Button
          variant="outline"
          className="w-full rounded-xl"
          onClick={() => navigate("/login")}
        >
          Back to Login
        </Button>
      </div>
    </div>
  );
};

export default VerifyInfo;