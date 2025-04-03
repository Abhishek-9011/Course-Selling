import React from "react";
import { Facebook, Twitter, Linkedin, Instagram } from "lucide-react";

function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-300 py-10">
      <div className="container mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Logo & About Section */}
        <div>
          <h2 className="text-2xl font-bold text-white">Logo</h2>
          <p className="mt-2 text-sm">
            A short description about the website or brand. Stay connected with us for more updates.
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="text-lg font-semibold text-white">Quick Links</h3>
          <ul className="mt-2 space-y-2">
            <li className="hover:text-amber-400 cursor-pointer transition">Home</li>
            <li className="hover:text-amber-400 cursor-pointer transition">Dashboard</li>
            <li className="hover:text-amber-400 cursor-pointer transition">About</li>
            <li className="hover:text-amber-400 cursor-pointer transition">Contact</li>
          </ul>
        </div>

        {/* Contact & Social Media */}
        <div>
          <h3 className="text-lg font-semibold text-white">Contact</h3>
          <p className="mt-2 text-sm">Email: support@example.com</p>
          <p className="text-sm">Phone: +123 456 7890</p>
          
          {/* Social Icons */}
          <div className="flex gap-4 mt-4">
            <Facebook className="text-white cursor-pointer hover:text-amber-400 transition" size={24} />
            <Twitter className="text-white cursor-pointer hover:text-amber-400 transition" size={24} />
            <Linkedin className="text-white cursor-pointer hover:text-amber-400 transition" size={24} />
            <Instagram className="text-white cursor-pointer hover:text-amber-400 transition" size={24} />
          </div>
        </div>
      </div>

      {/* Bottom Copyright */}
      <div className="text-center text-sm text-gray-500 mt-8">
        © {new Date().getFullYear()} YourBrand. All rights reserved.
      </div>
    </footer>
  );
}

export default Footer;