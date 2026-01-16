import { BrowserRouter, Route,  Routes } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import LandingPage from "./pages/LandingPage";
import { useEffect } from "react";
import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "./reactQuery/queryClient";
import { ToastContainer } from "react-toastify";
import PrivateRoute from "./routes/PrivateRoute";
import UserDashboard from "./pages/UserDashboard";
import VerifyEmail from "./components/VerifyEmail";
import ForgotPassword from "./pages/ForgotPassword";
import ResetPassword from "./pages/ResetPassword";


function App() {
  useEffect(() => {
    document.documentElement.classList.add("dark");
  }, []);

  return (
    <>
      <QueryClientProvider client={queryClient}>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/verify-email" element={<VerifyEmail />} />
            <Route path="/forgotPassword" element={<ForgotPassword />} />
            <Route path="/resetPassword" element={<ResetPassword />} />
            <Route element={<PrivateRoute />}>
              <Route path="/userDashboard" element={<UserDashboard />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </QueryClientProvider>
      <ToastContainer />
    </>
  );
}

export default App;
