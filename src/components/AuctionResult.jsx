import React, { useEffect } from "react";
import { Trophy, Ban, Award, CheckCircle2, RotateCcw, Users, TrendingUp } from "lucide-react";
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
          colors: ["#2563EB", "#16A34A", "#F59E0B", "#6366F1"],
          disableForReducedMotion: true,
        });
      } catch (e) {
        // Safe fallback if canvas is restricted
      }
    }
  }, [hasWinner]);

  return (
    <Card className="border-2 border-blue-200/80 bg-white shadow-md overflow-hidden animate-fade-in">
      <CardHeader className={`text-center pb-4 ${hasWinner ? "bg-gradient-to-b from-blue-50/70 to-transparent" : "bg-slate-50/70"}`}>
        <div className="mx-auto mb-3 flex h-14 w-14 items-center justify-center rounded-full bg-white shadow-sm border border-slate-200">
          {hasWinner ? (
            <Trophy className="h-7 w-7 text-amber-500 animate-bounce" />
          ) : (
            <Ban className="h-7 w-7 text-slate-400" />
          )}
        </div>

        <CardTitle className="text-2xl font-bold tracking-tight text-slate-900">
          {hasWinner ? "Auction Winner Announced!" : "Auction Concluded"}
        </CardTitle>

        <CardDescription className="text-slate-600">
          {hasWinner
            ? "The countdown expired and the winning bid has been verified."
            : "No valid bids were submitted before the countdown deadline."}
        </CardDescription>
      </CardHeader>

      <CardContent className="space-y-5 px-6 pt-2">
        {hasWinner ? (
          <div className="space-y-4">
            {/* Winner spotlight box */}
            <div className="rounded-xl border border-emerald-200 bg-emerald-50/60 p-4 text-center">
              <span className="inline-flex items-center gap-1 rounded-full bg-emerald-100 px-3 py-1 text-xs font-bold text-emerald-800 uppercase tracking-wide">
                <Award className="h-3.5 w-3.5 text-emerald-600" />
                Official Winner
              </span>

              <div className="mt-3 flex items-center justify-center gap-3">
                <Avatar className="h-12 w-12 border-2 border-emerald-300 ring-2 ring-emerald-100 bg-emerald-100">
                  <AvatarFallback className="font-bold text-emerald-800 text-lg">
                    {winner.bidderName ? winner.bidderName.charAt(0).toUpperCase() : "W"}
                  </AvatarFallback>
                </Avatar>
                <div className="text-left">
                  <p className="text-xl font-bold text-slate-900">{winner.bidderName}</p>
                  <p className="text-xs text-slate-500">Highest Verified Bidder</p>
                </div>
              </div>

              <div className="mt-4 border-t border-emerald-200/70 pt-3">
                <span className="text-xs font-semibold uppercase tracking-wider text-emerald-900">
                  Winning Bid Amount
                </span>
                <p className="font-mono text-3xl font-extrabold text-emerald-700">
                  {formatCurrency(winner.amount)}
                </p>
              </div>
            </div>

            {/* Quick stats summary */}
            <div className="grid grid-cols-2 gap-3 text-xs text-slate-600">
              <div className="rounded-lg bg-slate-50 p-3 border border-slate-200/80">
                <span className="text-slate-500 flex items-center gap-1">
                  <Users className="h-3.5 w-3.5 text-slate-400" />
                  Total Bids
                </span>
                <p className="mt-1 font-semibold text-slate-900 text-base">{totalBids}</p>
              </div>

              <div className="rounded-lg bg-slate-50 p-3 border border-slate-200/80">
                <span className="text-slate-500 flex items-center gap-1">
                  <TrendingUp className="h-3.5 w-3.5 text-slate-400" />
                  Value Increase
                </span>
                <p className="mt-1 font-semibold text-emerald-700 text-base">
                  +{formatCurrency(winner.amount - startingPrice)}
                </p>
              </div>
            </div>
          </div>
        ) : (
          <div className="rounded-xl border border-slate-200 bg-slate-50 p-6 text-center">
            <p className="text-lg font-semibold text-slate-800">
              No Winner — No bids received
            </p>
            <p className="mt-1 text-xs text-slate-500 leading-relaxed">
              The item did not receive any qualifying bids above the starting price of{" "}
              {formatCurrency(startingPrice)}.
            </p>
          </div>
        )}

        <Separator />

        <div className="rounded-lg bg-blue-50/60 p-3.5 border border-blue-100 flex items-start gap-2.5 text-xs text-blue-900">
          <CheckCircle2 className="h-4 w-4 text-blue-600 shrink-0 mt-0.5" />
          <p className="leading-relaxed">
            Auction closed permanently. All transactions and bid records are recorded for
            transparent event auditability.
          </p>
        </div>
      </CardContent>

      <CardFooter className="bg-slate-50/70 p-4 border-t border-slate-100 flex justify-center">
        <Button
          onClick={() => onReset(300)}
          variant="outline"
          className="w-full text-slate-700 hover:text-slate-900 font-medium"
        >
          <RotateCcw className="mr-2 h-4 w-4" />
          Start New 5-Minute Auction Round
        </Button>
      </CardFooter>
    </Card>
  );
}
