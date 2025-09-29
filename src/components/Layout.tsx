import { Outlet } from "react-router-dom";
import { DesktopSidebar } from "@/components/DesktopSidebar";
import { MobileSidebar } from "@/components/MobileSidebar";

export default function Layout() {
  return (
    <div className="min-h-screen">
      {/* Render the two different sidebars */}
      <MobileSidebar />
      <DesktopSidebar />

      {/* Main content area needs the margin to avoid the desktop sidebar */}
      <main className="">
        <Outlet />
      </main>
    </div>
  );
}
