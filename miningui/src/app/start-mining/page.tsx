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
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { fetchPool, PoolCoin } from "@/lib/api";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import CoinImage from "@/components/CoinImage";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faRocket,
  faUserPlus,
  faCogs,
  faServer,
  faChartLine,
  faStar,
  faLaptop,
  faBolt,
  faClock,
  faPlug,
  faCheck,
  faGear,
  faArrowRight,
} from "@fortawesome/free-solid-svg-icons";

// Next.js metadata for SEO
export const metadata = {
  title: "Rent Mining Power - Start Cloud Mining with Mandella",
  description:
    "Rent mining power and start earning CraftCoin, FairBrix, or BBQCoin instantly with Mandella. No hardware required, instant setup, and flexible rentals.",
  keywords:
    "rent mining power, cloud mining, crypto mining no hardware, Scrypt mining, CraftCoin mining, FairBrix mining, BBQCoin mining, start mining crypto",
};

// Static pool configurations
const staticPools = [
  {
    id: "craftcoin",
    name: "CraftCoin",
    symbol: "CRC",
    type: "SOLO",
    stratumUrl: "stratum+tcp://Mandella.com:3031",
    portName: "Solo Regular Port",
  },
  {
    id: "craftcoin-pplns",
    name: "CraftCoin",
    symbol: "CRC",
    type: "PPLNS",
    stratumUrl: "stratum+tcp://Mandella.com:3033",
    portName: "Regular Port",
  },
  {
    id: "fairbrix",
    name: "FairBrix",
    symbol: "FBX",
    type: "SOLO",
    stratumUrl: "stratum+tcp://Mandella.com:4031",
    portName: "Solo Regular Port",
  },
  {
    id: "fairbrix-pplns",
    name: "FairBrix",
    symbol: "FBX",
    type: "PPLNS",
    stratumUrl: "stratum+tcp://Mandella.com:4033",
    portName: "Regular Port",
  },
  {
    id: "bbqcoin",
    name: "BBQCoin",
    symbol: "BQC",
    type: "SOLO",
    stratumUrl: "stratum+tcp://Mandella.com:5031",
    portName: "Solo Regular Port",
  },
  {
    id: "bbqcoin-pplns",
    name: "BBQCoin",
    symbol: "BQC",
    type: "PPLNS",
    stratumUrl: "stratum+tcp://Mandella.com:5033",
    portName: "Regular Port",
  },
];

