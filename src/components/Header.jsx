import React from "react";
import { Gavel, RotateCcw, Zap, Sparkles, Sun, Moon } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

export function Header({ status, remainingSeconds, onReset, onFastForward, theme, onToggleTheme }) {
  const isDark = theme === "dark";

  return (
    <header className="sticky top-0 z-30 w-full border-b border-border bg-card/95 backdrop-blur-md transition-colors">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3.5 sm:px-6">
        {/* Brand & Logo with Black and White hierarchy */}
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-foreground text-background shadow-xs ring-2 ring-border transition-colors">
            <Gavel className="h-5 w-5" />
          </div>
          <div>
            <div className="flex items-center gap-2.5">
              <h1 className="text-xl font-black tracking-tight text-foreground font-sans">
                BidSpace
              </h1>
              <Badge
                variant="outline"
                className={`text-xs font-bold uppercase tracking-wider px-2.5 py-0.5 border ${
                  status === "LIVE"
                    ? "border-emerald-500/50 bg-emerald-500/10 text-emerald-700 dark:text-emerald-400"
                    : "border-border bg-secondary text-muted-foreground"
                }`}
              >
                <span
                  className={`mr-1.5 inline-block h-2 w-2 rounded-full ${
                    status === "LIVE" ? "bg-emerald-500 animate-pulse" : "bg-muted-foreground"
                  }`}
                />
                {status === "LIVE" ? "Live Auction" : "Auction Ended"}
              </Badge>
            </div>
            <p className="text-xs font-medium text-muted-foreground">
              Event Auction System <span className="text-foreground/40">•</span> Problem ID: R2-01
            </p>
          </div>
        </div>

        {/* Right Navigation & Controls */}
        <div className="flex items-center gap-2 sm:gap-3">
          {/* Theme Toggle Button (White Theme / Black Theme) */}
          <Button
            variant="outline"
            size="sm"
            onClick={onToggleTheme}
            title={isDark ? "Switch to White Theme" : "Switch to Black Theme"}
            className="h-8.5 px-3 text-xs font-semibold border-border bg-secondary hover:bg-secondary/80 text-foreground flex items-center gap-1.5 shadow-2xs"
          >
            {isDark ? (
              <>
                <Sun className="h-3.5 w-3.5 text-amber-400" />
                <span className="font-bold">White Theme</span>
              </>
            ) : (
              <>
                <Moon className="h-3.5 w-3.5 text-neutral-900" />
                <span className="font-bold">Black Theme</span>
              </>
            )}
          </Button>

          <div className="hidden md:flex items-center gap-1.5 bg-secondary border border-border px-3 py-1.5 rounded-lg text-xs font-medium text-foreground">
            <Sparkles className="h-3.5 w-3.5 text-foreground" />
            <span>Demo Session</span>
          </div>

          {/* Quick test control buttons */}
          <div className="flex items-center gap-1.5">
            {status === "LIVE" && remainingSeconds > 15 && (
              <Button
                variant="outline"
                size="sm"
                onClick={() => onFastForward(10)}
                title="Fast forward to 10s for testing"
                className="h-8.5 text-xs font-semibold border-border bg-card hover:bg-secondary text-foreground"
              >
                <Zap className="mr-1 h-3.5 w-3.5 text-amber-500" />
                <span>10s Timer</span>
              </Button>
            )}

            <Button
              variant="outline"
              size="sm"
              onClick={() => onReset(300)}
              title="Reset auction"
              className="h-8.5 text-xs font-semibold border-border bg-card hover:bg-secondary text-foreground"
            >
              <RotateCcw className="mr-1 h-3.5 w-3.5 text-muted-foreground" />
              Reset
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
}
