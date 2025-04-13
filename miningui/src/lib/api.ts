// Types aligned with https://scryptcrypt.com/api/pools/[id]
export interface Coin {
  type?: string;
  name?: string;
  symbol?: string;
  website?: string;
  market?: string;
  family?: string;
  algorithm?: string;
  twitter?: string;
  telegram?: string;
  discord?: string;
}

export interface PortDetails {
  port: number;
  name: string;
  stratumUrl: string;
  minDiff: number;
  maxDiff: number;
}

export interface ConnectionDetails {
  ports: PortDetails[];
}

export interface PaymentProcessing {
  payoutScheme: string;
  minimumPayment: number;
}

export interface PoolStats {
  connectedMiners: number;
  poolHashrate: number;
  sharesPerSecond: number;
}

export interface NetworkStats {
  networkType?: string;
  networkHashrate: number;
  networkDifficulty: number;
  nextNetworkTarget?: string;
  nextNetworkBits?: string;
  lastNetworkBlockTime?: string;
  blockHeight: number;
  connectedPeers: number;
  nodeVersion?: string;
  rewardType?: string;
}

export interface PoolCoin {
  id: string;
  coin: Coin;
  address: string;
  poolStats: PoolStats;
  networkStats: NetworkStats;
  poolFeePercent: number;
  connectionDetails?: ConnectionDetails;
  paymentProcessing?: PaymentProcessing;
}

export interface HistoricalStat {
  timestamp: string;
  poolHashrate: number;
  connectedMiners: number;
}

export interface PoolDetails {
  pool?: {
    id?: string;
    coin?: Coin;
    poolStats?: PoolStats;
    poolFeePercent?: number;
    totalPaid?: number;
    totalBlocks?: number;
    totalConfirmedBlocks?: number;
    totalPendingBlocks?: number;
    blockReward?: number;
    lastPoolBlockTime?: string;
    poolEffort?: number;
    networkStats?: NetworkStats;
    topMiners?: TopMiner[];
    address?: string;
    addressInfoLink?: string;
  };
  recentBlocks?: { blockHeight: number; timestamp: string; reward: number }[];
  error?: string;
}

export interface MinerStats {
  walletAddress: string;
  hashrate: number;
  shares: number;
  estimatedEarnings: number;
  payouts: { timestamp: string; amount: number; txHash: string }[];
}

export interface TopMiner {
  address: string;
  hashrate: number;
}

export interface PoolBlock {
  poolId: string;
  poolName: string;
  coinType: string;
  blockHeight: number;
  timestamp: string;
  reward: number;
}

export interface PoolPayment {
  walletAddress: string;
  amount: number;
  timestamp: string;
  txHash: string;
}

export interface FAQ {
  question: string;
  answer: string;
}

export interface SupportContact {
  email: string;
  telegram: string;
  discord: string;
}

// Utility function
export function formatValue(value: number | undefined | null, decimals: number, suffix: string): string {
  if (value == null || isNaN(value)) return `0 ${suffix}`;
  const units = ["", "K", "M", "G", "T", "P"];
  let magnitude = 0;
  let adjustedValue = value;

  while (adjustedValue >= 1000 && magnitude < units.length - 1) {
    adjustedValue /= 1000;
    magnitude++;
  }

  return `${adjustedValue.toFixed(decimals)} ${units[magnitude]}${suffix}`;
}

