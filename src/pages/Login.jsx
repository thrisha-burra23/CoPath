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
import LoginSkeleton from "../loadingSkeleton/LoginSkeleton";
import {  useEffect, useState } from "react";

function Login() {
  const loginMutate = useLogin();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate=useNavigate();
  const {data:user,isLoading}=useAuthUser();

  useEffect(()=>{
    if(isLoading) return;

    if(user){
      if(!user.emailVerification){
        navigate("/verify-info")
      }else{
        navigate("/user-dashboard")
      }
    }
  },[user,navigate,isLoading])
  
  const handleLogin = (event) => {
    event.preventDefault();
    console.log("login clicked");
    loginMutate.mutate({ email, password });
  };

  if (loginMutate.isPending) {
    return (
      <Card className="w-full max-w-sm">
        <LoginSkeleton />
      </Card>
    );
  }

if(user){
  return null;
}

  return (
    <div className="min-h-screen flex items-center justify-center">
      <Card className="w-full max-w-sm flex m-auto justify-center  ">
        <CardHeader>
          <CardTitle>Login to your account</CardTitle>
          <CardDescription>
            Enter your email below to login to your account
          </CardDescription>
        </CardHeader>
        <form onSubmit={handleLogin}>
          <CardContent>
            <div className="flex flex-col gap-6">
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
                <div className="flex items-center">
                  <Label htmlFor="password">Password</Label>
                  <Link
                    to="/forgot-password"
                    className="ml-auto inline-block text-sm underline-offset-4 hover:underline"
                  >
                    Forgot your password?
                  </Link>
                </div>
                <Input
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
            <Button type="submit" className="w-[50%] bg-cyan-500">
              Login
            </Button>
            <p className="mt-6 text-center text-sm text-copath-muted">
              Don't have an account?{" "}
              <Link
                to="/register"
                className="text-copath-blue font-medium hover:underline"
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
