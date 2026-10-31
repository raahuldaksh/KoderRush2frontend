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
          ? "border-slate-200 bg-slate-50"
          : isEndingSoon
          ? "border-slate-900 bg-slate-100 text-slate-950"
          : "border-slate-300 bg-white text-slate-900"
      }`}
    >
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-slate-600">
          <Clock className={`h-4 w-4 ${isEndingSoon ? "text-slate-950 animate-spin" : "text-slate-900"}`} />
          <span>{isEnded ? "Auction Status" : "Time Remaining"}</span>
        </div>

        {isEndingSoon && !isEnded && (
          <span className="inline-flex items-center gap-1 rounded-full bg-slate-200 px-2 py-0.5 text-[11px] font-bold text-slate-950 animate-pulse">
            <AlertTriangle className="h-3 w-3" />
            Ending Soon!
          </span>
        )}

        {isEnded && (
          <span className="inline-flex items-center rounded-full bg-slate-200 px-2 py-0.5 text-[11px] font-semibold text-slate-700">
            Closed
          </span>
        )}
      </div>

      <div className="flex items-baseline justify-between">
        <div className="font-mono text-3xl sm:text-4xl font-extrabold tracking-tight">
          {isEnded ? (
            <span className="text-xl sm:text-2xl font-bold text-slate-700 tracking-normal font-sans">
              Auction Ended
            </span>
          ) : (
            <span className={"text-slate-950 font-bold"}>
              {formatCountdown(remainingSeconds)}
            </span>
          )}
        </div>

        <span className="text-xs text-slate-500 font-medium">
          {isEnded ? "00:00" : "MM:SS"}
        </span>
      </div>

      {/* Visual countdown progress */}
      <div className="mt-3">
        <Progress
          value={percentRemaining}
          indicatorColor={
            isEnded
              ? "bg-slate-400"
              : isEndingSoon
              ? "bg-slate-950"
              : "bg-slate-950"
          }
          className="h-2 bg-slate-200/80"
        />
      </div>
    </div>
  );
}
