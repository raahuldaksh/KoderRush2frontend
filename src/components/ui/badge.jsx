import * as React from "react";
import { cn } from "@/lib/utils";

const badgeVariants = ({
  variant = "default",
  className = "",
} = {}) => {
  const base =
    "inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-blue-600 focus:ring-offset-2";

  const variants = {
    default: "border-transparent bg-blue-600 text-white shadow hover:bg-blue-700",
    secondary: "border-slate-200 bg-slate-100 text-slate-800 hover:bg-slate-200",
    destructive: "border-transparent bg-red-100 text-red-700 hover:bg-red-200",
    outline: "text-slate-800 border-slate-300",
    success: "border-transparent bg-emerald-100 text-emerald-800 hover:bg-emerald-200",
    live: "border-emerald-300 bg-emerald-50 text-emerald-700 animate-pulse",
    warning: "border-amber-300 bg-amber-50 text-amber-800",
  };

  return cn(base, variants[variant] || variants.default, className);
};

function Badge({ className, variant = "default", ...props }) {
  return (
    <div className={badgeVariants({ variant, className })} {...props} />
  );
}

export { Badge, badgeVariants };
