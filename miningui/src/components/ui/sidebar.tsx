import Link from "next/link";
import { formatValue } from "@/lib/api";

type SidebarProps = {
  poolId: string;
  coinName: string;
  coinType: string;
};

export function Sidebar({ poolId, coinName, coinType }: SidebarProps) {
  return (
    <aside className="fixed top-0 left-0 h-full w-64 bg-purple-700 text-white shadow-lg">
      <div className="p-4">
        <div className="logo flex items-center mb-6">
          <img
            src={`/img/coin/icon/${coinType.toLowerCase()}.png`}
            alt={`${coinType} logo`}
            className="w-10 h-10 mr-2"
            onError={(e) => (e.currentTarget.src = "/img/coin/icon/default.png")}
          />
          <span className="text-xl font-bold">{coinName}</span>
        </div>
        <ul className="space-y-2">
          <li>
            <Link href="/" className="flex items-center p-2 hover:bg-purple-600 rounded">
              <i className="fas fa-home mr-2"></i>
              <span>Home</span>
            </Link>
          </li>
          <li>
            <Link href={`/${poolId}/stats`} className="flex items-center p-2 hover:bg-purple-600 rounded">
              <i className="fas fa-chart-line mr-2"></i>
              <span>Stats</span>
            </Link>
          </li>
          <li>
            <Link href={`/${poolId}/dashboard`} className="flex items-center p-2 hover:bg-purple-600 rounded">
              <i className="fas fa-tachometer-alt mr-2"></i>
              <span>Dashboard</span>
            </Link>
          </li>
          <li>
            <Link href={`/${poolId}/miners`} className="flex items-center p-2 hover:bg-purple-600 rounded">
              <i className="fas fa-users mr-2"></i>
              <span>Miners</span>
            </Link>
          </li>
          <li>
            <Link href={`/${poolId}/blocks`} className="flex items-center p-2 hover:bg-purple-600 rounded">
              <i className="fas fa-cubes mr-2"></i>
              <span>Blocks</span>
            </Link>
          </li>
          <li>
            <Link href={`/${poolId}/payments`} className="flex items-center p-2 hover:bg-purple-600 rounded">
              <i className="fas fa-wallet mr-2"></i>
              <span>Payments</span>
            </Link>
          </li>
          <li>
            <Link href={`/${poolId}/connect`} className="flex items-center p-2 hover:bg-purple-600 rounded">
              <i className="fas fa-plug mr-2"></i>
              <span>Connect</span>
            </Link>
          </li>
          <li>
            <Link href={`/${poolId}/faq`} className="flex items-center p-2 hover:bg-purple-600 rounded">
              <i className="fas fa-comment-dots mr-2"></i>
              <span>FAQ</span>
            </Link>
          </li>
          <li>
            <Link href={`/${poolId}/support`} className="flex items-center p-2 hover:bg-purple-600 rounded">
              <i className="ti-headphone-alt mr-2"></i>
              <span>Support</span>
            </Link>
          </li>
        </ul>
      </div>
    </aside>
  );
}