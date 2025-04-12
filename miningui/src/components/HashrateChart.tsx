"use client"; // Mark as Client Component

import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from "recharts";
import { HistoricalStat } from "@/lib/api";

interface HashrateChartProps {
  data: HistoricalStat[];
}

export default function HashrateChart({ data }: HashrateChartProps) {
  return (
    <LineChart width={800} height={400} data={data} className="mx-auto">
      <CartesianGrid strokeDasharray="3 3" stroke="#D1D5DB" />
      <XAxis dataKey="date" stroke="#D1D5DB" />
      <YAxis stroke="#D1D5DB" />
      <Tooltip
        contentStyle={{ backgroundColor: "#0F172A", borderColor: "#14F195", color: "#FFFFFF" }}
      />
      <Legend />
      <Line type="monotone" dataKey="hashrate" stroke="#14F195" name="Hashrate (H/s)" />
    </LineChart>
  );
}