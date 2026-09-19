import React from "react";
import { Clock, CheckCircle2, PlayCircle } from "lucide-react";

export const StatusBadge = ({ status = "Pending", size = "md" }) => {
  const normalized = (status || "").toLowerCase().trim();

  let colorClasses = "bg-amber-500/10 text-amber-300 border-amber-500/20";
  let Icon = Clock;
  let label = "Pending";

  if (normalized === "resolved") {
    colorClasses = "bg-emerald-500/10 text-emerald-300 border-emerald-500/20";
    Icon = CheckCircle2;
    label = "Resolved";
  } else if (normalized === "in progress" || normalized === "inprogress") {
    colorClasses = "bg-sky-500/10 text-sky-300 border-sky-500/20";
    Icon = PlayCircle;
    label = "In Progress";
  }

  const sizeClasses =
    size === "sm"
      ? "px-2 py-0.5 text-xs gap-1"
      : "px-2.5 py-1 text-xs font-semibold gap-1.5";

  return (
    <span
      className={`inline-flex items-center rounded-full border ${colorClasses} ${sizeClasses}`}
    >
      <Icon className={size === "sm" ? "w-3 h-3 shrink-0" : "w-3.5 h-3.5 shrink-0"} />
      <span>{label}</span>
    </span>
  );
};

export const CategoryBadge = ({ category = "other", size = "md" }) => {
  const cat = (category || "").toLowerCase().trim();

  const config = {
    road: { label: "Damaged Road", icon: "🚧", color: "bg-orange-500/10 text-orange-300 border-orange-500/20" },
    garbage: { label: "Garbage Overflow", icon: "🗑️", color: "bg-emerald-500/10 text-emerald-300 border-emerald-500/20" },
    streetlight: { label: "Streetlight Issue", icon: "💡", color: "bg-yellow-500/10 text-yellow-300 border-yellow-500/20" },
    water: { label: "Water Supply", icon: "💧", color: "bg-blue-500/10 text-blue-300 border-blue-500/20" },
    other: { label: "Civic Issue", icon: "📋", color: "bg-purple-500/10 text-purple-300 border-purple-500/20" },
  };

  const item = config[cat] || {
    label: category.charAt(0).toUpperCase() + category.slice(1),
    icon: "📌",
    color: "bg-slate-500/10 text-slate-300 border-slate-500/20",
  };

  const sizeClasses =
    size === "sm"
      ? "px-2 py-0.5 text-xs gap-1"
      : "px-2.5 py-1 text-xs font-medium gap-1.5";

  return (
    <span
      className={`inline-flex items-center rounded-full border ${item.color} ${sizeClasses}`}
    >
      <span className="shrink-0">{item.icon}</span>
      <span>{item.label}</span>
    </span>
  );
};

export const Badge = ({ children, variant = "default", className = "" }) => {
  const variants = {
    default: "bg-slate-800 text-slate-300 border-slate-700",
    primary: "bg-blue-950/60 text-cyan-300 border-blue-800",
    success: "bg-emerald-950/60 text-emerald-300 border-emerald-800",
    warning: "bg-amber-950/60 text-amber-300 border-amber-800",
  };

  return (
    <span
      className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border ${variants[variant] || variants.default} ${className}`}
    >
      {children}
    </span>
  );
};

export default Badge;
