"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Loader2 } from "lucide-react";

interface WalletFormProps {
  onSubmit: (walletAddress: string) => void;
}

export default function WalletForm({ onSubmit }: WalletFormProps) {
  const [walletAddress, setWalletAddress] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setIsLoading(true);

    // Basic client-side validation
    if (!walletAddress) {
      setError("Wallet address is required");
      setIsLoading(false);
      return;
    }

    const walletRegex = /^[A-Za-z0-9]{26,35}$/;
    if (!walletRegex.test(walletAddress)) {
      setError("Invalid wallet address format (must be 26-35 alphanumeric characters)");
      setIsLoading(false);
      return;
    }

    try {
      await onSubmit(walletAddress);
    } catch (err: any) {
      setError(err.message || "Failed to fetch miner stats");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto">
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <Label htmlFor="walletAddress" className="text-solana-gray">
            Miner Wallet Address
          </Label>
          <Input
            id="walletAddress"
            placeholder="Enter your wallet address (e.g., 1A1zP1eP5QGefi2DMPTfTL5SLmv7DivfNa)"
            value={walletAddress}
            onChange={(e) => setWalletAddress(e.target.value)}
            className="bg-solana-dark border-solana-gray text-white placeholder-solana-gray"
            disabled={isLoading}
          />
        </div>
        {error && (
          <Alert variant="destructive" className="bg-solana-pink/20 border-solana-pink">
            <AlertTitle className="text-solana-pink">Error</AlertTitle>
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}
        <Button
          type="submit"
          className="w-full bg-solana-teal hover:bg-solana-teal/80 text-solana-dark"
          disabled={isLoading}
        >
          {isLoading ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Submitting...
            </>
          ) : (
            "Submit"
          )}
        </Button>
      </form>
    </div>
  );
}