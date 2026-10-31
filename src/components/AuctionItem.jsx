import React, { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { StatusBadge } from "@/components/StatusBadge";
import { CountdownTimer } from "@/components/CountdownTimer";
import { formatCurrency } from "@/lib/utils";

export function AuctionItem({
  startingPrice,
  currentHighestBid,
  highestBidder,
  status,
  remainingSeconds,
}) {
  const [imgError, setImgError] = useState(false);

  return (
    <Card className="overflow-hidden border-border bg-card shadow-sm transition-colors">
      {/* Product Image Area */}
      <div className="relative aspect-[16/10] w-full bg-secondary/30 overflow-hidden flex items-center justify-center border-b border-border">
        {!imgError ? (
          <img
            src="/headphones.jpg"
            alt="Premium Wireless Headphones"
            onError={() => setImgError(true)}
            className="h-full w-full object-contain p-6 hover:scale-102 transition-transform duration-300 ease-out"
          />
        ) : (
          <div className="flex flex-col items-center justify-center p-8 text-center text-muted-foreground">
            <p className="text-sm font-semibold text-foreground">Premium Wireless Headphones</p>
            <p className="text-xs text-muted-foreground">Product Preview</p>
          </div>
        )}

        {/* Live / Ended Status pill */}
        <div className="absolute top-3 left-3">
          <StatusBadge status={status} />
        </div>

        {/* Verified Authenticity Tag - Clean Typography */}
        <div className="absolute top-3 right-3">
          <Badge variant="outline" className="bg-card/90 backdrop-blur-sm text-foreground border-border text-[11px] font-semibold">
            Verified Item
          </Badge>
        </div>
      </div>

      <CardContent className="p-6 space-y-5">
        {/* Title, Category & Description */}
        <div>
          <div className="flex flex-wrap items-center gap-2 mb-2">
            <Badge variant="outline" className="text-muted-foreground border-border font-medium text-xs">
              Audio & Electronics
            </Badge>
            <Badge variant="outline" className="text-foreground border-border bg-secondary font-medium text-xs">
              Brand New
            </Badge>
          </div>

          <h2 className="text-2xl font-bold tracking-tight text-foreground font-sans">
            Premium Wireless Headphones
          </h2>
          <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
            Brand-new premium noise-cancelling wireless headphones with immersive sound,
            comfortable design and long-lasting battery life.
          </p>
        </div>

        <Separator />

        {/* Pricing Matrix */}
        <div className="grid grid-cols-2 gap-4 rounded-lg bg-secondary/40 p-4 border border-border">
          <div>
            <span className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
              Starting Price
            </span>
            <p className="mt-1 font-mono text-xl font-bold text-foreground/80">
              {formatCurrency(startingPrice)}
            </p>
          </div>

          <div className="border-l border-border pl-4">
            <span className="text-xs font-semibold uppercase tracking-wider text-foreground">
              Current Highest Bid
            </span>
            <p className="mt-1 font-mono text-2xl sm:text-3xl font-bold text-foreground tracking-tight">
              {formatCurrency(currentHighestBid)}
            </p>
            {highestBidder ? (
              <p className="text-xs font-medium text-muted-foreground truncate mt-0.5">
                by <span className="font-semibold text-foreground">{highestBidder}</span>
              </p>
            ) : (
              <p className="text-xs text-muted-foreground/60 italic mt-0.5">No bids placed yet</p>
            )}
          </div>
        </div>

        {/* Embedded Countdown Timer */}
        <div>
          <CountdownTimer
            remainingSeconds={remainingSeconds}
            status={status}
            totalDuration={300}
          />
        </div>
      </CardContent>
    </Card>
  );
}
