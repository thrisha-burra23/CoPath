import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

function Register() {
  return (
    <Card className="w-full max-w-sm">
      <CardHeader>
        <CardTitle>Create your CoPath account</CardTitle>
        <CardDescription>
          Smarter carpooling starts here. Sign up to share rides, save costs,
          and travel together.
        </CardDescription>        
      </CardHeader>
      <CardContent>
        <form>
          <div className="flex flex-col gap-6">
            <div className="grid gap-2">
              <Label htmlFor="fName">Full Name</Label>
              <Input id="fName" type="text" placeholder="Abc Xyz" required />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="m@example.com"
                required
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="phone">Phone</Label>
              <Input id="phone" type="text" placeholder="9988776655" required />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="password">Password</Label>
              <Input id="password" type="password" required />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="conPwd"> Confirm Password</Label>
              <Input id="conPwd" type="password" required />
            </div>
          </div>
        </form>
      </CardContent>
      <CardFooter className="flex-col gap-2">
        <Button type="submit" className="w-full">
          Create Account
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
    </Card>
  );
}
export default Register;
