import React from "react";
import { Gavel, RotateCcw, Zap, Sparkles, Sun, Moon } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

export function Header({ status, remainingSeconds, onReset, onFastForward, theme, onToggleTheme }) {
  const isDark = theme === "dark";

  return (
    <header className="sticky top-0 z-30 w-full border-b border-border bg-card/95 backdrop-blur-md transition-colors">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 sm:px-6">
        {/* Brand & Logo */}
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary text-primary-foreground shadow-sm ring-4 ring-secondary transition-colors">
            <Gavel className="h-5 w-5" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-xl font-bold tracking-tight text-foreground font-sans">
                BidSpace
              </h1>
              <Badge
                variant={status === "LIVE" ? "live" : "secondary"}
                className={
                  status === "LIVE"
                    ? "border-emerald-500/40 bg-emerald-500/10 text-emerald-700 dark:text-emerald-400 font-semibold"
                    : "border-border bg-secondary text-muted-foreground font-medium"
                }
              >
                <span
                  className={`mr-1.5 inline-block h-2 w-2 rounded-full ${
                    status === "LIVE" ? "bg-emerald-500 animate-pulse" : "bg-muted-foreground"
                  }`}
                />
                {status === "LIVE" ? "Live Auction" : "Auction Ended"}
              </Badge>
            </div>
            <p className="text-xs text-muted-foreground">Live Event Auction System • Problem ID: R2-01</p>
          </div>
        </div>

        {/* Right side: Theme toggle, demo badge & testing shortcuts */}
        <div className="flex items-center gap-2 sm:gap-3">
          {/* Theme Toggle Button (White Theme / Black Theme) */}
          <Button
            variant="outline"
            size="sm"
            onClick={onToggleTheme}
            title={isDark ? "Switch to White Theme" : "Switch to Black Theme"}
            className="h-8 px-2.5 sm:px-3 text-xs font-medium border-border bg-secondary/60 hover:bg-secondary text-foreground flex items-center gap-1.5"
          >
            {isDark ? (
              <>
                <Sun className="h-3.5 w-3.5 text-amber-400" />
                <span className="hidden sm:inline font-semibold">White Theme</span>
              </>
            ) : (
              <>
                <Moon className="h-3.5 w-3.5 text-neutral-800" />
                <span className="hidden sm:inline font-semibold">Black Theme</span>
              </>
            )}
          </Button>

          <div className="hidden lg:flex items-center gap-2 bg-secondary border border-border px-3 py-1.5 rounded-lg text-xs text-muted-foreground">
            <Sparkles className="h-3.5 w-3.5 text-foreground" />
            <span className="font-medium text-foreground">Demo</span>
          </div>

          {/* Quick test control buttons for judges */}
          <div className="flex items-center gap-1.5">
            {status === "LIVE" && remainingSeconds > 15 && (
              <Button
                variant="outline"
                size="sm"
                onClick={() => onFastForward(10)}
                title="Set timer to 10 seconds to quickly test ending flow"
                className="h-8 text-xs font-medium border-amber-500/40 bg-amber-500/10 text-amber-700 dark:text-amber-400 hover:bg-amber-500/20"
              >
                <Zap className="mr-1 h-3.5 w-3.5 text-amber-500" />
                <span className="hidden sm:inline">Test:</span> 10s
              </Button>
            )}

            <Button
              variant="outline"
              size="sm"
              onClick={() => onReset(300)}
              title="Reset auction with 5:00 minutes"
              className="h-8 text-xs text-foreground hover:bg-secondary border-border"
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
