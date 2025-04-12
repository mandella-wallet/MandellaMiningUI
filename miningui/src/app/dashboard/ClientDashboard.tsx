"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { MinerStats, formatValue } from "@/lib/api"; // Import from api, not dummyData
import WalletForm from "@/components/WalletForm";

export default function ClientDashboard() {
  const [minerStats, setMinerStats] = useState<MinerStats | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleWalletSubmit = async (walletAddress: string) => {
    try {
      const response = await fetch(`/api/miner-stats?wallet=${walletAddress}`);
      if (!response.ok) {
        throw new Error("Failed to fetch miner stats");
      }
      const data: MinerStats = await response.json();
      setMinerStats(data);
      setError(null);
    } catch (err: any) {
      setError(err.message || "Failed to fetch miner stats");
      setMinerStats(null);
    }
  };

  return (
    <section className="container mx-auto py-16">
      <div className="text-center mb-10">
        <h1 className="text-4xl font-bold text-solana-teal">Miner Dashboard</h1>
        <p className="text-solana-gray">Monitor your mining performance and earnings.</p>
      </div>

      {/* Wallet Submission Form */}
      {!minerStats && (
        <div className="mb-12">
          <WalletForm onSubmit={handleWalletSubmit} />
        </div>
      )}

      {/* Display Miner Stats if Available */}
      {minerStats && (
        <>
          {/* Display Submitted Wallet Address */}
          <div className="mb-8 text-center">
            <p className="text-solana-gray">
              Stats for wallet: <span className="font-mono text-solana-teal">{minerStats.walletAddress}</span>
            </p>
            <button
              onClick={() => setMinerStats(null)}
              className="mt-2 text-solana-teal hover:underline"
            >
              Change Wallet Address
            </button>
          </div>

          {/* Miner Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
            <Card className="shadow-glow border-none bg-solana-dark/80">
              <CardHeader className="bg-solana-teal text-solana-dark">
                <CardTitle className="text-xl flex items-center">
                  <i className="fas fa-tachometer-alt mr-2"></i> Hashrate
                </CardTitle>
              </CardHeader>
              <CardContent className="pt-6">
                <p className="text-2xl font-semibold text-solana-teal">
                  {formatValue(minerStats.hashrate, 5, "H/s")}
                </p>
              </CardContent>
            </Card>
            <Card className="shadow-glow border-none bg-solana-dark/80">
              <CardHeader className="bg-solana-teal text-solana-dark">
                <CardTitle className="text-xl flex items-center">
                  <i className="fas fa-cubes mr-2"></i> Shares
                </CardTitle>
              </CardHeader>
              <CardContent className="pt-6">
                <p className="text-2xl font-semibold text-solana-teal">{minerStats.shares}</p>
              </CardContent>
            </Card>
            <Card className="shadow-glow border-none bg-solana-dark/80">
              <CardHeader className="bg-solana-teal text-solana-dark">
                <CardTitle className="text-xl flex items-center">
                  <i className="fas fa-coins mr-2"></i> Estimated Earnings
                </CardTitle>
              </CardHeader>
              <CardContent className="pt-6">
                <p className="text-2xl font-semibold text-solana-teal">
                  {formatValue(minerStats.estimatedEarnings, 5, "BTC")}
                </p>
              </CardContent>
            </Card>
          </div>

          {/* Payouts Table */}
          <Card className="shadow-glow border-none bg-solana-dark/80">
            <CardHeader className="bg-solana-teal text-solana-dark">
              <CardTitle className="text-2xl flex items-center">
                <i className="fas fa-money-bill-wave mr-2"></i> Recent Payouts
              </CardTitle>
            </CardHeader>
            <CardContent className="p-0">
              <Table>
                <TableHeader>
                  <TableRow className="bg-solana-teal text-solana-dark">
                    <TableHead>Timestamp</TableHead>
                    <TableHead>Amount</TableHead>
                    <TableHead>Transaction Hash</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {minerStats.payouts.length > 0 ? (
                    minerStats.payouts.map((payout, index) => (
                      <TableRow
                        key={payout.txHash}
                        className="hover:bg-solana-teal/10 transition-colors"
                      >
                        <TableCell>{payout.timestamp}</TableCell>
                        <TableCell>{formatValue(payout.amount, 5, "BTC")}</TableCell>
                        <TableCell className="font-mono text-sm break-all">
                          {payout.txHash}
                        </TableCell>
                      </TableRow>
                    ))
                  ) : (
                    <TableRow>
                      <TableCell colSpan={3} className="text-center py-8">
                        <div className="bg-solana-pink/20 border-l-4 border-solana-pink p-4 rounded">
                          <h4 className="text-lg font-semibold text-solana-pink flex items-center">
                            <i className="fas fa-exclamation-triangle mr-2"></i> No Payouts
                          </h4>
                          <Separator className="my-2 bg-solana-gray" />
                          <p className="text-solana-gray">No recent payouts found.</p>
                        </div>
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </>
      )}

      {/* Display Error if Any */}
      {error && (
        <div className="mt-8 text-center">
          <div className="bg-solana-pink/20 border-l-4 border-solana-pink p-4 rounded inline-block">
            <h4 className="text-lg font-semibold text-solana-pink flex items-center">
              <i className="fas fa-exclamation-triangle mr-2"></i> Error
            </h4>
            <Separator className="my-2 bg-solana-gray" />
            <p className="text-solana-gray">{error}</p>
          </div>
        </div>
      )}
    </section>
  );
}