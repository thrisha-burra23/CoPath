import { Button } from "@/components/ui/button";
import logo from "../assets/logo.png";
import map from "/map.png";
import LandingHeader from "../components/landingPage/LandingHeader";
import { IndianRupee, Route, Shield, Users } from "lucide-react";
import SearchCardOriginal from "../components/userDashboard/SearchCardOriginal";
import { Card, CardContent } from "@/components/ui/card";
import { Link } from "react-router-dom";

const LandingPage = () => {
  return (
    <>
      {/* ================= HERO SECTION ================= */}
      <div className="h-screen flex flex-col bg-gradient-to-br from-gray-50 via-slate-50 to-gray-100">
        <LandingHeader />

        <div className="flex-1 flex items-center flex-col justify-between py-12">
          <div className="max-w-7xl mx-auto px-6 md:px-10 grid md:grid-cols-2 gap-16 items-center w-full">
            {/* LEFT SIDE */}
            <div className="space-y-8">
              <div className="flex items-center gap-4">
                <img src={logo} alt="CoPath" className="w-14 h-14" />
                <h1 className="text-5xl font-bold text-gray-900">
                  <span className="bg-gradient-to-r from-cyan-400 via-sky-500 to-indigo-600 bg-clip-text text-transparent">
                    Co
                  </span>
                  Path
                </h1>
              </div>

              <p className="text-lg text-gray-600 leading-relaxed max-w-lg">
                Smarter carpooling for everyday travel. Save money, reduce
                traffic, and travel together with verified drivers.
              </p>

              <div className="flex gap-4">
                <Button className="px-6 h-11 rounded-xl bg-gradient-to-r from-cyan-400 via-sky-500 to-indigo-600 text-white shadow-lg hover:opacity-90 transition">
                  <Link to="/login">Search Ride</Link>
                </Button>

                <Button
                  variant="outline"
                  className="px-6 h-11 rounded-xl border-gray-300 hover:bg-gray-100 transition"
                >
                  <Link to="/login">Offer Ride</Link>
                </Button>
              </div>

              <div className="flex gap-8 pt-4 text-gray-600 flex-wrap">
                <div className="flex items-center gap-2">
                  <IndianRupee size={18} />
                  Save Money
                </div>
                <div className="flex items-center gap-2">
                  <Users size={18} />
                  Travel Together
                </div>
                <div className="flex items-center gap-2">
                  <Shield size={18} />
                  Safe & Verified
                </div>
              </div>
            </div>

            {/* RIGHT SIDE */}
            <div className="relative rounded-3xl overflow-hidden shadow-2xl">
              {/* MAP */}
              <img
                src={map}
                alt="Hyderabad Map"
                className="w-full h-[500px] object-cover"
              />

              {/* Smooth Bottom Gradient */}
              <div className="absolute inset-0 bg-gradient-to-t from-white/90 via-white/40 to-transparent"></div>

              {/* SEARCH CARD - Integrated */}
              <div className="absolute bottom-10 left-1/2 -translate-x-1/2 w-full max-w-xl px-6">
                <div className="bg-white rounded-3xl shadow-xl p-8 border border-gray-200">
                  <SearchCardOriginal />
                </div>
              </div>
            </div>
          </div>

          {/* ================= STATS SECTION ================= */}
          <div className="max-w-6xl mx-auto mt-13 px-1">
            <div className="bg-white rounded-3xl shadow-lg border border-gray-200 py-10 px-8 grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
              <div>
                <h3 className="text-3xl font-bold text-gray-900">10K+</h3>
                <p className="text-gray-500 text-sm mt-1">Rides Completed</p>
              </div>

              <div>
                <h3 className="text-3xl font-bold text-gray-900">2.5K+</h3>
                <p className="text-gray-500 text-sm mt-1">Verified Drivers</p>
              </div>

              <div>
                <h3 className="text-3xl font-bold text-gray-900">4.8★</h3>
                <p className="text-gray-500 text-sm mt-1">Average Rating</p>
              </div>

              <div>
                <h3 className="text-3xl font-bold text-gray-900">15+</h3>
                <p className="text-gray-500 text-sm mt-1">
                  Hyderabad Areas Covered
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ================= HOW IT WORKS ================= */}
      <section id="how" className="py-24 bg-white px-6">
        <h2 className="text-4xl font-bold text-center text-gray-900 mb-16">
          How CoPath Works
        </h2>

        <div className="max-w-6xl mx-auto grid md:grid-cols-3 gap-10">
          <Card className="bg-white border border-gray-200 rounded-2xl shadow-md hover:shadow-xl transition">
            <CardContent className="p-8 text-center">
              <Route className="mx-auto mb-4 text-cyan-500" size={40} />
              <h3 className="text-xl font-semibold mb-2 text-gray-800">
                Search Ride
              </h3>
              <p className="text-gray-600 text-sm">
                Enter your route and find matching rides instantly.
              </p>
            </CardContent>
          </Card>

          <Card className="bg-white border border-gray-200 rounded-2xl shadow-md hover:shadow-xl transition">
            <CardContent className="p-8 text-center">
              <Users className="mx-auto mb-4 text-cyan-500" size={40} />
              <h3 className="text-xl font-semibold mb-2 text-gray-800">
                Connect
              </h3>
              <p className="text-gray-600 text-sm">
                Book securely and chat with verified drivers.
              </p>
            </CardContent>
          </Card>

          <Card className="bg-white border border-gray-200 rounded-2xl shadow-md hover:shadow-xl transition">
            <CardContent className="p-8 text-center">
              <Shield className="mx-auto mb-4 text-cyan-500" size={40} />
              <h3 className="text-xl font-semibold mb-2 text-gray-800">
                Travel Safe
              </h3>
              <p className="text-gray-600 text-sm">
                Enjoy affordable and safe journeys together.
              </p>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* ================= WHY CHOOSE COPATH ================= */}
      <section id="why" className="py-24 bg-gray-50 px-6">
        <h2 className="text-4xl font-bold text-center text-gray-900 mb-16">
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
              className="bg-white border border-gray-200 p-6 rounded-2xl shadow-sm hover:shadow-lg transition"
            >
              {item}
            </div>
          ))}
        </div>
      </section>

      {/* ================= DRIVER SECTION ================= */}
      <section id="driver" className="py-24 bg-white px-6">
        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-4xl font-bold text-gray-900 mb-6">
              Turn Empty Seats Into Earnings
            </h2>
            <p className="text-gray-600 mb-6">
              Offer rides, accept passenger requests, and manage earnings
              effortlessly with CoPath’s driver dashboard.
            </p>
            <Button className="px-6 h-11 rounded-xl bg-gradient-to-r from-cyan-400 via-sky-500 to-indigo-600 text-white shadow-lg hover:opacity-90 transition">
              <Link to="/login">Start Offering Rides</Link>
            </Button>
          </div>

          <div className="bg-gray-50 p-10 rounded-2xl border border-gray-200 shadow-sm">
            <ul className="space-y-4 text-gray-700">
              <li>✔ Flexible ride scheduling</li>
              <li>✔ Secure passenger verification</li>
              <li>✔ Track ride earnings</li>
              <li>✔ Real-time booking updates</li>
            </ul>
          </div>
        </div>
      </section>

      {/* ================= CTA ================= */}
      <section className="py-20 bg-gradient-to-r from-cyan-500 to-indigo-600 text-white text-center">
        <h2 className="text-4xl font-bold mb-6">Ready to Ride Smarter?</h2>
        <div className="flex justify-center gap-6">
          <Button className="bg-white text-black hover:bg-gray-200 px-8">
            <Link to="/login">Search Ride</Link>
          </Button>
          <Button
            variant="outline"
            className="border-white text-white px-8 hover:bg-white/10"
          >
            <Link to="/login">Offer Ride</Link>
          </Button>
        </div>
      </section>

      {/* ================= FOOTER ================= */}
      <footer className="py-10 bg-gray-900 text-center text-gray-400 text-sm">
        © 2026 CoPath. All rights reserved.
      </footer>
    </>
  );
};

export default LandingPage;
