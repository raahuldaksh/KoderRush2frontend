import React from "react";
import { Badge } from "@/components/ui/badge";

export function StatusBadge({ status }) {
  const isLive = status === "LIVE";

  return (
    <Badge
      variant="outline"
      className={
        isLive
          ? "border-emerald-500/40 bg-emerald-500/10 text-emerald-700 dark:text-emerald-400 px-2.5 py-0.5 text-xs font-semibold"
          : "border-border bg-card text-muted-foreground px-2.5 py-0.5 text-xs font-medium"
      }
    >
      <span
        className={`mr-1.5 inline-block h-1.5 w-1.5 rounded-full ${
          isLive ? "bg-emerald-500 animate-pulse" : "bg-muted-foreground"
        }`}
      />
      {isLive ? "Live" : "Ended"}
    </Badge>
  );
}
