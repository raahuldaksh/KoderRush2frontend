import * as React from "react";
import { cn } from "@/lib/utils";

const Progress = React.forwardRef(({ className, value = 0, indicatorColor = "bg-blue-600", ...props }, ref) => {
  const clampedValue = Math.min(100, Math.max(0, value || 0));

  return (
    <div
      ref={ref}
      role="progressbar"
      aria-valuemin={0}
      aria-valuemax={100}
      aria-valuenow={clampedValue}
      className={cn(
        "relative h-2 w-full overflow-hidden rounded-full bg-slate-100",
        className
      )}
      {...props}
    >
      <div
        className={cn("h-full w-full flex-1 transition-all duration-300 ease-out", indicatorColor)}
        style={{ transform: `translateX(-${100 - clampedValue}%)` }}
      />
    </div>
  );
});
Progress.displayName = "Progress";

export { Progress };
