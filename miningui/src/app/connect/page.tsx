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
import { fetchPools, PoolCoin } from "@/lib/api";
import CoinImage from "@/components/CoinImage";
import Header from "@/components/Header"; // Import the Header component
import Footer from "@/components/Footer"; // Import the Footer component

export default async function ConnectPage() {
  const pools: PoolCoin[] = await fetchPools();

  return (
    <div className="min-h-screen bg-solana-dark text-white">
      {/* Header */}
      <Header /> {/* Use the Header component */}

      {/* Pool Connection Section */}
      <section className="container mx-auto py-16">
        <div className="text-center mb-10">
          <h1 className="text-4xl font-bold text-solana-teal">Pool Connection</h1>
          <p className="text-solana-gray">Connect your mining software to Mandella Mining Pool.</p>
        </div>

        {/* Instructions */}
        <Card className="shadow-glow border-none bg-solana-dark/80 mb-12">
          <CardHeader className="bg-solana-teal text-solana-dark">
            <CardTitle className="text-2xl flex items-center">
              <i className="fas fa-plug mr-2"></i> How to Connect
            </CardTitle>
          </CardHeader>
          <CardContent className="pt-6">
            <ol className="list-decimal list-inside space-y-2 text-solana-gray">
              <li>Choose a pool from the table below.</li>
              <li>
                Configure your mining software with the provided <strong>Stratum URL</strong> and <strong>Port</strong>.
              </li>
              <li>
                Use your wallet address as the username (e.g., <code>1A1zP1eP5QGefi2DMPTfTL5SLmv7DivfNa</code>).
              </li>
              <li>Leave the password field blank or use <code>x</code>.</li>
              <li>
                If you encounter connection issues, try the <strong>Backup Stratum URL</strong> and <strong>Port</strong>.
              </li>
              <li>Start mining and monitor your stats on the <Link href="/dashboard" className="text-solana-teal hover:underline">Dashboard</Link>.</li>
            </ol>
          </CardContent>
        </Card>

        {/* Connection Details Table */}
        <Card className="shadow-glow border-none bg-solana-dark/80">
          <CardHeader className="bg-solana-teal text-solana-dark">
            <CardTitle className="text-2xl flex items-center">
              <i className="fas fa-server mr-2"></i> Connection Details
            </CardTitle>
          </CardHeader>
          <CardContent className="p-0">
            <Table>
              <TableHeader>
                <TableRow className="bg-solana-teal text-solana-dark">
                  <TableHead>Pool</TableHead>
                  <TableHead>Algorithm</TableHead>
                  <TableHead>Stratum URL</TableHead>
                  <TableHead>Port</TableHead>
                  <TableHead>Backup Stratum URL</TableHead>
                  <TableHead>Backup Port</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {pools.length > 0 ? (
                  pools.map((pool) => (
                    <TableRow
                      key={pool.id}
                      className="hover:bg-solana-teal/10 transition-colors"
                    >
                      <TableCell>
                        <Link href={`/${pool.id}`} className="flex items-center">
                          <CoinImage
                            src={`/img/coin/icon/${pool.coin.type.toLowerCase()}.png`}
                            alt={`${pool.coin.name} logo`}
                            className="w-6 h-6 mr-2"
                          />
                          <span className="font-medium text-solana-teal">
                            {pool.coin.name}
                          </span>
                        </Link>
                      </TableCell>
                      <TableCell>{pool.coin.algorithm}</TableCell>
                      <TableCell className="font-mono text-sm">
                        {pool.connectionDetails.stratumUrl}
                      </TableCell>
                      <TableCell>{pool.connectionDetails.port}</TableCell>
                      <TableCell className="font-mono text-sm">
                        {pool.connectionDetails.backupStratumUrl || "N/A"}
                      </TableCell>
                      <TableCell>
                        {pool.connectionDetails.backupPort || "N/A"}
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={6} className="text-center py-8">
                      <div className="bg-solana-pink/20 border-l-4 border-solana-pink p-4 rounded">
                        <h4 className="text-lg font-semibold text-solana-pink flex items-center">
                          <i className="fas fa-exclamation-triangle mr-2"></i> No Pools
                        </h4>
                        <Separator className="my-2 bg-solana-gray" />
                        <p className="text-solana-gray">No pools available for connection.</p>
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