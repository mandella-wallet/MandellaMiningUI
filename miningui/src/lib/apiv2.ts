
// Type definitions
export interface Coin {
  type: string;
  name: string;
  symbol: string;
  website: string;
  market: string;
  family: string;
  algorithm: string;
  twitter: string;
  telegram: string;
  discord: string;
}

export interface PoolStats {
  connectedMiners: number;
  poolHashrate: number;
  sharesPerSecond: number;
  networkHashrate?: number;
  networkDifficulty?: number;
  lastNetworkBlock?: number;
  blockHeight?: number;
  connectedWorkers?: number;
  lastPoolBlockTime?: string;
  blockReward?: number;
}

export interface Port {
  port: number;
  name: string;
  stratumUrl: string;
  minDiff: number;
  maxDiff: number;
}

export interface ConnectionDetails {
  ports: Port[];
}

export interface PaymentProcessing {
  payoutScheme: string;
  minimumPayment: number;
  interval?: number;
}

export interface PoolCoin {
  id: string;
  coin: Coin;
  address: string;
  poolStats: PoolStats;
  poolFeePercent: number;
  connectionDetails?: ConnectionDetails;
  paymentProcessing: PaymentProcessing;
}

export interface PoolBlock {
  poolId: string;
  poolName: string;
  coinType: string;
  blockHeight: number;
  timestamp: string;
  reward: number;
  confirmations?: number;
  effort?: number;
  minerAddress?: string;
}

export interface TopMiner {
  address: string;
  hashrate: number;
  sharesPerSecond?: number;
  worker?: string;
}

export interface PoolPayment {
  poolId: string;
  minerAddress: string;
  amount: number;
  timestamp: string;
  txHash: string;
  confirmed: boolean;
}

export interface MinerStats {
  address: string;
  hashrate: number;
  sharesPerSecond: number;
  workers: {
    name: string;
    hashrate: number;
    sharesPerSecond: number;
  }[];
  payments: {
    amount: number;
    timestamp: string;
    txHash: string;
  }[];
  pendingBalance: number;
  totalPaid: number;
}

export interface HistoricalStat {
  timestamp: string;
  hashrate: number;
  sharesPerSecond: number;
  connectedMiners: number;
}

export interface PoolDetails {
  pool?: PoolCoin;
  recentBlocks: PoolBlock[];
  error?: string;
}

// API Functions
const API_BASE = process.env.NEXT_PUBLIC_API_BASE_URL || 'https://scryptcrypt.com/api';

// Helper function for API calls
async function fetchApi<T>(endpoint: string, options: RequestInit = {}): Promise<T> {
  const response = await fetch(`${API_BASE}/${endpoint}`, {
    ...options,
    cache: "no-store",
  });

  if (!response.ok) {
    throw new Error(`API Error: ${response.status}`);
  }

  return response.json();
}

// Pools
export async function fetchPools(): Promise<PoolCoin[]> {
  try {
    const data = await fetchApi<{ pools: any[] }>("pools");
    return data.pools.map(transformPoolData);
  } catch (error) {
    console.error("Error fetching pools:", error);
    return [];
  }
}

export async function fetchPool(id: string): Promise<PoolCoin | null> {
  try {
    const data = await fetchApi<{ pool: any }>(`pools/${id}`);
    return transformPoolData(data.pool);
  } catch (error) {
    console.error(`Error fetching pool ${id}:`, error);
    return null;
  }
}

// Pool Details with Blocks
export async function fetchPoolDetails(id: string): Promise<PoolDetails> {
  try {
    const [poolData, blocksData] = await Promise.all([
      fetchApi<{ pool: any }>(`pools/${id}`),
      fetchApi<any[]>(`pools/${id}/blocks`).catch(() => [])
    ]);

    return {
      pool: transformPoolData(poolData.pool),
      recentBlocks: transformBlocksData(blocksData, id, poolData.pool),
    };
  } catch (error) {
    console.error(`Error fetching pool details ${id}:`, error);
    return {
      pool: undefined,
      recentBlocks: [],
      error: "Failed to load pool data",
    };
  }
}

// Blocks
export async function fetchPoolBlocks(poolId: string): Promise<PoolBlock[]> {
  try {
    const [poolData, blocksData] = await Promise.all([
      fetchApi<{ pool: any }>(`pools/${poolId}`),
      fetchApi<any[]>(`pools/${poolId}/blocks`)
    ]);

    return transformBlocksData(blocksData, poolId, poolData.pool);
  } catch (error) {
    console.error(`Error fetching blocks for ${poolId}:`, error);
    return [];
  }
}

// Miners
export async function fetchTopMiners(poolId: string): Promise<TopMiner[]> {
  try {
    const data = await fetchApi<{ pool: any }>(`pools/${poolId}`);
    return (data.pool.topMiners || []).map(transformMinerData);
  } catch (error) {
    console.error(`Error fetching top miners for ${poolId}:`, error);
    return [];
  }
}

export async function fetchMinerStats(walletAddress: string, poolId: string): Promise<MinerStats> {
  try {
    const data = await fetchApi<any>(`pools/${poolId}/miners/${walletAddress}`);
    return transformMinerStatsData(data);
  } catch (error) {
    console.error(`Error fetching miner stats:`, error);
    throw error;
  }
}

