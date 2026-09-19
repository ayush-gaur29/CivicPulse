import React from "react";

export const Card = ({
  children,
  className = "",
  hoverEffect = false,
  ...props
}) => {
  return (
    <div
      className={`bg-slate-900/90 border border-slate-800 rounded-2xl shadow-sm overflow-hidden text-slate-100 ${
        hoverEffect
          ? "transition-all duration-300 hover:shadow-md hover:-translate-y-0.5 hover:border-slate-700"
          : ""
      } ${className}`}
      {...props}
    >
      {children}
    </div>
  );
};

export const CardHeader = ({ children, className = "" }) => (
  <div className={`p-6 pb-3 ${className}`}>{children}</div>
);

export const CardTitle = ({ children, className = "" }) => (
  <h3 className={`text-lg font-bold text-slate-100 tracking-tight ${className}`}>
    {children}
  </h3>
);

export const CardDescription = ({ children, className = "" }) => (
  <p className={`text-sm text-slate-400 mt-1 ${className}`}>
    {children}
  </p>
);

export const CardContent = ({ children, className = "" }) => (
  <div className={`p-6 pt-3 ${className}`}>{children}</div>
);

export const CardFooter = ({ children, className = "" }) => (
  <div className={`p-6 pt-0 flex items-center ${className}`}>{children}</div>
);

export default Card;