// Fetch all available pools
export async function fetchPools(): Promise<PoolCoin[]> {
  try {
    const response = await fetch(`https://scryptcrypt.com/api/pools`, {
      cache: "no-store",
    });
    if (!response.ok) {
      console.warn(`Failed to fetch pools: ${response.status}`);
      return [];
    }
    const data = await response.json();
    if (!data?.pools || !Array.isArray(data.pools)) {
      console.warn("No pools data available");
      return [];
    }

    return data.pools.map((poolData: any): PoolCoin => {
      const ports = poolData.ports
        ? Object.entries(poolData.ports).map(([port, details]: [string, any]) => ({
            port: Number(port),
            name: details.name || `Port ${port}`,
            stratumUrl: `stratum+tcp://${poolData.id}.scryptcrypt.com:${port}`,
            minDiff: details.varDiff?.minDiff || 0,
            maxDiff: details.varDiff?.maxDiff || 0,
          }))
        : [];

      return {
        id: poolData.id || "",
        coin: {
          type: poolData.coin?.type || poolData.id || "",
          name: poolData.coin?.name || poolData.id || "",
          symbol: poolData.coin?.symbol || poolData.id.toUpperCase() || "",
          website: poolData.coin?.website || "",
          market: poolData.coin?.market || "",
          family: poolData.coin?.family || "",
          algorithm: poolData.coin?.algorithm || "Unknown",
          twitter: poolData.coin?.twitter || "",
          telegram: poolData.coin?.telegram || "",
          discord: poolData.coin?.discord || "",
        },
        address: poolData.address || "",
        poolStats: {
          connectedMiners: poolData.poolStats?.connectedMiners || 0,
          poolHashrate: poolData.poolStats?.poolHashrate || 0,
          sharesPerSecond: poolData.poolStats?.sharesPerSecond || 0,
        },
        networkStats: {
          networkType: poolData.networkStats?.networkType || "",
          networkHashrate: poolData.networkStats?.networkHashrate || 0,
          networkDifficulty: poolData.networkStats?.networkDifficulty || 0,
          nextNetworkTarget: poolData.networkStats?.nextNetworkTarget || "",
          nextNetworkBits: poolData.networkStats?.nextNetworkBits || "",
          lastNetworkBlockTime: poolData.networkStats?.lastNetworkBlockTime || "",
          blockHeight: poolData.networkStats?.blockHeight || 0,
          connectedPeers: poolData.networkStats?.connectedPeers || 0,
          nodeVersion: poolData.networkStats?.nodeVersion || "",
          rewardType: poolData.networkStats?.rewardType || "",
        },
        poolFeePercent: poolData.poolFeePercent || 0,
        connectionDetails: ports.length > 0 ? { ports } : undefined,
        paymentProcessing: {
          payoutScheme: poolData.paymentProcessing?.payoutScheme || "Unknown",
          minimumPayment: poolData.paymentProcessing?.minimumPayment || 0,
        },
      };
    });
  } catch (error) {
    console.error("Error fetching pools:", error);
    return [];
  }
}

