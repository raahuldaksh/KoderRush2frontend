import React, { useState } from "react";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { formatCurrency } from "@/lib/utils";

export function BiddingPanel({
  currentHighestBid,
  minimumNextBid,
  highestBidder,
  status,
  onPlaceBid,
  feedback,
  onClearFeedback,
  isSubmitting,
}) {
  const [bidderName, setBidderName] = useState("");
  const [bidAmount, setBidAmount] = useState("");
  const [localError, setLocalError] = useState("");

  const isEnded = status === "ENDED";
  const minRequired = minimumNextBid || (currentHighestBid + 100);

  const handleSubmit = (e) => {
    e.preventDefault();
    setLocalError("");
    onClearFeedback();

    const trimmedName = bidderName.trim();
    if (!trimmedName) {
      setLocalError("Participant name cannot be empty.");
      return;
    }

    if (!bidAmount || bidAmount.trim() === "") {
      setLocalError("Please enter a valid bid amount.");
      return;
    }

    const num = parseFloat(bidAmount);
    if (isNaN(num) || !isFinite(num) || num <= 0) {
      setLocalError("Bid amount must be a positive number.");
      return;
    }

    // Minimum Bid Increment Rule: minimumNextBid = currentHighestBid + 100
    if (num < minRequired) {
      setLocalError(`Bid rejected. Your bid must be at least ${formatCurrency(minRequired)} (at least ₹100 higher than the current highest bid of ${formatCurrency(currentHighestBid)}).`);
      return;
    }

    // Call hook submit
    const result = onPlaceBid(trimmedName, num);
    if (result.success) {
      setBidAmount(""); // Reset bid amount field per specs
      setLocalError("");
    } else if (result.error) {
      setLocalError(result.error);
    }
  };

  // Quick increment buttons based on current highest
  const handleQuickAdd = (increment) => {
    const nextVal = currentHighestBid + increment;
    setBidAmount(nextVal.toString());
    setLocalError("");
  };

  // Fill exact minimum required bid
  const handleFillExactMinimum = () => {
    setBidAmount(minRequired.toString());
    setLocalError("");
  };

  // Quick participant presets for demonstration
  const handlePresetParticipant = (name, amount) => {
    setBidderName(name);
    setBidAmount(amount.toString());
    setLocalError("");
  };

  return (
    <Card className="border-border shadow-sm bg-card transition-colors">
      <CardHeader className="pb-4">
        <div className="flex items-center justify-between">
          <CardTitle className="text-xl font-bold text-foreground font-sans">
            Place Your Bid
          </CardTitle>
          <Badge variant="outline" className="text-xs font-semibold px-2.5 py-0.5 border-border bg-secondary">
            Min Increment: ₹100
          </Badge>
        </div>
        <CardDescription className="text-muted-foreground text-xs">
          Every new bid must be at least ₹100 higher than the current highest bid.
        </CardDescription>
      </CardHeader>

      <CardContent className="space-y-4">
        {/* Dynamic Reference Box with Current Highest Bid and Minimum Next Bid */}
        <div className="rounded-lg bg-secondary/40 border border-border p-4 space-y-2.5 text-xs">
          <div className="flex justify-between items-center">
            <span className="text-muted-foreground font-medium">Current Highest Bid</span>
            <span className="font-mono font-bold text-foreground text-base">
              {formatCurrency(currentHighestBid)}
            </span>
          </div>

          <div className="flex justify-between items-center py-2 px-3 rounded-md bg-card border border-border">
            <span className="text-foreground font-semibold">
              Minimum Next Bid
            </span>
            <span className="font-mono font-bold text-emerald-700 dark:text-emerald-400 text-lg">
              {formatCurrency(minRequired)}
            </span>
          </div>

          {highestBidder ? (
            <div className="flex justify-between items-center pt-1 text-muted-foreground">
              <span className="font-medium">Leading Bidder:</span>
              <span className="font-semibold text-foreground">{highestBidder}</span>
            </div>
          ) : (
            <div className="flex justify-between items-center pt-1 text-muted-foreground">
              <span className="font-medium">Reserve Base:</span>
              <span className="font-medium text-foreground">Awaiting first qualifying bid</span>
            </div>
          )}
        </div>

        {/* Feedback Alert: Local error or hook error/success */}
        {localError && (
          <Alert variant="destructive" className="py-2.5">
            <AlertTitle>Invalid Bid</AlertTitle>
            <AlertDescription>{localError}</AlertDescription>
          </Alert>
        )}

        {feedback && feedback.type === "error" && !localError && (
          <Alert variant="destructive" className="py-2.5">
            <AlertTitle>Bidding Error</AlertTitle>
            <AlertDescription>{feedback.message}</AlertDescription>
          </Alert>
        )}

        {feedback && feedback.type === "success" && (
          <Alert variant="success" className="py-2.5 animate-fade-in">
            <AlertTitle>Bid Accepted</AlertTitle>
            <AlertDescription>{feedback.message}</AlertDescription>
          </Alert>
        )}

        {/* Bidding Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Participant Name */}
          <div className="space-y-1.5">
            <Label htmlFor="bidderName" className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
              Participant Name
            </Label>
            <Input
              id="bidderName"
              type="text"
              placeholder="e.g., Rahul Sharma"
              value={bidderName}
              onChange={(e) => {
                setBidderName(e.target.value);
                setLocalError("");
              }}
              disabled={isEnded || isSubmitting}
              className="h-9 text-sm"
            />
          </div>

          {/* Bid Amount */}
          <div className="space-y-1.5">
            <div className="flex justify-between items-center">
              <Label htmlFor="bidAmount" className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                Bid Amount (INR)
              </Label>
              <button
                type="button"
                onClick={handleFillExactMinimum}
                disabled={isEnded || isSubmitting}
                className="text-xs font-medium text-foreground hover:underline cursor-pointer disabled:opacity-40"
              >
                Set min: {formatCurrency(minRequired)}
              </button>
            </div>

            <div className="relative">
              <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3 text-muted-foreground font-mono text-sm font-semibold">
                ₹
              </div>
              <Input
                id="bidAmount"
                type="number"
                step="any"
                min={minRequired}
                placeholder={`Min: ${minRequired}`}
                value={bidAmount}
                onChange={(e) => {
                  setBidAmount(e.target.value);
                  setLocalError("");
                }}
                disabled={isEnded || isSubmitting}
                className="pl-8 font-mono font-bold text-sm h-9"
              />
            </div>
            {/* Required Helper Text */}
            <p className="text-[11px] text-muted-foreground">
              Your bid must be at least ₹100 higher than the current highest bid.
            </p>
          </div>

          {/* Quick Increment Buttons using authentic shadcn Button */}
          {!isEnded && (
            <div className="space-y-1.5 pt-1">
              <span className="text-[11px] font-medium uppercase tracking-wider text-muted-foreground">
                Quick Increments:
              </span>
              <div className="grid grid-cols-3 gap-2">
                {[100, 200, 500].map((inc) => (
                  <Button
                    key={inc}
                    type="button"
                    variant="outline"
                    size="sm"
                    disabled={isEnded || isSubmitting}
                    onClick={() => handleQuickAdd(inc)}
                    className="h-8 text-xs font-mono font-medium"
                  >
                    +{formatCurrency(inc)}
                  </Button>
                ))}
              </div>
            </div>
          )}

          {/* Submit Button - Authentic shadcn primary button */}
          <Button
            type="submit"
            disabled={isEnded || isSubmitting}
            className="w-full h-10 text-sm font-semibold tracking-wide shadow-sm"
          >
            {isSubmitting ? (
              <span className="flex items-center justify-center gap-2">
                <span className="h-4 w-4 animate-spin rounded-full border-2 border-primary-foreground border-t-transparent" />
                Validating Bid...
              </span>
            ) : isEnded ? (
              "Auction Ended — Bidding Closed"
            ) : (
              "Place Bid"
            )}
          </Button>
        </form>

        <Separator />

        {/* Preset Sequence Matching User Example */}
        <div className="space-y-2 pt-1">
          <div className="flex items-center justify-between text-[11px]">
            <span className="font-medium text-foreground">
              Sequence Presets:
            </span>
            <span className="text-[10px] text-muted-foreground">Autofill sample bids</span>
          </div>

          <div className="grid grid-cols-3 gap-2">
            {[
              { name: "Rahul", amount: 2100, note: "Min +₹100" },
              { name: "Aman", amount: 2150, note: "Test Invalid" },
              { name: "Priya", amount: 2200, note: "Valid Next" },
            ].map((preset) => (
              <button
                key={`${preset.name}-${preset.amount}`}
                type="button"
                disabled={isEnded || isSubmitting}
                onClick={() => handlePresetParticipant(preset.name, preset.amount)}
                className="rounded-md border border-border bg-secondary/40 p-2 text-left hover:border-foreground/50 hover:bg-secondary disabled:opacity-50 transition-all cursor-pointer"
              >
                <div className="flex justify-between items-center">
                  <span className="text-xs font-semibold text-foreground">{preset.name}</span>
                  <span className="text-[9px] text-muted-foreground">{preset.note}</span>
                </div>
                <p className="font-mono text-[11px] text-foreground font-bold mt-0.5">
                  {formatCurrency(preset.amount)}
                </p>
              </button>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
