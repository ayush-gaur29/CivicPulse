import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {
  AlertTriangle,
  MapPin,
  Users,
  ArrowRight,
  ShieldCheck,
  CheckCircle2,
  Clock,
  BarChart3,
  ChevronRight,
} from "lucide-react";
import { motion } from "framer-motion";
import Button from "../Components/ui/Button";

const Home = () => {
  const [stats, setStats] = useState({
    total: 0,
    resolved: 0,
    pending: 0,
  });

  useEffect(() => {
    document.title = "CivicPulse — Community Civic Issue Reporting Platform";
    try {
      const stored = JSON.parse(localStorage.getItem("issues")) || [];
      const resolved = stored.filter((i) => i.status === "Resolved").length;
      const pending = stored.filter((i) => i.status === "Pending" || !i.status).length;
      setStats({
        total: stored.length,
        resolved,
        pending,
      });
    } catch {
      // Fallback
    }
  }, []);

  const featureCards = [
    {
      icon: AlertTriangle,
      title: "Report Issues",
      description:
        "Easily document potholes, overflowing dumpsters, broken streetlights, or water leaks with photos and location details.",
      accent: "from-blue-500/20 to-cyan-500/20 text-cyan-400",
      borderHover: "group-hover:border-blue-500/40",
      step: "01",
    },
    {
      icon: MapPin,
      title: "Track Location",
      description:
        "Every submission is geo-tagged. Municipal teams and citizens can pinpoint exact coordinates and monitor neighborhood updates.",
      accent: "from-cyan-500/20 to-teal-500/20 text-cyan-400",
      borderHover: "group-hover:border-cyan-500/40",
      step: "02",
    },
    {
      icon: Users,
      title: "Community Impact",
      description:
        "Track resolution status from pending to completed. Transparency promotes accountability and faster municipal turnarounds.",
      accent: "from-indigo-500/20 to-blue-500/20 text-indigo-400",
      borderHover: "group-hover:border-indigo-500/40",
      step: "03",
    },
  ];

  const categories = [
    { name: "Damaged Roads", icon: "🚧", desc: "Potholes, cracks & road hazards" },
    { name: "Garbage Overflow", icon: "🗑️", desc: "Sanitation & waste collection" },
    { name: "Streetlights", icon: "💡", desc: "Dark alleys & faulty fixtures" },
    { name: "Water Supply", icon: "💧", desc: "Pipeline leaks & contaminated water" },
  ];

  return (
    <div className="relative overflow-hidden bg-slate-950 text-slate-100">
      {/* Background Decorators */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-[600px] pointer-events-none overflow-hidden -z-10">
        <div className="absolute -top-32 left-1/4 w-96 h-96 bg-blue-600/10 rounded-full blur-3xl" />
        <div className="absolute -top-20 right-1/4 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl" />
      </div>

      {/* Hero Section */}
      <section className="relative pt-12 pb-16 sm:pt-16 sm:pb-20 md:pt-24 md:pb-28 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="text-center max-w-3xl mx-auto">
          {/* Civic Tech Badge */}
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-blue-900/60 bg-blue-950/40 text-cyan-300 text-xs font-semibold mb-6 shadow-xs max-w-full"
          >
            <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse shrink-0" />
            <span className="truncate">Civic Tech Platform for Smarter Neighborhoods</span>
          </motion.div>

          {/* Main Headline */}
          <motion.h1
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight text-slate-50 leading-[1.18]"
          >
            Empowering Communities with{" "}
            <span className="bg-gradient-to-r from-blue-400 via-cyan-300 to-cyan-400 bg-clip-text text-transparent">
              CivicPulse
            </span>
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="mt-5 sm:mt-6 text-sm sm:text-base md:text-lg lg:text-xl text-slate-300 max-w-2xl mx-auto leading-relaxed"
          >
            Report civic issues, track municipal response in real-time, and collaborate with your neighborhood to build cleaner, safer, and smarter cities.
          </motion.p>

          {/* Action CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4"
          >
            <Link to="/report" className="w-full sm:w-auto">
              <Button
                size="lg"
                className="w-full sm:w-auto shadow-md shadow-blue-500/25 min-h-[44px]"
                icon={<ArrowRight className="w-4 h-4 order-last" />}
              >
                Report an Issue
              </Button>
            </Link>

            <Link to="/dashboard" className="w-full sm:w-auto">
              <Button
                variant="outline"
                size="lg"
                className="w-full sm:w-auto min-h-[44px]"
                icon={<BarChart3 className="w-4 h-4 text-cyan-400" />}
              >
                View Live Dashboard
              </Button>
            </Link>
          </motion.div>

          {/* Trust Points */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="mt-10 sm:mt-12 pt-6 sm:pt-8 border-t border-slate-800/80 flex flex-wrap items-center justify-center gap-4 sm:gap-10 text-xs font-medium text-slate-400"
          >
            <div className="flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
              <span>Geo-verified Reporting</span>
            </div>
            <div className="flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4 text-cyan-400 shrink-0" />
              <span>Direct Authority Routing</span>
            </div>
            <div className="flex items-center gap-1.5">
              <Clock className="w-4 h-4 text-cyan-400 shrink-0" />
              <span>Real-time Status Tracking</span>
            </div>
          </motion.div>
        </div>

        {/* Live Community Metric Cards */}
        <div className="mt-12 sm:mt-14 max-w-4xl mx-auto grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4">
          <div className="p-4 sm:p-5 rounded-2xl bg-slate-900/70 border border-slate-800/80 shadow-xs backdrop-blur-xs flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-blue-500/10 text-cyan-400 flex items-center justify-center font-bold text-xl shrink-0">
              {stats.total > 0 ? stats.total : "120+"}
            </div>
            <div>
              <p className="text-xs text-slate-400 font-medium">Issues Reported</p>
              <p className="text-sm font-bold text-slate-100">Active Community Voice</p>
            </div>
          </div>

          <div className="p-4 sm:p-5 rounded-2xl bg-slate-900/70 border border-slate-800/80 shadow-xs backdrop-blur-xs flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-emerald-500/10 text-emerald-400 flex items-center justify-center font-bold text-xl shrink-0">
              {stats.resolved > 0 ? stats.resolved : "85%"}
            </div>
            <div>
              <p className="text-xs text-slate-400 font-medium">Issues Resolved</p>
              <p className="text-sm font-bold text-slate-100">Municipal Action Rate</p>
            </div>
          </div>

          <div className="p-4 sm:p-5 rounded-2xl bg-slate-900/70 border border-slate-800/80 shadow-xs backdrop-blur-xs flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-amber-500/10 text-amber-400 flex items-center justify-center font-bold text-xl shrink-0">
              &lt;24h
            </div>
            <div>
              <p className="text-xs text-slate-400 font-medium">Response Time</p>
              <p className="text-sm font-bold text-slate-100">First Triage Review</p>
            </div>
          </div>
        </div>
      </section>

      {/* How CivicPulse Works Section */}
      <section className="py-16 sm:py-20 bg-slate-900/40 border-y border-slate-800/60 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-12 sm:mb-16">
            <h2 className="text-xs font-bold uppercase tracking-wider text-cyan-400 mb-2">
              Streamlined Process
            </h2>
            <p className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-slate-100 tracking-tight">
              How CivicPulse Works
            </p>
            <p className="mt-3 text-xs sm:text-sm md:text-base text-slate-400">
              A transparent three-step workflow connecting citizen reports directly to neighborhood impact.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5 lg:gap-8">
            {featureCards.map((card) => {
              const Icon = card.icon;
              return (
                <motion.div
                  key={card.title}
                  whileHover={{ y: -4 }}
                  transition={{ duration: 0.2 }}
                  className={`group relative p-6 sm:p-8 rounded-2xl bg-slate-900 border border-slate-800 shadow-sm transition-all duration-300 ${card.borderHover}`}
                >
                  <div className="flex items-center justify-between mb-5 sm:mb-6">
                    <div
                      className={`w-12 h-12 sm:w-14 sm:h-14 rounded-2xl bg-gradient-to-tr ${card.accent} flex items-center justify-center transition-transform duration-300 group-hover:scale-110`}
                    >
                      <Icon className="w-6 h-6 sm:w-7 sm:h-7" />
                    </div>
                    <span className="text-2xl sm:text-3xl font-black text-slate-800 font-mono select-none">
                      {card.step}
                    </span>
                  </div>
                  <h3 className="text-lg sm:text-xl font-bold text-slate-100 mb-2 tracking-tight">
                    {card.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
                    {card.description}
                  </p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Common Issue Categories Showcase */}
      <section className="py-16 sm:py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 sm:mb-12 gap-4">
          <div>
            <h2 className="text-xs font-bold uppercase tracking-wider text-cyan-400 mb-2">
              Citizen Reports
            </h2>
            <h3 className="text-2xl sm:text-3xl font-extrabold text-slate-100 tracking-tight">
              Common Civic Issues We Handle
            </h3>
          </div>
          <Link
            to="/report"
            className="inline-flex items-center gap-1 text-xs sm:text-sm font-semibold text-cyan-400 hover:underline"
          >
            <span>Report a different issue</span>
            <ChevronRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          {categories.map((cat) => (
            <div
              key={cat.name}
              className="p-5 sm:p-6 rounded-2xl bg-slate-900 border border-slate-800 shadow-xs hover:border-slate-700 transition-colors"
            >
              <span className="text-2xl sm:text-3xl mb-2.5 sm:mb-3 block">{cat.icon}</span>
              <h4 className="font-bold text-sm sm:text-base text-slate-100 mb-1">
                {cat.name}
              </h4>
              <p className="text-xs text-slate-400">
                {cat.desc}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Call to Action Banner */}
      <section className="pb-16 sm:pb-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative rounded-3xl bg-gradient-to-r from-blue-900 via-slate-900 to-cyan-950 p-6 sm:p-10 md:p-14 text-white overflow-hidden shadow-xl border border-slate-800">
          <div className="relative z-10 max-w-2xl">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold tracking-tight mb-3 sm:mb-4 text-white">
              Ready to make a difference in your neighborhood?
            </h2>
            <p className="text-slate-300 text-sm sm:text-base md:text-lg mb-6 sm:mb-8 leading-relaxed">
              Join thousands of proactive citizens reporting and fixing local infrastructure problems together. It takes less than two minutes.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
              <Link to="/report" className="w-full sm:w-auto">
                <Button
                  size="lg"
                  className="w-full sm:w-auto bg-blue-600 hover:bg-blue-500 text-white shadow-md font-bold min-h-[44px]"
                >
                  Report an Issue Now
                </Button>
              </Link>
              <Link to="/about" className="w-full sm:w-auto">
                <Button
                  variant="outline"
                  size="lg"
                  className="w-full sm:w-auto border-slate-700 text-slate-200 hover:bg-slate-800 hover:border-slate-600 min-h-[44px]"
                >
                  Learn About Our Mission
                </Button>
              </Link>
            </div>
          </div>
          {/* Subtle decorative circles */}
          <div className="absolute -bottom-20 -right-20 w-80 h-80 bg-blue-500/10 rounded-full blur-2xl pointer-events-none" />
          <div className="absolute -top-20 -right-10 w-60 h-60 bg-cyan-400/15 rounded-full blur-xl pointer-events-none" />
        </div>
      </section>
    </div>
  );
};

export default Home;
