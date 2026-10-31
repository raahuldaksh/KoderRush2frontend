import * as React from "react";
import { cn } from "@/lib/utils";

const buttonVariants = ({
  variant = "default",
  size = "default",
  className = "",
} = {}) => {
  const base =
    "inline-flex items-center justify-center whitespace-nowrap rounded-lg text-sm font-medium transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 select-none cursor-pointer";

  const variants = {
    default: "bg-primary text-primary-foreground shadow-sm hover:opacity-90 active:scale-[0.98]",
    destructive: "bg-red-600 text-white shadow-sm hover:bg-red-700 active:bg-red-800",
    outline: "border border-border bg-card text-foreground shadow-xs hover:bg-secondary active:opacity-80",
    secondary: "bg-secondary text-secondary-foreground shadow-xs hover:opacity-80",
    ghost: "hover:bg-secondary hover:text-foreground",
    link: "text-foreground underline-offset-4 hover:underline",
    success: "bg-emerald-600 text-white shadow-sm hover:bg-emerald-700 active:bg-emerald-800",
  };

  const sizes = {
    default: "h-10 px-4 py-2",
    sm: "h-8 rounded-md px-3 text-xs",
    lg: "h-11 rounded-lg px-8 text-base",
    icon: "h-10 w-10",
  };

  return cn(base, variants[variant] || variants.default, sizes[size] || sizes.default, className);
};

const Button = React.forwardRef(
  ({ className, variant = "default", size = "default", asChild = false, ...props }, ref) => {
    return (
      <button
        className={buttonVariants({ variant, size, className })}
        ref={ref}
        {...props}
      />
    );
  }
);
Button.displayName = "Button";

export { Button, buttonVariants };
