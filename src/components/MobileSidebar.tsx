import { useState } from "react";
import { Link } from "react-router-dom";
import { NavContent } from "@/components/NavContent";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Menu } from "lucide-react";

export const MobileSidebar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <div className="md:hidden">
      <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
        <SheetTrigger asChild>
          <Button
            variant="ghost"
            size="icon"
            className="fixed top-4 right-4 z-50 backdrop-blur-sm text-white hover:bg-black/70 cursor-pointer"
          >
            <Menu className="h-6 w-6" />
            <span className="sr-only">Toggle Menu</span>
          </Button>
        </SheetTrigger>
        <SheetContent
          side="left"
          className="bg-transparent border-none text-white w-64 p-4 flex flex-col overflow-y-auto no-scrollbar [&>button.absolute]:hidden"
          aria-describedby={undefined}
        >
          <SheetHeader>
            <SheetTitle>
              <Link
                to="/"
                className="text-white text-2xl text-center font-semibold block hover:italic transition-colors"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                RUBY SERESIN
              </Link>
            </SheetTitle>
          </SheetHeader>
          <div className="flex-1 min-h-dvh">
            <NavContent onLinkClick={() => setIsMobileMenuOpen(false)} />
          </div>
        </SheetContent>
      </Sheet>
    </div>
  );
};
