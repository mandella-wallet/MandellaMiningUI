// Types for PoolCoin (Homepage, Stats, and Pool Details)
export interface PoolCoin {
  id: string;
  coin: {
    name: string;
    type: string;
    algorithm: string;
  };
  poolStats: {
    connectedMiners: number;
    poolHashrate: number;
  };
  poolFeePercent: number;
  networkStats: {
    networkHashrate: number;
    networkDifficulty: number;
  };
  connectionDetails: {
    stratumUrl: string;
    port: number;
    backupStratumUrl?: string;
    backupPort?: number;
  };
}

// Types for PoolStats (Stats Page)
export interface PoolStats {
  totalHashrate: number;
  activeMiners: number;
  blocksMined: number;
}

// Types for Historical Stats (Stats Page)
export interface HistoricalStat {
  date: string;
  hashrate: number;
  miners: number;
  blocks: number;
}

// Types for Pool Details (/[id] Page)
export interface Block {
  blockHeight: number;
  timestamp: string;
  reward: number;
}

export interface Miner {
  address: string;
  hashrate: number;
}

export interface PoolDetails {
  pool: PoolCoin;
  recentBlocks: Block[];
  topMiners: Miner[];
}

// Types for Miner Dashboard (/dashboard Page)
export interface Payout {
  timestamp: string;
  amount: number;
  txHash: string;
}

export interface MinerStats {
  walletAddress: string; // Ensure this is present
  hashrate: number;
  shares: number;
  estimatedEarnings: number;
  payouts: { timestamp: string; amount: number; txHash: string }[];
}

// Types for Top Miners (/miners Page)
export interface TopMiner {
  address: string;
  totalHashrate: number;
  pools: { poolId: string; poolName: string; hashrate: number }[];
}

// Types for Pool Blocks Found (/blocks Page)
export interface PoolBlock {
  poolId: string;
  poolName: string;
  coinType: string;
  blockHeight: number;
  timestamp: string;
  reward: number;
}

// Types for Pool Payments (/payments Page)
export interface PoolPayment {
  poolId: string;
  poolName: string;
  coinType: string;
  minerAddress: string;
  timestamp: string;
  amount: number;
  txHash: string;
}

// Types for FAQ and Support (/faq Page)
export interface FAQ {
  question: string;
  answer: string;
}

export interface SupportContact {
  email: string;
  telegram: string;
  xProfile: string;
}

// Dummy Data for Pools (Homepage, Stats, and Pool Details)
export const dummyPools: PoolCoin[] = [
  {
    id: "1",
    coin: {
      name: "Bitcoin",
      type: "BTC",
      algorithm: "SHA-256",
    },
    poolStats: {
      connectedMiners: 120,
      poolHashrate: 1500,
    },
    poolFeePercent: 1.5,
    networkStats: {
      networkHashrate: 6000,
      networkDifficulty: 2500,
    },
    connectionDetails: {
      stratumUrl: "stratum+tcp://btc.mandellawallet.com",
      port: 3333,
      backupStratumUrl: "stratum+tcp://btc-backup.mandellawallet.com",
      backupPort: 3334,
    },
  },
  {
    id: "2",
    coin: {
      name: "Ethereum",
      type: "ETH",
      algorithm: "Ethash",
    },
    poolStats: {
      connectedMiners: 80,
      poolHashrate: 900,
    },
    poolFeePercent: 2.0,
    networkStats: {
      networkHashrate: 4000,
      networkDifficulty: 1800,
    },
    connectionDetails: {
      stratumUrl: "stratum+tcp://eth.mandellawallet.com",
      port: 4444,
      backupStratumUrl: "stratum+tcp://eth-backup.mandellawallet.com",
      backupPort: 4445,
    },
  },
  {
    id: "3",
    coin: {
      name: "Litecoin",
      type: "LTC",
      algorithm: "Scrypt",
    },
    poolStats: {
      connectedMiners: 50,
      poolHashrate: 600,
    },
    poolFeePercent: 1.8,
    networkStats: {
      networkHashrate: 3000,
      networkDifficulty: 1500,
    },
    connectionDetails: {
      stratumUrl: "stratum+tcp://ltc.mandellawallet.com",
      port: 5555,
      backupStratumUrl: "stratum+tcp://ltc-backup.mandellawallet.com",
      backupPort: 5556,
    },
  },
];

