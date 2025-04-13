// components/PoolBreadcrumb.jsx
import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function PoolBreadcrumb({ poolId, poolName = "Pool", currentPage }) {
  const pages = [
    { name: `${poolName} Home`, href: `/pools/${poolId}`, icon: "fa-tachometer-alt", key: "home" },
    { name: "Dashboard", href: `/pools/${poolId}/dashboard`, icon: "fa-tachometer-alt", key: "dashboard" },
    { name: "Stats", href: `/pools/${poolId}/stats`, icon: "fa-chart-line", key: "stats" },
    { name: "Connect", href: `/pools/${poolId}/connect`, icon: "fa-plug", key: "connect" },
    { name: "Miners", href: `/pools/${poolId}/miners`, icon: "fa-users", key: "miners" },
    { name: "Blocks", href: `/pools/${poolId}/blocks`, icon: "fa-cube", key: "blocks" },
    { name: "Payments", href: `/pools/${poolId}/payments`, icon: "fa-wallet", key: "payments" },
  ];

  return (
    <div className="flex flex-wrap justify-center gap-2 m-6 w-full">
      {pages.map((page) => {
        const isCurrent = currentPage === page.key;
        return (
          <Button
            key={page.key}
            asChild
            variant={isCurrent ? "default" : "outline"}
            className={
              isCurrent
                ? "bg-teal-600 text-gray-900 hover:bg-teal-500 cursor-default"
                : "border-teal-400 text-teal-400 hover:bg-teal-400 hover:text-gray-900"
            }
            disabled={isCurrent}
          >
            <Link
              href={page.href}
              className={isCurrent ? "pointer-events-none" : ""}
            >
              <i className={`fas ${page.icon} mr-2`}></i> {page.name}
            </Link>
          </Button>
        );
      })}
    </div>
  );
}