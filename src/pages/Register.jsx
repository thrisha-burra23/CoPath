import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useCreateAccount } from "../reactQuery/authHooks";
import { useState } from "react";
import FailedAlert from "../components/landingPage/FailedAlert";
import RegisterSkeleton from "../loadingSkeleton/RegisterSkeleton";

function Register() {
  const registerMutation = useCreateAccount();
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [formError, setFormError] = useState("");

  const handleRegisterSubmit = (event) => {
    event.preventDefault();

    if (password !== confirmPassword) {
      setFormError("Password and Confirm Password should match");
      return;
    }
    setFormError("");
    const data = { email, password, fullName, phone };
    console.log(data);
    registerMutation.mutate({ email, password, fullName, phone });
  };

  if (registerMutation.isPending) {
    return (
      <Card className="w-full max-w-sm">
        <RegisterSkeleton />
      </Card>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center">
      <Card className="w-full max-w-sm ">
        <CardHeader>
          <CardTitle>Create your CoPath account</CardTitle>
          <CardDescription>
            Smarter carpooling starts here. Sign up to share rides, save costs,
            and travel together.
          </CardDescription>
        </CardHeader>

        <form onSubmit={handleRegisterSubmit}>
          <CardContent>
            {formError && <FailedAlert alertMessage={formError} />}
            <div className="flex flex-col gap-6">
              <div className="grid gap-2">
                <Label htmlFor="fName">Full Name</Label>
                <Input
                  id="fName"
                  type="text"
                  placeholder="Abc Xyz"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  required
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="m@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="phone">Phone</Label>
                <Input
                  id="phone"
                  type="text"
                  placeholder="9988776655"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  required
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="password">Password</Label>
                <Input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => {
                    setPassword(e.target.value);
                    if (formError) setFormError("");
                  }}
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

          <CardFooter className="flex-col gap-2 pt-6">
            <Button
              type="submit"
              className="w-[50%] bg-cyan-500"
              disabled={registerMutation.isPending}
            >
              {registerMutation.isPending
                ? "Creating Account..."
                : "Create Account"}
            </Button>

            <p className="mt-6 text-center text-sm text-copath-muted">
              Already have an account?{" "}
              <Link
                to="/login"
                className="text-copath-blue font-medium hover:underline"
              >
                Log in
              </Link>
            </p>
          </CardFooter>
        </form>
      </Card>
    </div>
  );
}

export default Register;