// Dummy Data for Overall Pool Stats (Stats Page)
export const dummyPoolStats: PoolStats = {
  totalHashrate: 3000,
  activeMiners: 250,
  blocksMined: 15,
};

// Dummy Data for Historical Stats (Stats Page)
export const dummyHistoricalStats: HistoricalStat[] = [
  { date: "2025-04-11", hashrate: 3000, miners: 250, blocks: 5 },
  { date: "2025-04-10", hashrate: 2800, miners: 240, blocks: 4 },
  { date: "2025-04-09", hashrate: 2600, miners: 230, blocks: 3 },
  { date: "2025-04-08", hashrate: 2500, miners: 220, blocks: 2 },
  { date: "2025-04-07", hashrate: 2400, miners: 210, blocks: 1 },
];

// Dummy Data for Pool Details (/[id] Page)
export const dummyPoolDetails: Record<string, PoolDetails> = {
  "1": {
    pool: dummyPools[0], // Bitcoin
    recentBlocks: [
      { blockHeight: 800001, timestamp: "2025-04-11 10:00:00", reward: 6.25 },
      { blockHeight: 800000, timestamp: "2025-04-11 09:30:00", reward: 6.25 },
      { blockHeight: 799999, timestamp: "2025-04-11 09:00:00", reward: 6.25 },
    ],
    topMiners: [
      { address: "1A1zP1eP5QGefi2DMPTfTL5SLmv7DivfNa", hashrate: 500 },
      { address: "1BoatSLRHtKNngkdXEeobR76b53LETtpyT", hashrate: 400 },
      { address: "1CounterpartyXXXXXXXXXXXXXXXUWLpVr", hashrate: 300 },
    ],
  },
  "2": {
    pool: dummyPools[1], // Ethereum
    recentBlocks: [
      { blockHeight: 18000001, timestamp: "2025-04-11 10:15:00", reward: 2.0 },
      { blockHeight: 18000000, timestamp: "2025-04-11 09:45:00", reward: 2.0 },
      { blockHeight: 17999999, timestamp: "2025-04-11 09:15:00", reward: 2.0 },
    ],
    topMiners: [
      { address: "1A1zP1eP5QGefi2DMPTfTL5SLmv7DivfNa", hashrate: 300 },
      { address: "0xabcdef1234567890abcdef1234567890abcdef12", hashrate: 250 },
      { address: "0x7890abcdef1234567890abcdef1234567890abcd", hashrate: 200 },
    ],
  },
  "3": {
    pool: dummyPools[2], // Litecoin
    recentBlocks: [
      { blockHeight: 2500001, timestamp: "2025-04-11 10:30:00", reward: 12.5 },
      { blockHeight: 2500000, timestamp: "2025-04-11 10:00:00", reward: 12.5 },
      { blockHeight: 2499999, timestamp: "2025-04-11 09:30:00", reward: 12.5 },
    ],
    topMiners: [
      { address: "1A1zP1eP5QGefi2DMPTfTL5SLmv7DivfNa", hashrate: 200 },
      { address: "LTC2xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx", hashrate: 150 },
      { address: "LTC3xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx", hashrate: 100 },
    ],
  },
};

// Dummy Data for Miner Dashboard (/dashboard Page)
export const dummyMinerStats: MinerStats = {
  walletAddress: "", // This will be overwritten by fetchMinerStats
  hashrate: 123456789, // 123.46 MH/s
  shares: 1500,
  estimatedEarnings: 0.0054321, // 0.0054321 BTC
  payouts: [
    {
      timestamp: "2023-10-01 12:00:00",
      amount: 0.0021,
      txHash: "f4184fc596403b9d638783cf57adfe4c75c605f6356fbc91338530e9831e9e",
    },
    {
      timestamp: "2023-10-02 14:30:00",
      amount: 0.0032,
      txHash: "e9e9831e98385f6356fbc91330e9831e9e4184fc596403b9d638783cf57adf",
    },
  ],
};

// Aggregate Top Miners for /miners Page
export const dummyTopMiners: TopMiner[] = (() => {
  const minerMap: Record<string, TopMiner> = {};

  Object.entries(dummyPoolDetails).forEach(([poolId, details]) => {
    const poolName = details.pool.coin.name;
    details.topMiners.forEach((miner) => {
      if (!minerMap[miner.address]) {
        minerMap[miner.address] = {
          address: miner.address,
          totalHashrate: 0,
          pools: [],
        };
      }
      minerMap[miner.address].totalHashrate += miner.hashrate;
      minerMap[miner.address].pools.push({
        poolId,
        poolName,
        hashrate: miner.hashrate,
      });
    });
  });

  const topMiners = Object.values(minerMap);
  topMiners.sort((a, b) => b.totalHashrate - a.totalHashrate);
  return topMiners;
})();