// Payments
export async function fetchPoolPayments(poolId: string): Promise<PoolPayment[]> {
  try {
    const data = await fetchApi<any[]>(`pools/${poolId}/payments`);
    return data.map(transformPaymentData);
  } catch (error) {
    console.error(`Error fetching payments for ${poolId}:`, error);
    return [];
  }
}

// Historical Stats
export async function fetchHistoricalStats(poolId: string): Promise<HistoricalStat[]> {
  try {
    const data = await fetchApi<any[]>(`pools/${poolId}/performance`);
    return data.map(transformHistoricalStatData);
  } catch (error) {
    console.error(`Error fetching historical stats for ${poolId}:`, error);
    return [];
  }
}

// Data Transformers
function transformPoolData(data: any): PoolCoin {
  const ports = data.ports
    ? Object.entries(data.ports).map(([port, details]: [string, any]) => ({
        port: Number(port),
        name: details.name || `Port ${port}`,
        stratumUrl: `stratum+tcp://${data.id}.scryptcrypt.com:${port}`,
        minDiff: details.varDiff?.minDiff || 0,
        maxDiff: details.varDiff?.maxDiff || 0,
      }))
    : [];

  return {
    id: data.id || "",
    coin: {
      type: data.coin?.type || data.id || "",
      name: data.coin?.name || data.id || "",
      symbol: data.coin?.symbol || data.id.toUpperCase() || "",
      website: data.coin?.website || "",
      market: data.coin?.market || "",
      family: data.coin?.family || "",
      algorithm: data.coin?.algorithm || "",
      twitter: data.coin?.twitter || "",
      telegram: data.coin?.telegram || "",
      discord: data.coin?.discord || "",
    },
    address: data.address || "",
    poolStats: {
      connectedMiners: data.poolStats?.connectedMiners || 0,
      poolHashrate: data.poolStats?.poolHashrate || 0,
      sharesPerSecond: data.poolStats?.sharesPerSecond || 0,
      networkHashrate: data.networkStats?.networkHashrate,
      networkDifficulty: data.networkStats?.networkDifficulty,
      lastNetworkBlock: data.networkStats?.lastNetworkBlock,
      blockHeight: data.networkStats?.blockHeight,
      connectedWorkers: data.poolStats?.connectedWorkers,
      lastPoolBlockTime: data.lastPoolBlockTime,
      blockReward: data.blockReward,
    },
    poolFeePercent: data.poolFeePercent || 0,
    connectionDetails: ports.length > 0 ? { ports } : undefined,
    paymentProcessing: {
      payoutScheme: data.paymentProcessing?.payoutScheme || "PPLNS",
      minimumPayment: data.paymentProcessing?.minimumPayment || 0,
      interval: data.paymentProcessing?.interval,
    },
  };
}

function transformBlocksData(blocks: any[], poolId: string, poolData: any): PoolBlock[] {
  return blocks.map(block => ({
    poolId,
    poolName: poolData.coin?.name || poolId,
    coinType: poolData.coin?.type || poolId,
    blockHeight: block.height || block.blockHeight || 0,
    timestamp: block.timestamp || new Date().toISOString(),
    reward: block.reward || 0,
    confirmations: block.confirmations,
    effort: block.effort,
    minerAddress: block.miner,
  }));
}

function transformMinerData(data: any): TopMiner {
  return {
    address: data.address || "",
    hashrate: data.hashrate || 0,
    sharesPerSecond: data.sharesPerSecond,
    worker: data.worker,
  };
}

function transformPaymentData(data: any): PoolPayment {
  return {
    poolId: data.poolId || "",
    minerAddress: data.address || "",
    amount: data.amount || 0,
    timestamp: data.timestamp || new Date().toISOString(),
    txHash: data.transactionConfirmationData || "",
    confirmed: data.confirmed || false,
  };
}

function transformMinerStatsData(data: any): MinerStats {
  return {
    address: data.address || "",
    hashrate: data.hashrate || 0,
    sharesPerSecond: data.sharesPerSecond || 0,
    workers: (data.workers || []).map((w: any) => ({
      name: w.name || "",
      hashrate: w.hashrate || 0,
      sharesPerSecond: w.sharesPerSecond || 0,
    })),
    payments: (data.payments || []).map((p: any) => ({
      amount: p.amount || 0,
      timestamp: p.timestamp || new Date().toISOString(),
      txHash: p.transactionConfirmationData || "",
    })),
    pendingBalance: data.pendingBalance || 0,
    totalPaid: data.totalPaid || 0,
  };
}

function transformHistoricalStatData(data: any): HistoricalStat {
  return {
    timestamp: data.timestamp || new Date().toISOString(),
    hashrate: data.hashrate || 0,
    sharesPerSecond: data.sharesPerSecond || 0,
    connectedMiners: data.connectedMiners || 0,
  };
}

// Utility Functions
export function formatHashrate(hashrate: number): string {
  const units = ['H/s', 'KH/s', 'MH/s', 'GH/s', 'TH/s', 'PH/s'];
  let unitIndex = 0;
  while (hashrate >= 1000 && unitIndex < units.length - 1) {
    hashrate /= 1000;
    unitIndex++;
  }
  return `${hashrate.toFixed(2)} ${units[unitIndex]}`;
}

export function formatValue(value: number, decimals: number = 8, symbol?: string): string {
  const formatted = value.toFixed(decimals);
  return symbol ? `${formatted} ${symbol}` : formatted;
}

