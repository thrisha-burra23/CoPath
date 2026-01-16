import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { useState } from "react";
import { Label } from "@radix-ui/react-label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useForgotPassword } from "../reactQuery/authHooks";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  
  const forgotMutation=useForgotPassword();

  const handleForgotPassword = (event) => {
    event.preventDefault();   
    
    forgotMutation.mutate({email});
  };

  
  return (
    <Card className="w-full max-w-sm">
      <CardHeader>
        <CardTitle>Reset Password</CardTitle>
        <CardDescription>
          Enter your Email to get reset password link.
        </CardDescription>
      </CardHeader>
      <form onSubmit={handleForgotPassword}>
        <CardContent>          
          <div className="flex flex-col gap-6">
            <div className="grid gap-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>           
          </div>
        </CardContent>
        <CardFooter className="flex-col gap-2 p-6">
          <Button type="submit" className="w-full">
            send Link
          </Button>
        </CardFooter>
      </form>
    </Card>
  );
};

export default ForgotPassword;
