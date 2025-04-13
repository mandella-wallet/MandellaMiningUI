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
import { fetchPoolBlocks, PoolBlock, fetchPoolDetails, PoolDetails } from "@/lib/api"; // Added fetchPoolDetails, PoolDetails
import CoinImage from "@/components/CoinImage";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import PoolBreadcrumb from "@/components/PoolBreadcrumb"; // Added PoolBreadcrumb

interface BlocksPageProps {
  params: { id: string };
}

export default async function BlocksPage({ params }: BlocksPageProps) {
  const poolId = params.id;
  const [poolDetails, poolBlocks]: [PoolDetails, PoolBlock[]] = await Promise.all([
    fetchPoolDetails(poolId),
    fetchPoolBlocks(poolId),
  ]);

  // Handle null or errored pool details
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
      <section className="container mx-auto py-12 px-4">
        <PoolBreadcrumb poolId={poolId} poolName={pool.coin?.name} currentPage="blocks" />
        <div className="text-center mb-10">
          <h1 className="text-4xl font-bold text-teal-400">Found Blocks</h1>
          <p className="text-gray-400">
            Blocks recently mined by {pool.coin?.name || poolId} Pool
          </p>
        </div>

        <Card className="bg-gray-800 border-gray-700 shadow-md">
          <CardHeader>
            <CardTitle className="text-2xl text-teal-400 flex items-center">
              <i className="fas fa-cube mr-2"></i> Recent Blocks
            </CardTitle>
          </CardHeader>
          <CardContent className="p-0">
            <Table>
              <TableHeader>
                <TableRow className="bg-gray-700">
                  <TableHead className="text-gray-100">Pool</TableHead>
                  <TableHead className="text-gray-100">Block Height</TableHead>
                  <TableHead className="text-gray-100">Timestamp</TableHead>
                  <TableHead className="text-gray-100">Reward</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {poolBlocks.length > 0 ? (
                  poolBlocks.map((block) => (
                    <TableRow
                      key={`${block.poolId}-${block.blockHeight}`}
                      className="hover:bg-gray-700 transition-colors"
                    >
                      <TableCell>
                        <Link href={`/pools/${block.poolId}`} className="flex items-center">
                          <CoinImage
                            src={`/coins/${block.coinType.toLowerCase()}.png`}
                            alt={`${block.poolName} logo`}
                            className="w-6 h-6 mr-2"
                          />
                          <span className="font-medium text-teal-400">
                            {block.poolName}
                          </span>
                        </Link>
                      </TableCell>
                      <TableCell>{block.blockHeight}</TableCell>
                      <TableCell>
                        {new Date(block.timestamp).toLocaleString()}
                      </TableCell>
                      <TableCell>
                        <Badge className="bg-teal-500 text-gray-900">
                          {block.reward.toFixed(2)} {block.coinType}
                        </Badge>
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={4} className="text-center py-8">
                      <div className="bg-gray-700/50 border-l-4 border-teal-400 p-4 rounded">
                        <h4 className="text-lg font-semibold text-teal-400 flex items-center">
                          <i className="fas fa-exclamation-triangle mr-2"></i> No Blocks Found
                        </h4>
                        <Separator className="my-2 bg-gray-600" />
                        <p className="text-gray-400">
                          No blocks have been found recently by this pool.
                        </p>
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