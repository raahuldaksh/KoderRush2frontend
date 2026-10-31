import React from "react";
import { Clock, AlertTriangle } from "lucide-react";
import { formatCountdown } from "@/lib/utils";
import { Progress } from "@/components/ui/progress";

export function CountdownTimer({ remainingSeconds, status, totalDuration = 300 }) {
  const isEnded = status === "ENDED" || remainingSeconds <= 0;
  const isEndingSoon = !isEnded && remainingSeconds <= 30;

  // Calculate percentage remaining (0 to 100)
  const percentRemaining = isEnded
    ? 0
    : Math.min(100, Math.max(0, (remainingSeconds / totalDuration) * 100));

  return (
    <div
      className={`rounded-xl border p-4 transition-all duration-300 ${
        isEnded
          ? "border-border bg-secondary/50 text-muted-foreground"
          : isEndingSoon
          ? "border-amber-500/40 bg-amber-500/10 text-amber-800 dark:text-amber-300"
          : "border-border bg-secondary/30 text-foreground"
      }`}
    >
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
          <Clock className={`h-4 w-4 ${isEndingSoon ? "text-amber-500 animate-spin" : "text-foreground"}`} />
          <span>{isEnded ? "Auction Status" : "Time Remaining"}</span>
        </div>

        {isEndingSoon && !isEnded && (
          <span className="inline-flex items-center gap-1 rounded-full bg-amber-500/20 px-2.5 py-0.5 text-[11px] font-bold text-amber-800 dark:text-amber-300 animate-pulse">
            <AlertTriangle className="h-3 w-3 text-amber-500" />
            Ending Soon!
          </span>
        )}

        {isEnded && (
          <span className="inline-flex items-center rounded-full bg-secondary px-2.5 py-0.5 text-[11px] font-semibold text-muted-foreground border border-border">
            Closed
          </span>
        )}
      </div>

      <div className="flex items-baseline justify-between">
        <div className="font-mono text-3xl sm:text-4xl font-extrabold tracking-tight">
          {isEnded ? (
            <span className="text-xl sm:text-2xl font-bold text-muted-foreground tracking-normal font-sans">
              Auction Ended
            </span>
          ) : (
            <span className={isEndingSoon ? "text-amber-700 dark:text-amber-400 font-bold" : "text-foreground font-bold"}>
              {formatCountdown(remainingSeconds)}
            </span>
          )}
        </div>

        <span className="text-xs text-muted-foreground font-mono">
          {isEnded ? "00:00" : "MM:SS"}
        </span>
      </div>

      {/* Visual countdown progress */}
      <div className="mt-3">
        <Progress
          value={percentRemaining}
          indicatorColor={
            isEnded
              ? "bg-muted-foreground"
              : isEndingSoon
              ? "bg-amber-500"
              : "bg-primary"
          }
          className="h-2"
        />
      </div>
    </div>
  );
}
