import React from "react";

export const Input = React.forwardRef(
  (
    {
      label,
      error,
      helperText,
      icon,
      className = "",
      id,
      required,
      ...props
    },
    ref
  ) => {
    const inputId = id || (label ? label.toLowerCase().replace(/\s+/g, "-") : undefined);

    return (
      <div className="w-full space-y-1.5">
        {label && (
          <label
            htmlFor={inputId}
            className="block text-sm font-semibold text-slate-700 dark:text-slate-300"
          >
            {label} {required && <span className="text-rose-500">*</span>}
          </label>
        )}
        <div className="relative flex items-center">
          {icon && (
            <div className="absolute left-3.5 text-slate-400 dark:text-slate-500 pointer-events-none flex items-center">
              {icon}
            </div>
          )}
          <input
            ref={ref}
            id={inputId}
            required={required}
            className={`w-full rounded-xl border bg-white dark:bg-slate-800/80 text-slate-900 dark:text-slate-100 placeholder:text-slate-400 dark:placeholder:text-slate-500 text-sm transition-all focus:outline-none focus:ring-2 disabled:opacity-50 disabled:cursor-not-allowed ${
              icon ? "pl-10 pr-4 py-2.5" : "px-4 py-2.5"
            } ${
              error
                ? "border-rose-500 focus:border-rose-500 focus:ring-rose-500/20"
                : "border-slate-300 dark:border-slate-700 focus:border-blue-500 focus:ring-blue-500/20 dark:focus:border-blue-400 dark:focus:ring-blue-400/20"
            } ${className}`}
            {...props}
          />
        </div>
        {error ? (
          <p className="text-xs text-rose-500 font-medium">{error}</p>
        ) : helperText ? (
          <p className="text-xs text-slate-500 dark:text-slate-400">{helperText}</p>
        ) : null}
      </div>
    );
  }
);

Input.displayName = "Input";
export default Input;

