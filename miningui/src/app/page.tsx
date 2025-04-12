import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";
import { fetchPools, formatValue, PoolCoin } from "@/lib/api";
import CoinImage from "@/components/CoinImage";
import Header from "@/components/Header"; // Import the Header component
import Footer from "@/components/Footer";

export default async function Home() {
  const pools: PoolCoin[] = await fetchPools();

  return (
    <div className="min-h-screen bg-solana-dark text-white">
      <Header /> {/* Use the Header component */}

      <section className="bg-gradient-solana py-20">
        <div className="container mx-auto text-center">
          <h1 className="text-5xl md:text-6xl font-extrabold mb-4">
            Mine with Mandella
          </h1>
          <p className="text-xl md:text-2xl max-w-3xl mx-auto mb-8 text-solana-gray">
            High-performance mining with low fees, powered by a futuristic interface.
          </p>
          <div className="flex justify-center gap-4">
            <Button size="lg" className="bg-solana-teal hover:bg-solana-teal/80 text-solana-dark">
              Start Mining
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="text-solana-teal border-solana-teal hover:bg-solana-teal hover:text-solana-dark"
            >
              Learn More
            </Button>
          </div>
        </div>
      </section>

      <section id="pools" className="container mx-auto py-16">
        <div className="text-center mb-10">
          <h2 className="text-3xl font-bold text-solana-teal">Available Mining Pools</h2>
          <p className="text-solana-gray">Select your coin and join the blockchain future.</p>
        </div>
        <Card className="shadow-glow border-none bg-solana-dark/80">
          <CardHeader className="bg-solana-teal text-solana-dark">
            <CardTitle className="text-2xl flex items-center">
              <i className="fas fa-coins mr-2"></i> Pool Stats
            </CardTitle>
          </CardHeader>
          <CardContent className="p-0">
            <Table>
              <TableHeader>
                <TableRow className="bg-solana-teal text-solana-dark">
                  <TableHead>Coin</TableHead>
                  <TableHead>Algorithm</TableHead>
                  <TableHead>Miners</TableHead>
                  <TableHead>Pool Hashrate</TableHead>
                  <TableHead>Fee</TableHead>
                  <TableHead>Network Stats</TableHead>
                  <TableHead>Action</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {pools.length > 0 ? (
                  pools.map((pool: PoolCoin) => {
                    const coinName = pool.coin.name || pool.coin.type;
                    return (
                      <TableRow
                        key={pool.id}
                        className="hover:bg-solana-teal/10 transition-colors"
                      >
                        <TableCell>
                          <HoverCard>
                            <HoverCardTrigger asChild>
                              <Link href={`/${pool.id}`} className="flex items-center">
                                <CoinImage
                                  src={`/img/coin/icon/${pool.coin.type.toLowerCase()}.png`}
                                  alt={`${pool.coin.type} logo`}
                                  className="w-6 h-6 mr-2"
                                />
                                <span className="font-medium text-solana-teal">
                                  {coinName}
                                </span>
                                <Badge variant="outline" className="ml-2 border-solana-purple text-solana-purple">
                                  {pool.coin.type.toUpperCase()}
                                </Badge>
                              </Link>
                            </HoverCardTrigger>
                            <HoverCardContent className="w-64 bg-solana-dark text-white border-solana-purple">
                              <div className="flex items-center space-x-2">
                                <CoinImage
                                  src={`/img/coin/icon/${pool.coin.type.toLowerCase()}.png`}
                                  alt={`${coinName} icon`}
                                  className="w-10 h-10"
                                />
                                <div>
                                  <p className="font-semibold text-solana-teal">{coinName}</p>
                                  <p className="text-sm text-solana-gray">
                                    Algorithm: {pool.coin.algorithm}
                                  </p>
                                </div>
                              </div>
                            </HoverCardContent>
                          </HoverCard>
                        </TableCell>
                        <TableCell>{pool.coin.algorithm}</TableCell>
                        <TableCell>{pool.poolStats.connectedMiners}</TableCell>
                        <TableCell>
                          {formatValue(pool.poolStats.poolHashrate, 5, "H/s")}
                        </TableCell>
                        <TableCell>
                          <Badge className="bg-solana-purple text-white">{pool.poolFeePercent}%</Badge>
                        </TableCell>
                        <TableCell>
                          <div className="text-sm">
                            <p>{formatValue(pool.networkStats.networkHashrate, 5, "H/s")}</p>
                            <p className="text-solana-gray">
                              Diff: {formatValue(pool.networkStats.networkDifficulty, 5, "")}
                            </p>
                          </div>
                        </TableCell>
                        <TableCell>
                          <Button
                            size="sm"
                            className="bg-solana-teal hover:bg-solana-teal/80 text-solana-dark"
                            asChild
                          >
                            <Link href={`/${pool.id}`}>Mine Now</Link>
                          </Button>
                        </TableCell>
                      </TableRow>
                    );
                  })
                ) : (
                  <TableRow>
                    <TableCell colSpan={7} className="text-center py-8">
                      <div className="bg-solana-pink/20 border-l-4 border-solana-pink p-4 rounded">
                        <h4 className="text-lg font-semibold text-solana-pink flex items-center">
                          <i className="fas fa-exclamation-triangle mr-2"></i> Maintenance
                        </h4>
                        <Separator className="my-2 bg-solana-gray" />
                        <p className="text-solana-gray">The pool is currently down for maintenance. Please check back later.</p>
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