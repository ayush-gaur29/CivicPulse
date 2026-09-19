import React, { useState, useRef, useEffect } from "react";
import { NavLink, Link, useLocation } from "react-router-dom";
import {
  Menu,
  X,
  Sun,
  Moon,
  Monitor,
  Activity,
  PlusCircle,
  ChevronDown,
} from "lucide-react";
import { useTheme } from "../Context/ThemeContext";
import { motion, AnimatePresence } from "framer-motion";

const Navbar = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [themeDropdownOpen, setThemeDropdownOpen] = useState(false);
  const { theme, setTheme, resolvedTheme } = useTheme();
  const dropdownRef = useRef(null);
  const location = useLocation();

  // Close mobile menu on route change
  useEffect(() => {
    setMobileMenuOpen(false);
    setThemeDropdownOpen(false);
  }, [location.pathname]);

  // Click outside to close theme dropdown
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setThemeDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const navLinks = [
    { name: "Home", path: "/" },
    { name: "Report Issue", path: "/report" },
    { name: "Dashboard", path: "/dashboard" },
    { name: "About", path: "/about" },
  ];

  const themeOptions = [
    { value: "light", label: "Light", icon: Sun },
    { value: "dark", label: "Dark", icon: Moon },
    { value: "system", label: "System", icon: Monitor },
  ];

  const CurrentThemeIcon =
    theme === "system"
      ? Monitor
      : resolvedTheme === "dark"
      ? Moon
      : Sun;

  return (
    <header className="sticky top-0 z-40 w-full backdrop-blur-md bg-white/85 dark:bg-slate-900/85 border-b border-slate-200/80 dark:border-slate-800/80 transition-colors duration-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link
            to="/"
            className="flex items-center gap-2.5 group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 rounded-lg"
          >
            <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-blue-600 to-cyan-500 flex items-center justify-center text-white shadow-md shadow-blue-500/20 group-hover:scale-105 transition-transform duration-200">
              <Activity className="w-5 h-5 animate-pulse" />
            </div>
            <div className="flex flex-col">
              <span className="text-xl font-extrabold tracking-tight bg-gradient-to-r from-blue-600 via-blue-700 to-cyan-600 dark:from-blue-400 dark:via-blue-300 dark:to-cyan-400 bg-clip-text text-transparent">
                CivicPulse
              </span>
            </div>
          </Link>

          {/* Desktop Navigation Links */}
          <nav className="hidden md:flex items-center gap-1 bg-slate-100/70 dark:bg-slate-800/50 p-1 rounded-full border border-slate-200/60 dark:border-slate-700/60">
            {navLinks.map((link) => (
              <NavLink
                key={link.path}
                to={link.path}
                className={({ isActive }) =>
                  `px-4 py-1.5 rounded-full text-xs font-semibold tracking-wide transition-all duration-200 ${
                    isActive
                      ? "bg-white dark:bg-slate-900 text-blue-600 dark:text-cyan-400 shadow-xs"
                      : "text-slate-600 hover:text-slate-900 dark:text-slate-400 dark:hover:text-slate-200"
                  }`
                }
              >
                {link.name}
              </NavLink>
            ))}
          </nav>

          {/* Right Action Area */}
          <div className="hidden md:flex items-center gap-3">
            {/* Theme Selector Dropdown */}
            <div className="relative" ref={dropdownRef}>
              <button
                type="button"
                onClick={() => setThemeDropdownOpen(!themeDropdownOpen)}
                aria-label="Toggle theme"
                className="flex items-center gap-1.5 p-2 rounded-xl text-slate-600 hover:text-slate-900 dark:text-slate-400 dark:hover:text-slate-100 hover:bg-slate-100 dark:hover:bg-slate-800/80 transition-colors border border-transparent hover:border-slate-200 dark:hover:border-slate-700"
              >
                <CurrentThemeIcon className="w-4 h-4 text-blue-600 dark:text-cyan-400" />
                <ChevronDown className="w-3.5 h-3.5 opacity-60" />
              </button>

              <AnimatePresence>
                {themeDropdownOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: 6, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 6, scale: 0.95 }}
                    transition={{ duration: 0.15 }}
                    className="absolute right-0 mt-2 w-36 bg-white dark:bg-slate-900 rounded-xl shadow-lg border border-slate-200 dark:border-slate-800 py-1 z-50 overflow-hidden"
                  >
                    {themeOptions.map((opt) => {
                      const Icon = opt.icon;
                      const isSelected = theme === opt.value;
                      return (
                        <button
                          key={opt.value}
                          onClick={() => {
                            setTheme(opt.value);
                            setThemeDropdownOpen(false);
                          }}
                          className={`w-full flex items-center gap-2.5 px-3 py-2 text-xs font-medium text-left transition-colors ${
                            isSelected
                              ? "bg-blue-50 dark:bg-slate-800 text-blue-600 dark:text-cyan-400 font-semibold"
                              : "text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800/60"
                          }`}
                        >
                          <Icon className="w-4 h-4" />
                          <span>{opt.label}</span>
                        </button>
                      );
                    })}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Quick Report CTA */}
            <Link
              to="/report"
              className="inline-flex items-center gap-1.5 px-3.5 py-1.5 text-xs font-semibold rounded-xl bg-blue-600 hover:bg-blue-700 text-white shadow-xs shadow-blue-500/25 transition-all duration-200 hover:-translate-y-0.5"
            >
              <PlusCircle className="w-3.5 h-3.5" />
              <span>Report Issue</span>
            </Link>
          </div>

          {/* Mobile Actions (Theme + Hamburger) */}
          <div className="flex md:hidden items-center gap-2">
            {/* Quick Theme Toggle on Mobile */}
            <button
              onClick={() => {
                const next = resolvedTheme === "dark" ? "light" : "dark";
                setTheme(next);
              }}
              aria-label="Toggle theme"
              className="p-2 rounded-xl text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800"
            >
              {resolvedTheme === "dark" ? (
                <Sun className="w-5 h-5 text-amber-400" />
              ) : (
                <Moon className="w-5 h-5 text-blue-600" />
              )}
            </button>

            {/* Hamburger Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label="Toggle navigation menu"
              className="p-2 rounded-xl text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.2 }}
            className="md:hidden border-t border-slate-200/80 dark:border-slate-800 bg-white/95 dark:bg-slate-900/95 backdrop-blur-md px-4 py-4 space-y-2 overflow-hidden"
          >
            <div className="space-y-1">
              {navLinks.map((link) => (
                <NavLink
                  key={link.path}
                  to={link.path}
                  onClick={() => setMobileMenuOpen(false)}
                  className={({ isActive }) =>
                    `flex items-center justify-between px-3.5 py-2.5 rounded-xl text-sm font-semibold transition-colors ${
                      isActive
                        ? "bg-blue-50 dark:bg-slate-800/80 text-blue-600 dark:text-cyan-400"
                        : "text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800/50"
                    }`
                  }
                >
                  <span>{link.name}</span>
                </NavLink>
              ))}
            </div>

            <div className="pt-3 border-t border-slate-200 dark:border-slate-800 flex flex-col gap-2">
              <Link
                to="/report"
                onClick={() => setMobileMenuOpen(false)}
                className="w-full flex items-center justify-center gap-2 py-2.5 rounded-xl bg-blue-600 text-white text-sm font-semibold shadow-xs"
              >
                <PlusCircle className="w-4 h-4" />
                <span>Report an Issue</span>
              </Link>

              <div className="flex items-center justify-between px-3 py-2 text-xs text-slate-500 dark:text-slate-400">
                <span>Theme Preference</span>
                <div className="flex items-center gap-1 bg-slate-100 dark:bg-slate-800 p-1 rounded-lg">
                  {themeOptions.map((opt) => {
                    const Icon = opt.icon;
                    return (
                      <button
                        key={opt.value}
                        onClick={() => setTheme(opt.value)}
                        className={`p-1.5 rounded-md ${
                          theme === opt.value
                            ? "bg-white dark:bg-slate-700 text-blue-600 dark:text-cyan-400 shadow-xs"
                            : "text-slate-500 hover:text-slate-800 dark:hover:text-slate-200"
                        }`}
                        title={opt.label}
                      >
                        <Icon className="w-3.5 h-3.5" />
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Navbar;
