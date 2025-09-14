import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "./ui/button";
import ThemeToggle from "./ThemeToggle";
import ScrollProgress from "./ScrollProgress";
import { toDataUrl } from "../utils/image";
// No need to inline-load logo; serve SVG directly from /public

const Header: React.FC = () => {
  return (
    <header className="w-full fixed top-0 z-50 bg-gradient-to-r from-white via-pink-50 to-white backdrop-blur border-b border-pink-primary/30 shadow-sm relative">
      <div className="max-w-screen-xl mx-auto flex justify-between items-center p-4">
        <Link
          to="/"
          aria-label="The Subversive Writer"
          className="flex items-center gap-3"
        >
          <Logo />
          <span className="sr-only">The Subversive Writer</span>
        </Link>
        <nav>
          <ul className="flex items-center space-x-2 sm:space-x-4">
            <li>
              <Button asChild variant="ghost" className="hover:bg-pink-200/50">
                <Link
                  to="/"
                  className="text-gray-800 hover:text-gray-900 link-underline nav-link"
                >
                  Home
                </Link>
              </Button>
            </li>
            <li>
              <Button asChild variant="ghost" className="hover:bg-pink-200/50">
                <Link
                  to="/all-posts"
                  className="text-gray-800 hover:text-gray-900 link-underline nav-link"
                >
                  All Posts
                </Link>
              </Button>
            </li>
            <li>
              <Button asChild variant="ghost" className="hover:bg-pink-200/50">
                <Link
                  to="/contact"
                  className="text-gray-800 hover:text-gray-900 link-underline nav-link"
                >
                  Contact
                </Link>
              </Button>
            </li>
            <li>
              <ThemeToggle />
            </li>
          </ul>
        </nav>
      </div>
      {/* Scroll progress stripe */}
      <div className="absolute left-0 right-0 bottom-0 h-0.5">
        <ScrollProgress />
      </div>
    </header>
  );
};

export default Header;

const Logo: React.FC = () => {
  const [src, setSrc] = useState<string>("/logo.png");

  useEffect(() => {
    let cancelled = false;
    // Use the repo's decoder to convert to a data URL
    toDataUrl("/logo.png")
      .then((data) => {
        if (!cancelled && data) setSrc(data);
      })
      .catch(() => {
        // keep fallback src
      });
    return () => {
      cancelled = true;
    };
  }, []);

  return (
    <img
      src={src}
      alt="The Subversive Writer"
      className="h-8 sm:h-9 w-auto"
      onError={(e) => {
        (e.currentTarget as HTMLImageElement).src = "/desktop-computer.svg";
      }}
    />
  );
};
