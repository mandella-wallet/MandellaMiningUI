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
import { fetchPoolPayments, formatValue, PoolPayment } from "@/lib/api";
import CoinImage from "@/components/CoinImage";
import Header from "@/components/Header"; // Import the Header component
import Footer from "@/components/Footer"; // Import the Footer component

export default async function PaymentsPage() {
  const poolPayments: PoolPayment[] = await fetchPoolPayments();

  return (
    <div className="min-h-screen bg-solana-dark text-white">
      {/* Header */}
      <Header /> {/* Use the Header component */}

      {/* Pool Payments Section */}
      <section className="container mx-auto py-16">
        <div className="text-center mb-10">
          <h1 className="text-4xl font-bold text-solana-teal">Pool Payments</h1>
          <p className="text-solana-gray">Recent payments made to miners across all Mandella pools.</p>
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
                        <Link href={`/${payment.poolId}`} className="flex items-center">
                          <CoinImage
                            src={`/img/coin/icon/${payment.coinType.toLowerCase()}.png`}
                            alt={`${payment.poolName} logo`}
                            className="w-6 h-6 mr-2"
                          />
                          <span className="font-medium text-solana-teal">
                            {payment.poolName}
                          </span>
                        </Link>
                      </TableCell>
                      <TableCell className="font-mono text-sm break-all">
                        {payment.minerAddress}
                      </TableCell>
                      <TableCell>{payment.timestamp}</TableCell>
                      <TableCell>
                        <Badge className="bg-solana-purple text-white">
                          {formatValue(payment.amount, 5, payment.coinType)}
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

      <Footer /> {/* Use the Footer component */}
    </div>
  );
}