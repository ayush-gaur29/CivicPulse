import React from "react";
import { Link } from "react-router-dom";
import {
  Target,
  ShieldCheck,
  Users,
  Code2,
  Sparkles,
  Layers,
  Zap,
  Globe2,
  ExternalLink,
  Github,
  Mail,
  CheckCircle2,
  ArrowRight,
} from "lucide-react";
import Button from "../Components/ui/Button";

const TECH_STACK = [
  { name: "React 19", role: "UI Library & State Architecture", color: "text-sky-500" },
  { name: "Tailwind CSS v4", role: "Semantic Tokens & Responsive Design", color: "text-cyan-500" },
  { name: "Framer Motion", role: "Accessible Micro-interactions", color: "text-purple-500" },
  { name: "Recharts", role: "Civic Analytics & Data Visualization", color: "text-blue-500" },
  { name: "Lucide Icons", role: "Accessible Visual Semantics", color: "text-emerald-500" },
  { name: "Vite 7", role: "Modern Build Tooling", color: "text-amber-500" },
];

const CORE_VALUES = [
  {
    icon: ShieldCheck,
    title: "Public Transparency",
    desc: "Open access to reported civic issues and real-time resolution status for all neighborhood residents.",
  },
  {
    icon: Zap,
    title: "Rapid Municipal Triage",
    desc: "Structured data reporting with precise geo-tags and photo evidence to eliminate bureaucratic friction.",
  },
  {
    icon: Users,
    title: "Community Empowerment",
    desc: "Transforming passive residents into active civic stakeholders who take pride in their local spaces.",
  },
  {
    icon: Globe2,
    title: "Smarter Urban Living",
    desc: "Leveraging data-driven civic intelligence to help municipal authorities allocate resources where needed most.",
  },
];