export async function fetchPool(id: string): Promise<PoolCoin | null> {
  try {
    if (!id) {
      console.warn("Pool ID is required");
      return null;
    }
    const response = await fetch(`https://scryptcrypt.com/api/pools/${id}`, {
      cache: "no-store",
    });
    if (!response.ok) {
      console.warn(`Failed to fetch pool ${id}: ${response.status}`);
      return null;
    }
    const data = await response.json();
    if (!data?.pool) {
      console.warn(`No pool data for ${id}`);
      return null;
    }

    const poolData = data.pool;
    const ports = poolData.ports
      ? Object.entries(poolData.ports).map(([port, details]: [string, any]) => ({
          port: Number(port),
          name: details.name || `Port ${port}`,
          stratumUrl: `stratum+tcp://${id}.scryptcrypt.com:${port}`,
          minDiff: details.varDiff?.minDiff || 0,
          maxDiff: details.varDiff?.maxDiff || 0,
        }))
      : [];

    return {
      id: poolData.id,
      coin: {
        type: poolData.coin?.type || id,
        name: poolData.coin?.name || id,
        symbol: poolData.coin?.symbol || id.toUpperCase(),
        website: poolData.coin?.website || "",
        market: poolData.coin?.market || "",
        family: poolData.coin?.family || "",
        algorithm: poolData.coin?.algorithm || "Unknown",
        twitter: poolData.coin?.twitter || "",
        telegram: poolData.coin?.telegram || "",
        discord: poolData.coin?.discord || "",
      },
      address: poolData.address || "",
      poolStats: {
        connectedMiners: poolData.poolStats?.connectedMiners || 0,
        poolHashrate: poolData.poolStats?.poolHashrate || 0,
        sharesPerSecond: poolData.poolStats?.sharesPerSecond || 0,
      },
      networkStats: {
        networkType: poolData.networkStats?.networkType || "",
        networkHashrate: poolData.networkStats?.networkHashrate || 0,
        networkDifficulty: poolData.networkStats?.networkDifficulty || 0,
        nextNetworkTarget: poolData.networkStats?.nextNetworkTarget || "",
        nextNetworkBits: poolData.networkStats?.nextNetworkBits || "",
        lastNetworkBlockTime: poolData.networkStats?.lastNetworkBlockTime || "",
        blockHeight: poolData.networkStats?.blockHeight || 0,
        connectedPeers: poolData.networkStats?.connectedPeers || 0,
        nodeVersion: poolData.networkStats?.nodeVersion || "",
        rewardType: poolData.networkStats?.rewardType || "",
      },
      poolFeePercent: poolData.poolFeePercent || 0,
      connectionDetails: ports.length > 0 ? { ports } : undefined,
      paymentProcessing: {
        payoutScheme: poolData.paymentProcessing?.payoutScheme || "Unknown",
        minimumPayment: poolData.paymentProcessing?.minimumPayment || 0,
      },
    };
  } catch (error) {
    console.error(`Error fetching pool ${id}:`, error);
    return null;
  }
}

// Fetch pool details
export async function fetchPoolDetails(id: string): Promise<PoolDetails> {
  try {
    if (!id) {
      return { pool: undefined, recentBlocks: [], error: "Pool ID is required" };
    }
    const response = await fetch(`https://scryptcrypt.com/api/pools/${id}`, {
      cache: "no-store",
    });
    if (!response.ok) {
      return { pool: undefined, recentBlocks: [], error: `HTTP error ${response.status}` };
    }
    const data = await response.json();

    if (!data?.pool) {
      return { pool: undefined, recentBlocks: [], error: "No pool data available" };
    }

    let recentBlocks: { blockHeight: number; timestamp: string; reward: number }[] = [];
    try {
      const blocksResponse = await fetch(`https://scryptcrypt.com/api/pools/${id}/blocks`, {
        cache: "no-store",
      });
      if (blocksResponse.ok) {
        const blocksData = await blocksResponse.json();
        recentBlocks = Array.isArray(blocksData)
          ? blocksData.map((block: any) => ({
              blockHeight: block.height || block.blockHeight || data.pool.networkStats?.blockHeight || 0,
              timestamp: block.timestamp || data.pool.lastPoolBlockTime || new Date().toISOString(),
              reward: block.reward || data.pool.blockReward || 0,
            }))
          : [];
      }
    } catch (e) {
      console.warn(`No blocks endpoint for ${id}, using fallback`);
      if (data.pool.lastPoolBlockTime && data.pool.blockReward) {
        recentBlocks = [
          {
            blockHeight: data.pool.networkStats?.blockHeight || 0,
            timestamp: data.pool.lastPoolBlockTime,
            reward: data.pool.blockReward || 0,
          },
        ];
      }
    }

    return {
      pool: {
        id,
        coin: {
          type: data.pool.coin?.type || "",
          name: data.pool.coin?.name || id,
          symbol: data.pool.coin?.symbol || id.toUpperCase(),
          website: data.pool.coin?.website || "",
          market: data.pool.coin?.market || "",
          family: data.pool.coin?.family || "",
          algorithm: data.pool.coin?.algorithm || "",
          twitter: data.pool.coin?.twitter || "",
          telegram: data.pool.coin?.telegram || "",
          discord: data.pool.coin?.discord || "",
        },
        poolStats: {
          connectedMiners: data.pool.poolStats?.connectedMiners || 0,
          poolHashrate: data.pool.poolStats?.poolHashrate || 0,
          sharesPerSecond: data.pool.poolStats?.sharesPerSecond || 0,
        },
        poolFeePercent: data.pool.poolFeePercent || 0,
        totalPaid: data.pool.totalPaid || 0,
        totalBlocks: data.pool.totalBlocks || 0,
        totalConfirmedBlocks: data.pool.totalConfirmedBlocks || 0,
        totalPendingBlocks: data.pool.totalPendingBlocks || 0,
        blockReward: data.pool.blockReward || 0,
        lastPoolBlockTime: data.pool.lastPoolBlockTime || "",
        poolEffort: data.pool.poolEffort || 0,
        networkStats: {
          networkType: data.pool.networkStats?.networkType || "",
          networkHashrate: data.pool.networkStats?.networkHashrate || 0,
          networkDifficulty: data.pool.networkStats?.networkDifficulty || 0,
          nextNetworkTarget: data.pool.networkStats?.nextNetworkTarget || "",
          nextNetworkBits: data.pool.networkStats?.nextNetworkBits || "",
          lastNetworkBlockTime: data.pool.networkStats?.lastNetworkBlockTime || "",
          blockHeight: data.pool.networkStats?.blockHeight || 0,
          connectedPeers: data.pool.networkStats?.connectedPeers || 0,
          nodeVersion: data.pool.networkStats?.nodeVersion || "",
          rewardType: data.pool.networkStats?.rewardType || "",
        },
        topMiners: Array.isArray(data.pool.topMiners)
          ? data.pool.topMiners.map((miner: any) => ({
              address: miner.address || "",
              hashrate: miner.hashrate || 0,
            }))
          : [],
        address: data.pool.address || "",
        addressInfoLink: data.pool.addressInfoLink || "",
      },
      recentBlocks,
      error: undefined,
    };
  } catch (error) {
    console.error(`Error fetching pool details for ${id}:`, error);
    return {
      pool: undefined,
      recentBlocks: [],
      error: "Failed to load pool data. Please try again later.",
    };
  }
}

