// components/Navbar.js

import React from 'react';
import { Menu } from 'lucide-react';

const Navbar = ({ toggleMobileSidebar }) => {
  return (
    <nav className="bg-white shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <button
              onClick={toggleMobileSidebar}
              className="text-gray-500 hover:text-gray-700 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500 lg:hidden"
            >
              <Menu className="h-6 w-6" />
            </button>
            <div className="flex-shrink-0 flex items-center ml-4 lg:ml-0">
              <span className="text-2xl font-bold text-indigo-600">Dashboard</span>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
