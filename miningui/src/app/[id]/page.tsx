import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { fetchPoolDetails, PoolDetails, formatValue } from "@/lib/api";
import CoinImage from "@/components/CoinImage";
import Header from "@/components/Header"; // Import the Header component
import Footer from "@/components/Footer"; // Import the Footer component

export default async function PoolDetailsPage({ params }: { params: { id: string } }) {
  const poolDetails: PoolDetails = await fetchPoolDetails(params.id);

  return (
    <div className="min-h-screen bg-solana-dark text-white">
      {/* Header */}
      <Header /> {/* Use the Header component */}

      {/* Pool Details Section */}
      <section className="container mx-auto py-16">
        <div className="text-center mb-10">
          <h1 className="text-4xl font-bold text-solana-teal">{poolDetails.pool.coin.name} Pool</h1>
          <p className="text-solana-gray">Detailed statistics for the {poolDetails.pool.coin.name} mining pool.</p>
        </div>

        {/* Pool Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          <Card className="shadow-glow border-none bg-solana-dark/80">
            <CardHeader className="bg-solana-teal text-solana-dark">
              <CardTitle className="text-xl flex items-center">
                <i className="fas fa-tachometer-alt mr-2"></i> Pool Hashrate
              </CardTitle>
            </CardHeader>
            <CardContent className="pt-6">
              <p className="text-2xl font-semibold text-solana-teal">
                {formatValue(poolDetails.pool.poolStats.poolHashrate, 5, "H/s")}
              </p>
            </CardContent>
          </Card>
          <Card className="shadow-glow border-none bg-solana-dark/80">
            <CardHeader className="bg-solana-teal text-solana-dark">
              <CardTitle className="text-xl flex items-center">
                <i className="fas fa-users mr-2"></i> Connected Miners
              </CardTitle>
            </CardHeader>
            <CardContent className="pt-6">
              <p className="text-2xl font-semibold text-solana-teal">
                {poolDetails.pool.poolStats.connectedMiners}
              </p>
            </CardContent>
          </Card>
          <Card className="shadow-glow border-none bg-solana-dark/80">
            <CardHeader className="bg-solana-teal text-solana-dark">
              <CardTitle className="text-xl flex items-center">
                <i className="fas fa-coins mr-2"></i> Pool Fee
              </CardTitle>
            </CardHeader>
            <CardContent className="pt-6">
              <p className="text-2xl font-semibold text-solana-teal">
                {poolDetails.pool.poolFeePercent}%
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Recent Blocks */}
        <Card className="shadow-glow border-none bg-solana-dark/80 mb-12">
          <CardHeader className="bg-solana-teal text-solana-dark">
            <CardTitle className="text-2xl flex items-center">
              <i className="fas fa-cube mr-2"></i> Recent Blocks
            </CardTitle>
          </CardHeader>
          <CardContent className="p-0">
            <Table>
              <TableHeader>
                <TableRow className="bg-solana-teal text-solana-dark">
                  <TableHead>Block Height</TableHead>
                  <TableHead>Timestamp</TableHead>
                  <TableHead>Reward</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {poolDetails.recentBlocks.length > 0 ? (
                  poolDetails.recentBlocks.map((block, index) => (
                    <TableRow
                      key={block.blockHeight}
                      className="hover:bg-solana-teal/10 transition-colors"
                    >
                      <TableCell>{block.blockHeight}</TableCell>
                      <TableCell>{block.timestamp}</TableCell>
                      <TableCell>
                        <Badge className="bg-solana-purple text-white">
                          {block.reward} {poolDetails.pool.coin.type}
                        </Badge>
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={3} className="text-center py-8">
                      <div className="bg-solana-pink/20 border-l-4 border-solana-pink p-4 rounded">
                        <h4 className="text-lg font-semibold text-solana-pink flex items-center">
                          <i className="fas fa-exclamation-triangle mr-2"></i> No Blocks
                        </h4>
                        <Separator className="my-2 bg-solana-gray" />
                        <p className="text-solana-gray">No recent blocks found.</p>
                      </div>
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </CardContent>
        </Card>

        {/* Top Miners */}
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
                  <TableHead>Hashrate</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {poolDetails.topMiners.length > 0 ? (
                  poolDetails.topMiners.map((miner, index) => (
                    <TableRow
                      key={miner.address}
                      className="hover:bg-solana-teal/10 transition-colors"
                    >
                      <TableCell className="font-mono text-sm break-all">
                        {miner.address}
                      </TableCell>
                      <TableCell>{formatValue(miner.hashrate, 5, "H/s")}</TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={2} className="text-center py-8">
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