// Fetch pool-specific blocks
export async function fetchPoolBlocks(poolId: string): Promise<PoolBlock[]> {
  try {
    if (!poolId) {
      console.warn("Pool ID is required for fetchPoolBlocks");
      return [];
    }

    // Fetch pool data for poolName and coinType
    const poolResponse = await fetch(`https://scryptcrypt.com/api/pools/${poolId}`, {
      cache: "no-store",
    });
    if (!poolResponse.ok) {
      console.warn(`Failed to fetch pool ${poolId}: ${poolResponse.status}`);
      return [];
    }
    const poolData = await poolResponse.json();
    if (!poolData?.pool) {
      console.warn(`No pool data for ${poolId}`);
      return [];
    }

    // Fetch blocks
    const blocksResponse = await fetch(`https://scryptcrypt.com/api/pools/${poolId}/blocks`, {
      cache: "no-store",
    });
    if (!blocksResponse.ok) {
      console.warn(`Failed to fetch blocks for ${poolId}: ${blocksResponse.status}`);
      // Fallback to last block from pool data
      if (poolData.pool.lastPoolBlockTime && poolData.pool.blockReward) {
        return [
          {
            poolId,
            poolName: poolData.pool.coin?.name || poolId,
            coinType: poolData.pool.coin?.symbol || poolId.toUpperCase(),
            blockHeight: poolData.pool.networkStats?.blockHeight || 0,
            timestamp: poolData.pool.lastPoolBlockTime,
            reward: poolData.pool.blockReward || 0,
          },
        ];
      }
      return [];
    }

    const blocksData = await blocksResponse.json();
    if (!Array.isArray(blocksData)) {
      console.warn(`Expected array from /api/pools/${poolId}/blocks`);
      return [];
    }

    const poolBlocks: PoolBlock[] = blocksData.map((block: any) => ({
      poolId,
      poolName: poolData.pool.coin?.name || poolId,
      coinType: poolData.pool.coin?.symbol || poolId.toUpperCase(),
      blockHeight: block.height || block.blockHeight || poolData.pool.networkStats?.blockHeight || 0,
      timestamp: block.timestamp || poolData.pool.lastPoolBlockTime || new Date().toISOString(),
      reward: block.reward || poolData.pool.blockReward || 0,
    }));

    return poolBlocks.sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime());
  } catch (error) {
    console.error(`Error fetching blocks for ${poolId}:`, error);
    return [];
  }
}

