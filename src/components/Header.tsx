import React from "react";
import { Link } from "react-router-dom";
import { Button } from "./ui/button";
import ThemeToggle from "./ThemeToggle";
import ScrollProgress from "./ScrollProgress";

const Header: React.FC = () => {
  return (
    <header className="w-full fixed top-0 z-50 bg-gradient-to-r from-white/90 via-pink-50/60 to-white/90 backdrop-blur border-b border-pink-primary/30 shadow-sm relative">
      <div className="max-w-screen-xl mx-auto flex justify-between items-center p-4">
        <Link to="/">
          <h1 className="text-2xl font-bold text-pink-primary">Jai Kapoor's Tech Blog</h1>
        </Link>
        <nav>
          <ul className="flex items-center space-x-2 sm:space-x-4">
            <li>
              <Button asChild variant="ghost">
                <Link to="/" className="text-gray-700 hover:text-pink-accent link-underline">Home</Link>
              </Button>
            </li>
            <li>
              <Button asChild variant="ghost">
                <Link to="/all-posts" className="text-gray-700 hover:text-pink-accent link-underline">All Posts</Link>
              </Button>
            </li>
            <li>
              <Button asChild variant="ghost">
                <Link to="/contact" className="text-gray-700 hover:text-pink-accent link-underline">Contact</Link>
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
