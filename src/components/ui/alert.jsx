import * as React from "react";
import { cn } from "@/lib/utils";

const alertVariants = ({ variant = "default", className = "" } = {}) => {
  const base = "relative w-full rounded-xl border p-4 [&>svg~*]:pl-7 [&>svg+div]:translate-y-[-3px] [&>svg]:absolute [&>svg]:left-4 [&>svg]:top-4 [&>svg]:text-slate-900";
  const variants = {
    default: "bg-white text-slate-900 border-slate-200",
    destructive: "border-red-200 bg-red-50 text-red-900 [&>svg]:text-red-600",
    success: "border-emerald-200 bg-emerald-50 text-emerald-900 [&>svg]:text-emerald-600",
    warning: "border-amber-200 bg-amber-50 text-amber-900 [&>svg]:text-amber-600",
    info: "border-blue-200 bg-blue-50 text-blue-900 [&>svg]:text-blue-600",
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
    className={cn("text-sm [&_p]:leading-relaxed text-slate-600", className)}
    {...props}
  />
));
AlertDescription.displayName = "AlertDescription";

export { Alert, AlertTitle, AlertDescription };
