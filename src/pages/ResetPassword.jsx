import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { useState } from "react";
import FailedAlert from "../components/FailedAlert";
import { Label } from "@radix-ui/react-label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useResetPassword } from "../reactQuery/authHooks";

const ResetPassword = () => {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [formError, setFormError] = useState("");
  
  const urlParams= new URLSearchParams(window.location.search);
  const userId=urlParams.get("userId");
  const secret=urlParams.get("secret");

  const resetMutation=useResetPassword();

  const handleResetPassword = (event) => {
    event.preventDefault();

    if (password !== confirmPassword) {
      setFormError("Password and Confirm Password should match");
      return;
    }
    setFormError("");
    resetMutation.mutate({userId,secret,password});
  };

  
  return (
    <Card className="w-full max-w-sm">
      <CardHeader>
        <CardTitle>Reset Password</CardTitle>
        <CardDescription>
          Enter new password to reset your password.
        </CardDescription>
      </CardHeader>
      <form onSubmit={handleResetPassword}>
        <CardContent>
           {formError && <FailedAlert alertMessage={formError} />}
          <div className="flex flex-col gap-6">
            <div className="grid gap-2">
              <Label htmlFor="password">New Password</Label>
              <Input
                id="password"
                type="password"
                placeholder="Enter your new Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="conPwd"> Confirm Password</Label>
              <Input
                id="conPwd"
                type="password"
                value={confirmPassword}
                onChange={(e) => {
                  setConfirmPassword(e.target.value);
                  if (formError) setFormError("");
                }}
                required
              />
            </div>
          </div>
        </CardContent>
        <CardFooter className="flex-col gap-2 p-6">
          <Button type="submit" className="w-full">
            Reset Password
          </Button>
        </CardFooter>
      </form>
    </Card>
  );
};

export default ResetPassword;
