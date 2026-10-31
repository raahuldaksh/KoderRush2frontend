import React from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { formatCurrency } from "@/lib/utils";

export function AuctionStats({ currentHighestBid, totalBids, startingPrice, highestBidder }) {
  const priceGrowth = currentHighestBid - startingPrice;
  const growthPercent = startingPrice > 0 ? ((priceGrowth / startingPrice) * 100).toFixed(0) : 0;

  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
      {/* 1. Current Highest Bid */}
      <Card className="border-border bg-card shadow-xs transition-colors">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
            Current Highest Bid
          </CardTitle>
          <span className="text-[11px] font-mono text-muted-foreground">Live</span>
        </CardHeader>
        <CardContent>
          <div className="font-mono text-2xl sm:text-3xl font-bold tracking-tight text-foreground">
            {formatCurrency(currentHighestBid)}
          </div>
          <p className="text-xs text-muted-foreground mt-1 truncate">
            {highestBidder ? (
              <span>
                Leading Bidder: <strong className="text-foreground font-semibold">{highestBidder}</strong>
              </span>
            ) : (
              "Awaiting first qualifying bid"
            )}
          </p>
        </CardContent>
      </Card>

      {/* 2. Total Bids */}
      <Card className="border-border bg-card shadow-xs transition-colors">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
            Total Bids Placed
          </CardTitle>
          <span className="text-[11px] font-mono text-muted-foreground">Count</span>
        </CardHeader>
        <CardContent>
          <div className="font-mono text-2xl sm:text-3xl font-bold tracking-tight text-foreground">
            {totalBids}
          </div>
          <p className="text-xs text-muted-foreground mt-1">
            {totalBids === 0 ? "No bids recorded yet" : `${totalBids} verified bid${totalBids === 1 ? "" : "s"} submitted`}
          </p>
        </CardContent>
      </Card>

      {/* 3. Starting Price */}
      <Card className="border-border bg-card shadow-xs transition-colors">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
            Starting Reserve Price
          </CardTitle>
          <span className="text-[11px] font-mono text-muted-foreground">Base</span>
        </CardHeader>
        <CardContent>
          <div className="font-mono text-2xl sm:text-3xl font-bold tracking-tight text-foreground/80">
            {formatCurrency(startingPrice)}
          </div>
          <p className="text-xs text-muted-foreground mt-1 font-medium">
            {priceGrowth > 0 ? (
              <span className="text-emerald-700 dark:text-emerald-400 font-semibold">
                +{formatCurrency(priceGrowth)} (+{growthPercent}%) value appreciation
              </span>
            ) : (
              "Initial opening auction price"
            )}
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
