import React, { useState } from "react";
import { Headphones, Tag, ShieldCheck, Award } from "lucide-react";
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
    <Card className="overflow-hidden border-border shadow-sm bg-card transition-colors">
      {/* Product Image Area with High-Contrast Framing */}
      <div className="relative aspect-[16/10] w-full bg-secondary/30 overflow-hidden flex items-center justify-center border-b border-border">
        {!imgError ? (
          <img
            src="/headphones.jpg"
            alt="Premium Wireless Headphones"
            onError={() => setImgError(true)}
            className="h-full w-full object-contain p-4 hover:scale-102 transition-transform duration-300 ease-out"
          />
        ) : (
          <div className="flex flex-col items-center justify-center p-8 text-center text-muted-foreground">
            <div className="h-20 w-20 rounded-2xl bg-secondary flex items-center justify-center mb-3 border border-border">
              <Headphones className="h-10 w-10 text-foreground" />
            </div>
            <p className="text-sm font-bold text-foreground">Premium Wireless Headphones</p>
            <p className="text-xs text-muted-foreground">Product Preview</p>
          </div>
        )}

        {/* Live / Ended Status pill */}
        <div className="absolute top-3 left-3">
          <StatusBadge status={status} />
        </div>

        {/* Verified Authenticity Tag - High Contrast Black Pill */}
        <div className="absolute top-3 right-3 flex items-center gap-1.5 bg-foreground text-background px-3 py-1 rounded-full text-xs font-bold shadow-xs">
          <ShieldCheck className="h-3.5 w-3.5 text-background" />
          <span>Verified Item</span>
        </div>
      </div>

      <CardContent className="p-6 space-y-5">
        {/* Title, Category & Description */}
        <div>
          <div className="flex flex-wrap items-center gap-2 mb-2.5">
            <Badge variant="outline" className="text-muted-foreground border-border font-medium text-xs">
              Audio & Electronics
            </Badge>
            <Badge variant="outline" className="text-foreground border-foreground/30 bg-secondary font-semibold text-xs">
              Brand New In Box
            </Badge>
          </div>

          <h2 className="text-2xl font-black tracking-tight text-foreground font-sans">
            Premium Wireless Headphones
          </h2>
          <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
            Brand-new premium noise-cancelling wireless headphones with immersive sound,
            comfortable design and long-lasting battery life.
          </p>
        </div>

        <Separator />

        {/* Pricing Matrix - Structured Black and White Hierarchy */}
        <div className="grid grid-cols-2 gap-4 rounded-xl bg-secondary/50 p-4 border border-border">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-muted-foreground flex items-center gap-1">
              <Tag className="h-3.5 w-3.5 text-muted-foreground" />
              Starting Price
            </span>
            <p className="mt-1 font-mono text-xl font-bold text-foreground/80">
              {formatCurrency(startingPrice)}
            </p>
          </div>

          <div className="border-l border-border pl-4">
            <span className="text-xs font-bold uppercase tracking-wider text-foreground flex items-center gap-1">
              <Award className="h-3.5 w-3.5 text-foreground" />
              Current Highest Bid
            </span>
            <p className="mt-1 font-mono text-3xl font-black text-foreground tracking-tight">
              {formatCurrency(currentHighestBid)}
            </p>
            {highestBidder ? (
              <p className="text-xs font-semibold text-muted-foreground truncate mt-0.5">
                by <span className="font-bold text-foreground">{highestBidder}</span>
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
