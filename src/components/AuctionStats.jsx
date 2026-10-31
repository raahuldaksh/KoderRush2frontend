import React from "react";
import { Award, Hash, Tag, TrendingUp } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { formatCurrency } from "@/lib/utils";

export function AuctionStats({ currentHighestBid, totalBids, startingPrice, highestBidder }) {
  const priceGrowth = currentHighestBid - startingPrice;
  const growthPercent = startingPrice > 0 ? ((priceGrowth / startingPrice) * 100).toFixed(0) : 0;

  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4.5">
      {/* 1. Current Highest Bid */}
      <Card className="border-border shadow-xs bg-card hover:border-foreground/40 transition-colors">
        <CardContent className="p-5 flex items-center justify-between">
          <div>
            <p className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
              Current Highest Bid
            </p>
            <p className="mt-1 font-mono text-3xl font-black text-foreground tracking-tight">
              {formatCurrency(currentHighestBid)}
            </p>
            <p className="mt-1 text-xs text-muted-foreground truncate">
              {highestBidder ? (
                <span>
                  Leader: <strong className="text-foreground font-bold">{highestBidder}</strong>
                </span>
              ) : (
                "Awaiting first bid"
              )}
            </p>
          </div>
          <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-foreground text-background shadow-2xs">
            <Award className="h-6 w-6 text-background" />
          </div>
        </CardContent>
      </Card>

      {/* 2. Total Bids */}
      <Card className="border-border shadow-xs bg-card hover:border-foreground/40 transition-colors">
        <CardContent className="p-5 flex items-center justify-between">
          <div>
            <p className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
              Total Bids Placed
            </p>
            <p className="mt-1 font-mono text-3xl font-black text-foreground tracking-tight">
              {totalBids}
            </p>
            <p className="mt-1 text-xs text-muted-foreground">
              {totalBids === 0 ? "No active competition" : `${totalBids} verified bid${totalBids === 1 ? "" : "s"}`}
            </p>
          </div>
          <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-secondary text-foreground border border-border">
            <Hash className="h-6 w-6" />
          </div>
        </CardContent>
      </Card>

      {/* 3. Starting Price */}
      <Card className="border-border shadow-xs bg-card hover:border-foreground/40 transition-colors">
        <CardContent className="p-5 flex items-center justify-between">
          <div>
            <p className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
              Starting Price
            </p>
            <p className="mt-1 font-mono text-2xl font-black text-foreground/85">
              {formatCurrency(startingPrice)}
            </p>
            <p className="mt-1 text-xs text-muted-foreground flex items-center gap-1 font-medium">
              {priceGrowth > 0 ? (
                <span className="text-emerald-600 dark:text-emerald-400 font-bold flex items-center">
                  <TrendingUp className="h-3.5 w-3.5 mr-0.5 inline" />
                  +{formatCurrency(priceGrowth)} ({growthPercent}%)
                </span>
              ) : (
                "Reserve base price"
              )}
            </p>
          </div>
          <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-secondary text-muted-foreground border border-border">
            <Tag className="h-6 w-6" />
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
