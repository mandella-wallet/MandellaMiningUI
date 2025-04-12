import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

type Contributor = {
  address: string;
  hashrate: number;
  shareRate: number;
};

type CoinTableProps = {
  coinName?: string;
  contributors?: Contributor[];
};

export function CoinTable({
  coinName = "Pool Coins",
  contributors = [],
}: CoinTableProps) {
  return (
    <Card className="shadow-lg">
      <CardHeader className="bg-yellow-500 text-white">
        <CardTitle>
          <i className="fas fa-users mr-2"></i> {coinName}
        </CardTitle>
        <p className="text-sm">Top 20 contributors</p>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow className="bg-gray-200">
              <TableHead className="font-bold">Address</TableHead>
              <TableHead className="font-bold">Hashrate</TableHead>
              <TableHead className="font-bold">Share Rate</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {contributors.length > 0 ? (
              contributors.map((contributor, index) => (
                <TableRow key={index} className="hover:bg-gray-50">
                  <TableCell>
                    {contributor.address.slice(0, 12)} … {contributor.address.slice(-12)}
                  </TableCell>
                  <TableCell>{formatValue(contributor.hashrate, 5, "H/s")}</TableCell>
                  <TableCell>{formatValue(contributor.shareRate, 5, "S/s")}</TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={3} className="text-center">
                  No miners connected
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}