// Fetch pool-specific top miners
export async function fetchTopMiners(poolId: string): Promise<TopMiner[]> {
  try {
    if (!poolId) {
      return [];
    }
    const response = await fetch(`https://scryptcrypt.com/api/pools/${poolId}`, {
      cache: "no-store",
    });
    if (!response.ok) {
      return [];
    }
    const data = await response.json();
    const topMiners = Array.isArray(data.pool?.topMiners)
      ? data.pool.topMiners.map((miner: any) => ({
          address: miner.address || "",
          hashrate: miner.hashrate || 0,
        }))
      : [];
    return topMiners.sort((a, b) => b.hashrate - a.hashrate);
  } catch (error) {
    console.error(`Error fetching top miners for ${poolId}:`, error);
    return [];
  }
}

// Fetch pool-specific payments (simulated)
export async function fetchPoolPayments(poolId: string): Promise<PoolPayment[]> {
  try {
    if (!poolId) {
      return [];
    }
    const response = await fetch(`https://scryptcrypt.com/api/pools/${poolId}`, {
      cache: "no-store",
    });
    if (!response.ok) {
      return [];
    }
    const data = await response.json();
    if (!data?.pool) {
      return [];
    }

    const totalPaid = data.pool.totalPaid || 0;
    const payments: PoolPayment[] = [];
    const now = new Date();
    const averagePayment = totalPaid > 0 ? totalPaid / 10 : 1;
    for (let i = 1; i <= 3; i++) {
      payments.push({
        walletAddress: `wallet-${poolId}-${i}`,
        amount: averagePayment * (0.8 + Math.random() * 0.4),
        timestamp: new Date(now.getTime() - i * 24 * 60 * 60 * 1000).toISOString(),
        txHash: `tx-${poolId}-${i}`,
      });
    }
    return payments;
  } catch (error) {
    console.error(`Error fetching payments for ${poolId}:`, error);
    return [];
  }
}

// Fetch pool-specific stats
export async function fetchStats(poolId: string): Promise<PoolStats> {
  try {
    if (!poolId) {
      return { connectedMiners: 0, poolHashrate: 0, sharesPerSecond: 0 };
    }
    const response = await fetch(`https://scryptcrypt.com/api/pools/${poolId}`, {
      cache: "no-store",
    });
    if (!response.ok) {
      return { connectedMiners: 0, poolHashrate: 0, sharesPerSecond: 0 };
    }
    const data = await response.json();
    return {
      connectedMiners: data.pool?.poolStats?.connectedMiners || 0,
      poolHashrate: data.pool?.poolStats?.poolHashrate || 0,
      sharesPerSecond: data.pool?.poolStats?.sharesPerSecond || 0,
    };
  } catch (error) {
    console.error(`Error fetching stats for ${poolId}:`, error);
    return { connectedMiners: 0, poolHashrate: 0, sharesPerSecond: 0 };
  }
}

