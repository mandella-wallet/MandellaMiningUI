import Link from "next/link";
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
import { fetchStats, fetchHistoricalStats, formatValue } from "@/lib/api";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import HashrateChart from "@/components/HashrateChart";

export const revalidate = 60; // Revalidate page every 60 seconds

export default async function StatsPage({ params }: { params: { id: string } }) {
  const [poolStats, historicalStats] = await Promise.all([
    fetchStats(params.id),
    fetchHistoricalStats(params.id),
  ]);

  return (
    <div className="min-h-screen bg-solana-dark text-white">
      <Header />

      {/* Pool Stats Section */}
      <section className="container mx-auto py-8 px-4">
        <div className="text-center mb-10">
          <h1 className="text-4xl font-bold text-solana-teal">Pool Statistics</h1>
          <p className="text-solana-gray mt-2">Overall performance metrics for Mandella Mining Pool</p>
        </div>

        {/* Overall Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          <Card className="shadow-glow border-none bg-solana-dark/80">
            <CardHeader className="bg-solana-teal text-solana-dark">
              <CardTitle className="text-xl flex items-center">
                <i className="fas fa-tachometer-alt mr-2"></i> Total Hashrate
              </CardTitle>
            </CardHeader>
            <CardContent className="pt-6">
              <p className="text-2xl font-semibold text-solana-teal">
                {formatValue(poolStats.poolHashrate, 5, "H/s")}
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
                {poolStats.connectedMiners}
              </p>
            </CardContent>
          </Card>

          <Card className="shadow-glow border-none bg-solana-dark/80">
            <CardHeader className="bg-solana-teal text-solana-dark">
              <CardTitle className="text-xl flex items-center">
                <i className="fas fa-chart-line mr-2"></i> Shares/Second
              </CardTitle>
            </CardHeader>
            <CardContent className="pt-6">
              <p className="text-2xl font-semibold text-solana-teal">
                {formatValue(poolStats.sharesPerSecond, 2, "/s")}
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Hashrate Chart */}
        <Card className="shadow-glow border-none bg-solana-dark/80 mb-12">
          <CardHeader className="bg-solana-teal text-solana-dark">
            <CardTitle className="text-2xl">Hashrate History</CardTitle>
          </CardHeader>
          <CardContent className="pt-6">
            {historicalStats.length > 0 ? (
              <HashrateChart data={historicalStats} />
            ) : (
              <div className="text-center py-8 text-solana-gray">
                No historical data available
              </div>
            )}
          </CardContent>
        </Card>

        {/* Historical Stats Table */}
        <Card className="shadow-glow border-none bg-solana-dark/80">
          <CardHeader className="bg-solana-teal text-solana-dark">
            <CardTitle className="text-2xl flex items-center">
              <i className="fas fa-history mr-2"></i> Historical Stats
            </CardTitle>
          </CardHeader>
          <CardContent className="p-0">
            <Table>
              <TableHeader>
                <TableRow className="bg-solana-teal text-solana-dark">
                  <TableHead>Timestamp</TableHead>
                  <TableHead>Hashrate</TableHead>
                  <TableHead>Miners</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {historicalStats.length > 0 ? (
                  historicalStats.map((stat) => (
                    <TableRow
                      key={stat.timestamp}
                      className="hover:bg-solana-teal/10 transition-colors"
                    >
                      <TableCell>
                        {new Date(stat.timestamp).toLocaleString()}
                      </TableCell>
                      <TableCell>
                        {formatValue(stat.poolHashrate, 5, "H/s")}
                      </TableCell>
                      <TableCell>{stat.connectedMiners}</TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={3} className="text-center py-8">
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

      <Footer />
    </div>
  );
}
