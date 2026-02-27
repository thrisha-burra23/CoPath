import { Button } from "@/components/ui/button";
import bgImage from "../assets/bgImage.png";
import logo from "../assets/logo.png";
import LandingHeader from "../components/landingPage/LandingHeader";
import { IndianRupee, Route, Shield, Users } from "lucide-react";
import SearchCardOriginal from "../components/userDashboard/SearchCardOriginal";
import { Card, CardContent } from "@/components/ui/card";
import { Link } from "react-router-dom";

const LandingPage = () => {
  return (
    <>
      {/* ================= YOUR EXISTING HERO SECTION ================= */}
      <div
        className="min-h-screen bg-cover bg-center flex flex-col relative"
        style={{ backgroundImage: `url(${bgImage})` }}
      >
        <LandingHeader />

        <div className="flex flex-col mt-20">
          <div className="flex flex-row items-center justify-center">
            <img src={logo} alt="CoPath" className="w-38 h-38 mb-4" />
            <div className="flex flex-col items-center text-center mb-5">
              <h1 className="text-7xl font-bold text-white">
                <span className="bg-linear-to-r from-cyan-400 via-sky-400 to-indigo-600 bg-clip-text text-transparent">
                  Co
                </span>
                Path
              </h1>
              <p className="text-lg text-white/80 mt-2">Smarter Carpooling</p>
            </div>
          </div>

          <div className="flex justify-center items-center">
            <SearchCardOriginal />
          </div>
        </div>

        <div className="flex flex-row gap-8 items-center justify-center absolute bottom-6 left-1/2 -translate-x-1/2">
          <div className="flex gap-1">
            <IndianRupee className="text-white" />
            <span className="text-white">Save Money</span>
          </div>
          <div className="flex gap-1">
            <Users className="text-white" />
            <span className="text-white">Travel together</span>
          </div>
          <div className="flex gap-1">
            <Route className="text-white" />
            <span className="text-white">Smart routes</span>
          </div>
          <div className="flex gap-1">
            <Shield className="text-white" />
            <span className="text-white">Safe rides</span>
          </div>
        </div>
      </div>

      {/* ================= HOW IT WORKS ================= */}

      <section
        id="how"
        className="scroll-mt-24 py-24 bg-linear-to-b from-[#3f65b1] to-[#0e2a66] text-white px-6"
      >
        <h2 className="text-4xl font-bold text-center mb-16">
          How CoPath Works
        </h2>

        <div className="max-w-6xl mx-auto grid md:grid-cols-3 gap-10">
          <Card className="bg-white/5 backdrop-blur-lg border border-white/10 hover:bg-white/10 transition duration-300">
            <CardContent className="p-8 text-center">
              <Route className="mx-auto mb-4 text-cyan-400" size={40} />
              <h3 className="text-xl font-semibold mb-2">Search Ride</h3>
              <p className="text-gray-300 text-sm">
                Enter your route and find matching rides instantly.
              </p>
            </CardContent>
          </Card>

          <Card className="bg-white/5 backdrop-blur-lg border border-white/10 hover:bg-white/10 transition duration-300">
            <CardContent className="p-8 text-center">
              <Users className="mx-auto mb-4 text-cyan-400" size={40} />
              <h3 className="text-xl font-semibold mb-2">Connect</h3>
              <p className="text-gray-300 text-sm">
                Book securely and chat with verified drivers.
              </p>
            </CardContent>
          </Card>

          <Card className="bg-white/5 backdrop-blur-lg border border-white/10 hover:bg-white/10 transition duration-300">
            <CardContent className="p-8 text-center">
              <Shield className="mx-auto mb-4 text-cyan-400" size={40} />
              <h3 className="text-xl font-semibold mb-2">Travel Safe</h3>
              <p className="text-gray-300 text-sm">
                Enjoy affordable and safe journeys together.
              </p>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* ================= WHY CHOOSE COPATH ================= */}

      <section
        id="why"
        className="scroll-mt-24 py-24 bg-linear-to-b from-[#3f65b1] to-[#0e2a66] text-white px-6"
      >
        <h2 className="text-4xl font-bold text-center mb-16">
          Why Choose CoPath?
        </h2>

        <div className="max-w-6xl mx-auto grid md:grid-cols-3 gap-8 text-center">
          {[
            "💰 Save up to 40% travel cost",
            "🛡 Verified drivers & secure bookings",
            "📍 Smart route matching",
            "💳 Seamless online payments",
            "⭐ Ratings & reviews",
            "🚗 Easy ride management",
          ].map((item, index) => (
            <div
              key={index}
              className="bg-white/5 backdrop-blur-md p-6 rounded-xl border border-white/10 hover:bg-white/10 transition duration-300"
            >
              {item}
            </div>
          ))}
        </div>
      </section>

      {/* ================= DRIVER SECTION ================= */}

      <section
        id="driver"
        className="scroll-mt-24 py-24 bg-linear-to-b from-[#3f65b1] to-[#0e2a66] text-white px-6"
      >
        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-4xl font-bold mb-6">
              Turn Empty Seats Into Earnings
            </h2>
            <p className="text-gray-300 mb-6">
              Offer rides, accept passenger requests, and manage earnings
              effortlessly with CoPath’s driver dashboard.
            </p>
            <Button className="bg-cyan-500 hover:bg-cyan-600 px-8 shadow-lg shadow-cyan-500/30">
              <Link to={"/login"}>Start Offering Rides</Link>
            </Button>
          </div>

          <div className="bg-white/5 backdrop-blur-xl p-10 rounded-2xl border border-white/10">
            <ul className="space-y-4 text-gray-300">
              <li>✔ Flexible ride scheduling</li>
              <li>✔ Secure passenger verification</li>
              <li>✔ Track ride earnings</li>
              <li>✔ Real-time booking updates</li>
            </ul>
          </div>
        </div>
      </section>

      {/* ================= CTA ================= */}
      <section className="py-20 bg-linear-to-r from-cyan-600 to-indigo-600 text-white text-center">
        <h2 className="text-4xl font-bold mb-6">Ready to Ride Smarter?</h2>
        <div className="flex justify-center gap-6">
          <Button className="bg-white text-black hover:bg-gray-200 px-8">
            <Link to={"/login"}>Search Ride</Link>
          </Button>
          <Button variant="outline" className="border-white text-white px-8">
            <Link to={"/login"}>Offer Ride</Link>
          </Button>
        </div>
      </section>

      {/* ================= FOOTER ================= */}
      <footer className="py-10 bg-[#081a3a] text-center text-gray-400 text-sm">
        © 2026 CoPath. All rights reserved.
      </footer>
    </>
  );
};

export default LandingPage;
