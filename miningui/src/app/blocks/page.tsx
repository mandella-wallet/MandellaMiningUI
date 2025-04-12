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
import { fetchPoolBlocks, PoolBlock } from "@/lib/api";
import CoinImage from "@/components/CoinImage";
import Header from "@/components/Header"; // Import the Header component
import Footer from "@/components/Footer"; // Import the Footer component

export default async function BlocksPage() {
  const poolBlocks: PoolBlock[] = await fetchPoolBlocks();

  return (
    <div className="min-h-screen bg-solana-dark text-white">
      {/* Header */}
      <Header /> {/* Use the Header component */}

      {/* Pool Blocks Section */}
      <section className="container mx-auto py-16">
        <div className="text-center mb-10">
          <h1 className="text-4xl font-bold text-solana-teal">Found Blocks</h1>
          <p className="text-solana-gray">Blocks recently mined by Mandella Mining Pool across all pools.</p>
        </div>

        {/* Pool Blocks Table */}
        <Card className="shadow-glow border-none bg-solana-dark/80">
          <CardHeader className="bg-solana-teal text-solana-dark">
            <CardTitle className="text-2xl flex items-center">
              <i className="fas fa-cube mr-2"></i> Recent Blocks
            </CardTitle>
          </CardHeader>
          <CardContent className="p-0">
            <Table>
              <TableHeader>
                <TableRow className="bg-solana-teal text-solana-dark">
                  <TableHead>Pool</TableHead>
                  <TableHead>Block Height</TableHead>
                  <TableHead>Timestamp</TableHead>
                  <TableHead>Reward</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {poolBlocks.length > 0 ? (
                  poolBlocks.map((block, index) => (
                    <TableRow
                      key={`${block.poolId}-${block.blockHeight}`}
                      className="hover:bg-solana-teal/10 transition-colors"
                    >
                      <TableCell>
                        <Link href={`/${block.poolId}`} className="flex items-center">
                          <CoinImage
                            src={`/img/coin/icon/${block.coinType.toLowerCase()}.png`}
                            alt={`${block.poolName} logo`}
                            className="w-6 h-6 mr-2"
                          />
                          <span className="font-medium text-solana-teal">
                            {block.poolName}
                          </span>
                        </Link>
                      </TableCell>
                      <TableCell>{block.blockHeight}</TableCell>
                      <TableCell>{block.timestamp}</TableCell>
                      <TableCell>
                        <Badge className="bg-solana-purple text-white">
                          {block.reward} {block.coinType}
                        </Badge>
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={4} className="text-center py-8">
                      <div className="bg-solana-pink/20 border-l-4 border-solana-pink p-4 rounded">
                        <h4 className="text-lg font-semibold text-solana-pink flex items-center">
                          <i className="fas fa-exclamation-triangle mr-2"></i> No Blocks
                        </h4>
                        <Separator className="my-2 bg-solana-gray" />
                        <p className="text-solana-gray">No blocks found recently.</p>
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