"use client";

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  Cell,
} from "recharts";
import type { EngagementBreakdown as EngagementBreakdownData } from "@/viewmodels/useTrends";

interface EngagementBreakdownProps {
  data: EngagementBreakdownData[];
}

const COLORS = ["#85adff", "#6e9fff", "#5391ff", "#4175e6"];

export function EngagementBreakdown({ data }: EngagementBreakdownProps) {
  if (!data.length) {
    return (
      <div className="rounded-lg bg-card p-6 h-72 flex items-center justify-center">
        <p className="text-muted-foreground text-sm">
          No engagement data available
        </p>
      </div>
    );
  }

  const maxEngagement = Math.max(...data.map((d) => d.engagementRate));

  return (
    <div className="rounded-lg bg-card p-4">
      <h3 className="font-heading text-base font-semibold mb-6 text-on-surface">
        Top Engagement
      </h3>
      <div className="h-64">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data} layout="vertical" barSize={24} barGap={16}>
            <XAxis
              type="number"
              domain={[0, maxEngagement * 1.1]}
              tick={{ fontSize: 11, fill: "#a3aac4" }}
              axisLine={false}
              tickLine={false}
              tickFormatter={(v) => `${v.toFixed(1)}%`}
            />
            <YAxis
              type="category"
              dataKey="name"
              tick={{ fontSize: 11, fill: "#a3aac4" }}
              axisLine={false}
              tickLine={false}
              width={80}
            />
            <Tooltip
              contentStyle={{
                background: "#1e2b4a",
                border: "none",
                borderRadius: "8px",
                boxShadow: "0 10px 30px rgba(0,0,0,0.3)",
                color: "#dee5ff",
              }}
              formatter={(value) => [`${Number(value).toFixed(1)}%`, "Engagement"]}
              cursor={{ fill: "rgba(133, 173, 255, 0.1)" }}
            />
            <Bar
              dataKey="engagementRate"
              radius={[0, 4, 4, 0]}
            >
              {data.map((_, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={COLORS[index % COLORS.length]}
                />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
