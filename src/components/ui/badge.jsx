import * as React from "react";
import { cn } from "@/lib/utils";

const badgeVariants = ({
  variant = "default",
  className = "",
} = {}) => {
  const base =
    "inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2";

  const variants = {
    default: "border-transparent bg-primary text-primary-foreground shadow hover:opacity-90",
    secondary: "border-border bg-secondary text-secondary-foreground hover:opacity-80",
    destructive: "border-transparent bg-red-100 text-red-700 dark:bg-red-950/50 dark:text-red-400",
    outline: "text-foreground border-border",
    success: "border-transparent bg-emerald-500/15 text-emerald-700 dark:text-emerald-400",
    live: "border-emerald-500/40 bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 animate-pulse",
    warning: "border-amber-500/40 bg-amber-500/15 text-amber-800 dark:text-amber-400",
  };

  return cn(base, variants[variant] || variants.default, className);
};

function Badge({ className, variant = "default", ...props }) {
  return (
    <div className={badgeVariants({ variant, className })} {...props} />
  );
}

export { Badge, badgeVariants };
