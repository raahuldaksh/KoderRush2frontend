import React from "react";
import { Award, Hash, Tag, TrendingUp, Users } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { formatCurrency } from "@/lib/utils";

export function AuctionStats({ currentHighestBid, totalBids, startingPrice, highestBidder }) {
  const priceGrowth = currentHighestBid - startingPrice;
  const growthPercent = startingPrice > 0 ? ((priceGrowth / startingPrice) * 100).toFixed(0) : 0;

  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
      {/* 1. Current Highest Bid */}
      <Card className="border-slate-200 shadow-xs bg-white hover:border-blue-200 transition-colors">
        <CardContent className="p-5 flex items-center justify-between">
          <div>
            <p className="text-xs font-semibold uppercase tracking-wider text-slate-500">
              Current Highest Bid
            </p>
            <p className="mt-1 font-mono text-2xl font-bold text-blue-600">
              {formatCurrency(currentHighestBid)}
            </p>
            <p className="mt-1 text-xs text-slate-500 truncate">
              {highestBidder ? (
                <span>
                  Leader: <strong className="text-slate-800">{highestBidder}</strong>
                </span>
              ) : (
                "Awaiting first bid"
              )}
            </p>
          </div>
          <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-blue-50 text-blue-600 border border-blue-100">
            <Award className="h-6 w-6" />
          </div>
        </CardContent>
      </Card>

      {/* 2. Total Bids */}
      <Card className="border-slate-200 shadow-xs bg-white hover:border-slate-300 transition-colors">
        <CardContent className="p-5 flex items-center justify-between">
          <div>
            <p className="text-xs font-semibold uppercase tracking-wider text-slate-500">
              Total Bids Placed
            </p>
            <p className="mt-1 font-mono text-2xl font-bold text-slate-900">
              {totalBids}
            </p>
            <p className="mt-1 text-xs text-slate-500">
              {totalBids === 0 ? "No active competition" : `${totalBids} transparent bid${totalBids === 1 ? "" : "s"}`}
            </p>
          </div>
          <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-slate-100 text-slate-700 border border-slate-200">
            <Hash className="h-6 w-6" />
          </div>
        </CardContent>
      </Card>

      {/* 3. Starting Price */}
      <Card className="border-slate-200 shadow-xs bg-white hover:border-slate-300 transition-colors">
        <CardContent className="p-5 flex items-center justify-between">
          <div>
            <p className="text-xs font-semibold uppercase tracking-wider text-slate-500">
              Starting Price
            </p>
            <p className="mt-1 font-mono text-2xl font-bold text-slate-700">
              {formatCurrency(startingPrice)}
            </p>
            <p className="mt-1 text-xs text-slate-500 flex items-center gap-1">
              {priceGrowth > 0 ? (
                <span className="text-emerald-700 font-semibold flex items-center">
                  <TrendingUp className="h-3 w-3 mr-0.5 inline" />
                  +{formatCurrency(priceGrowth)} ({growthPercent}%)
                </span>
              ) : (
                "Reserve base price"
              )}
            </p>
          </div>
          <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-slate-50 text-slate-600 border border-slate-200">
            <Tag className="h-6 w-6" />
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
