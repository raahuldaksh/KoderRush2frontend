import React, { useState, useEffect } from "react";
import { Header } from "@/components/Header";
import { AuctionItem } from "@/components/AuctionItem";
import { BiddingPanel } from "@/components/BiddingPanel";
import { AuctionResult } from "@/components/AuctionResult";
import { AuctionStats } from "@/components/AuctionStats";
import { BidHistory } from "@/components/BidHistory";
import { useAuction } from "@/hooks/useAuction";

export default function App() {
  // Theme state: defaults to 'light' (white theme) as requested
  const [theme, setTheme] = useState(() => {
    try {
      return localStorage.getItem("bidspace_theme") || "light";
    } catch {
      return "light";
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem("bidspace_theme", theme);
    } catch {
      // Ignore storage restrictions
    }
    const root = document.documentElement;
    if (theme === "dark") {
      root.classList.add("dark");
    } else {
      root.classList.remove("dark");
    }
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prev) => (prev === "light" ? "dark" : "light"));
  };

  const {
    startingPrice,
    status,
    remainingSeconds,
    isEndingSoon,
    currentHighestBid,
    highestBidder,
    totalBids,
    bidHistory,
    isSubmitting,
    feedback,
    winner,
    placeBid,
    clearFeedback,
    setTimerRemaining,
    resetAuction,
  } = useAuction(300);

  return (
    <div className={`min-h-screen bg-background text-foreground flex flex-col font-sans transition-colors duration-200 ${theme === "dark" ? "dark" : ""}`}>
      {/* Top Navigation & Status Bar */}
      <Header
        status={status}
        remainingSeconds={remainingSeconds}
        onReset={resetAuction}
        onFastForward={setTimerRemaining}
        theme={theme}
        onToggleTheme={toggleTheme}
      />

      {/* Main Content Dashboard */}
      <main className="flex-1 mx-auto w-full max-w-7xl px-4 py-6 sm:px-6 sm:py-8 space-y-6 sm:space-y-8">
        {/* Hero Section: Two Columns on Desktop */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-start">
          {/* Left Column: Product Details + Countdown (7 cols on desktop) */}
          <div className="lg:col-span-7">
            <AuctionItem
              startingPrice={startingPrice}
              currentHighestBid={currentHighestBid}
              highestBidder={highestBidder}
              status={status}
              remainingSeconds={remainingSeconds}
            />
          </div>

          {/* Right Column: Bidding Panel or Auction Result (5 cols on desktop) */}
          <div className="lg:col-span-5">
            {status === "ENDED" ? (
              <AuctionResult
                winner={winner}
                totalBids={totalBids}
                startingPrice={startingPrice}
                onReset={resetAuction}
              />
            ) : (
              <BiddingPanel
                currentHighestBid={currentHighestBid}
                highestBidder={highestBidder}
                status={status}
                onPlaceBid={placeBid}
                feedback={feedback}
                onClearFeedback={clearFeedback}
                isSubmitting={isSubmitting}
              />
            )}
          </div>
        </div>

        {/* Auction Statistics Grid */}
        <section aria-label="Auction Statistics">
          <AuctionStats
            currentHighestBid={currentHighestBid}
            totalBids={totalBids}
            startingPrice={startingPrice}
            highestBidder={highestBidder}
          />
        </section>

        {/* Real-time Bid History Audit Table */}
        <section aria-label="Bid History">
          <BidHistory
            bidHistory={bidHistory}
            currentHighestBid={currentHighestBid}
            startingPrice={startingPrice}
          />
        </section>
      </main>

      {/* Footer */}
      <footer className="border-t border-border bg-card py-6 mt-12 transition-colors">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-muted-foreground">
          <p>© {new Date().getFullYear()} BidSpace Event Auction System. All rights reserved.</p>
          <div className="flex items-center gap-4">
            <span className="flex items-center gap-1.5">
              <span className="h-2 w-2 rounded-full bg-emerald-500" />
              Real-Time Client State
            </span>
            <span>•</span>
            <span>Problem ID: R2-01</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
