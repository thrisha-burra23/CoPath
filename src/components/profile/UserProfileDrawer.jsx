import { useState } from "react";
import ProfileTab from "./ProfileTab";
import Logout from "./Logout";
import MyBookingsTab from "./MyBookingsTab";
import DriverTab from "./DriverTab";

const TABS = [
  { key: "profile", label: "Profile" },
  { key: "bookings", label: "My Bookings" },
  { key: "driver", label: "Driver" },
];

const UserProfileDrawer = ({ open, onClose }) => {
  const [activeTab, setActiveTab] = useState("profile");
  

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex">
      <div className="absolute inset-0 bg-black/40" onClick={onClose} />

      <div className="relative ml-auto h-full w-100 bg-white shadow-xl flex flex-col">
        <div className="flex items-center justify-between p-4 border-b">
          <h2 className="text-lg font-semibold">My Account</h2>
          <button onClick={onClose} className="text-xl">
            ✕
          </button>
        </div>

        <div className="flex flex-1 overflow-hidden">
          <div className="w-32 border-r bg-gray-50">
            {TABS.map((tab) => (
              <button
                key={tab.key}
                onClick={() => setActiveTab(tab.key)}
                className={`w-full text-left px-4 py-3 text-sm border-l-4 transition
                  ${
                    activeTab === tab.key
                      ? "border-indigo-600 bg-white font-medium"
                      : "border-transparent text-gray-600 hover:bg-gray-100"
                  }`}
              >
                {tab.label}
              </button>
            ))}
            <Logout/>
          </div>
          

          <div className="flex-1 overflow-y-auto p-4">
            {activeTab === "profile" && <ProfileTab/>}

            {activeTab === "bookings" && (
             <MyBookingsTab/>
            )}

            {activeTab === "driver" && (
              <DriverTab />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserProfileDrawer;
