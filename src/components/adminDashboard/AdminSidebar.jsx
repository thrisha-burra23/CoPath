// src/admin/components/AdminSidebar.jsx
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
} from "@/components/ui/sidebar";
import { NavLink } from "react-router-dom";

const AdminSidebar = () => {
  return (
    <>
      <Sidebar>
        <SidebarContent>
          <SidebarGroup>
            <SidebarGroupLabel>Copath Admin</SidebarGroupLabel>

            <SidebarGroupContent>

              <SidebarMenu>
                <SidebarMenuItem>
                  <SidebarMenuButton asChild>
                    <NavLink to="/admin/dashboard">📊 Dashboard</NavLink>
                  </SidebarMenuButton>
                </SidebarMenuItem>

                <SidebarMenuItem>
                  <SidebarMenuButton asChild>
                    <NavLink to="/admin/users">👤 Users</NavLink>
                  </SidebarMenuButton>
                </SidebarMenuItem>

                {/* <SidebarMenuItem>
                  <SidebarMenuButton asChild>
                    <NavLink to="/admin/drivers">🚗 Drivers</NavLink>
                  </SidebarMenuButton>
                </SidebarMenuItem> */}

                <SidebarMenuItem>
                  <SidebarMenuButton asChild>
                    <NavLink to="/admin/driver-requests">
                      📝 Driver Requests
                    </NavLink>
                  </SidebarMenuButton>
                </SidebarMenuItem>

                <SidebarMenuItem>
                  <SidebarMenuButton asChild>
                    <NavLink to="/admin/payments">💳 Payments</NavLink>
                  </SidebarMenuButton>
                </SidebarMenuItem>

                <SidebarMenuItem>
                  <SidebarMenuButton asChild>
                    <NavLink to="/admin/settings">⚙️ Settings</NavLink>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        </SidebarContent>

        <SidebarFooter>
          <SidebarMenu>
            <SidebarMenuItem>
              <SidebarMenuButton className="text-red-500">
                🚪 Sign Out
              </SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarFooter>
      </Sidebar>
    </>
  );
};

export default AdminSidebar;
