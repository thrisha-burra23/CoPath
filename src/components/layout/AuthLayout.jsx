import DashboardSkeleton from "@/src/loadingSkeleton/DashboardSkeleton";
import { useState } from "react";
import { Outlet, useOutletContext } from "react-router-dom";
import UserProfileDrawer from "../profile/UserProfileDrawer";
import Header from "../userDashboard/Header";


const AuthLayout = () => {
  const { user, authLoading } = useOutletContext();
  const [isProfileOpen, setIsProfileOpen] = useState(false);

  if (authLoading) return <DashboardSkeleton/>

  return (
    <>
      <Header
        user={user}
        onProfileClick={() => setIsProfileOpen(true)}
      />

      <main className="relative px-8 py-6">
        <Outlet context={{ user, authLoading }} />
      </main>

      <UserProfileDrawer
        open={isProfileOpen}
        onClose={() => setIsProfileOpen(false)}
      />
    </>
  );
};

export default AuthLayout;