export default async function StartMiningPage() {
  // Fetch pool data
  const poolIds = ["craftcoin", "craftcoin-pplns", "fairbrix", "fairbrix-pplns", "bbqcoin", "bbqcoin-pplns"];
  const pools: (PoolCoin | null)[] = await Promise.all(
    poolIds.map(async (id) => {
      try {
        return await fetchPool(id);
      } catch {
        return null;
      }
    })
  );

  // Merge static and dynamic data
  const poolData = staticPools.map((staticPool) => {
    const pool = pools.find((p) => p?.id === staticPool.id);
    return {
      ...staticPool,
      displayName:
        pool?.coin.name && staticPool.type === "PPLNS"
          ? `${pool.coin.name} (PPLNS)`
          : pool?.coin.name || staticPool.name,
      coinImage: pool?.coin.symbol?.toLowerCase() || staticPool.id.toLowerCase(),
    };
  });

  return (
    <div className="min-h-screen bg-solana-dark text-white">
      <Header />

      <section className="container mx-auto py-16">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold text-solana-teal flex items-center justify-center">
            <FontAwesomeIcon icon={faRocket} className="mr-2 w-8 h-8" />
            Rent Mining Power
          </h1>
          <p className="text-xl text-solana-gray mt-4 max-w-2xl mx-auto">
            Start cloud mining CraftCoin, FairBrix, or BBQCoin instantly with Mandella. No hardware, no hassle—just profits. Join the easiest way to mine crypto today!
          </p>
          <Button
            size="lg"
            className="mt-6 bg-solana-teal hover:bg-solana-teal/80 text-solana-dark flex items-center"
            asChild
          >
            <Link href="https://www.miningrigrentals.com/register?ref=your-id">
              Start Mining Now <FontAwesomeIcon icon={faArrowRight} className="ml-2 w-4 h-4" />
            </Link>
          </Button>
        </div>

        {/* Benefits */}
        <Card className="shadow-glow border-none bg-solana-dark/80 mb-12">
          <CardHeader className="bg-solana-purple text-solana-dark">
            <CardTitle className="text-2xl flex items-center">
              <FontAwesomeIcon icon={faStar} className="mr-2 w-6 h-6" />
              Why Choose Cloud Mining with Mandella?
            </CardTitle>
          </CardHeader>
          <CardContent className="pt-6">
            <p className="text-solana-gray mb-6">
              Discover the simplest way to mine cryptocurrency without buying expensive hardware. Our cloud mining service lets you rent Scrypt mining power and earn rewards instantly.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <div>
                <h3 className="text-lg font-semibold text-solana-teal flex items-center">
                  <FontAwesomeIcon icon={faLaptop} className="mr-2 w-5 h-5" />
                  No Hardware Needed
                </h3>
                <p className="text-solana-gray">
                  Avoid costly hardware purchases and complex setups. Rent mining power and start earning today.
                </p>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-solana-teal flex items-center">
                  <FontAwesomeIcon icon={faBolt} className="mr-2 w-5 h-5" />
                  Instant Mining Setup
                </h3>
                <p className="text-solana-gray">
                  Launch your mining operation in minutes with our seamless rental process.
                </p>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-solana-teal flex items-center">
                  <FontAwesomeIcon icon={faClock} className="mr-2 w-5 h-5" />
                  Flexible Rental Plans
                </h3>
                <p className="text-solana-gray">
                  Choose rental durations that suit you—hours, days, or more. Total control, zero commitments.
                </p>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-solana-teal flex items-center">
                  <FontAwesomeIcon icon={faPlug} className="mr-2 w-5 h-5" />
                  Zero Electricity Costs
                </h3>
                <p className="text-solana-gray">
                  Forget power bills. All energy costs are included in your rental package.
                </p>
              </div>
            </div>
            <div className="text-center mt-8">
              <Button
                className="bg-solana-teal hover:bg-solana-teal/80 text-solana-dark flex items-center"
                asChild
              >
                <Link href="https://www.miningrigrentals.com/register?ref=your-id">
                  Get Started Now <FontAwesomeIcon icon={faArrowRight} className="ml-2 w-4 h-4" />
                </Link>
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Getting Started Guide */}
        <Card className="shadow-glow border-none bg-solana-dark/80">
          <CardHeader className="bg-solana-purple text-solana-dark">
            <CardTitle className="text-2xl flex items-center">
              <FontAwesomeIcon icon={faRocket} className="mr-2 w-6 h-6" />
              How to Start Cloud Mining Today
            </CardTitle>
          </CardHeader>
          <CardContent className="pt-6">
            <p className="text-solana-gray mb-6">
              Follow our simple 4-step guide to rent mining power and mine CraftCoin, FairBrix, or BBQCoin without hardware. Start earning crypto rewards in no time!
            </p>
            <div className="space-y-8">
              {/* Step 1: Create Your Account */}
              <div>
                <h2 className="text-xl font-semibold text-solana-teal flex items-center">
                  <FontAwesomeIcon icon={faUserPlus} className="mr-2 w-5 h-5" />
                  1. Create Your Account
                </h2>
                <Separator className="my-2 bg-solana-gray" />
                <p className="text-solana-gray mb-4">
                  Sign up with Mining Rig Rentals to access powerful Scrypt miners. It’s quick, secure, and your first step to cloud mining success.
                </p>
                <Button
                  className="bg-solana-teal hover:bg-solana-teal/80 text-solana-dark flex items-center"
                  asChild
                >
                  <Link href="https://www.miningrigrentals.com/register?ref=your-id">
                    Sign Up Now <FontAwesomeIcon icon={faArrowRight} className="ml-2 w-4 h-4" />
                  </Link>
                </Button>
              </div>

              {/* Step 2: Choose Your Rig */}
              <div>
                <h2 className="text-xl font-semibold text-solana-teal flex items-center">
                  <FontAwesomeIcon icon={faCogs} className="mr-2 w-5 h-5" />
                  2. Choose Your Mining Rig
                </h2>
                <Separator className="my-2 bg-solana-gray" />
                <p className="text-solana-gray mb-4">
                  Browse our selection of Scrypt mining rigs tailored to your budget and goals. Pick the perfect rig to mine your favorite cryptocurrencies.
                </p>
                <ul className="list-none space-y-2 text-solana-gray">
                  <li className="flex items-center">
                    <FontAwesomeIcon icon={faCheck} className="text-solana-teal mr-2 w-4 h-4" />
                    Compare hashrates for maximum efficiency
                  </li>
                  <li className="flex items-center">
                    <FontAwesomeIcon icon={faCheck} className="text-solana-teal mr-2 w-4 h-4" />
                    Review rental prices to fit your budget
                  </li>
                  <li className="flex items-center">
                    <FontAwesomeIcon icon={faCheck} className="text-solana-teal mr-2 w-4 h-4" />
                    Check rig ratings for reliability
                  </li>
                </ul>
              </div>

              {/* Step 3: Configure Pool Settings */}
              <div>
                <h2 className="text-xl font-semibold text-solana-teal flex items-center">
                  <FontAwesomeIcon icon={faServer} className="mr-2 w-5 h-5" />
                  3. Connect to a Mining Pool
                </h2>
                <Separator className="my-2 bg-solana-gray" />
                <p className="text-solana-gray mb-4">
                  Select from our trusted Scrypt mining pools, including CraftCoin, FairBrix, and BBQCoin, to optimize your earnings.
                </p>
                <Table>
                  <TableHeader>
                    <TableRow className="bg-solana-teal text-solana-dark">
                      <TableHead>Pool</TableHead>
                      <TableHead>Symbol</TableHead>
                      <TableHead>Stratum URL</TableHead>
                      <TableHead>Port Type</TableHead>
                      <TableHead>Settings</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {poolData.map((pool) => (
                      <TableRow
                        key={`${pool.id}-${pool.type}`}
                        className="hover:bg-solana-teal/10"
                      >
                        <TableCell>
                          <div className="flex items-center">
                            <CoinImage
                              src={`/coins/${pool.coinImage}.png`}
                              alt={`${pool.displayName} cryptocurrency logo`}
                              className="w-6 h-6 mr-2"
                            />
                            <span>{pool.displayName}</span>
                          </div>
                        </TableCell>
                        <TableCell>{pool.symbol}</TableCell>
                        <TableCell className="font-mono text-sm">
                          {pool.stratumUrl}
                        </TableCell>
                        <TableCell>{pool.portName}</TableCell>
                        <TableCell>
                          <Button
                            asChild
                            variant="link"
                            className="text-solana-teal hover:text-solana-teal/80 flex items-center"
                          >
                            <Link href={`/pools/${pool.id}/connect`}>
                              <FontAwesomeIcon icon={faGear} className="mr-1 w-4 h-4" />
                              View Settings
                            </Link>
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
                <div className="text-center mt-4">
                  <Button
                    variant="outline"
                    className="border-solana-teal text-solana-teal hover:bg-solana-teal hover:text-solana-dark flex items-center"
                    asChild
                  >
                    <Link href="/pools">
                      Explore All Pools <FontAwesomeIcon icon={faArrowRight} className="ml-2 w-4 h-4" />
                    </Link>
                  </Button>
                </div>
              </div>

              {/* Step 4: Start Mining */}
              <div>
                <h2 className="text-xl font-semibold text-solana-teal flex items-center">
                  <FontAwesomeIcon icon={faChartLine} className="mr-2 w-5 h-5" />
                  4. Launch and Monitor Earnings
                </h2>
                <Separator className="my-2 bg-solana-gray" />
                <p className="text-solana-gray mb-4">
                  Activate your rental and track your crypto earnings in real-time with our intuitive dashboard. Watch your rewards grow!
                </p>
                <ul className="list-none space-y-2 text-solana-gray">
                  <li className="flex items-center">
                    <FontAwesomeIcon icon={faCheck} className="text-solana-teal mr-2 w-4 h-4" />
                    Monitor live hashrate performance
                  </li>
                  <li className="flex items-center">
                    <FontAwesomeIcon icon={faCheck} className="text-solana-teal mr-2 w-4 h-4" />
                    Track your crypto earnings
                  </li>
                  <li className="flex items-center">
                    <FontAwesomeIcon icon={faCheck} className="text-solana-teal mr-2 w-4 h-4" />
                    Access detailed pool statistics
                  </li>
                </ul>
                <Button
                  className="mt-4 bg-solana-teal hover:bg-solana-teal/80 text-solana-dark flex items-center"
                  asChild
                >
                  <Link href="/dashboard">
                    Monitor Earnings <FontAwesomeIcon icon={faArrowRight} className="ml-2 w-4 h-4" />
                  </Link>
                </Button>
              </div>
            </div>
            <div className="text-center mt-8">
              <p className="text-solana-gray mb-4">
                Ready to mine crypto without hardware? Join Mandella now and start earning!
              </p>
              <Button
                size="lg"
                className="bg-solana-teal hover:bg-solana-teal/80 text-solana-dark flex items-center"
                asChild
              >
                <Link href="https://www.miningrigrentals.com/register?ref=your-id">
                  Join Now <FontAwesomeIcon icon={faArrowRight} className="ml-2 w-4 h-4" />
                </Link>
              </Button>
            </div>
          </CardContent>
        </Card>
      </section>

      <Footer />
    </div>
  );
}