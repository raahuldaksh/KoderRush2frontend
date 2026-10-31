import React from "react";
import { formatCountdown } from "@/lib/utils";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";

export function CountdownTimer({ remainingSeconds, status, totalDuration = 300 }) {
  const isEnded = status === "ENDED" || remainingSeconds <= 0;
  const isEndingSoon = !isEnded && remainingSeconds <= 30;

  // Calculate percentage remaining (0 to 100)
  const percentRemaining = isEnded
    ? 0
    : Math.min(100, Math.max(0, (remainingSeconds / totalDuration) * 100));

  return (
    <div className="rounded-lg border border-border bg-card p-4 transition-colors">
      <div className="flex items-center justify-between pb-2">
        <span className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
          Time Remaining
        </span>

        {isEnded ? (
          <Badge variant="outline" className="text-[11px] font-medium text-muted-foreground border-border bg-secondary">
            Closed
          </Badge>
        ) : isEndingSoon ? (
          <Badge variant="outline" className="text-[11px] font-semibold text-amber-700 dark:text-amber-400 border-amber-300 dark:border-amber-800 bg-amber-50 dark:bg-amber-950/40 animate-pulse">
            Ending Soon
          </Badge>
        ) : (
          <Badge variant="outline" className="text-[11px] font-medium text-foreground border-border bg-secondary">
            Live Round
          </Badge>
        )}
      </div>

      <div className="flex items-baseline justify-between py-1">
        <div className="font-mono text-4xl font-bold tracking-tight text-foreground">
          {isEnded ? (
            <span className="text-2xl font-bold text-muted-foreground font-sans">
              Auction Ended
            </span>
          ) : (
            <span>{formatCountdown(remainingSeconds)}</span>
          )}
        </div>

        <span className="font-mono text-xs text-muted-foreground">
          {isEnded ? "00:00" : "MM:SS"}
        </span>
      </div>

      {/* Clean, minimalist progress indicator */}
      <div className="pt-3">
        <Progress
          value={percentRemaining}
          indicatorColor={
            isEnded
              ? "bg-muted-foreground"
              : isEndingSoon
              ? "bg-amber-500"
              : "bg-primary"
          }
          className="h-1.5 rounded-full"
        />
      </div>
    </div>
  );
}
