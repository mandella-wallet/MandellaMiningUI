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
import { fetchTopMiners, TopMiner, formatValue, fetchPoolDetails, PoolDetails } from "@/lib/api";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import PoolBreadcrumb from "@/components/PoolBreadcrumb"; // Added PoolBreadcrumb

interface MinersPageProps {
  params: { id: string };
}

export default async function MinersPage({ params }: MinersPageProps) {
  const poolId = params.id;
  const [poolDetails, topMiners]: [PoolDetails, TopMiner[]] = await Promise.all([
    fetchPoolDetails(poolId),
    fetchTopMiners(poolId), // Assumes fetchTopMiners accepts poolId
  ]);

  // Handle null or errored pool data
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

  const { pool } = poolDetails;

  return (
    <div className="min-h-screen bg-gray-900 text-gray-100">
      <Header />
      <section className="container mx-auto py-16">
        <PoolBreadcrumb poolId={poolId} poolName={pool.coin?.name} currentPage="miners" />
        <div className="text-center mb-10">
          <h1 className="text-4xl font-bold text-teal-400">Top Miners</h1>
          <p className="text-gray-400">
            The most active miners in {pool.coin?.name || poolId} Pool.
          </p>
        </div>

        <Card className="bg-gray-800 border-gray-700 shadow-md">
          <CardHeader>
            <CardTitle className="text-2xl text-teal-400 flex items-center">
              <i className="fas fa-users mr-2"></i> Top Miners
            </CardTitle>
          </CardHeader>
          <CardContent className="p-0">
            <Table>
              <TableHeader>
                <TableRow className="bg-gray-700">
                  <TableHead className="text-gray-100">Miner Address</TableHead>
                  <TableHead className="text-gray-100">Total Hashrate</TableHead>
                  <TableHead className="text-gray-100">Pool</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {topMiners.length > 0 ? (
                  topMiners.map((miner) => (
                    <TableRow
                      key={miner.address}
                      className="hover:bg-gray-700 transition-colors"
                    >
                      <TableCell className="font-mono text-sm break-all">
                        {miner.address}
                      </TableCell>
                      <TableCell>{formatValue(miner.totalHashrate, 5, "H/s")}</TableCell>
                      <TableCell>
                        <Link href={`/pools/${poolId}`} className="text-teal-400 hover:underline">
                          {pool.coin?.name || poolId}
                        </Link>
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={3} className="text-center py-8">
                      <div className="bg-gray-700/50 border-l-4 border-teal-400 p-4 rounded">
                        <h4 className="text-lg font-semibold text-teal-400 flex items-center">
                          <i className="fas fa-exclamation-triangle mr-2"></i> No Miners
                        </h4>
                        <Separator className="my-2 bg-gray-600" />
                        <p className="text-gray-400">No active miners found.</p>
                        <Button
                          asChild
                          variant="outline"
                          className="mt-4 border-teal-400 text-teal-400 hover:bg-teal-400 hover:text-gray-900"
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