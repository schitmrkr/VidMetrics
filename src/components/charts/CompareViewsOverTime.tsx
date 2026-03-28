"use client";

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";
import type { Channel } from "@/models/types/channel";

interface CompareViewsData {
  date: string;
  [key: string]: string | number;
}

interface CompareViewsProps {
  channels: Channel[];
  videosByChannel: Map<string, { publishedAt: string; viewCount: number }[]>;
}

const COLORS = ["#85adff", "#6df5e1", "#ff725e", "#ffd166", "#06d6a0"];

function formatNumber(num: number): string {
  if (num >= 1_000_000) return `${(num / 1_000_000).toFixed(1)}M`;
  if (num >= 1_000) return `${(num / 1_000).toFixed(0)}K`;
  return num.toString();
}

export function CompareViewsOverTime({ channels, videosByChannel }: CompareViewsProps) {
  const validChannels = channels.filter(Boolean);
  
  if (validChannels.length === 0 || videosByChannel.size === 0) {
    return (
      <div className="bg-surface-container-low/30 rounded-lg p-6 h-80 flex items-center justify-center">
        <p className="text-on-surface-variant text-sm">No comparison data available</p>
      </div>
    );
  }

  const allMonths = new Set<string>();
  const channelDataMap = new Map<string, Map<string, number>>();

  validChannels.forEach((channel) => {
    const videos = videosByChannel.get(channel.id) || [];
    const monthViews = new Map<string, number>();
    
    videos.forEach((video) => {
      const date = new Date(video.publishedAt);
      const monthKey = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}`;
      const monthLabel = date.toLocaleDateString("en-US", {
        month: "short",
        year: "2-digit",
      });
      const currentViews = monthViews.get(monthLabel) || 0;
      monthViews.set(monthLabel, currentViews + video.viewCount);
      allMonths.add(monthKey + "|" + monthLabel);
    });
    
    channelDataMap.set(channel.id, monthViews);
  });

  const sortedMonths = Array.from(allMonths)
    .sort((a, b) => {
      const [dateA] = a.split("|");
      const [dateB] = b.split("|");
      return dateA.localeCompare(dateB);
    })
    .map((m) => m.split("|")[1]);

  const chartData: CompareViewsData[] = sortedMonths.map((month) => {
    const entry: CompareViewsData = { date: month };
    validChannels.forEach((channel) => {
      const channelViews = channelDataMap.get(channel.id);
      entry[channel.id] = channelViews?.get(month) || 0;
    });
    return entry;
  });

  return (
    <div className="bg-surface-container-low/30 rounded-lg p-6 ring-1 ring-white/5">
      <h3 className="font-heading text-lg font-semibold mb-4 text-on-surface">
        Views Comparison (Last 6 Months)
      </h3>
      <div className="h-80">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={chartData}>
            <CartesianGrid
              strokeDasharray="3 3"
              stroke="rgba(64, 72, 93, 0.15)"
            />
            <XAxis
              dataKey="date"
              tick={{ fontSize: 11, fill: "#a3aac4" }}
              axisLine={false}
              tickLine={false}
            />
            <YAxis
              tick={{ fontSize: 11, fill: "#a3aac4" }}
              axisLine={false}
              tickLine={false}
              tickFormatter={(v) => formatNumber(v)}
            />
            <Tooltip
              contentStyle={{
                background: "#1e2b4a",
                border: "none",
                borderRadius: "8px",
                boxShadow: "0 10px 30px rgba(0,0,0,0.3)",
                color: "#dee5ff",
              }}
              labelStyle={{ color: "#a3aac4" }}
              formatter={(value, name) => {
                const channel = validChannels.find((c) => c.id === name);
                return [formatNumber(Number(value)), channel?.title.slice(0, 20) || String(name)];
              }}
            />
            <Legend
              wrapperStyle={{ paddingTop: "20px" }}
              formatter={(value) => {
                const channel = validChannels.find((c) => c.id === value);
                return (
                  <span style={{ color: "#a3aac4", fontSize: "12px" }}>
                    {channel?.title.slice(0, 20) || value}
                  </span>
                );
              }}
            />
            {validChannels.map((channel, index) => (
              <Line
                key={channel.id}
                type="monotone"
                dataKey={channel.id}
                stroke={COLORS[index % COLORS.length]}
                strokeWidth={2}
                dot={false}
                activeDot={{ r: 4, strokeWidth: 0 }}
              />
            ))}
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
