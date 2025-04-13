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
import { fetchPoolDetails, PoolDetails, fetchMinerStats, MinerStats, formatValue } from "@/lib/api";
import ClientDashboard from "./ClientDashboard";
import Header from "@/components/Header";
import PoolBreadcrumb from "@/components/PoolBreadcrumb";
import Footer from "@/components/Footer";

export default async function DashboardPage({ params }: { params: { id: string } }) {
  const poolDetails: PoolDetails = await fetchPoolDetails(params.id);

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

  // Safe access to pool data
  const { pool } = poolDetails;

  return (
    <div className="min-h-screen bg-solana-dark text-white">
      <Header />
      <section className="container mx-auto py-12 px-4">
        <PoolBreadcrumb poolId={params.id} poolName={pool.coin?.name} currentPage="dashboard" />
        <ClientDashboard poolId={params.id} />
      </section>
      <Footer />
    </div>
  );
}