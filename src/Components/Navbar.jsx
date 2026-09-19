import React, { useState, useRef, useEffect } from "react";
import { NavLink, Link, useLocation } from "react-router-dom";
import {
  Menu,
  X,
  Activity,
  Bell,
  CheckCheck,
  Trash2,
  Info,
  LogIn,
  UserPlus,
} from "lucide-react";
import { useNotifications } from "../Context/NotificationContext";
import { motion, AnimatePresence } from "framer-motion";
import AuthModal from "./AuthModal";

const Navbar = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [notifDropdownOpen, setNotifDropdownOpen] = useState(false);
  const [authModalOpen, setAuthModalOpen] = useState(false);
  const [authMode, setAuthMode] = useState("login");
  const [logoError, setLogoError] = useState(false);

  const {
    notifications,
    unreadCount,
    markAllAsRead,
    clearNotifications,
    markAsRead,
  } = useNotifications();

  const notifDropdownRef = useRef(null);
  const location = useLocation();

  // Close menus on route change
  useEffect(() => {
    setMobileMenuOpen(false);
    setNotifDropdownOpen(false);
  }, [location.pathname]);

  // Click outside to close notifications
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        notifDropdownRef.current &&
        !notifDropdownRef.current.contains(event.target)
      ) {
        setNotifDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const openAuth = (mode) => {
    setAuthMode(mode);
    setAuthModalOpen(true);
    setMobileMenuOpen(false);
  };

  const navLinks = [
    { name: "Home", path: "/" },
    { name: "Report Issue", path: "/report" },
    { name: "Dashboard", path: "/dashboard" },
    { name: "About", path: "/about" },
  ];

  return (
    <>
      <header className="sticky top-0 z-40 w-full backdrop-blur-md bg-slate-900/90 border-b border-slate-800/80 transition-colors duration-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo & Brand */}
            <Link
              to="/"
              className="flex items-center gap-2.5 group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 rounded-lg"
            >
              {!logoError ? (
                <img
                  src="/logo.png"
                  alt="CivicPulse"
                  onError={() => setLogoError(true)}
                  className="w-8 h-8 object-contain rounded-lg group-hover:scale-105 transition-transform duration-200"
                />
              ) : (
                <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-blue-600 to-cyan-500 flex items-center justify-center text-white shadow-md shadow-blue-500/20 group-hover:scale-105 transition-transform duration-200">
                  <Activity className="w-4 h-4 animate-pulse" />
                </div>
              )}
              <div className="flex flex-col">
                <span className="text-xl font-extrabold tracking-tight bg-gradient-to-r from-blue-400 via-blue-300 to-cyan-400 bg-clip-text text-transparent">
                  CivicPulse
                </span>
              </div>
            </Link>

            {/* Desktop Navigation Links */}
            <nav className="hidden lg:flex items-center gap-1 bg-slate-800/60 p-1 rounded-full border border-slate-700/60">
              {navLinks.map((link) => (
                <NavLink
                  key={link.path}
                  to={link.path}
                  className={({ isActive }) =>
                    `px-3.5 py-1.5 rounded-full text-xs font-semibold tracking-wide transition-all duration-200 ${
                      isActive
                        ? "bg-slate-900 text-cyan-400 shadow-xs"
                        : "text-slate-400 hover:text-slate-200"
                    }`
                  }
                >
                  {link.name}
                </NavLink>
              ))}
            </nav>

            {/* Right Action Area: Notifications + [ Login ] [ Sign Up ] */}
            <div className="hidden lg:flex items-center gap-2.5">
              {/* Notification Bell Dropdown */}
              <div className="relative" ref={notifDropdownRef}>
                <button
                  type="button"
                  onClick={() => setNotifDropdownOpen(!notifDropdownOpen)}
                  aria-label="View notifications"
                  className="relative p-2 rounded-xl text-slate-400 hover:text-slate-100 hover:bg-slate-800/80 transition-colors border border-transparent hover:border-slate-700 cursor-pointer"
                >
                  <Bell className="w-4 h-4 text-slate-300" />
                  {unreadCount > 0 && (
                    <span className="absolute top-1.5 right-1.5 flex h-2 w-2">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75" />
                      <span className="relative inline-flex rounded-full h-2 w-2 bg-cyan-400" />
                    </span>
                  )}
                </button>

                <AnimatePresence>
                  {notifDropdownOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: 6, scale: 0.95 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: 6, scale: 0.95 }}
                      transition={{ duration: 0.15 }}
                      className="absolute right-0 mt-2 w-80 sm:w-88 bg-slate-900 rounded-2xl shadow-xl border border-slate-800 z-50 overflow-hidden"
                    >
                      {/* Header */}
                      <div className="flex items-center justify-between px-4 py-3 border-b border-slate-800">
                        <div className="flex items-center gap-2">
                          <span className="text-xs font-bold text-slate-100">
                            Notifications
                          </span>
                          {unreadCount > 0 && (
                            <span className="text-[10px] font-bold px-1.5 py-0.5 rounded-full bg-blue-950 text-cyan-400 border border-blue-900">
                              {unreadCount} new
                            </span>
                          )}
                        </div>

                        <div className="flex items-center gap-1 text-[11px]">
                          {unreadCount > 0 && (
                            <button
                              onClick={markAllAsRead}
                              className="text-cyan-400 hover:underline flex items-center gap-1 font-medium cursor-pointer"
                            >
                              <CheckCheck className="w-3 h-3" />
                              <span>Mark read</span>
                            </button>
                          )}
                          {notifications.length > 0 && (
                            <button
                              onClick={clearNotifications}
                              className="text-slate-400 hover:text-rose-400 ml-2 p-1 rounded-md transition cursor-pointer"
                              title="Clear all"
                            >
                              <Trash2 className="w-3 h-3" />
                            </button>
                          )}
                        </div>
                      </div>

                      {/* Notification List */}
                      <div className="max-h-72 overflow-y-auto divide-y divide-slate-800/60">
                        {notifications.length === 0 ? (
                          <div className="py-8 px-4 text-center">
                            <Info className="w-6 h-6 text-slate-500 mx-auto mb-2" />
                            <p className="text-xs font-semibold text-slate-300">
                              No notifications yet
                            </p>
                            <p className="text-[11px] text-slate-500 mt-0.5">
                              You'll receive updates here when you submit or track issues.
                            </p>
                          </div>
                        ) : (
                          notifications.map((n) => (
                            <div
                              key={n.id}
                              onClick={() => markAsRead(n.id)}
                              className={`p-3.5 transition-colors cursor-pointer text-left ${
                                !n.read
                                    ? "bg-slate-800/50"
                                    : "hover:bg-slate-800/30"
                              }`}
                            >
                              <div className="flex items-start justify-between gap-2">
                                <p className="text-xs font-bold text-slate-100">
                                  {n.title}
                                </p>
                                <span className="text-[10px] text-slate-500 shrink-0">
                                  {n.timestamp}
                                </span>
                              </div>
                              <p className="text-xs text-slate-400 mt-1 leading-snug">
                                {n.message}
                              </p>
                            </div>
                          ))
                        )}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* Authentication Actions: [ Login ] [ Sign Up ] */}
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => openAuth("login")}
                  className="px-3 py-1.5 text-xs font-semibold rounded-xl text-slate-300 hover:text-white hover:bg-slate-800/80 border border-slate-700/80 transition-all cursor-pointer flex items-center gap-1.5"
                >
                  <LogIn className="w-3.5 h-3.5 text-slate-400" />
                  <span>Login</span>
                </button>

                <button
                  type="button"
                  onClick={() => openAuth("signup")}
                  className="px-3.5 py-1.5 text-xs font-semibold rounded-xl bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-500 hover:to-cyan-500 text-white shadow-xs shadow-blue-500/25 transition-all duration-200 hover:-translate-y-0.5 cursor-pointer flex items-center gap-1.5"
                >
                  <UserPlus className="w-3.5 h-3.5" />
                  <span>Sign Up</span>
                </button>
              </div>
            </div>

            {/* Mobile Actions (Notification + Hamburger) */}
            <div className="flex lg:hidden items-center gap-1.5">
              {/* Mobile Notification Button */}
              <button
                onClick={() => {
                  setNotifDropdownOpen(!notifDropdownOpen);
                  setMobileMenuOpen(false);
                }}
                aria-label="View notifications"
                className="relative p-2.5 rounded-xl text-slate-300 hover:bg-slate-800 transition min-h-[44px] min-w-[44px] flex items-center justify-center cursor-pointer"
              >
                <Bell className="w-5 h-5" />
                {unreadCount > 0 && (
                  <span className="absolute top-2 right-2 h-2 w-2 rounded-full bg-cyan-400" />
                )}
              </button>

              {/* Hamburger Button */}
              <button
                onClick={() => {
                  setMobileMenuOpen(!mobileMenuOpen);
                  setNotifDropdownOpen(false);
                }}
                aria-label="Toggle navigation menu"
                className="p-2.5 rounded-xl text-slate-200 hover:bg-slate-800 transition min-h-[44px] min-w-[44px] flex items-center justify-center cursor-pointer"
              >
                {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Notification Dropdown */}
        <AnimatePresence>
          {notifDropdownOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="lg:hidden border-t border-slate-800 bg-slate-900 px-4 py-3 shadow-lg"
            >
              <div className="flex items-center justify-between pb-2 mb-2 border-b border-slate-800">
                <span className="text-xs font-bold text-slate-100">
                  Notifications ({unreadCount} new)
                </span>
                <div className="flex items-center gap-3 text-xs">
                  {unreadCount > 0 && (
                    <button
                      onClick={markAllAsRead}
                      className="text-cyan-400 font-medium py-1 px-1.5"
                    >
                      Mark read
                    </button>
                  )}
                  {notifications.length > 0 && (
                    <button
                      onClick={clearNotifications}
                      className="text-slate-400 hover:text-rose-400 py-1 px-1.5"
                    >
                      Clear
                    </button>
                  )}
                </div>
              </div>

              <div className="max-h-60 overflow-y-auto space-y-2">
                {notifications.length === 0 ? (
                  <p className="text-xs text-slate-500 py-4 text-center">
                    No notifications yet.
                  </p>
                ) : (
                  notifications.map((n) => (
                    <div
                      key={n.id}
                      onClick={() => markAsRead(n.id)}
                      className={`p-3 rounded-xl text-left transition cursor-pointer ${
                        !n.read
                          ? "bg-slate-800/60"
                          : "bg-slate-800/30"
                      }`}
                    >
                      <div className="flex justify-between items-start gap-1">
                        <p className="text-xs font-bold text-slate-100">
                          {n.title}
                        </p>
                        <span className="text-[10px] text-slate-500">{n.timestamp}</span>
                      </div>
                      <p className="text-xs text-slate-400 mt-0.5">
                        {n.message}
                      </p>
                    </div>
                  ))
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Mobile Navigation Drawer */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.2 }}
              className="lg:hidden border-t border-slate-800 bg-slate-900/95 backdrop-blur-md px-4 py-4 space-y-3 overflow-hidden"
            >
              {/* Navigation Links: Home, Report Issue, Dashboard, About */}
              <div className="space-y-1.5">
                {navLinks.map((link) => (
                  <NavLink
                    key={link.path}
                    to={link.path}
                    onClick={() => setMobileMenuOpen(false)}
                    className={({ isActive }) =>
                      `flex items-center justify-between px-4 py-3 rounded-xl text-sm font-semibold transition-colors min-h-[44px] ${
                        isActive
                          ? "bg-slate-800/80 text-cyan-400"
                          : "text-slate-300 hover:bg-slate-800/50"
                      }`
                    }
                  >
                    <span>{link.name}</span>
                  </NavLink>
                ))}
              </div>

              {/* Mobile Auth Actions: [ Login ] [ Sign Up ] */}
              <div className="pt-3 border-t border-slate-800 grid grid-cols-2 gap-2.5">
                <button
                  type="button"
                  onClick={() => openAuth("login")}
                  className="w-full min-h-[44px] flex items-center justify-center gap-2 py-2.5 px-3 rounded-xl border border-slate-700 bg-slate-800/60 text-slate-200 text-sm font-semibold transition hover:bg-slate-800 cursor-pointer"
                >
                  <LogIn className="w-4 h-4 text-slate-400" />
                  <span>Login</span>
                </button>

                <button
                  type="button"
                  onClick={() => openAuth("signup")}
                  className="w-full min-h-[44px] flex items-center justify-center gap-2 py-2.5 px-3 rounded-xl bg-gradient-to-r from-blue-600 to-cyan-600 text-white text-sm font-semibold shadow-xs transition hover:from-blue-500 hover:to-cyan-500 cursor-pointer"
                >
                  <UserPlus className="w-4 h-4" />
                  <span>Sign Up</span>
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      {/* Auth Modal for Login and Sign Up */}
      <AuthModal
        isOpen={authModalOpen}
        onClose={() => setAuthModalOpen(false)}
        initialMode={authMode}
      />
    </>
  );
};

export default Navbar;
