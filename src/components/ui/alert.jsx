import * as React from "react";
import { cn } from "@/lib/utils";

const alertVariants = ({ variant = "default", className = "" } = {}) => {
  const base = "relative w-full rounded-xl border p-4 [&>svg~*]:pl-7 [&>svg+div]:translate-y-[-3px] [&>svg]:absolute [&>svg]:left-4 [&>svg]:top-4 [&>svg]:text-foreground";
  const variants = {
    default: "bg-card text-foreground border-border",
    destructive: "border-red-500/30 bg-red-500/10 text-red-700 dark:text-red-400 [&>svg]:text-red-600 dark:[&>svg]:text-red-400",
    success: "border-emerald-500/30 bg-emerald-500/10 text-emerald-800 dark:text-emerald-300 [&>svg]:text-emerald-600 dark:[&>svg]:text-emerald-400",
    warning: "border-amber-500/30 bg-amber-500/10 text-amber-900 dark:text-amber-300 [&>svg]:text-amber-600 dark:[&>svg]:text-amber-400",
    info: "border-border bg-secondary text-foreground [&>svg]:text-foreground",
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
  <h5
    ref={ref}
    className={cn("mb-1 font-semibold leading-none tracking-tight", className)}
    {...props}
  />
));
AlertTitle.displayName = "AlertTitle";

const AlertDescription = React.forwardRef(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("text-sm [&_p]:leading-relaxed text-muted-foreground", className)}
    {...props}
  />
));
AlertDescription.displayName = "AlertDescription";

export { Alert, AlertTitle, AlertDescription };
