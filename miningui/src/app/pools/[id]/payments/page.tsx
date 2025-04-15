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
import { fetchPoolPayments, formatValue, PoolPayment, fetchPoolDetails } from "@/lib/api";
import CoinImage from "@/components/CoinImage";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import PoolBreadcrumb from "@/components/PoolBreadcrumb";

export default async function PaymentsPage({ params }: { params: { id: string } }) {
  const [poolPayments, poolDetails] = await Promise.all([
    fetchPoolPayments(params.id),
    fetchPoolDetails(params.id)
  ]);

  // Handle null or errored data
  if (!poolDetails.pool || poolDetails.error) {
    return (
      <div className="min-h-screen bg-solana-dark text-white">
        <Header />
        <section className="container mx-auto py-12 px-4">
          <Card className="bg-solana-dark/80 border-none shadow-glow">
            <CardHeader>
              <CardTitle className="text-xl text-solana-teal flex items-center">
                <i className="fas fa-exclamation-triangle mr-2"></i> Error
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-solana-gray">
                {poolDetails.error || "Unable to load pool data."}
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

  const { pool } = poolDetails;

  return (
    <div className="min-h-screen bg-solana-dark text-white">
      <Header />

      <section className="container mx-auto py-12 px-4">
        <PoolBreadcrumb poolId={params.id} poolName={pool.coin?.name} currentPage="payments" />
        
        {/* Pool Payments Section */}
        <div className="text-center mb-10">
          <h1 className="text-4xl font-bold text-solana-teal">Pool Payments</h1>
          <p className="text-solana-gray mt-2">Recent payments made to miners in {pool.coin?.name || 'Mining'} Pool</p>
        </div>

        {/* Pool Payments Table */}
        <Card className="shadow-glow border-none bg-solana-dark/80">
          <CardHeader className="bg-solana-teal text-solana-dark">
            <CardTitle className="text-2xl flex items-center">
              <i className="fas fa-money-bill-wave mr-2"></i> Recent Payments
            </CardTitle>
          </CardHeader>
          <CardContent className="p-0">
            <Table>
              <TableHeader>
                <TableRow className="bg-solana-teal text-solana-dark">
                  <TableHead>Pool</TableHead>
                  <TableHead>Miner Address</TableHead>
                  <TableHead>Timestamp</TableHead>
                  <TableHead>Amount</TableHead>
                  <TableHead>Transaction Hash</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {poolPayments.length > 0 ? (
                  poolPayments.map((payment, index) => (
                    <TableRow
                      key={`${payment.poolId}-${payment.txHash}`}
                      className="hover:bg-solana-teal/10 transition-colors"
                    >
                      <TableCell>
                        <Link href={`/pools/${payment.poolId}`} className="flex items-center">
                          <CoinImage
                            src={`/img/coin/icon/${pool.coin?.type.toLowerCase()}.png`}
                            alt={`${pool.coin?.name} logo`}
                            className="w-6 h-6 mr-2"
                          />
                          <span className="font-medium text-solana-teal">
                            {pool.coin?.name}
                          </span>
                        </Link>
                      </TableCell>
                      <TableCell className="font-mono text-sm break-all">
                        {payment.minerAddress}
                      </TableCell>
                      <TableCell>{payment.timestamp}</TableCell>
                      <TableCell>
                        <Badge className="bg-solana-purple text-white">
                          {formatValue(payment.amount, 5, pool.coin?.type)}
                        </Badge>
                      </TableCell>
                      <TableCell className="font-mono text-sm break-all">
                        {payment.txHash}
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={5} className="text-center py-8">
                      <div className="bg-solana-pink/20 border-l-4 border-solana-pink p-4 rounded">
                        <h4 className="text-lg font-semibold text-solana-pink flex items-center">
                          <i className="fas fa-exclamation-triangle mr-2"></i> No Payments
                        </h4>
                        <Separator className="my-2 bg-solana-gray" />
                        <p className="text-solana-gray">No recent payments found.</p>
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
