import { NextResponse } from "next/server";
import { fetchMinerStats } from "@/lib/api";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const walletAddress = searchParams.get("wallet");

  if (!walletAddress) {
    return NextResponse.json({ error: "Wallet address is required" }, { status: 400 });
  }

  try {
    const stats = await fetchMinerStats(walletAddress);
    return NextResponse.json(stats);
  } catch (error: any) {
    return NextResponse.json({ error: error.message || "Failed to fetch miner stats" }, { status: 500 });
  }
}