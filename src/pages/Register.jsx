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
import DashboardSkeleton from "../loadingSkeleton/DashboardSkeleton";

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
        <DashboardSkeleton />
      </Card>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-cyan-50 via-blue-50 to-indigo-100 px-4">
      <Card className="w-full max-w-lg bg-white/90 backdrop-blur-xl border border-gray-200 shadow-2xl rounded-2xl">
        <CardHeader className="space-y-2 pb-2">
          <CardTitle className="text-2xl font-bold text-gray-800">
            Create your CoPath account
          </CardTitle>
          <CardDescription className="text-sm text-gray-500">
            Smarter carpooling starts here. Sign up to share rides, save costs,
            and travel together.
          </CardDescription>
        </CardHeader>

        <form onSubmit={handleRegisterSubmit}>
          <CardContent>
            {formError && <FailedAlert alertMessage={formError} />}
            <div className="flex flex-col gap-6">
              <div className="grid gap-2">
                <Label
                  className="text-sm font-medium text-gray-700"
                  htmlFor="fName"
                >
                  Full Name
                </Label>
                <Input
                  className="h-11 rounded-xl border-gray-300 focus:ring-2 focus:ring-cyan-400 focus:border-cyan-400 transition"
                  id="fName"
                  type="text"
                  placeholder="Abc Xyz"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  required
                />
              </div>
              <div className="grid gap-2">
                <Label
                  className="text-sm font-medium text-gray-700"
                  htmlFor="email"
                >
                  Email
                </Label>
                <Input
                  className="h-11 rounded-xl border-gray-300 focus:ring-2 focus:ring-cyan-400 focus:border-cyan-400 transition"
                  id="email"
                  type="email"
                  placeholder="m@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
              <div className="grid gap-2">
                <Label
                  className="text-sm font-medium text-gray-700"
                  htmlFor="phone"
                >
                  Phone
                </Label>
                <Input
                  className="h-11 rounded-xl border-gray-300 focus:ring-2 focus:ring-cyan-400 focus:border-cyan-400 transition"
                  id="phone"
                  type="text"
                  placeholder="9988776655"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  required
                />
              </div>
              <div className="grid gap-2">
                <Label
                  className="text-sm font-medium text-gray-700"
                  htmlFor="password"
                >
                  Password
                </Label>
                <Input
                  className="h-11 rounded-xl border-gray-300 focus:ring-2 focus:ring-cyan-400 focus:border-cyan-400 transition"
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
                <Label
                  className="text-sm font-medium text-gray-700"
                  htmlFor="conPwd"
                >
                  {" "}
                  Confirm Password
                </Label>
                <Input
                  className="h-11 rounded-xl border-gray-300 focus:ring-2 focus:ring-cyan-400 focus:border-cyan-400 transition"
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
              className="w-full h-11 rounded-xl bg-gradient-to-r from-cyan-400 via-sky-500 to-indigo-600 text-white font-medium shadow-lg hover:opacity-90 transition-all duration-300"
              disabled={registerMutation.isPending}
            >
              {registerMutation.isPending
                ? "Creating Account..."
                : "Create Account"}
            </Button>

            <p className="mt-6 text-center text-sm text-gray-500">
              Already have an account?{" "}
              <Link
                to="/login"
                className="text-indigo-600 font-medium hover:underline transition"
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
