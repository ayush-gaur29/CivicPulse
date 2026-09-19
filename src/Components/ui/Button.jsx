import React from "react";
import { Loader2 } from "lucide-react";

const variants = {
  primary:
    "bg-blue-600 hover:bg-blue-700 text-white shadow-sm shadow-blue-500/20 active:bg-blue-800 focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 dark:focus-visible:ring-offset-slate-900",
  secondary:
    "bg-slate-100 hover:bg-slate-200 text-slate-800 dark:bg-slate-800 dark:hover:bg-slate-700 dark:text-slate-100 focus-visible:ring-2 focus-visible:ring-slate-400 dark:focus-visible:ring-offset-slate-900",
  outline:
    "border border-slate-200 hover:border-slate-300 bg-white hover:bg-slate-50 text-slate-700 dark:border-slate-800 dark:bg-slate-900 dark:hover:bg-slate-800/80 dark:text-slate-200 focus-visible:ring-2 focus-visible:ring-blue-500 dark:focus-visible:ring-offset-slate-900",
  ghost:
    "text-slate-600 hover:text-slate-900 hover:bg-slate-100 dark:text-slate-300 dark:hover:text-slate-100 dark:hover:bg-slate-800/70 focus-visible:ring-2 focus-visible:ring-slate-400",
  danger:
    "bg-rose-600 hover:bg-rose-700 text-white shadow-sm shadow-rose-500/20 active:bg-rose-800 focus-visible:ring-2 focus-visible:ring-rose-500 focus-visible:ring-offset-2 dark:focus-visible:ring-offset-slate-900",
};

const sizes = {
  sm: "px-3 py-1.5 text-xs font-medium rounded-lg gap-1.5",
  md: "px-4 py-2 text-sm font-semibold rounded-xl gap-2",
  lg: "px-5 py-2.5 text-base font-semibold rounded-xl gap-2.5",
};

export const Button = React.forwardRef(
  (
    {
      children,
      variant = "primary",
      size = "md",
      isLoading = false,
      icon,
      className = "",
      disabled,
      type = "button",
      ...props
    },
    ref
  ) => {
    return (
      <button
        ref={ref}
        type={type}
        disabled={disabled || isLoading}
        className={`inline-flex items-center justify-center transition-all duration-200 select-none cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed disabled:pointer-events-none ${variants[variant] || variants.primary} ${sizes[size] || sizes.md} ${className}`}
        {...props}
      >
        {isLoading ? (
          <Loader2 className="w-4 h-4 animate-spin shrink-0" />
        ) : icon ? (
          <span className="shrink-0">{icon}</span>
        ) : null}
        <span>{children}</span>
      </button>
    );
  }
);

Button.displayName = "Button";
export default Button;

