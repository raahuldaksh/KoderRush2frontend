import React from "react";
import { Badge } from "@/components/ui/badge";
import { Radio, CheckCircle2 } from "lucide-react";

export function StatusBadge({ status }) {
  const isLive = status === "LIVE";

  return (
    <Badge
      variant={isLive ? "live" : "secondary"}
      className={
        isLive
          ? "border-emerald-300 bg-emerald-50 text-emerald-700 px-3 py-1 text-xs font-semibold uppercase tracking-wider"
          : "border-slate-300 bg-slate-100 text-slate-700 px-3 py-1 text-xs font-semibold uppercase tracking-wider"
      }
    >
      {isLive ? (
        <>
          <Radio className="mr-1.5 h-3.5 w-3.5 animate-pulse text-emerald-600" />
          <span>Live Auction</span>
        </>
      ) : (
        <>
          <CheckCircle2 className="mr-1.5 h-3.5 w-3.5 text-slate-500" />
          <span>Auction Ended</span>
        </>
      )}
    </Badge>
  );
}
