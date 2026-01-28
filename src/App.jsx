import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import LandingPage from "./pages/LandingPage";
import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "./reactQuery/queryClient";
import { ToastContainer } from "react-toastify";
import PrivateRoute from "./routes/PrivateRoute";
import UserDashboard from "./pages/UserDashboard";
import ForgotPassword from "./pages/ForgotPassword";
import ResetPassword from "./pages/ResetPassword";
import VerifyEmail from "./components/auth/VerifyEmail";
import VerifyInfo from "./components/auth/VerifyInfo";
import OfferRide from "./pages/OfferRidePage";
import RequestOfferRide from "./components/driver/RequestOfferRide";

function App() {
  console.log("ROUTE:", window.location.pathname);

  return (
    <>
    
      <QueryClientProvider client={queryClient}>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/verify-info" element={<VerifyInfo />} />
            <Route path="/verify-email" element={<VerifyEmail />} />
            <Route path="/forgot-password" element={<ForgotPassword />} />
            <Route path="/reset-password" element={<ResetPassword />} />
            <Route element={<PrivateRoute />}>
              <Route path="/user-dashboard" element={<UserDashboard />} />
            </Route>
            <Route element={<PrivateRoute />}>
              <Route path="/offer-ride" element={<OfferRide />} />
            </Route>
            <Route element={<PrivateRoute/>}>
              <Route path="/request-to-offer-ride" element={<RequestOfferRide/>}/>
            </Route>
          </Routes>
        </BrowserRouter>
      </QueryClientProvider>
      <ToastContainer />
    </>
  );
}

export default App;
