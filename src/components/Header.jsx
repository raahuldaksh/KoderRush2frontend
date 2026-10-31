import React from "react";
import { Gavel, Clock, RotateCcw, Zap, Sparkles } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

export function Header({ status, remainingSeconds, onReset, onFastForward }) {
  return (
    <header className="sticky top-0 z-30 w-full border-b border-slate-200 bg-white/95 backdrop-blur-md">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 sm:px-6">
        {/* Brand & Logo */}
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-white text-black shadow-sm ring-4 ring-neutral-800">
            <Gavel className="h-5 w-5" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-xl font-bold tracking-tight text-white">BidSpace</h1>
              <Badge
                variant={status === "LIVE" ? "live" : "secondary"}
                className={
                  status === "LIVE"
                    ? "border-emerald-200 bg-emerald-50 text-emerald-700 font-semibold"
                    : "border-slate-300 bg-slate-100 text-slate-700 font-medium"
                }
              >
                <span
                  className={`mr-1.5 inline-block h-2 w-2 rounded-full ${
                    status === "LIVE" ? "bg-emerald-500 animate-pulse" : "bg-slate-400"
                  }`}
                />
                {status === "LIVE" ? "Live Auction" : "Auction Ended"}
              </Badge>
            </div>
            <p className="text-xs text-slate-500">Live Event Auction System • Problem ID: R2-01</p>
          </div>
        </div>

        {/* Right side: Demo badge & testing shortcuts */}
        <div className="flex items-center gap-2 sm:gap-3">
          <div className="hidden md:flex items-center gap-2 bg-slate-50 border border-slate-200 px-3 py-1.5 rounded-lg text-xs text-slate-600">
            <Sparkles className="h-3.5 w-3.5 text-blue-600" />
            <span className="font-medium text-slate-700">Demo Environment</span>
          </div>

          {/* Quick test control buttons for judges */}
          <div className="flex items-center gap-1.5">
            {status === "LIVE" && remainingSeconds > 15 && (
              <Button
                variant="outline"
                size="sm"
                onClick={() => onFastForward(10)}
                title="Set timer to 10 seconds to quickly test ending flow"
                className="h-8 text-xs font-medium border-amber-300 bg-amber-50/50 text-amber-800 hover:bg-amber-100"
              >
                <Zap className="mr-1 h-3.5 w-3.5 text-amber-600" />
                <span className="hidden sm:inline">Test:</span> 10s Timer
              </Button>
            )}

            <Button
              variant="outline"
              size="sm"
              onClick={() => onReset(300)}
              title="Reset auction with 5:00 minutes"
              className="h-8 text-xs text-slate-700 hover:text-slate-900"
            >
              <RotateCcw className="mr-1 h-3.5 w-3.5 text-slate-500" />
              Reset
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
}
