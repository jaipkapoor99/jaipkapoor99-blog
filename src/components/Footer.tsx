import React from "react";

const Footer: React.FC = () => {
  return (
    <footer className="border-t p-4 text-center text-sm text-gray-500 mt-8">
      © {new Date().getFullYear()} Jai Kapoor's Tech Blog. All rights reserved.
    </footer>
  );
};

export default Footer;
