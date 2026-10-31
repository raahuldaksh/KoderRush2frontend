import React from "react";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import {
  Table,
  TableHeader,
  TableBody,
  TableHead,
  TableRow,
  TableCell,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { formatCurrency, formatTimestamp } from "@/lib/utils";

export function BidHistory({ bidHistory, currentHighestBid, startingPrice }) {
  const hasBids = bidHistory && bidHistory.length > 0;

  return (
    <Card className="border-border bg-card shadow-sm transition-colors">
      <CardHeader className="pb-4">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
          <div>
            <CardTitle className="text-lg font-bold text-foreground font-sans">
              Real-Time Bid History
            </CardTitle>
            <CardDescription className="text-muted-foreground text-xs">
              Live audit trail of all verified bids placed during this auction event.
            </CardDescription>
          </div>

          <Badge variant="outline" className="w-fit text-foreground bg-secondary border-border font-medium text-xs">
            {hasBids ? `${bidHistory.length} Recorded Bids` : "No Activity"}
          </Badge>
        </div>
      </CardHeader>

      <CardContent className="p-0 sm:p-6 sm:pt-0">
        {!hasBids ? (
          <div className="flex flex-col items-center justify-center p-12 text-center border-t sm:border border-dashed border-border sm:rounded-lg bg-secondary/20">
            <h4 className="text-sm font-semibold text-foreground font-sans">No Bids Placed Yet</h4>
            <p className="mt-1 text-xs text-muted-foreground max-w-sm">
              Be the first to place a bid above the starting price of{" "}
              <strong className="text-foreground font-semibold">{formatCurrency(startingPrice)}</strong>.
            </p>
          </div>
        ) : (
          <div className="overflow-hidden border-t sm:border border-border sm:rounded-lg">
            <Table>
              <TableHeader className="bg-secondary/60">
                <TableRow className="border-b border-border">
                  <TableHead className="w-[40%] text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                    Participant
                  </TableHead>
                  <TableHead className="w-[25%] text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                    Bid Amount
                  </TableHead>
                  <TableHead className="w-[20%] text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                    Timestamp
                  </TableHead>
                  <TableHead className="w-[15%] text-right text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                    Status
                  </TableHead>
                </TableRow>
              </TableHeader>

              <TableBody>
                {bidHistory.map((bid, index) => {
                  const isHighest = index === 0;

                  return (
                    <TableRow
                      key={bid.id || index}
                      className={
                        isHighest
                          ? "bg-emerald-500/10 hover:bg-emerald-500/15 font-medium transition-colors border-b border-border"
                          : "hover:bg-secondary/40 transition-colors border-b border-border"
                      }
                    >
                      {/* Bidder name & avatar */}
                      <TableCell className="py-3">
                        <div className="flex items-center gap-3">
                          <Avatar className={`h-8 w-8 ${isHighest ? "ring-2 ring-emerald-500/40" : "border border-border"}`}>
                            <AvatarFallback
                              className={`text-xs font-bold ${
                                isHighest
                                  ? "bg-foreground text-background"
                                  : "bg-secondary text-foreground"
                              }`}
                            >
                              {bid.bidderName ? bid.bidderName.charAt(0).toUpperCase() : "P"}
                            </AvatarFallback>
                          </Avatar>
                          <div>
                            <span className="font-semibold text-foreground text-sm font-sans">
                              {bid.bidderName}
                            </span>
                            <span className="text-[11px] text-muted-foreground sm:hidden block font-mono">
                              {formatTimestamp(bid.timestamp)}
                            </span>
                          </div>
                        </div>
                      </TableCell>

                      {/* Bid amount */}
                      <TableCell className="py-3 font-mono text-sm sm:text-base">
                        <span
                          className={
                            isHighest
                              ? "font-bold text-emerald-700 dark:text-emerald-400"
                              : "text-foreground font-medium"
                          }
                        >
                          {formatCurrency(bid.amount)}
                        </span>
                      </TableCell>

                      {/* Time */}
                      <TableCell className="py-3 text-xs text-muted-foreground font-mono">
                        {formatTimestamp(bid.timestamp)}
                      </TableCell>

                      {/* Status Badge */}
                      <TableCell className="py-3 text-right">
                        {isHighest ? (
                          <Badge
                            variant="outline"
                            className="bg-emerald-500/15 text-emerald-800 dark:text-emerald-300 border-emerald-500/30 font-semibold px-2 py-0.5 text-xs"
                          >
                            Highest Bid
                          </Badge>
                        ) : (
                          <Badge
                            variant="outline"
                            className="bg-secondary text-muted-foreground border-border font-medium px-2 py-0.5 text-xs"
                          >
                            Outbid
                          </Badge>
                        )}
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
