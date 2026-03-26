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

  const allDates = new Set<string>();
  const channelDataMap = new Map<string, Map<string, number>>();

  validChannels.forEach((channel) => {
    const videos = videosByChannel.get(channel.id) || [];
    const dateViews = new Map<string, number>();
    
    videos.forEach((video) => {
      const date = new Date(video.publishedAt).toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
      });
      dateViews.set(date, (dateViews.get(date) || 0) + video.viewCount);
      allDates.add(date);
    });
    
    channelDataMap.set(channel.id, dateViews);
  });

  const sortedDates = Array.from(allDates).sort((a, b) => {
    const dateA = new Date(a);
    const dateB = new Date(b);
    return dateA.getTime() - dateB.getTime();
  });

  const chartData: CompareViewsData[] = sortedDates.map((date) => {
    const entry: CompareViewsData = { date };
    validChannels.forEach((channel) => {
      const channelViews = channelDataMap.get(channel.id);
      entry[channel.id] = channelViews?.get(date) || 0;
    });
    return entry;
  });

  return (
    <div className="bg-surface-container-low/30 rounded-lg p-6 ring-1 ring-white/5">
      <h3 className="font-heading text-lg font-semibold mb-4 text-on-surface">
        Views Comparison
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
