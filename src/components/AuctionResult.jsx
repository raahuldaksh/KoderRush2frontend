import React, { useEffect } from "react";
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
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
    <Card className="border border-border bg-card shadow-sm overflow-hidden animate-fade-in transition-colors">
      <CardHeader className="text-center pb-4 bg-secondary/30 border-b border-border">
        <div className="mx-auto mb-2">
          <Badge variant="outline" className="border-border bg-card text-xs font-semibold px-3 py-1">
            {hasWinner ? "Official Result" : "Auction Concluded"}
          </Badge>
        </div>

        <CardTitle className="text-2xl font-bold tracking-tight text-foreground font-sans">
          {hasWinner ? "Winner Determined" : "Auction Concluded"}
        </CardTitle>

        <CardDescription className="text-muted-foreground text-xs">
          {hasWinner
            ? "The countdown expired and the winning bid has been verified."
            : "No valid bids were submitted before the countdown deadline."}
        </CardDescription>
      </CardHeader>

      <CardContent className="space-y-4 px-6 pt-5">
        {hasWinner ? (
          <div className="space-y-4">
            {/* Winner spotlight box */}
            <div className="rounded-lg border border-emerald-500/30 bg-emerald-500/10 p-4 text-center">
              <span className="text-xs font-semibold text-emerald-800 dark:text-emerald-300 uppercase tracking-wide">
                Winning Participant
              </span>

              <div className="mt-2.5 flex items-center justify-center gap-3">
                <Avatar className="h-10 w-10 border border-emerald-500/40 bg-emerald-500/15">
                  <AvatarFallback className="font-bold text-emerald-800 dark:text-emerald-300 text-sm">
                    {winner.bidderName ? winner.bidderName.charAt(0).toUpperCase() : "W"}
                  </AvatarFallback>
                </Avatar>
                <div className="text-left">
                  <p className="text-lg font-bold text-foreground font-sans">{winner.bidderName}</p>
                  <p className="text-[11px] text-muted-foreground">Highest Verified Bidder</p>
                </div>
              </div>

              <div className="mt-3.5 border-t border-emerald-500/20 pt-3">
                <span className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
                  Winning Bid Amount
                </span>
                <p className="font-mono text-3xl font-bold text-emerald-700 dark:text-emerald-400">
                  {formatCurrency(winner.amount)}
                </p>
              </div>
            </div>

            {/* Quick stats summary */}
            <div className="grid grid-cols-2 gap-3 text-xs">
              <div className="rounded-lg bg-secondary/50 p-3 border border-border">
                <span className="text-muted-foreground font-medium">Total Bids Placed</span>
                <p className="mt-1 font-bold text-foreground text-sm font-mono">{totalBids}</p>
              </div>

              <div className="rounded-lg bg-secondary/50 p-3 border border-border">
                <span className="text-muted-foreground font-medium">Price Appreciation</span>
                <p className="mt-1 font-bold text-emerald-700 dark:text-emerald-400 text-sm font-mono">
                  +{formatCurrency(winner.amount - startingPrice)}
                </p>
              </div>
            </div>
          </div>
        ) : (
          <div className="rounded-lg border border-border bg-secondary/40 p-6 text-center">
            <p className="text-base font-semibold text-foreground">
              No Winner — No bids received
            </p>
            <p className="mt-1 text-xs text-muted-foreground leading-relaxed">
              The item did not receive any qualifying bids above the starting price of{" "}
              {formatCurrency(startingPrice)}.
            </p>
          </div>
        )}

        <Separator />

        <div className="rounded-lg bg-secondary/40 p-3 border border-border text-xs text-muted-foreground">
          Auction closed permanently. All transactions and bid records are finalized for auditability.
        </div>
      </CardContent>

      <CardFooter className="bg-secondary/30 p-4 border-t border-border flex justify-center">
        <Button
          onClick={() => onReset(300)}
          variant="outline"
          className="w-full h-9 text-xs font-medium"
        >
          Start New 5-Minute Round
        </Button>
      </CardFooter>
    </Card>
  );
}
