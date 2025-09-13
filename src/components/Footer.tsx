import React from "react";
import { Link } from "react-router-dom";

const Footer: React.FC = () => {
  return (
    <footer className="w-full bg-gradient-to-r from-white via-pink-50 to-white border-t border-pink-primary/30 p-4 text-center text-sm text-gray-600 mt-8">
      <p>
        © {new Date().getFullYear()} The Subversive Writer. All rights
        reserved.
      </p>
      <p className="mt-1 text-xs text-gray-500">
        Some content may be AI‑assisted.{" "}
        <Link
          to="/ai-disclaimer"
          className="text-pink-primary underline hover:no-underline"
        >
          Read more
        </Link>
        .
      </p>
    </footer>
  );
};

export default Footer;
