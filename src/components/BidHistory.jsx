import React from "react";
import { History, Award, CheckCircle2, ShieldAlert, ArrowUpRight, Clock } from "lucide-react";
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
    <Card className="border-slate-200 shadow-sm bg-white">
      <CardHeader className="pb-4">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
          <div>
            <CardTitle className="text-xl font-bold text-slate-900 flex items-center gap-2">
              <History className="h-5 w-5 text-blue-600" />
              Real-Time Bid History
            </CardTitle>
            <CardDescription className="text-slate-500">
              Live audit trail of all verified bids placed during this auction event.
            </CardDescription>
          </div>

          <Badge variant="outline" className="w-fit text-slate-700 bg-slate-50 border-slate-200 text-xs">
            {hasBids ? `${bidHistory.length} Recorded Bids` : "No Activity"}
          </Badge>
        </div>
      </CardHeader>

      <CardContent className="p-0 sm:p-6 sm:pt-0">
        {!hasBids ? (
          <div className="flex flex-col items-center justify-center p-12 text-center border-t sm:border border-dashed border-slate-200 sm:rounded-xl bg-slate-50/50">
            <div className="flex h-14 w-14 items-center justify-center rounded-full bg-slate-100 text-slate-400 mb-3">
              <History className="h-7 w-7" />
            </div>
            <h4 className="text-base font-semibold text-slate-800">No Bids Placed Yet</h4>
            <p className="mt-1 text-sm text-slate-500 max-w-sm">
              Be the first to place a bid above the starting price of{" "}
              <strong className="text-slate-700 font-semibold">{formatCurrency(startingPrice)}</strong>.
            </p>
          </div>
        ) : (
          <div className="overflow-hidden border-t sm:border border-slate-200 sm:rounded-xl">
            <Table>
              <TableHeader className="bg-slate-50/80">
                <TableRow>
                  <TableHead className="w-[40%] text-xs font-semibold text-slate-600 uppercase tracking-wider">
                    Bidder
                  </TableHead>
                  <TableHead className="w-[25%] text-xs font-semibold text-slate-600 uppercase tracking-wider">
                    Bid Amount
                  </TableHead>
                  <TableHead className="w-[20%] text-xs font-semibold text-slate-600 uppercase tracking-wider">
                    Time
                  </TableHead>
                  <TableHead className="w-[15%] text-right text-xs font-semibold text-slate-600 uppercase tracking-wider">
                    Status
                  </TableHead>
                </TableRow>
              </TableHeader>

              <TableBody>
                {bidHistory.map((bid, index) => {
                  const isHighest = index === 0; // Newest bid is always the leading highest bid

                  return (
                    <TableRow
                      key={bid.id || index}
                      className={
                        isHighest
                          ? "bg-emerald-50/40 hover:bg-emerald-50/60 font-medium transition-colors"
                          : "hover:bg-slate-50/60 transition-colors"
                      }
                    >
                      {/* Bidder name & avatar */}
                      <TableCell className="py-3.5">
                        <div className="flex items-center gap-3">
                          <Avatar className={`h-8 w-8 ${isHighest ? "ring-2 ring-emerald-400" : ""}`}>
                            <AvatarFallback
                              className={`text-xs font-bold ${
                                isHighest
                                  ? "bg-emerald-100 text-emerald-800"
                                  : "bg-slate-100 text-slate-700"
                              }`}
                            >
                              {bid.bidderName ? bid.bidderName.charAt(0).toUpperCase() : "P"}
                            </AvatarFallback>
                          </Avatar>
                          <div>
                            <div className="flex items-center gap-1.5">
                              <span className="font-semibold text-slate-900 text-sm">
                                {bid.bidderName}
                              </span>
                              {isHighest && (
                                <Award className="h-3.5 w-3.5 text-emerald-600 shrink-0" />
                              )}
                            </div>
                            <span className="text-[11px] text-slate-400 sm:hidden block font-mono">
                              {formatTimestamp(bid.timestamp)}
                            </span>
                          </div>
                        </div>
                      </TableCell>

                      {/* Bid amount */}
                      <TableCell className="py-3.5 font-mono text-sm sm:text-base">
                        <span
                          className={
                            isHighest
                              ? "font-bold text-emerald-700"
                              : "text-slate-700"
                          }
                        >
                          {formatCurrency(bid.amount)}
                        </span>
                      </TableCell>

                      {/* Time */}
                      <TableCell className="py-3.5 text-xs text-slate-500 font-mono">
                        <span className="flex items-center gap-1">
                          <Clock className="h-3 w-3 text-slate-400" />
                          {formatTimestamp(bid.timestamp)}
                        </span>
                      </TableCell>

                      {/* Status Badge */}
                      <TableCell className="py-3.5 text-right">
                        {isHighest ? (
                          <Badge
                            variant="success"
                            className="bg-emerald-100 text-emerald-800 border-emerald-300 font-bold px-2 py-0.5 text-xs shadow-2xs"
                          >
                            <CheckCircle2 className="mr-1 h-3 w-3" />
                            Highest Bid
                          </Badge>
                        ) : (
                          <Badge
                            variant="secondary"
                            className="bg-slate-100 text-slate-600 border-slate-200 font-normal px-2 py-0.5 text-xs"
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
