import React from "react";
import { Link } from "react-router-dom";
import { Activity, Heart, ShieldCheck, Github, ExternalLink } from "lucide-react";

export const Footer = () => {
  return (
    <footer className="border-t border-slate-800 bg-slate-900/60 backdrop-blur-sm transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8 mb-8">
          {/* Brand Column */}
          <div className="sm:col-span-2 md:col-span-2 space-y-4">
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-blue-600 to-cyan-500 flex items-center justify-center text-white shadow-md shadow-blue-500/20">
                <Activity className="w-5 h-5" />
              </div>
              <span className="text-xl font-bold bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
                CivicPulse
              </span>
            </div>
            <p className="text-sm text-slate-400 max-w-md leading-relaxed">
              CivicPulse is a community-driven civic issue reporting and engagement platform. Empowering citizens to report local infrastructure issues and collaborate with authorities to build cleaner, safer cities.
            </p>
            <div className="flex items-center gap-2 text-xs text-slate-400 pt-1">
              <ShieldCheck className="w-4 h-4 text-emerald-500" />
              <span>Civic Transparency & Public Accountability</span>
            </div>
          </div>

          {/* Quick Navigation */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-100 mb-4">
              Platform
            </h4>
            <ul className="space-y-2.5 text-sm">
              <li>
                <Link
                  to="/"
                  className="text-slate-400 hover:text-cyan-400 transition"
                >
                  Home
                </Link>
              </li>
              <li>
                <Link
                  to="/report"
                  className="text-slate-400 hover:text-cyan-400 transition"
                >
                  Report an Issue
                </Link>
              </li>
              <li>
                <Link
                  to="/dashboard"
                  className="text-slate-400 hover:text-cyan-400 transition"
                >
                  Civic Dashboard
                </Link>
              </li>
              <li>
                <Link
                  to="/about"
                  className="text-slate-400 hover:text-cyan-400 transition"
                >
                  About Initiative
                </Link>
              </li>
            </ul>
          </div>

          {/* Civic Focus Areas */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-100 mb-4">
              Focus Areas
            </h4>
            <ul className="space-y-2.5 text-sm text-slate-400">
              <li className="flex items-center gap-2">
                <span>🚧</span> Damaged Roads & Potholes
              </li>
              <li className="flex items-center gap-2">
                <span>🗑️</span> Waste & Sanitation
              </li>
              <li className="flex items-center gap-2">
                <span>💡</span> Streetlights & Electrical
              </li>
              <li className="flex items-center gap-2">
                <span>💧</span> Water Supply & Drainage
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-400 text-center sm:text-left">
          <div className="flex flex-wrap items-center justify-center sm:justify-start gap-1.5">
            <span>© {new Date().getFullYear()} CivicPulse. Built with</span>
            <Heart className="w-3.5 h-3.5 text-rose-500 fill-rose-500 inline" />
            <span>by Ayush Gaur for better communities.</span>
          </div>
          <div className="flex items-center gap-6 justify-center sm:justify-end">
            <a
              href="https://github.com/ayush-gaur29"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 hover:text-slate-200 transition py-1 min-h-[40px] sm:min-h-0"
            >
              <Github className="w-4 h-4" />
              <span>GitHub</span>
            </a>
            <Link
              to="/about"
              className="inline-flex items-center gap-1 hover:text-slate-200 transition py-1 min-h-[40px] sm:min-h-0"
            >
              <span>Developer Details</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