// Aggregate Pool Blocks for /blocks Page
export const dummyPoolBlocks: PoolBlock[] = (() => {
  const blocks: PoolBlock[] = [];

  Object.entries(dummyPoolDetails).forEach(([poolId, details]) => {
    const poolName = details.pool.coin.name;
    const coinType = details.pool.coin.type;
    details.recentBlocks.forEach((block) => {
      blocks.push({
        poolId,
        poolName,
        coinType,
        blockHeight: block.blockHeight,
        timestamp: block.timestamp,
        reward: block.reward,
      });
    });
  });

  blocks.sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime());
  return blocks;
})();

// Aggregate Pool Payments for /payments Page
export const dummyPoolPayments: PoolPayment[] = (() => {
  const payments: PoolPayment[] = [];

  // Bitcoin Pool Payments
  const btcMiners = dummyPoolDetails["1"].topMiners;
  btcMiners.forEach((miner, index) => {
    const amount = 0.01 - index * 0.002;
    payments.push({
      poolId: "1",
      poolName: "Bitcoin",
      coinType: "BTC",
      minerAddress: miner.address,
      timestamp: `2025-04-11 ${10 - index}:00:00`,
      amount,
      txHash: `tx-btc-${index}abcdef1234567890abcdef1234567890abcdef1234567890`,
    });
  });

  // Ethereum Pool Payments
  const ethMiners = dummyPoolDetails["2"].topMiners;
  ethMiners.forEach((miner, index) => {
    const amount = 0.005 - index * 0.001;
    payments.push({
      poolId: "2",
      poolName: "Ethereum",
      coinType: "ETH",
      minerAddress: miner.address,
      timestamp: `2025-04-11 ${10 - index}:15:00`,
      amount,
      txHash: `tx-eth-${index}abcdef1234567890abcdef1234567890abcdef1234567890`,
    });
  });

  // Litecoin Pool Payments
  const ltcMiners = dummyPoolDetails["3"].topMiners;
  ltcMiners.forEach((miner, index) => {
    const amount = 0.02 - index * 0.005;
    payments.push({
      poolId: "3",
      poolName: "Litecoin",
      coinType: "LTC",
      minerAddress: miner.address,
      timestamp: `2025-04-11 ${10 - index}:30:00`,
      amount,
      txHash: `tx-ltc-${index}abcdef1234567890abcdef1234567890abcdef1234567890`,
    });
  });

  payments.sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime());
  return payments;
})();

// Dummy Data for FAQ (/faq Page)
export const dummyFAQs: FAQ[] = [
  {
    question: "What is Mandella Mining Pool?",
    answer: "Mandella Mining Pool is a high-performance cryptocurrency mining pool supporting multiple coins like Bitcoin, Ethereum, and Litecoin, with low fees and a user-friendly interface.",
  },
  {
    question: "How do I start mining with Mandella?",
    answer: "Visit the <a href='/connect' class='text-solana-teal hover:underline'>Connect</a> page to get the stratum URL and port for your chosen pool, configure your mining software with your wallet address as the username, and start mining.",
  },
  {
    question: "What are the pool fees?",
    answer: "Fees vary by pool: Bitcoin (1.5%), Ethereum (2.0%), and Litecoin (1.8%). Check the homepage for the most up-to-date fee information.",
  },
  {
    question: "How often are payouts made?",
    answer: "Payouts are processed daily, provided your earnings meet the minimum threshold for your chosen coin (e.g., 0.001 BTC for Bitcoin). See the <a href='/payments' class='text-solana-teal hover:underline'>Payments</a> page for recent payouts.",
  },
  {
    question: "What should I do if I’m not seeing my hashrate on the dashboard?",
    answer: "Ensure your mining software is correctly configured with the stratum URL and port from the <a href='/connect' class='text-solana-teal hover:underline'>Connect</a> page, and that your wallet address is entered correctly. If the issue persists, contact support.",
  },
];

// Dummy Data for Support Contact (/faq Page)
export const dummySupportContact: SupportContact = {
  email: "support@mandellawallet.com",
  telegram: "https://t.me/mandellawallet",
  xProfile: "https://x.com/mandellawallet",
};