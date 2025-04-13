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
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import CoinImage from "@/components/CoinImage";
import PoolBreadcrumb from "@/components/PoolBreadcrumb";

export default async function PoolDetailsPage({ params }: { params: { id: string } }) {
  const poolDetails: PoolDetails = await fetchPoolDetails(params.id);

  // Handle null or errored data
  if (!poolDetails.pool || poolDetails.error) {
    return (
      <div className="min-h-screen bg-gray-900 text-gray-100">
        <Header />
        <section className="container mx-auto py-12 px-4">
          <Card className="bg-gray-800 border-gray-700 shadow-md">
            <CardHeader>
              <CardTitle className="text-xl text-teal-400 flex items-center">
                <i className="fas fa-exclamation-triangle mr-2"></i> Error
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-400">
                {poolDetails.error || "Unable to load pool data."}
              </p>
              <Button
                asChild
                variant="outline"
                className="mt-4 border-teal-400 text-teal-400 hover:bg-teal-400 hover:text-gray-900"
              >
                <Link href="/">Return to Home</Link>
              </Button>
            </CardContent>
          </Card>
        </section>
        <Footer />
      </div>
    );
  }

  // Safe access to pool data
  const { pool } = poolDetails;

  return (
    <div className="min-h-screen bg-gray-900 text-gray-100">
      <Header />
      <section className="container mx-auto py-12 px-4">
        {/* Navigation Breadcrumb */}
        <PoolBreadcrumb poolId={params.id} poolName={pool.coin?.name} currentPage="home" />
        {/* Pool Header */}
        <div className="flex flex-col items-center mb-10 bg-gray-800 p-6 rounded-lg shadow-lg">
          <div className="flex flex-col md:flex-row items-center justify-between w-full">
            <div className="flex items-center space-x-4">
              <CoinImage
                src={`/coins/${pool.coin?.symbol?.toLowerCase() || "crc"}.png`}
                alt={`${pool.coin?.name || "Pool"} logo`}
                className="w-12 h-12"
              />
              <div>
                <h1 className="text-3xl font-bold text-teal-400">
                  {pool.coin?.name || "Pool"} Mining Pool
                </h1>
                <p className="text-gray-400">
                  Algorithm: {pool.coin?.algorithm || "Unknown"} | Solo Mining
                </p>
              </div>
            </div>
            <div className="flex space-x-2 mt-4 md:mt-0">
              <Button
                asChild
                variant="outline"
                className="border-teal-400 text-teal-400 hover:bg-teal-400 hover:text-gray-900"
              >
                <Link href={pool.coin?.website || "#"} target="_blank">
                  Website
                </Link>
              </Button>
              <Button
                asChild
                variant="outline"
                className="border-teal-400 text-teal-400 hover:bg-teal-400 hover:text-gray-900"
              >
                <Link href={pool.coin?.twitter || "#"} target="_blank">
                  Twitter
                </Link>
              </Button>
              <Button
                asChild
                variant="outline"
                className="border-teal-400 text-teal-400 hover:bg-teal-400 hover:text-gray-900"
              >
                <Link href={pool.coin?.telegram || "#"} target="_blank">
                  Telegram
                </Link>
              </Button>
            </div>
          </div>
        </div>

        {/* Pool Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-10">
          <Card className="bg-gray-800 border-gray-700 shadow-md">
            <CardHeader className="pb-2">
              <CardTitle className="text-lg text-teal-400 flex items-center">
                <i className="fas fa-tachometer-alt mr-2"></i> Pool Hashrate
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-2xl font-semibold text-gray-100">
                {formatValue(pool.poolStats?.poolHashrate, 2, "H/s")}
              </p>
            </CardContent>
          </Card>
          <Card className="bg-gray-800 border-gray-700 shadow-md">
            <CardHeader className="pb-2">
              <CardTitle className="text-lg text-teal-400 flex items-center">
                <i className="fas fa-users mr-2"></i> Connected Miners
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-2xl font-semibold text-gray-100">
                {pool.poolStats?.connectedMiners ?? 0}
              </p>
            </CardContent>
          </Card>
          <Card className="bg-gray-800 border-gray-700 shadow-md">
            <CardHeader className="pb-2">
              <CardTitle className="text-lg text-teal-400 flex items-center">
                <i className="fas fa-coins mr-2"></i> Pool Fee
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-2xl font-semibold text-gray-100">
                {pool.poolFeePercent ?? 0}%
              </p>
            </CardContent>
          </Card>
          <Card className="bg-gray-800 border-gray-700 shadow-md">
            <CardHeader className="pb-2">
              <CardTitle className="text-lg text-teal-400 flex items-center">
                <i className="fas fa-cube mr-2"></i> Block Reward
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-2xl font-semibold text-gray-100">
                {(pool.blockReward ?? 0).toFixed(2)} {pool.coin?.symbol || "CRC"}
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Network and Pool Stats */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mb-10">
          <Card className="bg-gray-800 border-gray-700 shadow-md">
            <CardHeader>
              <CardTitle className="text-xl text-teal-400 flex items-center">
                <i className="fas fa-network-wired mr-2"></i> Network Statistics
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <p>
                <span className="text-gray-400">Network Hashrate:</span>{" "}
                <span className="font-semibold">
                  {formatValue(pool.networkStats?.networkHashrate, 2, "H/s")}
                </span>
              </p>
              <p>
                <span className="text-gray-400">Difficulty:</span>{" "}
                <span className="font-semibold">
                  {(pool.networkStats?.networkDifficulty ?? 0 / 1e6).toFixed(2)} M
                </span>
              </p>
              <p>
                <span className="text-gray-400">Block Height:</span>{" "}
                <span className="font-semibold">{pool.networkStats?.blockHeight ?? 0}</span>
              </p>
              <p>
                <span className="text-gray-400">Last Block:</span>{" "}
                <span className="font-semibold">
                  {pool.networkStats?.lastNetworkBlockTime
                    ? new Date(pool.networkStats.lastNetworkBlockTime).toLocaleString()
                    : "N/A"}
                </span>
              </p>
              <p>
                <span className="text-gray-400">Connected Peers:</span>{" "}
                <span className="font-semibold">{pool.networkStats?.connectedPeers ?? 0}</span>
              </p>
            </CardContent>
          </Card>
          <Card className="bg-gray-800 border-gray-700 shadow-md">
            <CardHeader>
              <CardTitle className="text-xl text-teal-400 flex items-center">
                <i className="fas fa-wallet mr-2"></i> Pool Earnings
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <p>
                <span className="text-gray-400">Total Paid:</span>{" "}
                <span className="font-semibold">
                  {(pool.totalPaid ?? 0).toFixed(2)} {pool.coin?.symbol || "CRC"}
                </span>
              </p>
              <p>
                <span className="text-gray-400">Total Blocks:</span>{" "}
                <span className="font-semibold">{pool.totalBlocks ?? 0}</span>
              </p>
              <p>
                <span className="text-gray-400">Confirmed Blocks:</span>{" "}
                <span className="font-semibold">{pool.totalConfirmedBlocks ?? 0}</span>
              </p>
              <p>
                <span className="text-gray-400">Last Pool Block:</span>{" "}
                <span className="font-semibold">
                  {pool.lastPoolBlockTime
                    ? new Date(pool.lastPoolBlockTime).toLocaleString()
                    : "N/A"}
                </span>
              </p>
              <p>
                <span className="text-gray-400">Pool Effort:</span>{" "}
                <span className="font-semibold">{(pool.poolEffort ?? 0).toFixed(2)}%</span>
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Recent Blocks */}
        <Card className="bg-gray-800 border-gray-700 shadow-md mb-10">
          <CardHeader>
            <CardTitle className="text-xl text-teal-400 flex items-center">
              <i className="fas fa-cube mr-2"></i> Recent Blocks
            </CardTitle>
          </CardHeader>
          <CardContent className="p-0">
            <Table>
              <TableHeader>
                <TableRow className="bg-gray-700">
                  <TableHead className="text-gray-100">Block Height</TableHead>
                  <TableHead className="text-gray-100">Timestamp</TableHead>
                  <TableHead className="text-gray-100">Reward</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {poolDetails.recentBlocks && poolDetails.recentBlocks.length > 0 ? (
                  poolDetails.recentBlocks.map((block) => (
                    <TableRow
                      key={block.blockHeight}
                      className="hover:bg-gray-700 transition-colors"
                    >
                      <TableCell>{block.blockHeight}</TableCell>
                      <TableCell>{new Date(block.timestamp).toLocaleString()}</TableCell>
                      <TableCell>
                        <Badge className="bg-teal-500 text-gray-900">
                          {block.reward.toFixed(2)} {pool.coin?.symbol || "CRC"}
                        </Badge>
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={3} className="text-center py-8 text-gray-400">
                      No recent blocks found.
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </CardContent>
        </Card>

        {/* Top Miners */}
        <Card className="bg-gray-800 border-gray-700 shadow-md">
          <CardHeader>
            <CardTitle className="text-xl text-teal-400 flex items-center">
              <i className="fas fa-users mr-2"></i> Top Miners
            </CardTitle>
          </CardHeader>
          <CardContent className="p-0">
            <Table>
              <TableHeader>
                <TableRow className="bg-gray-700">
                  <TableHead className="text-gray-100">Miner Address</TableHead>
                  <TableHead className="text-gray-100">Hashrate</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {pool.topMiners && pool.topMiners.length > 0 ? (
                  pool.topMiners.map((miner, index) => (
                    <TableRow
                      key={miner.address || index}
                      className="hover:bg-gray-700 transition-colors"
                    >
                      <TableCell className="font-mono text-sm">
                        <Link
                          href={pool.addressInfoLink?.replace(pool.address || "", miner.address) || "#"}
                          target="_blank"
                          className="text-teal-400 hover:underline"
                        >
                          {miner.address}
                        </Link>
                      </TableCell>
                      <TableCell>{formatValue(miner.hashrate, 2, "H/s")}</TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={2} className="text-center py-8 text-gray-400">
                      No active miners found.
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