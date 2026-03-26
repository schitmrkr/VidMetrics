"use client";

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Area,
  AreaChart,
} from "recharts";
import type { TrendDataPoint } from "@/viewmodels/useTrends";

interface ViewsOverTimeProps {
  data: TrendDataPoint[];
}

export function ViewsOverTime({ data }: ViewsOverTimeProps) {
  if (!data.length) {
    return (
      <div className="rounded-2xl bg-card p-6 h-80 flex items-center justify-center">
        <p className="text-muted-foreground text-sm">No trend data available</p>
      </div>
    );
  }

  return (
    <div className="rounded-2xl bg-card p-2 min-w-[500px]">
      <h3 className="font-heading text-lg font-semibold mb-4">
        Views Over Time
      </h3>
      <div className="h-72 overflow-x-auto">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={data}>
            <defs>
              <linearGradient id="viewsGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#85adff" stopOpacity={0.3} />
                <stop offset="100%" stopColor="#85adff" stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid
              strokeDasharray="3 3"
              stroke="rgba(64, 72, 93, 0.15)"
            />
            <XAxis
              dataKey="date"
              tick={{ fontSize: 12, fill: "#a3aac4" }}
              axisLine={false}
              tickLine={false}
            />
            <YAxis
              tick={{ fontSize: 12, fill: "#a3aac4" }}
              axisLine={false}
              tickLine={false}
              tickFormatter={(v) =>
                v >= 1_000_000
                  ? `${(v / 1_000_000).toFixed(1)}M`
                  : v >= 1_000
                  ? `${(v / 1_000).toFixed(0)}K`
                  : v.toString()
              }
            />
            <Tooltip
              contentStyle={{
                background: "#192540",
                border: "none",
                borderRadius: "12px",
                boxShadow: "0 20px 40px rgba(0,0,0,0.4)",
                color: "#dee5ff",
              }}
              labelStyle={{ color: "#a3aac4" }}
            />
            <Area
              type="monotone"
              dataKey="views"
              stroke="#85adff"
              fill="url(#viewsGradient)"
              strokeWidth={2}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
