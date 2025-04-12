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
import { fetchMinerStats, MinerStats, formatValue } from "@/lib/api";
import ClientDashboard from "./ClientDashboard";
import Header from "@/components/Header"; // Import the Header component
import Footer from "@/components/Footer"; // Import the Footer component

export default async function DashboardPage() {
  // const minerStats: MinerStats = await fetchMinerStats();

  return (
    <div className="min-h-screen bg-solana-dark text-white">
      {/* Header */}
      <Header /> {/* Use the Header component */}

      {/* Miner Dashboard Section */}
      <ClientDashboard />

      <Footer /> {/* Use the Footer component */}
    </div>
  );
}