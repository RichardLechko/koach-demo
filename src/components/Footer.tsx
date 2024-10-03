// src/components/Footer.tsx
import React from "react";

const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-800 text-white py-4 mt-10">
      <div className="container mx-auto text-center">
        <p className="mb-2">© {new Date().getFullYear()} Koach</p>
        <p className="flex gap-4 justify-center footer-links">
          <a href="/" className="text-gray-400 hover:text-white">
            About Us
          </a>
          <a href="/" className="text-gray-400 hover:text-white">
            Contact
          </a>
          <a href="/" className="text-gray-400 hover:text-white">
            Privacy Policy
          </a>
        </p>
      </div>
    </footer>
  );
};

export default Footer;
