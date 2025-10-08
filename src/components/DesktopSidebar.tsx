import { NavContent } from "@/components/NavContent";

export const DesktopSidebar = () => {
  return (
    <aside className="hidden md:flex fixed left-0 top-0 z-40 h-full w-56 p-4">
      <div className="bg-transparent w-full flex flex-col overflow-y-auto no-scrollbar">
        <NavContent />
      </div>
    </aside>
  );
};
