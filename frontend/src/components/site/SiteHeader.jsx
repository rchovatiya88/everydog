import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X, Disc } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/events", label: "Events" },
  { href: "/training", label: "Training" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
];

export function SiteHeader() {
  const location = useLocation();
  const [open, setOpen] = useState(false);

  return (
    <header
      data-testid="site-header"
      className="sticky top-0 z-40 backdrop-blur supports-[backdrop-filter]:bg-background/70 border-b border-border"
    >
      <div className="container-main flex h-16 items-center justify-between">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2 group" data-testid="nav-home-link">
          <div className="w-9 h-9 rounded-full bg-[#0B74B5] flex items-center justify-center">
            <Disc className="w-5 h-5 text-white" />
          </div>
          <span className="font-display text-lg font-bold text-foreground tracking-tight">
            EveryDog<span className="text-[#0B74B5]"> League</span>
          </span>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-1">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              to={link.href}
              data-testid={`nav-${link.label.toLowerCase()}-link`}
              className={`px-3 py-2 text-sm font-medium rounded-lg transition-colors duration-200 ${
                location.pathname === link.href
                  ? "text-[#0B74B5] bg-[#E7F4FD]"
                  : "text-foreground hover:text-[#0B74B5] hover:bg-[#E7F4FD]/50"
              }`}
            >
              {link.label}
            </Link>
          ))}
          <Link to="/events">
            <Button className="ml-3 rounded-[12px] bg-[#0B74B5] text-white hover:bg-[#095d91] shadow-sm" size="sm">
              Join a Meetup
            </Button>
          </Link>
        </nav>

        {/* Mobile Menu */}
        <Sheet open={open} onOpenChange={setOpen}>
          <SheetTrigger asChild>
            <Button
              variant="ghost"
              size="icon"
              className="md:hidden"
              data-testid="mobile-menu-button"
            >
              <Menu className="h-5 w-5" />
            </Button>
          </SheetTrigger>
          <SheetContent side="right" className="w-[280px] p-0">
            <div className="flex flex-col p-6">
              <div className="flex items-center gap-2 mb-8">
                <div className="w-9 h-9 rounded-full bg-[#0B74B5] flex items-center justify-center">
                  <Disc className="w-5 h-5 text-white" />
                </div>
                <span className="font-display text-lg font-bold">EveryDog League</span>
              </div>
              <nav className="flex flex-col gap-2">
                {navLinks.map((link) => (
                  <Link
                    key={link.href}
                    to={link.href}
                    onClick={() => setOpen(false)}
                    className={`px-4 py-3 text-base font-medium rounded-xl transition-colors ${
                      location.pathname === link.href
                        ? "text-[#0B74B5] bg-[#E7F4FD]"
                        : "text-foreground hover:bg-muted"
                    }`}
                  >
                    {link.label}
                  </Link>
                ))}
                <Link to="/events" onClick={() => setOpen(false)}>
                  <Button className="w-full mt-4 rounded-[12px] bg-[#0B74B5] text-white h-12 text-base">
                    Join a Meetup
                  </Button>
                </Link>
              </nav>
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </header>
  );
}
