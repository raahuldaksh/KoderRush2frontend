import * as React from "react";
import { cn } from "@/lib/utils";

const alertVariants = ({ variant = "default", className = "" } = {}) => {
  const base = "relative w-full rounded-lg border p-3 text-xs transition-colors";
  const variants = {
    default: "bg-card text-foreground border-border",
    destructive: "border-red-500/40 bg-red-500/10 text-red-700 dark:text-red-400 font-medium",
    success: "border-emerald-500/40 bg-emerald-500/10 text-emerald-800 dark:text-emerald-300 font-medium",
    warning: "border-amber-500/40 bg-amber-500/10 text-amber-900 dark:text-amber-300 font-medium",
    info: "border-border bg-secondary text-foreground",
  };
  return cn(base, variants[variant] || variants.default, className);
};

const Alert = React.forwardRef(({ className, variant = "default", ...props }, ref) => (
  <div
    ref={ref}
    role="alert"
    className={alertVariants({ variant, className })}
    {...props}
  />
));
Alert.displayName = "Alert";

const AlertTitle = React.forwardRef(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("font-bold leading-none tracking-tight mb-1 text-xs", className)}
    {...props}
  />
));
AlertTitle.displayName = "AlertTitle";

const AlertDescription = React.forwardRef(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("text-xs leading-relaxed text-inherit", className)}
    {...props}
  />
));
AlertDescription.displayName = "AlertDescription";

export { Alert, AlertTitle, AlertDescription };
