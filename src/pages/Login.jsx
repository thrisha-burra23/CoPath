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
import { Link, useNavigate } from "react-router-dom";
import { useAuthUser, useLogin } from "../reactQuery/authHooks";
import { useEffect, useState } from "react";
import DashboardSkeleton from "../loadingSkeleton/DashboardSkeleton";
import { useProfile } from "../reactQuery/profileHooks";

function Login() {
  const loginMutate = useLogin();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const { data: user, isLoading } = useAuthUser();
  const { data: profile, isLoading: profileLoading } = useProfile(user?.$id);

  useEffect(() => {
    if (isLoading) return;

    if (user) {
      if (!user.emailVerification) {
        navigate("/verify-info");
      } else if (profile?.role === "ADMIN") {
        navigate("/admin");
      } else {
        navigate("/user-dashboard");
      }
    }
  }, [user, profile, navigate, isLoading, profileLoading]);

  const handleLogin = (event) => {
    event.preventDefault();
    console.log("login clicked");
    loginMutate.mutate({ email, password });
  };

  if (loginMutate.isPending) {
    return (
      <Card className="w-full max-w-sm">
        <DashboardSkeleton />
      </Card>
    );
  }

  if (user) {
    return null;
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-cyan-50 via-blue-50 to-indigo-100 px-4">
      <Card className="w-full max-w-md md:max-w-lg bg-white/90 backdrop-blur-xl border border-gray-200 shadow-2xl rounded-2xl">
        <CardHeader className="space-y-2 pb-2">
          <CardTitle className="text-2xl font-bold text-gray-800">
            Login to your account
          </CardTitle>
          <CardDescription className="text-sm text-gray-500">
            Enter your email below to login to your account
          </CardDescription>
        </CardHeader>
        <form onSubmit={handleLogin}>
          <CardContent>
            <div className="flex flex-col gap-6">
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
                <div className="flex items-center">
                  <Label
                    className="text-sm font-medium text-gray-700"
                    htmlFor="password"
                  >
                    Password
                  </Label>
                  <Link
                    to="/forgot-password"
                  className="ml-auto text-sm text-indigo-600 font-medium hover:underline transition"
                  >
                    Forgot your password?
                  </Link>
                </div>
                <Input
                  className="h-11 rounded-xl border-gray-300 focus:ring-2 focus:ring-cyan-400 focus:border-cyan-400 transition"
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>
            </div>
          </CardContent>
          <CardFooter className="flex-col gap-2 p-6">
            <Button type="submit" className="w-full h-11 rounded-xl bg-gradient-to-r from-cyan-400 via-sky-500 to-indigo-600 text-white font-medium shadow-lg hover:opacity-90 transition-all duration-300">
              Login
            </Button>
            <p className="mt-6 text-center text-sm text-gray-500">
              Don't have an account?{" "}
              <Link
                to="/register"
                className="text-indigo-600 font-medium hover:underline transition"
              >
                Register
              </Link>
            </p>
          </CardFooter>
        </form>
      </Card>
    </div>
  );
}
export default Login;
