export type PoolCoin = {
    name: string;
    algorithm: string;
    miners: number;
    poolHashrate: string;
    fee: string;
    networkHashrate: string;
    networkDifficulty: string;
  };
  
  export const poolCoins: PoolCoin[] = [
    {
      name: "Bitcoin",
      algorithm: "SHA-256",
      miners: 120,
      poolHashrate: "150 TH/s",
      fee: "1%",
      networkHashrate: "200 EH/s",
      networkDifficulty: "70T",
    },
    {
      name: "Ethereum",
      algorithm: "Ethash",
      miners: 80,
      poolHashrate: "500 GH/s",
      fee: "0.5%",
      networkHashrate: "1.2 PH/s",
      networkDifficulty: "10T",
    },
    {
      name: "Litecoin",
      algorithm: "Scrypt",
      miners: 50,
      poolHashrate: "20 TH/s",
      fee: "0.8%",
      networkHashrate: "500 TH/s",
      networkDifficulty: "25M",
    },
  ];