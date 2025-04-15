import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ChevronDown } from "lucide-react";

export default function Header() {
  return (
    <header className="sticky top-0 z-50 bg-solana-dark shadow-lg border-b border-solana-teal/20">
      <nav className="container mx-auto flex items-center justify-between py-3 px-4">
        <Link href="/" className="flex items-center space-x-2">
          <Avatar>
            <AvatarImage src="/img/logo.png" alt="Mandella Mining Pool" />
            <AvatarFallback>MM</AvatarFallback>
          </Avatar>
          <span className="text-xl font-bold text-solana-teal">Mandella Mining Pool</span>
        </Link>
        <div className="flex items-center space-x-4">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="text-solana-gray hover:bg-solana-purple/20">
                Menu <ChevronDown className="ml-2 h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-48 bg-solana-dark border-solana-purple text-white">
              <DropdownMenuItem asChild>
                <a href="https://mandellawallet.com" target="_blank" rel="noopener noreferrer">
                  Wallet
                </a>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link href="/available-pools">Available Pools</Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link href="/about-us">About Us</Link>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
          <Button
            variant="outline"
            className="border-solana-teal text-solana-teal hover:bg-solana-teal hover:text-solana-dark"
            asChild
          >
            <Link href="/faq">FAQ & Support</Link>
          </Button>
        </div>
      </nav>
    </header>
  );
}