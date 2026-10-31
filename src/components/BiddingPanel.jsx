import React, { useState } from "react";
import { Gavel, AlertCircle, CheckCircle2, User, IndianRupee, ArrowUpRight, Sparkles } from "lucide-react";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert";
import { Separator } from "@/components/ui/separator";
import { formatCurrency } from "@/lib/utils";

export function BiddingPanel({
  currentHighestBid,
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
  const minAcceptableBid = currentHighestBid + 1;

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

    if (num <= currentHighestBid) {
      setLocalError(`Bid must be strictly greater than current highest bid (${formatCurrency(currentHighestBid)}).`);
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
          <CardTitle className="text-xl font-bold text-foreground flex items-center gap-2 font-sans">
            <Gavel className="h-5 w-5 text-foreground" />
            Place Your Bid
          </CardTitle>
          <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-secondary text-secondary-foreground border border-border">
            Min Step: ₹1+
          </span>
        </div>
        <CardDescription className="text-muted-foreground">
          Enter your name and an amount higher than the current highest bid to participate.
        </CardDescription>
      </CardHeader>

      <CardContent className="space-y-4">
        {/* Status Callout / Reference */}
        <div className="rounded-xl bg-secondary/40 border border-border p-3.5 space-y-1.5 text-xs text-muted-foreground">
          <div className="flex justify-between items-center">
            <span>Current Highest Bid:</span>
            <span className="font-mono font-bold text-foreground text-sm">
              {formatCurrency(currentHighestBid)}
            </span>
          </div>
          <div className="flex justify-between items-center">
            <span>Minimum Acceptable Bid:</span>
            <span className="font-mono font-semibold text-emerald-600 dark:text-emerald-400 text-sm">
              &gt; {formatCurrency(currentHighestBid)}
            </span>
          </div>
          {highestBidder && (
            <div className="flex justify-between items-center pt-1 border-t border-border">
              <span>Leading Bidder:</span>
              <span className="font-medium text-foreground">{highestBidder}</span>
            </div>
          )}
        </div>

        {/* Feedback Alert: Local error or hook error/success */}
        {localError && (
          <Alert variant="destructive" className="py-2.5">
            <AlertCircle className="h-4 w-4" />
            <AlertTitle className="text-xs font-bold">Invalid Bid</AlertTitle>
            <AlertDescription className="text-xs font-medium">{localError}</AlertDescription>
          </Alert>
        )}

        {feedback && feedback.type === "error" && !localError && (
          <Alert variant="destructive" className="py-2.5">
            <AlertCircle className="h-4 w-4" />
            <AlertTitle className="text-xs font-bold">Bidding Error</AlertTitle>
            <AlertDescription className="text-xs font-medium">{feedback.message}</AlertDescription>
          </Alert>
        )}

        {feedback && feedback.type === "success" && (
          <Alert variant="success" className="py-2.5 animate-fade-in">
            <CheckCircle2 className="h-4 w-4" />
            <AlertTitle className="text-xs font-bold">Bid Accepted!</AlertTitle>
            <AlertDescription className="text-xs font-medium">{feedback.message}</AlertDescription>
          </Alert>
        )}

        {/* Bidding Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Participant Name */}
          <div className="space-y-1.5">
            <Label htmlFor="bidderName" className="text-xs font-semibold text-foreground flex items-center gap-1.5">
              <User className="h-3.5 w-3.5 text-muted-foreground" />
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
            />
          </div>

          {/* Bid Amount */}
          <div className="space-y-1.5">
            <Label htmlFor="bidAmount" className="text-xs font-semibold text-foreground flex items-center gap-1.5">
              <IndianRupee className="h-3.5 w-3.5 text-muted-foreground" />
              Bid Amount (INR)
            </Label>
            <div className="relative">
              <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3 text-muted-foreground font-mono text-sm">
                ₹
              </div>
              <Input
                id="bidAmount"
                type="number"
                step="any"
                min={minAcceptableBid}
                placeholder={`Must be > ${currentHighestBid}`}
                value={bidAmount}
                onChange={(e) => {
                  setBidAmount(e.target.value);
                  setLocalError("");
                }}
                disabled={isEnded || isSubmitting}
                className="pl-8 font-mono font-medium"
              />
            </div>
            <p className="text-[11px] text-muted-foreground">
              Must be strictly greater than {formatCurrency(currentHighestBid)}.
            </p>
          </div>

          {/* Quick Increment Buttons */}
          {!isEnded && (
            <div className="space-y-1.5 pt-1">
              <span className="text-[11px] font-medium text-muted-foreground">Quick Increment:</span>
              <div className="grid grid-cols-3 gap-2">
                {[100, 500, 1000].map((inc) => (
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

          {/* Submit Button */}
          <Button
            type="submit"
            disabled={isEnded || isSubmitting}
            className="w-full h-11 text-base font-semibold shadow-sm transition-all"
          >
            {isSubmitting ? (
              <span className="flex items-center gap-2">
                <span className="h-4 w-4 animate-spin rounded-full border-2 border-primary-foreground border-t-transparent" />
                Validating Bid...
              </span>
            ) : isEnded ? (
              "Auction Ended — Bidding Closed"
            ) : (
              <span className="flex items-center justify-center gap-1.5">
                <ArrowUpRight className="h-4 w-4" />
                Place Bid
              </span>
            )}
          </Button>
        </form>

        <Separator />

        {/* Participant Simulation Presets for Hackathon Testing */}
        <div className="space-y-2 pt-1">
          <div className="flex items-center justify-between text-[11px] text-muted-foreground">
            <span className="flex items-center gap-1 font-semibold text-foreground">
              <Sparkles className="h-3.5 w-3.5 text-foreground" />
              Simulate Participant:
            </span>
            <span className="text-[10px] text-muted-foreground">Click to autofill sample bids</span>
          </div>

          <div className="grid grid-cols-3 gap-2">
            {[
              { name: "Rahul", amount: 2500 },
              { name: "Aman", amount: 3000 },
              { name: "Priya", amount: 3500 },
            ].map((preset) => (
              <button
                key={preset.name}
                type="button"
                disabled={isEnded || isSubmitting}
                onClick={() => handlePresetParticipant(preset.name, preset.amount)}
                className="rounded-lg border border-border bg-secondary/40 p-2 text-left hover:border-foreground/50 hover:bg-secondary disabled:opacity-50 transition-all cursor-pointer"
              >
                <p className="text-xs font-semibold text-foreground">{preset.name}</p>
                <p className="font-mono text-[11px] text-muted-foreground font-medium">
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
