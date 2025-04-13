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
import { fetchStats, fetchHistoricalStats, PoolStats, HistoricalStat, formatValue } from "@/lib/api";
import Header from "@/components/Header"; // Import the Header component
import Footer from "@/components/Footer"; // Import the Footer component

export default async function StatsPage() {
  const poolStats: PoolStats = await fetchStats();
  const historicalStats: HistoricalStat[] = await fetchHistoricalStats();

  return (
    <div className="min-h-screen bg-solana-dark text-white">
      {/* Header */}
      <Header /> {/* Use the Header component */}

      {/* Pool Stats Section */}
      <section className="container mx-auto py-16">
        <div className="text-center mb-10">
          <h1 className="text-4xl font-bold text-solana-teal">Pool Statistics</h1>
          <p className="text-solana-gray">Overall performance of Mandella Mining Pool.</p>
        </div>

        {/* Overall Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          <Card className="shadow-glow border-none bg-solana-dark/80">
            <CardHeader className="bg-solana-teal text-solana-dark">
              <CardTitle className="text-xl flex items-center">
                <i className="fas fa-tachometer-alt mr-2"></i> Total Hashrate
              </CardTitle>
            </CardHeader>
            <CardContent className="pt-6">
              <p className="text-2xl font-semibold text-solana-teal">
                {formatValue(poolStats.totalHashrate, 5, "H/s")}
              </p>
            </CardContent>
          </Card>
          <Card className="shadow-glow border-none bg-solana-dark/80">
            <CardHeader className="bg-solana-teal text-solana-dark">
              <CardTitle className="text-xl flex items-center">
                <i className="fas fa-users mr-2"></i> Active Miners
              </CardTitle>
            </CardHeader>
            <CardContent className="pt-6">
              <p className="text-2xl font-semibold text-solana-teal">
                {poolStats.activeMiners}
              </p>
            </CardContent>
          </Card>
          <Card className="shadow-glow border-none bg-solana-dark/80">
            <CardHeader className="bg-solana-teal text-solana-dark">
              <CardTitle className="text-xl flex items-center">
                <i className="fas fa-cube mr-2"></i> Blocks Mined
              </CardTitle>
            </CardHeader>
            <CardContent className="pt-6">
              <p className="text-2xl font-semibold text-solana-teal">
                {poolStats.blocksMined}
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Historical Stats */}
        <Card className="shadow-glow border-none bg-solana-dark/80">
          <CardHeader className="bg-solana-teal text-solana-dark">
            <CardTitle className="text-2xl flex items-center">
              <i className="fas fa-chart-line mr-2"></i> Historical Stats
            </CardTitle>
          </CardHeader>
          <CardContent className="p-0">
            <Table>
              <TableHeader>
                <TableRow className="bg-solana-teal text-solana-dark">
                  <TableHead>Date</TableHead>
                  <TableHead>Hashrate</TableHead>
                  <TableHead>Miners</TableHead>
                  <TableHead>Blocks Mined</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {historicalStats.length > 0 ? (
                  historicalStats.map((stat, index) => (
                    <TableRow
                      key={stat.date}
                      className="hover:bg-solana-teal/10 transition-colors"
                    >
                      <TableCell>{stat.date}</TableCell>
                      <TableCell>{formatValue(stat.hashrate, 5, "H/s")}</TableCell>
                      <TableCell>{stat.miners}</TableCell>
                      <TableCell>{stat.blocks}</TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={4} className="text-center py-8">
                      <div className="bg-solana-pink/20 border-l-4 border-solana-pink p-4 rounded">
                        <h4 className="text-lg font-semibold text-solana-pink flex items-center">
                          <i className="fas fa-exclamation-triangle mr-2"></i> No Data
                        </h4>
                        <Separator className="my-2 bg-solana-gray" />
                        <p className="text-solana-gray">No historical stats available.</p>
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