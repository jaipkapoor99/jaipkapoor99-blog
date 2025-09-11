import React from "react";
import { Link } from "react-router-dom";
import { Button } from "./ui/button";

const Header: React.FC = () => {
  return (
    <header className="flex justify-between items-center p-4 border-b">
      <Link to="/">
        <h1 className="text-2xl font-bold">Jai Kapoor's Tech Blog</h1>
      </Link>
      <nav>
        <ul className="flex space-x-4">
          <li>
            <Button asChild variant="ghost">
              <Link to="/">Home</Link>
            </Button>
          </li>
          {/* Add more navigation links here if needed */}
        </ul>
      </nav>
    </header>
  );
};

export default Header;
