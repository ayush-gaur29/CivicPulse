import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import { Menu, X, Sun, Moon } from "lucide-react";

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [darkMode, setDarkMode] = useState(false);

  const toggleMenu = () => setMenuOpen(!menuOpen);
  const toggleTheme = () => {
    setDarkMode(!darkMode);
    document.documentElement.classList.toggle("dark");
  };

  const navLinks = [
    { name: "Home", path: "/" },
    { name: "Report Issue", path: "/report" },
    { name: "Dashboard", path: "/dashboard" },
    { name: "About", path: "/about" },
  ];

  return (
    <nav className="bg-white dark:bg-gray-900 shadow-md sticky top-0 z-50 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-10 py-4 flex items-center justify-between">
        {/* Logo Section */}
        <div className="flex items-center space-x-2">
          
          <span className="text-xl font-extrabold bg-gradient-to-r from-blue-600 to-emerald-500 bg-clip-text text-transparent tracking-tight">
            CivicPulse
          </span>
        </div>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center space-x-8">
          {navLinks.map((link) => (
            <NavLink
              key={link.name}
              to={link.path}
              className={({ isActive }) =>
                `text-sm font-semibold tracking-wide transition-colors duration-200 ${
                  isActive
                    ? "text-blue-600 dark:text-emerald-400"
                    : "text-gray-700 hover:text-blue-500 dark:text-gray-300 dark:hover:text-emerald-400"
                }`
              }
            >
              {link.name}
            </NavLink>
          ))}

          
          
        </div>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden p-2 text-gray-700 dark:text-gray-200"
          onClick={toggleMenu}
        >
          {menuOpen ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      {/* Mobile Dropdown */}
      {menuOpen && (
        <div className="md:hidden bg-gray-50 dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700 px-5 py-3 space-y-3">
          {navLinks.map((link) => (
            <NavLink
              key={link.name}
              to={link.path}
              onClick={() => setMenuOpen(false)}
              className={({ isActive }) =>
                `block text-sm font-medium ${
                  isActive
                    ? "text-blue-600 dark:text-emerald-400"
                    : "text-gray-700 dark:text-gray-300 hover:text-blue-500 dark:hover:text-emerald-400"
                }`
              }
            >
              {link.name}
            </NavLink>
          ))}

          
        </div>
      )}
    </nav>
  );
};

export default Navbar;
