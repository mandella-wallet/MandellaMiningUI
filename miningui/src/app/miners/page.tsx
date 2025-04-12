import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { fetchTopMiners, TopMiner, formatValue } from "@/lib/api";
import Header from "@/components/Header"; // Import the Header component
import Footer from "@/components/Footer"; // Import the Footer component

export default async function MinersPage() {
  const topMiners: TopMiner[] = await fetchTopMiners();

  return (
    <div className="min-h-screen bg-solana-dark text-white">
      {/* Header */}
      <Header /> {/* Use the Header component */}

      {/* Top Miners Section */}
      <section className="container mx-auto py-16">
        <div className="text-center mb-10">
          <h1 className="text-4xl font-bold text-solana-teal">Top Miners</h1>
          <p className="text-solana-gray">The most active miners across all Mandella pools.</p>
        </div>

        {/* Top Miners Table */}
        <Card className="shadow-glow border-none bg-solana-dark/80">
          <CardHeader className="bg-solana-teal text-solana-dark">
            <CardTitle className="text-2xl flex items-center">
              <i className="fas fa-users mr-2"></i> Top Miners
            </CardTitle>
          </CardHeader>
          <CardContent className="p-0">
            <Table>
              <TableHeader>
                <TableRow className="bg-solana-teal text-solana-dark">
                  <TableHead>Miner Address</TableHead>
                  <TableHead>Total Hashrate</TableHead>
                  <TableHead>Pools</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {topMiners.length > 0 ? (
                  topMiners.map((miner, index) => (
                    <TableRow
                      key={miner.address}
                      className="hover:bg-solana-teal/10 transition-colors"
                    >
                      <TableCell className="font-mono text-sm break-all">
                        {miner.address}
                      </TableCell>
                      <TableCell>{formatValue(miner.totalHashrate, 5, "H/s")}</TableCell>
                      <TableCell>
                        <div className="space-y-1">
                          {miner.pools.map((pool) => (
                            <div key={pool.poolId} className="flex items-center">
                              <Link href={`/${pool.poolId}`} className="text-solana-teal hover:underline">
                                {pool.poolName}
                              </Link>
                              <span className="ml-2 text-solana-gray">
                                ({formatValue(pool.hashrate, 5, "H/s")})
                              </span>
                            </div>
                          ))}
                        </div>
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={3} className="text-center py-8">
                      <div className="bg-solana-pink/20 border-l-4 border-solana-pink p-4 rounded">
                        <h4 className="text-lg font-semibold text-solana-pink flex items-center">
                          <i className="fas fa-exclamation-triangle mr-2"></i> No Miners
                        </h4>
                        <Separator className="my-2 bg-solana-gray" />
                        <p className="text-solana-gray">No active miners found.</p>
                      </div>
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </section>

      <Footer /> {/* Use the Footer component */}
    </div>
  );
}