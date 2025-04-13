"use client";

import { Button } from "@/components/ui/button";
import { Copy } from "lucide-react";
import { useState } from "react";

interface CopyableStratumUrlProps {
  name: string;
  url: string;
}

export default function CopyableStratumUrl({ name, url }: CopyableStratumUrlProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(url); // Changed from write(url) to writeText(url)
      setCopied(true);
      setTimeout(() => setCopied(false), 2000); // Reset after 2 seconds
    } catch (err) {
      console.error("Failed to copy:", err);
    }
  };

  return (
    <div className="flex items-center space-x-2">
      <div>
        <p className="font-medium text-solana-teal">{name}</p>
        <code className="font-mono text-sm text-solana-gray">{url}</code>
      </div>
      <Button
        variant="ghost"
        size="sm"
        className="text-solana-teal hover:text-solana-dark hover:bg-solana-teal"
        onClick={handleCopy}
        title={copied ? "Copied!" : "Copy URL"}
      >
        <Copy className="w-4 h-4" />
      </Button>
    </div>
  );
}