// Fetch pool-specific historical stats (simulated)
export async function fetchHistoricalStats(poolId: string): Promise<HistoricalStat[]> {
  try {
    if (!poolId) {
      return [];
    }
    const response = await fetch(`https://scryptcrypt.com/api/pools/${poolId}`, {
      cache: "no-store",
    });
    if (!response.ok) {
      return [];
    }
    const data = await response.json();
    if (!data?.pool) {
      return [];
    }

    const stats: HistoricalStat[] = [];
    const now = new Date();
    const baseHashrate = data.pool.poolStats?.poolHashrate || 0;
    const baseMiners = data.pool.poolStats?.connectedMiners || 0;
    for (let i = 6; i >= 0; i--) {
      stats.push({
        timestamp: new Date(now.getTime() - i * 24 * 60 * 60 * 1000).toISOString(),
        poolHashrate: baseHashrate * (0.9 + Math.random() * 0.2),
        connectedMiners: Math.round(baseMiners * (0.9 + Math.random() * 0.2)),
      });
    }
    return stats;
  } catch (error) {
    console.error(`Error fetching historical stats for ${poolId}:`, error);
    return [];
  }
}

// Fetch miner stats for a wallet address (simulated)
export async function fetchMinerStats(walletAddress: string, poolId: string): Promise<MinerStats> {
  if (!walletAddress) {
    throw new Error("Wallet address is required");
  }
  if (!poolId) {
    throw new Error("Pool ID is required");
  }

  const walletRegex = /^[A-Za-z0-9]{26,35}$/;
  if (!walletRegex.test(walletAddress)) {
    throw new Error("Invalid wallet address format");
  }

  try {
    const response = await fetch(`https://scryptcrypt.com/api/pools/${poolId}`, {
      cache: "no-store",
    });
    if (!response.ok) {
      throw new Error(`Failed to fetch pool ${poolId}`);
    }
    const data = await response.json();
    if (!data?.pool) {
      throw new Error("No pool data");
    }

    const poolHashrate = data.pool.poolStats?.poolHashrate || 0;
    const networkHashrate = data.pool.networkStats?.networkHashrate || 1;
    const blockReward = data.pool.blockReward || 0;
    const totalPaid = data.pool.totalPaid || 0;
    const totalBlocks = data.pool.totalBlocks || 1;

    const walletContributionRatio = 0.01; // Simulate 1% contribution
    const walletHashrate = poolHashrate * walletContributionRatio;
    const poolSharesPerSecond = data.pool.poolStats?.sharesPerSecond || 0;
    const walletShares = poolSharesPerSecond * walletContributionRatio * 86400;
    const walletEarnings = (walletHashrate / networkHashrate) * blockReward * 144;

    const averagePayoutPerBlock = totalPaid / totalBlocks;
    const simulatedPayouts = [
      {
        timestamp: new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString(),
        amount: averagePayoutPerBlock * walletContributionRatio,
        txHash: `tx-${walletAddress}-1`,
      },
      {
        timestamp: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
        amount: averagePayoutPerBlock * walletContributionRatio,
        txHash: `tx-${walletAddress}-2`,
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
    console.error(`Error fetching miner stats for ${walletAddress} in pool ${poolId}:`, error);
    throw new Error("Failed to fetch miner stats");
  }
}

// Fetch FAQs (static)
export async function fetchFAQs(): Promise<FAQ[]> {
  return [
    {
      question: "What is ScryptCrypt?",
      answer: "ScryptCrypt is a mining pool for cryptocurrencies like CraftCoin, offering low fees and solo mining options.",
    },
    {
      question: "How do I start mining?",
      answer: "Configure your mining software with your wallet address and connect to our pool’s stratum server.",
    },
    {
      question: "What is the pool fee?",
      answer: "The pool fee varies by pool, typically 1%. Check pool details for specifics.",
    },
  ];
}

// Fetch support contact (static)
export async function fetchSupportContact(): Promise<SupportContact> {
  return {
    email: "support@scryptcrypt.com",
    telegram: "https://t.me/scryptcrypt",
    discord: "https://discord.gg/scryptcrypt",
  };
}