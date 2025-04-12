import Link from "next/link";
import { Separator } from "@/components/ui/separator";

export default function Footer() {
  return (
    <footer className="bg-solana-dark py-8">
      <div className="container mx-auto text-center">
        <p className="text-lg font-semibold mb-2 text-solana-teal">Mandella Mining Pool</p>
        <div className="flex justify-center gap-6 mb-4">
          <a
            href="https://pool.mandellawallet.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-solana-teal hover:text-solana-teal/80"
          >
            pool.mandellawallet.com
          </a>
          <a
            href="https://mandellawallet.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-solana-teal hover:text-solana-teal/80"
          >
            mandellawallet.com
          </a>
          <a
            href="https://x.com/mandellawallet"
            target="_blank"
            rel="noopener noreferrer"
            className="text-solana-teal hover:text-solana-teal/80"
          >
            x.com/mandellawallet
          </a>
        </div>
        <Separator className="bg-solana-gray my-4" />
        <p className="text-sm text-solana-gray">
          © {new Date().getFullYear()} Mandella Mining Pool - All rights reserved
        </p>
      </div>
    </footer>
  );
}