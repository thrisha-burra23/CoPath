import { useAuthUser } from "@/src/reactQuery/authHooks";
import { useProfile } from "@/src/reactQuery/profileHooks";
import React from "react";

const ProfileTab = () => {
  const { data: authUser } = useAuthUser();
  const { data: profile, isLoading } = useProfile(authUser?.$id);

  if (isLoading) {
    return <p className="text-sm text-gray-500">Loading profile...</p>;
  }

  if (!profile) {
    return <p className="text-sm text-red-500">Profile not found</p>;
  }
  return (
    <div className="space-y-4">
      <h3 className="font-semibold text-lg">👤 Profile</h3>

      <div className="space-y-2 text-sm">
        <p>
          <span className="text-gray-500">Name:</span>{" "}
          <span className="font-medium">{profile.name}</span>
        </p>

        <p>
          <span className="text-gray-500">Email:</span>{" "}
          <span className="font-medium">{authUser.email}</span>
        </p>

        <p>
          <span className="text-gray-500">Phone:</span>{" "}
          <span className="font-medium">{profile.phone || "—"}</span>
        </p>

        <p>
          <span className="text-gray-500">Role:</span>{" "}
          <span className="font-medium">
            {profile.driverApproved ? "Driver" : "User"}
          </span>
        </p>

        <p>
          <span className="text-gray-500">Wallet Balance:</span>{" "}
          <span className="font-medium">₹{profile.walletBalance ?? 0}</span>
        </p>
      </div>
    </div>
  );
};

export default ProfileTab;
