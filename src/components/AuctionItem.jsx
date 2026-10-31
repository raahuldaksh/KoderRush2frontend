import React, { useState } from "react";
import { Headphones, Tag, ShieldCheck, Zap, Award } from "lucide-react";
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
    <Card className="overflow-hidden border-slate-200 shadow-sm bg-white hover:shadow-md transition-shadow">
      {/* Product Image Area */}
      <div className="relative aspect-[16/10] w-full bg-slate-50 overflow-hidden flex items-center justify-center border-b border-slate-100">
        {!imgError ? (
          <img
            src="/headphones.jpg"
            alt="Premium Wireless Headphones"
            onError={() => setImgError(true)}
            className="h-full w-full object-contain p-4 hover:scale-105 transition-transform duration-500 ease-out"
          />
        ) : (
          <div className="flex flex-col items-center justify-center p-8 text-center text-slate-400">
            <div className="h-20 w-20 rounded-2xl bg-slate-100 flex items-center justify-center mb-3">
              <Headphones className="h-10 w-10 text-slate-500" />
            </div>
            <p className="text-sm font-medium text-slate-600">Premium Wireless Headphones</p>
            <p className="text-xs text-slate-400">Image Fallback Preview</p>
          </div>
        )}

        {/* Status pill on image */}
        <div className="absolute top-3 left-3">
          <StatusBadge status={status} />
        </div>

        {/* Authenticity tag */}
        <div className="absolute top-3 right-3 flex items-center gap-1 bg-white/90 backdrop-blur-sm px-2.5 py-1 rounded-full border border-slate-200 text-xs font-medium text-slate-700 shadow-xs">
          <ShieldCheck className="h-3.5 w-3.5 text-blue-600" />
          <span>Verified Item</span>
        </div>
      </div>

      <CardContent className="p-6 space-y-5">
        {/* Title & Tagline */}
        <div>
          <div className="flex flex-wrap items-center gap-2 mb-2">
            <Badge variant="outline" className="text-slate-600 border-slate-200 font-normal">
              Audio & Electronics
            </Badge>
            <Badge variant="outline" className="text-blue-700 border-blue-200 bg-blue-50/50 font-normal">
              Brand New In Box
            </Badge>
          </div>

          <h2 className="text-2xl font-bold tracking-tight text-slate-900">
            Premium Wireless Headphones
          </h2>
          <p className="mt-2 text-sm leading-relaxed text-slate-600">
            Brand-new premium noise-cancelling wireless headphones with immersive sound,
            comfortable design and long-lasting battery life.
          </p>
        </div>

        <Separator />

        {/* Pricing Matrix */}
        <div className="grid grid-cols-2 gap-4 rounded-xl bg-slate-50/70 p-4 border border-slate-100">
          <div>
            <span className="text-xs font-medium uppercase tracking-wider text-slate-500 flex items-center gap-1">
              <Tag className="h-3.5 w-3.5 text-slate-400" />
              Starting Price
            </span>
            <p className="mt-1 font-mono text-lg font-semibold text-slate-700">
              {formatCurrency(startingPrice)}
            </p>
          </div>

          <div className="border-l border-slate-200 pl-4">
            <span className="text-xs font-semibold uppercase tracking-wider text-blue-700 flex items-center gap-1">
              <Award className="h-3.5 w-3.5 text-blue-600" />
              Current Highest Bid
            </span>
            <p className="mt-1 font-mono text-2xl font-extrabold text-blue-600">
              {formatCurrency(currentHighestBid)}
            </p>
            {highestBidder ? (
              <p className="text-xs font-medium text-slate-600 truncate mt-0.5">
                by <span className="font-semibold text-slate-900">{highestBidder}</span>
              </p>
            ) : (
              <p className="text-xs text-slate-400 italic mt-0.5">No bids placed yet</p>
            )}
          </div>
        </div>

        {/* Countdown Timer component embedded in Left Hero Item Card */}
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
