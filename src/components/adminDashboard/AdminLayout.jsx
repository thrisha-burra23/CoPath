import { SidebarProvider } from "@/components/ui/sidebar"
import AdminSidebar from "./AdminSidebar"
import { Outlet } from "react-router-dom";

const AdminLayout = () => {
  return (
    <SidebarProvider>
      <div className="flex min-h-screen w-full">
        <AdminSidebar />
        <main className="flex-1 p-6 bg-gray-100">
          <Outlet />
        </main>
      </div>
    </SidebarProvider>
  );
};

export default AdminLayout