import React, { useEffect } from "react";
import { Trophy, Ban, Award, CheckCircle2, RotateCcw, Users, TrendingUp } from "lucide-react";
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { formatCurrency } from "@/lib/utils";
import confetti from "canvas-confetti";

export function AuctionResult({ winner, totalBids, startingPrice, onReset }) {
  const hasWinner = Boolean(winner);

  // Fire celebratory confetti when winner is determined
  useEffect(() => {
    if (hasWinner) {
      try {
        confetti({
          particleCount: 80,
          spread: 70,
          origin: { y: 0.6 },
          colors: ["#16A34A", "#F59E0B", "#111827", "#71717A"],
          disableForReducedMotion: true,
        });
      } catch (e) {
        // Safe fallback if canvas is restricted
      }
    }
  }, [hasWinner]);

  return (
    <Card className="border border-border bg-card shadow-md overflow-hidden animate-fade-in transition-colors">
      <CardHeader className="text-center pb-4 bg-secondary/30 border-b border-border">
        <div className="mx-auto mb-3 flex h-14 w-14 items-center justify-center rounded-full bg-card shadow-sm border border-border">
          {hasWinner ? (
            <Trophy className="h-7 w-7 text-amber-500 animate-bounce" />
          ) : (
            <Ban className="h-7 w-7 text-muted-foreground" />
          )}
        </div>

        <CardTitle className="text-2xl font-bold tracking-tight text-foreground font-sans">
          {hasWinner ? "Auction Winner Announced!" : "Auction Concluded"}
        </CardTitle>

        <CardDescription className="text-muted-foreground">
          {hasWinner
            ? "The countdown expired and the winning bid has been verified."
            : "No valid bids were submitted before the countdown deadline."}
        </CardDescription>
      </CardHeader>

      <CardContent className="space-y-5 px-6 pt-5">
        {hasWinner ? (
          <div className="space-y-4">
            {/* Winner spotlight box */}
            <div className="rounded-xl border border-emerald-500/30 bg-emerald-500/10 p-4 text-center">
              <span className="inline-flex items-center gap-1 rounded-full bg-emerald-500/20 px-3 py-1 text-xs font-bold text-emerald-800 dark:text-emerald-300 uppercase tracking-wide">
                <Award className="h-3.5 w-3.5 text-emerald-600 dark:text-emerald-400" />
                Official Winner
              </span>

              <div className="mt-3 flex items-center justify-center gap-3">
                <Avatar className="h-12 w-12 border-2 border-emerald-500/50 ring-2 ring-emerald-500/20 bg-emerald-500/10">
                  <AvatarFallback className="font-bold text-emerald-800 dark:text-emerald-300 text-lg">
                    {winner.bidderName ? winner.bidderName.charAt(0).toUpperCase() : "W"}
                  </AvatarFallback>
                </Avatar>
                <div className="text-left">
                  <p className="text-xl font-bold text-foreground font-sans">{winner.bidderName}</p>
                  <p className="text-xs text-muted-foreground">Highest Verified Bidder</p>
                </div>
              </div>

              <div className="mt-4 border-t border-emerald-500/20 pt-3">
                <span className="text-xs font-semibold uppercase tracking-wider text-emerald-800 dark:text-emerald-300">
                  Winning Bid Amount
                </span>
                <p className="font-mono text-3xl font-extrabold text-emerald-600 dark:text-emerald-400">
                  {formatCurrency(winner.amount)}
                </p>
              </div>
            </div>

            {/* Quick stats summary */}
            <div className="grid grid-cols-2 gap-3 text-xs text-muted-foreground">
              <div className="rounded-lg bg-secondary/50 p-3 border border-border">
                <span className="flex items-center gap-1">
                  <Users className="h-3.5 w-3.5 text-muted-foreground" />
                  Total Bids
                </span>
                <p className="mt-1 font-semibold text-foreground text-base">{totalBids}</p>
              </div>

              <div className="rounded-lg bg-secondary/50 p-3 border border-border">
                <span className="flex items-center gap-1">
                  <TrendingUp className="h-3.5 w-3.5 text-muted-foreground" />
                  Value Increase
                </span>
                <p className="mt-1 font-semibold text-emerald-600 dark:text-emerald-400 text-base">
                  +{formatCurrency(winner.amount - startingPrice)}
                </p>
              </div>
            </div>
          </div>
        ) : (
          <div className="rounded-xl border border-border bg-secondary/40 p-6 text-center">
            <p className="text-lg font-semibold text-foreground">
              No Winner — No bids received
            </p>
            <p className="mt-1 text-xs text-muted-foreground leading-relaxed">
              The item did not receive any qualifying bids above the starting price of{" "}
              {formatCurrency(startingPrice)}.
            </p>
          </div>
        )}

        <Separator />

        <div className="rounded-lg bg-secondary/60 p-3.5 border border-border flex items-start gap-2.5 text-xs text-foreground/90">
          <CheckCircle2 className="h-4 w-4 text-emerald-600 dark:text-emerald-400 shrink-0 mt-0.5" />
          <p className="leading-relaxed">
            Auction closed permanently. All transactions and bid records are recorded for
            transparent event auditability.
          </p>
        </div>
      </CardContent>

      <CardFooter className="bg-secondary/30 p-4 border-t border-border flex justify-center">
        <Button
          onClick={() => onReset(300)}
          variant="outline"
          className="w-full font-medium"
        >
          <RotateCcw className="mr-2 h-4 w-4" />
          Start New 5-Minute Auction Round
        </Button>
      </CardFooter>
    </Card>
  );
}
