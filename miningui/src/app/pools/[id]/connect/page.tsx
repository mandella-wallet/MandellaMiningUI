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
import { fetchPool, PoolCoin } from "@/lib/api";
import CoinImage from "@/components/CoinImage";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import CopyableStratumUrl from "@/components/CopyableStratumUrl";
import PoolBreadcrumb from "@/components/PoolBreadcrumb"; // Added PoolBreadcrumb

interface ConnectPageProps {
  params: { id: string };
}

export default async function ConnectPage({ params }: ConnectPageProps) {
  const poolId = params.id;
  const pool: PoolCoin | null = await fetchPool(poolId);

  // Handle null or errored pool data
  if (!pool) {
    return (
      <div className="min-h-screen bg-solana-dark text-white">
        <Header />
        <section className="container mx-auto py-12 px-4">
          <Card className="shadow-glow border-none bg-solana-dark/80">
            <CardHeader>
              <CardTitle className="text-xl text-solana-teal flex items-center">
                <i className="fas fa-exclamation-triangle mr-2"></i> Error
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-solana-gray">
                Unable to load pool data for {poolId}.
              </p>
              <Button
                asChild
                variant="outline"
                className="mt-4 border-solana-teal text-solana-teal hover:bg-solana-teal hover:text-solana-dark"
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

  // Format pool name for display (e.g., "craftcoin-pplns" -> "CraftCoin (PPLNS)")
  const displayName =
    pool.coin.name && pool.paymentProcessing?.payoutScheme === "PPLNS"
      ? `${pool.coin.name} (PPLNS)`
      : pool.coin.name || poolId;

  return (
    <div className="min-h-screen bg-solana-dark text-white">
      <Header />
      <section className="container mx-auto py-16">
        <PoolBreadcrumb poolId={poolId} poolName={pool.coin?.name} currentPage="connect" />
        <div className="text-center mb-10">
          <h1 className="text-4xl font-bold text-solana-teal">Pool Connection</h1>
          <p className="text-solana-gray">
            Connect your mining software to {displayName} Pool.
          </p>
        </div>

        {/* Miner Configuration */}
        <Card className="shadow-glow border-none bg-solana-dark/80 mb-12">
          <CardHeader className="bg-solana-teal text-solana-dark">
            <CardTitle className="text-2xl flex items-center">
              <i className="fas fa-cog mr-2"></i> Miner Configuration
            </CardTitle>
          </CardHeader>
          <CardContent className="pt-6">
            <h3 className="text-xl font-semibold text-solana-teal mb-4">Mining Setup Instructions</h3>
            <p className="text-solana-gray mb-4">
              Follow these steps to set up your miner for this pool.
            </p>
            <ul className="list-disc list-inside space-y-2 text-solana-gray">
              <li>Choose a port below based on your miner’s difficulty range.</li>
              <li>
                Use your wallet as the username (e.g.,{" "}
                <code className="font-mono text-sm">{pool.address || "YOUR_WALLET_ADDRESS"}</code>).
                The password can be blank or <code>x</code>.
              </li>
              <li>
                For multiple miners, append a worker name: <code>[wallet].[worker]</code> (e.g.,{" "}
                <code>{pool.address || "YOUR_WALLET_ADDRESS"}.rig1</code>).
              </li>
            </ul>
            {pool.connectionDetails?.ports?.length ? (
              <div className="mt-4 space-y-2">
                {pool.connectionDetails.ports.map((port) => (
                  <CopyableStratumUrl
                    key={port.port}
                    name={port.name}
                    url={port.stratumUrl}
                  />
                ))}
              </div>
            ) : (
              <p className="mt-4 text-solana-pink">No connection details available.</p>
            )}
          </CardContent>
        </Card>

        {/* Pool Configuration */}
        <Card className="shadow-glow border-none bg-solana-dark/80 mb-12">
          <CardHeader className="bg-solana-teal text-solana-dark">
            <CardTitle className="text-2xl flex items-center">
              <i className="fas fa-server mr-2"></i> Pool Configuration
            </CardTitle>
          </CardHeader>
          <CardContent className="pt-6">
            <h3 className="text-xl font-semibold text-solana-teal mb-4">Current Pool Settings</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-solana-gray">
              <div>
                <p>
                  <strong>Algorithm:</strong> {pool.coin.algorithm || "Unknown"}
                </p>
                <p>
                  <strong>Wallet Address:</strong>{" "}
                  <code className="font-mono text-sm break-all">{pool.address || "Not available"}</code>
                </p>
                <p>
                  <strong>Payout Scheme:</strong>{" "}
                  {pool.paymentProcessing?.payoutScheme || "Unknown"}
                </p>
              </div>
              <div>
                <p>
                  <strong>Minimum Payment:</strong>{" "}
                  {pool.paymentProcessing?.minimumPayment ?? "Not set"}
                </p>
                <p>
                  <strong>Pool Fee:</strong> {pool.poolFeePercent ?? 0}%
                </p>
              </div>
            </div>
            {pool.connectionDetails?.ports?.length ? (
              <div className="mt-4 space-y-1">
                {pool.connectionDetails.ports.map((port) => (
                  <p key={port.port} className="text-solana-gray">
                    <strong>{port.name}:</strong> Variable / {port.minDiff} ↔ {port.maxDiff}
                  </p>
                ))}
              </div>
            ) : null}
          </CardContent>
        </Card>

        {/* Connection Details Table */}
        <Card className="shadow-glow border-none bg-solana-dark/80">
          <CardHeader className="bg-solana-teal text-solana-dark">
            <CardTitle className="text-2xl flex items-center">
              <i className="fas fa-plug mr-2"></i> Connection Details
            </CardTitle>
          </CardHeader>
          <CardContent className="p-0">
            <Table>
              <TableHeader>
                <TableRow className="bg-solana-teal text-solana-dark">
                  <TableHead>Pool</TableHead>
                  <TableHead>Algorithm</TableHead>
                  <TableHead>Port Name</TableHead>
                  <TableHead>Stratum URL</TableHead>
                  <TableHead>Port</TableHead>
                  <TableHead>Difficulty Range</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {pool.connectionDetails?.ports?.length ? (
                  pool.connectionDetails.ports.map((port) => (
                    <TableRow
                      key={port.port}
                      className="hover:bg-solana-teal/10 transition-colors"
                    >
                      <TableCell>
                        <Link href={`/pools/${pool.id}`} className="flex items-center">
                          <CoinImage
                            src={`/coins/${pool.coin.symbol?.toLowerCase() || poolId.toLowerCase()}.png`}
                            alt={`${displayName} logo`}
                            className="w-6 h-6 mr-2"
                          />
                          <span className="font-medium text-solana-teal">{displayName}</span>
                        </Link>
                      </TableCell>
                      <TableCell>{pool.coin.algorithm || "Unknown"}</TableCell>
                      <TableCell>{port.name}</TableCell>
                      <TableCell className="font-mono text-sm">{port.stratumUrl}</TableCell>
                      <TableCell>{port.port}</TableCell>
                      <TableCell>
                        {port.minDiff} ↔ {port.maxDiff}
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={6} className="text-center py-8">
                      <div className="bg-solana-pink/20 border-l-4 border-solana-pink p-4 rounded">
                        <h4 className="text-lg font-semibold text-solana-pink flex items-center">
                          <i className="fas fa-exclamation-triangle mr-2"></i> Connection Unavailable
                        </h4>
                        <Separator className="my-2 bg-solana-gray" />
                        <p className="text-solana-gray">
                          Unable to load connection details for {poolId}. Please try again later.
                        </p>
                        <Button
                          asChild
                          variant="outline"
                          className="mt-4 border-solana-teal text-solana-teal hover:bg-solana-teal hover:text-solana-dark"
                        >
                          <Link href={`/pools/${poolId}`}>Return to Pool</Link>
                        </Button>
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