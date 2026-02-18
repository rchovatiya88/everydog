import { Link } from "react-router-dom";
import { Disc, Instagram, Mail, Heart } from "lucide-react";

export function SiteFooter() {
  return (
    <footer className="bg-[#10212B] text-white" data-testid="site-footer">
      <div className="container-main section-spacing">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 lg:gap-12">
          {/* Brand */}
          <div className="md:col-span-1">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-9 h-9 rounded-full bg-[#0B74B5] flex items-center justify-center">
                <Disc className="w-5 h-5 text-white" />
              </div>
              <span className="font-display text-lg font-bold">
                EveryDog League
              </span>
            </div>
            <p className="text-sm text-gray-400 leading-relaxed max-w-xs">
              Every Dog Gets to Fly. Dallas's inclusive disc dog community where all breeds, sizes, and skill levels are welcome.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-display font-semibold text-sm uppercase tracking-wider text-gray-300 mb-4">
              Quick Links
            </h4>
            <ul className="space-y-2">
              {[
                { href: "/events", label: "Events" },
                { href: "/training", label: "Training" },
                { href: "/about", label: "About Us" },
                { href: "/contact", label: "Contact" },
              ].map((link) => (
                <li key={link.href}>
                  <Link
                    to={link.href}
                    className="text-sm text-gray-400 hover:text-white transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Community */}
          <div>
            <h4 className="font-display font-semibold text-sm uppercase tracking-wider text-gray-300 mb-4">
              Community
            </h4>
            <ul className="space-y-2">
              <li>
                <Link to="/contact" className="text-sm text-gray-400 hover:text-white transition-colors">
                  Volunteer
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-sm text-gray-400 hover:text-white transition-colors">
                  Become a Sponsor
                </Link>
              </li>
              <li>
                <Link to="/events" className="text-sm text-gray-400 hover:text-white transition-colors">
                  Upcoming Events
                </Link>
              </li>
            </ul>
          </div>

          {/* Connect */}
          <div>
            <h4 className="font-display font-semibold text-sm uppercase tracking-wider text-gray-300 mb-4">
              Connect
            </h4>
            <div className="flex gap-3 mb-4">
              <a
                href="https://instagram.com/everydogleague"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-[#0B74B5] transition-colors"
                data-testid="footer-instagram-link"
              >
                <Instagram className="w-4 h-4" />
              </a>
              <a
                href="mailto:hello@everydogleague.com"
                className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-[#0B74B5] transition-colors"
                data-testid="footer-email-link"
              >
                <Mail className="w-4 h-4" />
              </a>
            </div>
            <p className="text-sm text-gray-400">
              hello@everydogleague.com
            </p>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="border-t border-white/10 mt-10 pt-6 flex flex-col sm:flex-row justify-between items-center gap-4">
          <p className="text-xs text-gray-500">
            &copy; {new Date().getFullYear()} EveryDog League. All rights reserved.
          </p>
          <p className="text-xs text-gray-500 flex items-center gap-1">
            Made with <Heart className="w-3 h-3 text-[#FF8A2A] fill-[#FF8A2A]" /> in Dallas, TX
          </p>
        </div>
      </div>
    </footer>
  );
}
