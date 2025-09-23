import { useState, useEffect } from "react";
import { Link, Outlet, useLocation } from "react-router-dom";
import { client, projectsQuery } from "@/lib/sanity";
import type { Project } from "@/lib/sanity-types";
import { cn } from "@/lib/utils";

// --- Shadcn Component Imports ---
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

// --- Icon Imports ---
import { Mail, Instagram, Menu } from "lucide-react";

// Reusable NavContent component, refactored to use Cards and correct flex layout
const NavContent = ({ onLinkClick }: { onLinkClick?: () => void }) => {
  const { pathname } = useLocation();
  const [projects, setProjects] = useState<Project[]>([]);

  useEffect(() => {
    // This fetch logic is unchanged
    async function fetchProjects() {
      try {
        const fetchedProjects = await client.fetch<Project[]>(projectsQuery);
        setProjects(fetchedProjects || []);
      } catch (error) {
        console.error("Error fetching projects for navigation:", error);
      }
    }
    fetchProjects();
  }, []);

  const filmProjects = projects.filter((p) => p.projectType === "film");
  const codeProjects = projects.filter((p) => p.projectType === "code");

  const cardClassName = "bg-black/90 border-white/40 text-white";

  return (
    <div className="flex flex-col h-full">
      <nav className="flex flex-col space-y-1">
        {filmProjects.length > 0 && (
          <Card className={cardClassName}>
            <CardContent>
              <h3 className="font-medium mb-3 text-sm tracking-wide">Film</h3>
              <ul className="space-y-1.5">
                {filmProjects.map((project) => (
                  <li key={project._id}>
                    <Link
                      to={`/film/${project.slug.current}`}
                      className={cn(
                        "block text-sm text-white/70 hover:text-white transition-colors",
                        pathname === `/film/${project.slug.current}` &&
                          "text-white font-medium"
                      )}
                      onClick={onLinkClick}
                    >
                      {project.title}
                    </Link>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        )}

        {codeProjects.length > 0 && (
          <Card className={cardClassName}>
            <CardContent>
              <h3 className="font-medium mb-3 text-sm tracking-wide">Code</h3>
              <ul className="space-y-1.5">
                {codeProjects.map((project) => (
                  <li key={project._id}>
                    <Link
                      to={`/code/${project.slug.current}`}
                      className={cn(
                        "block text-sm text-white/70 hover:text-white transition-colors",
                        pathname === `/code/${project.slug.current}` &&
                          "text-white font-medium"
                      )}
                      onClick={onLinkClick}
                    >
                      {project.title}
                    </Link>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        )}

        <Card className={cardClassName}>
          <CardContent>
            <Link
              to="/about"
              className={cn(
                "block text-sm text-white/70 hover:text-white transition-colors",
                pathname === "/about" && "text-white font-medium"
              )}
              onClick={onLinkClick}
            >
              About
            </Link>
          </CardContent>
        </Card>
      </nav>

      {/* --- This spacer div pushes the contact card to the bottom --- */}
      <div className="flex-1" />

      {/* Bottom section for contact links */}
      <div>
        <Card className={cardClassName}>
          <CardContent>
            <a
              href="mailto:ruby.seresin@gmail.com"
              className="flex items-center gap-3 text-sm text-white/70 hover:text-white transition-colors"
            >
              <Mail className="h-4 w-4" />
              <span>email</span>
            </a>
            <a
              href="https://instagram.com/rubyseresin"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-3 text-sm text-white/70 hover:text-white transition-colors"
            >
              <Instagram className="h-4 w-4" />
              <span>instagram</span>
            </a>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default function Layout() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <div className="min-h-screen bg-black">
      {/* --- Mobile Navigation using Shadcn Sheet --- */}
      <div className="md:hidden">
        <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
          <SheetTrigger asChild>
            <Button
              variant="ghost"
              size="icon"
              className="fixed top-4 left-4 z-50 bg-black/50 backdrop-blur-sm text-white hover:bg-black/70"
            >
              <Menu className="h-6 w-6" />
              <span className="sr-only">Toggle Menu</span>
            </Button>
          </SheetTrigger>
          <SheetContent
            side="left"
            className="bg-transparent border-r-white/10 text-white w-64 p-4"
          >
            <SheetHeader className="mb-4">
              <SheetTitle>
                <Link
                  to="/"
                  className="text-white font-serif text-lg font-bold hover:text-white/80 transition-colors"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  RUBY SERESIN
                </Link>
              </SheetTitle>
            </SheetHeader>
            <NavContent onLinkClick={() => setIsMobileMenuOpen(false)} />
          </SheetContent>
        </Sheet>
      </div>

      {/* --- Desktop Sidebar --- */}
      <aside className="hidden md:flex fixed left-0 top-0 z-40 h-full w-56 p-4">
        <div className="w-full">
          <Link
            to="/"
            className="text-white font-serif text-lg text-center font-bold mb-4 block hover:text-white/80 transition-colors"
          >
            RUBY SERESIN
          </Link>
          <NavContent />
        </div>
      </aside>

      {/* Renders the current page's component */}
      <main>
        <Outlet />
      </main>
    </div>
  );
}
