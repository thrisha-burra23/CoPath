import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useState } from "react";
import { Label } from "@radix-ui/react-label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useForgotPassword } from "../reactQuery/authHooks";
import { Link } from "react-router-dom";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");

  const forgotMutation = useForgotPassword();

  const handleForgotPassword = (event) => {
    event.preventDefault();

    forgotMutation.mutate({ email });
  };

  return (
    <>
      <header className=" flex justify-between items-center px-8 bg-blue-50 mt-2">
      <h2 className=" text-2xl font-semibold text-black">CoPath</h2>
      <div className=" flex gap-4">
        <Button  className="text-black text-xl" variant="outline">
          <Link  to={"/login"}>Login</Link>
        </Button>
        <Button className="text-black text-xl" variant="outline">
          <Link to={"/register"}>Register</Link>
        </Button>
      </div>
    </header>
      <div className="min-h-screen flex items-center justify-center bg-blue-50">
        <Card className="w-full max-w-sm flex m-auto justify-center border-0 shadow-blue-800 bg-white ">
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
              <Button type="submit" className="w-full bg-cyan-500">
                send Link
              </Button>
            </CardFooter>
          </form>
        </Card>
      </div>
    </>
  );
};

export default ForgotPassword;
