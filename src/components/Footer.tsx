import React from "react";

const Footer: React.FC = () => {
  return (
    <footer className="w-full bg-gradient-to-r from-white via-pink-50 to-white border-t border-pink-primary/30 p-4 text-center text-sm text-gray-600 mt-8">
      © {new Date().getFullYear()} The Subversive Writer. All rights reserved.
    </footer>
  );
};

export default Footer;