const About = () => {
  return (
    <div className="py-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-16">
      {/* Hero Header */}
      <div className="text-center max-w-3xl mx-auto">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-blue-200 dark:border-blue-900/60 bg-blue-50/60 dark:bg-blue-950/40 text-blue-700 dark:text-blue-300 text-xs font-semibold mb-4">
          <Sparkles className="w-3.5 h-3.5 text-blue-600 dark:text-cyan-400" />
          <span>About the Platform</span>
        </div>
        <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight text-slate-900 dark:text-slate-100">
          Transforming Civic Engagement Through Modern Technology
        </h1>
        <p className="mt-4 text-base sm:text-lg text-slate-600 dark:text-slate-400 leading-relaxed">
          CivicPulse bridges the gap between proactive citizens and municipal authorities, creating transparent, accountable, and responsive urban environments.
        </p>
      </div>

      {/* Mission & Vision Grid */}
      <div className="grid md:grid-cols-2 gap-8">
        <div className="p-8 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-xs hover:border-slate-300 dark:hover:border-slate-700 transition">
          <div className="w-12 h-12 rounded-2xl bg-blue-500/10 text-blue-600 dark:text-cyan-400 flex items-center justify-center mb-6">
            <Target className="w-6 h-6" />
          </div>
          <h2 className="text-2xl font-bold text-slate-900 dark:text-slate-100 mb-3 tracking-tight">
            Our Mission
          </h2>
          <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
            Our mission is to build an intuitive, community-driven civic platform that empowers citizens to report local infrastructure issues—such as damaged roads, broken streetlights, water supply disruptions, and waste overflow—instantly. Every report contributes directly to faster resolution and elevated quality of life.
          </p>
        </div>

        <div className="p-8 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-xs hover:border-slate-300 dark:hover:border-slate-700 transition">
          <div className="w-12 h-12 rounded-2xl bg-cyan-500/10 text-cyan-600 dark:text-cyan-400 flex items-center justify-center mb-6">
            <ShieldCheck className="w-6 h-6" />
          </div>
          <h2 className="text-2xl font-bold text-slate-900 dark:text-slate-100 mb-3 tracking-tight">
            Our Vision
          </h2>
          <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
            We envision future-ready cities where citizen collaboration and civic transparency are the standard. By harnessing modern web applications and real-time civic intelligence, we aim to inspire neighborhood pride and ensure that municipal resources are deployed with speed, clarity, and accountability.
          </p>
        </div>
      </div>

      {/* Core Values */}
      <div>
        <div className="text-center max-w-2xl mx-auto mb-12">
          <h2 className="text-xs font-bold uppercase tracking-wider text-blue-600 dark:text-cyan-400 mb-2">
            Guiding Principles
          </h2>
          <h3 className="text-3xl font-extrabold text-slate-900 dark:text-slate-100 tracking-tight">
            Core Civic Values
          </h3>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {CORE_VALUES.map((val) => {
            const Icon = val.icon;
            return (
              <div
                key={val.title}
                className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-xs hover:border-slate-300 dark:hover:border-slate-700 transition"
              >
                <div className="w-10 h-10 rounded-xl bg-slate-100 dark:bg-slate-800 text-blue-600 dark:text-cyan-400 flex items-center justify-center mb-4">
                  <Icon className="w-5 h-5" />
                </div>
                <h4 className="text-base font-bold text-slate-900 dark:text-slate-100 mb-2">
                  {val.title}
                </h4>
                <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                  {val.desc}
                </p>
              </div>
            );
          })}
        </div>
      </div>

      {/* Tech Architecture Stack */}
      <div className="p-8 sm:p-10 rounded-3xl bg-slate-100/70 dark:bg-slate-900/60 border border-slate-200/80 dark:border-slate-800">
        <div className="flex items-center gap-2.5 mb-2 text-xs font-bold uppercase tracking-wider text-blue-600 dark:text-cyan-400">
          <Code2 className="w-4 h-4" />
          <span>Technology & Architecture</span>
        </div>
        <h3 className="text-2xl font-extrabold text-slate-900 dark:text-slate-100 tracking-tight mb-3">
          Built with Modern Web Standards
        </h3>
        <p className="text-sm text-slate-600 dark:text-slate-400 max-w-2xl mb-8 leading-relaxed">
          Engineered as a robust frontend application prioritizing accessibility, performance, responsive layout fidelity, and semantic design tokens across dark and light themes.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {TECH_STACK.map((tech) => (
            <div
              key={tech.name}
              className="p-4 rounded-xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-xs flex items-center gap-3"
            >
              <div className="w-8 h-8 rounded-lg bg-slate-100 dark:bg-slate-800 flex items-center justify-center shrink-0">
                <Layers className={`w-4 h-4 ${tech.color}`} />
              </div>
              <div>
                <p className="text-xs font-bold text-slate-900 dark:text-slate-100">
                  {tech.name}
                </p>
                <p className="text-[11px] text-slate-500 dark:text-slate-400">
                  {tech.role}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Creator / Team Section */}
      <div className="p-8 sm:p-12 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-xs">
        <div className="flex items-center gap-2.5 mb-2 text-xs font-bold uppercase tracking-wider text-blue-600 dark:text-cyan-400">
          <Users className="w-4 h-4" />
          <span>Lead Developer</span>
        </div>
        <h3 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-slate-100 tracking-tight mb-8">
          Meet the Creator
        </h3>

        <div className="max-w-md p-6 rounded-2xl border border-slate-200 dark:border-slate-700/80 bg-slate-50/50 dark:bg-slate-800/30">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-blue-600 to-cyan-500 flex items-center justify-center text-white font-bold text-2xl shadow-md shadow-blue-500/25">
              AG
            </div>
            <div>
              <h4 className="text-lg font-bold text-slate-900 dark:text-slate-100">
                Ayush Gaur
              </h4>
              <p className="text-xs text-blue-600 dark:text-cyan-400 font-semibold">
                Frontend Engineer & UI/UX Designer
              </p>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                Passionate about building intuitive civic-tech and impactful web products.
              </p>
            </div>
          </div>

          <div className="mt-6 pt-4 border-t border-slate-200 dark:border-slate-700/60 flex items-center gap-3">
            <a
              href="https://github.com/ayush-gaur29"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-xs font-semibold px-3 py-1.5 rounded-lg bg-slate-200/80 dark:bg-slate-700 text-slate-800 dark:text-slate-200 hover:bg-slate-300 dark:hover:bg-slate-600 transition"
            >
              <Github className="w-3.5 h-3.5" />
              <span>GitHub Profile</span>
              <ExternalLink className="w-3 h-3 ml-0.5" />
            </a>
          </div>
        </div>
      </div>

      {/* Quote Banner */}
      <div className="text-center py-8">
        <blockquote className="text-lg sm:text-xl font-medium italic text-slate-600 dark:text-slate-300 max-w-2xl mx-auto">
          “Technology empowers citizens — citizens empower cities.”
        </blockquote>
        <p className="text-xs font-semibold uppercase tracking-wider text-slate-400 dark:text-slate-500 mt-2">
          CivicPulse Initiative
        </p>
      </div>
    </div>
  );
};

export default About;
