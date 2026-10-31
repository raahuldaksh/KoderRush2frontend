import React from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

export function Header({ status, remainingSeconds, onReset, onFastForward, theme, onToggleTheme }) {
  const isDark = theme === "dark";

  return (
    <header className="sticky top-0 z-30 w-full border-b border-border bg-card/95 backdrop-blur-md transition-colors">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 sm:px-6">
        {/* Clean Typographic Brand */}
        <div className="flex items-center gap-3">
          <div className="flex h-8 w-8 items-center justify-center rounded-md bg-primary text-primary-foreground font-mono font-bold text-sm select-none">
            B
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-base font-bold tracking-tight text-foreground font-sans">
                BidSpace
              </span>
              <Badge
                variant="outline"
                className={`text-[11px] font-medium border px-2 py-0 ${
                  status === "LIVE"
                    ? "border-emerald-500/40 bg-emerald-500/10 text-emerald-700 dark:text-emerald-400"
                    : "border-border bg-secondary text-muted-foreground"
                }`}
              >
                {status === "LIVE" ? "Live Auction" : "Auction Ended"}
              </Badge>
            </div>
            <p className="text-[11px] text-muted-foreground font-normal">
              Event Auction System • Problem ID: R2-01
            </p>
          </div>
        </div>

        {/* Clean shadcn Action Buttons (No AI-like SVGs) */}
        <div className="flex items-center gap-2">
          {/* Theme Switcher Button */}
          <Button
            variant="outline"
            size="sm"
            onClick={onToggleTheme}
            className="h-8 px-3 text-xs"
          >
            {isDark ? "White Theme" : "Black Theme"}
          </Button>

          {/* Quick test control buttons */}
          {status === "LIVE" && remainingSeconds > 15 && (
            <Button
              variant="outline"
              size="sm"
              onClick={() => onFastForward(10)}
              className="h-8 px-3 text-xs"
            >
              10s Test
            </Button>
          )}

          <Button
            variant="outline"
            size="sm"
            onClick={() => onReset(300)}
            className="h-8 px-3 text-xs"
          >
            Reset
          </Button>
        </div>
      </div>
    </header>
  );
}
