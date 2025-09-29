import { Link } from "react-router-dom";
import { NavContent } from "@/components/NavContent";

export const DesktopSidebar = () => {
  return (
    <aside className="hidden md:flex fixed left-0 top-0 z-40 h-full w-56 p-4">
      <div className="bg-transparent w-full flex flex-col h-full">
        <Link
          to="/"
          className="text-white text-2xl text-center font-semibold mb-4 block hover:italic transition-colors"
        >
          RUBY SERESIN
        </Link>
        <div className="flex-1 overflow-y-auto no-scrollbar">
          <NavContent />
        </div>
      </div>
    </aside>
  );
};
