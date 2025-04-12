// Import dummy data
import {
  // PoolCoin,
  PoolStats,
  HistoricalStat,
  PoolDetails,
  MinerStats,
  TopMiner,
  PoolBlock,
  PoolPayment,
  FAQ,
  SupportContact,
  dummyPools,
  dummyPoolStats,
  dummyHistoricalStats,
  dummyPoolDetails,
  dummyMinerStats,
  dummyTopMiners,
  dummyPoolBlocks,
  dummyPoolPayments,
  dummyFAQs,
  dummySupportContact,
} from "./dummyData";

// Re-export types for use in pages
export {
  PoolCoin,
  PoolStats,
  HistoricalStat,
  PoolDetails,
  MinerStats,
  TopMiner,
  PoolBlock,
  PoolPayment,
  FAQ,
  SupportContact,
};

export interface Coin {
  type: string;
  name: string;
  symbol: string;
  website: string;
  market: string;
  family: string;
  algorithm: string;
  twitter?: string;
  telegram?: string;
  discord?: string;
}

export interface PoolStats {
  connectedMiners: number;
  poolHashrate: number;
  sharesPerSecond: number;
}

export interface NetworkStats {
  networkType: string;
  networkHashrate: number;
  networkDifficulty: number;
  nextNetworkTarget: string;
  nextNetworkBits: string;
  lastNetworkBlockTime: string;
  blockHeight: number;
  connectedPeers: number;
  nodeVersion: string;
  rewardType: string;
}

export interface PoolCoin {
  id: string;
  coin: Coin;
  poolStats: PoolStats;
  networkStats: NetworkStats;
  poolFeePercent: number;
}
// Fetch pools for homepage and stats page
export async function fetchPools(): Promise<PoolCoin[]> {
  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/pools`);
    if (!response.ok) {
      throw new Error("Failed to fetch pools from API");
    }
    const data = await response.json();
    return data.pools; // The API returns { pools: [...] }
  } catch (error) {
    console.error("Error fetching pools:", error);
    throw new Error("Failed to fetch pools");
  }
}


// Fetch overall pool stats for stats page
export async function fetchStats(): Promise<PoolStats> {
  await new Promise((resolve) => setTimeout(resolve, 500));
  return dummyPoolStats;
}

// Fetch historical stats for stats page
export async function fetchHistoricalStats(): Promise<HistoricalStat[]> {
  await new Promise((resolve) => setTimeout(resolve, 500));
  return dummyHistoricalStats;
}

// Fetch pool details for /[id] page
export async function fetchPoolDetails(id: string): Promise<PoolDetails> {
  await new Promise((resolve) => setTimeout(resolve, 500));
  const poolDetails = dummyPoolDetails[id];
  if (!poolDetails) {
    throw new Error(`Pool with id ${id} not found`);
  }
  return poolDetails;
}

// Fetch top miners for /miners page
export async function fetchTopMiners(): Promise<TopMiner[]> {
  await new Promise((resolve) => setTimeout(resolve, 500));
  return dummyTopMiners;
}

// Fetch pool blocks for /blocks page
export async function fetchPoolBlocks(): Promise<PoolBlock[]> {
  await new Promise((resolve) => setTimeout(resolve, 500));
  return dummyPoolBlocks;
}

// Fetch pool payments for /payments page
export async function fetchPoolPayments(): Promise<PoolPayment[]> {
  await new Promise((resolve) => setTimeout(resolve, 500));
  return dummyPoolPayments;
}

// Fetch FAQs for /faq page
export async function fetchFAQs(): Promise<FAQ[]> {
  await new Promise((resolve) => setTimeout(resolve, 500));
  return dummyFAQs;
}

// Fetch support contact for /faq page
export async function fetchSupportContact(): Promise<SupportContact> {
  await new Promise((resolve) => setTimeout(resolve, 500));
  return dummySupportContact;
}

// Utility to format values
export function formatValue(value: number, decimals: number, unit: string): string {
  return `${value.toFixed(decimals)} ${unit}`;
}

// Fetch miner stats based on wallet address using real API
export async function fetchMinerStats(walletAddress: string): Promise<MinerStats> {
  // Basic validation: check if wallet address is provided
  if (!walletAddress) {
    throw new Error("Wallet address is required");
  }

  // Simple mock validation: wallet address should be 26-35 alphanumeric characters (simplified for demo)
  const walletRegex = /^[A-Za-z0-9]{26,35}$/;
  if (!walletRegex.test(walletAddress)) {
    throw new Error("Invalid wallet address format");
  }

  try {
    // Fetch pool data from the real API
    const response = await fetch("https://scryptcrypt.com/api/pools");
    if (!response.ok) {
      throw new Error("Failed to fetch pool data from API");
    }

    const data = await response.json();
    const pool = data.pools[0]; // Use the first pool (CraftCoin SOLO) for this trial

    // Simulate wallet-specific stats based on pool data
    const poolHashrate = pool.poolStats.poolHashrate || 0;
    const networkHashrate = pool.networkStats.networkHashrate || 1; // Avoid division by zero
    const blockReward = pool.blockReward || 0;
    const totalPaid = pool.totalPaid || 0;
    const totalBlocks = pool.totalBlocks || 1; // Avoid division by zero

    // Simulate the wallet's contribution (e.g., assume the wallet contributes 1% of the pool's hashrate)
    const walletContributionRatio = 0.01; // 1% of the pool's hashrate
    const walletHashrate = poolHashrate * walletContributionRatio;

    // Simulate shares (proportional to hashrate contribution)
    const poolSharesPerSecond = pool.poolStats.sharesPerSecond || 0;
    const walletShares = poolSharesPerSecond * walletContributionRatio * 86400; // Shares per day

    // Simulate estimated earnings (proportional to hashrate contribution)
    const walletEarnings = (walletHashrate / networkHashrate) * blockReward * 144; // 144 blocks per day (assuming 10-minute blocks)

    // Simulate payouts (mock data, since the API doesn't provide wallet-specific payouts)
    const averagePayoutPerBlock = totalPaid / totalBlocks;
    const simulatedPayouts = [
      {
        timestamp: "2025-04-12T12:00:00Z",
        amount: averagePayoutPerBlock * walletContributionRatio,
        txHash: "mock-txhash-1",
      },
      {
        timestamp: "2025-04-11T12:00:00Z",
        amount: averagePayoutPerBlock * walletContributionRatio,
        txHash: "mock-txhash-2",
      },
    ];

    return {
      walletAddress,
      hashrate: walletHashrate,
      shares: Math.round(walletShares),
      estimatedEarnings: walletEarnings,
      payouts: simulatedPayouts,
    };
  } catch (error) {
    console.error("Error fetching miner stats:", error);
    throw new Error("Failed to fetch miner stats from API");
  }
}