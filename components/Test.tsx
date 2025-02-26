"use client";

import { useState } from "react";
import { Menu, X } from "lucide-react";

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  const closeSidebar = () => {
    setIsOpen(false);
  };

  return (
    <div className="relative">
      {/* Menu Button */}
      <button
        onClick={toggleSidebar}
        className="fixed top-4 left-4 z-50 p-2 bg-gray-800 text-white rounded-md"
      >
        <Menu size={24} />
      </button>

      {/* Black Screen Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-30"
          onClick={closeSidebar}
        ></div>
      )}

      {/* Sidebar */}
      <div
        className={`fixed top-0 left-0 h-full w-64 bg-gray-900 text-white p-6 shadow-lg z-40 transform transition-transform duration-300 ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        {/* Close Button */}
        <button
          onClick={toggleSidebar}
          className="absolute top-4 right-4 p-2 bg-gray-700 rounded-md"
        >
          <X size={24} />
        </button>

        {/* Sidebar Content */}
        <nav className="mt-10">
          <ul className="space-y-4">
            <li>
              <a href="#" className="block p-2 hover:bg-gray-700 rounded">
                Home
              </a>
            </li>
            <li>
              <a href="#" className="block p-2 hover:bg-gray-700 rounded">
                About
              </a>
            </li>
            <li>
              <a href="#" className="block p-2 hover:bg-gray-700 rounded">
                Services
              </a>
            </li>
            <li>
              <a href="#" className="block p-2 hover:bg-gray-700 rounded">
                Contact
              </a>
            </li>
          </ul>
        </nav>
      </div>
    </div>
  );
};

export default Sidebar;
