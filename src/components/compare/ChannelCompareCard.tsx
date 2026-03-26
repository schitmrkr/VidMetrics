import Image from "next/image";
import { Users, Eye, Video, TrendingUp } from "lucide-react";
import type { Channel } from "@/models/types/channel";

interface ChannelCompareCardProps {
  channel: Channel;
  index: number;
}

function formatNumber(num: number): string {
  if (num >= 1_000_000_000) return `${(num / 1_000_000_000).toFixed(1)}B`;
  if (num >= 1_000_000) return `${(num / 1_000_000).toFixed(1)}M`;
  if (num >= 1_000) return `${(num / 1_000).toFixed(1)}K`;
  return num.toString();
}

const ACCENT_COLORS = [
  "text-chart-1",
  "text-chart-2",
  "text-chart-3",
  "text-chart-4",
  "text-chart-5",
];

export function ChannelCompareCard({ channel, index }: ChannelCompareCardProps) {
  const accentColor = ACCENT_COLORS[index % ACCENT_COLORS.length];

  return (
    <div className="group relative overflow-hidden rounded-lg bg-surface-container-high p-6 transition-all duration-500 hover:bg-surface-bright hover:-translate-y-1 hover:shadow-2xl hover:shadow-primary/5">
      {/* Background Decorative Element */}
      <div className={`absolute -right-8 -top-8 h-32 w-32 rounded-full blur-[60px] opacity-10 transition-opacity group-hover:opacity-20 ${accentColor.replace('text-', 'bg-')}`} />

      <div className="relative z-10 space-y-8">
        {/* Channel Identity */}
        <div className="flex items-center gap-4">
          <div className="relative h-12 w-12 overflow-hidden rounded-2xl ring-2 ring-white/10 group-hover:ring-white/20 transition-all shadow-lg">
            <Image
              src={channel.thumbnailUrl}
              alt={channel.title}
              fill
              className="object-cover"
            />
          </div>
          <div className="min-w-0 flex-1">
            <h3 className="font-headline text-lg font-bold truncate text-on-surface leading-snug">
              {channel.title}
            </h3>
            {channel.customUrl && (
              <p className="text-xs font-semibold text-on-surface-variant/60 tracking-wider uppercase truncate">
                {channel.customUrl}
              </p>
            )}
          </div>
        </div>

        {/* Intelligence Grid: Asymmetrical Layout */}
        <div className="grid grid-cols-2 gap-x-4 gap-y-6 pt-2">
          {/* Main Metric Focus: Subscribers */}
          <div className="col-span-1">
             <p className="text-[10px] font-black uppercase tracking-[0.2em] text-on-surface-variant/50 mb-1">Impact</p>
             <div className="flex items-center gap-2 mb-1">
                <Users className={`h-3 w-3 ${accentColor}`} />
                <span className="font-headline text-2xl font-black text-on-surface tracking-tighter">
                  {formatNumber(channel.subscriberCount)}
                </span>
             </div>
             <p className="text-[9px] font-bold text-on-surface-variant/40 uppercase">Subscribers</p>
          </div>

          {/* Secondary Metric: Total Views */}
          <div className="col-span-1 text-right">
             <p className="text-[10px] font-black uppercase tracking-[0.2em] text-on-surface-variant/50 mb-1">Reach</p>
             <div className="flex items-center justify-end gap-2 mb-1">
                <Eye className="h-3 w-3 text-secondary" />
                <span className="font-headline text-xl font-bold text-on-surface tracking-tight">
                  {formatNumber(channel.viewCount)}
                </span>
             </div>
             <p className="text-[9px] font-bold text-on-surface-variant/40 uppercase">Total Views</p>
          </div>

          {/* Efficiency Metric: Views/Video */}
          <div className="col-span-1">
             <p className="text-[10px] font-black uppercase tracking-[0.2em] text-on-surface-variant/50 mb-1">Velocity</p>
             <div className="flex items-center gap-2 mb-1">
                <TrendingUp className="h-3 w-3 text-tertiary" />
                <span className="font-headline text-lg font-bold text-on-surface tracking-tight">
                  {channel.videoCount > 0
                    ? formatNumber(Math.round(channel.viewCount / channel.videoCount))
                    : "—"}
                </span>
             </div>
             <p className="text-[9px] font-bold text-on-surface-variant/40 uppercase">Views / Node</p>
          </div>

          {/* Capacity Metric: Videos */}
          <div className="col-span-1 text-right">
             <p className="text-[10px] font-black uppercase tracking-[0.2em] text-on-surface-variant/50 mb-1">Output</p>
             <div className="flex items-center justify-end gap-2 mb-1">
                <Video className="h-3 w-3 text-on-surface-variant/40" />
                <span className="font-headline text-lg font-bold text-on-surface tracking-tight">
                  {formatNumber(channel.videoCount)}
                </span>
             </div>
             <p className="text-[9px] font-bold text-on-surface-variant/40 uppercase">Total Nodes</p>
          </div>
        </div>
      </div>

      {/* Hover Background Accent Line */}
      <div className={`absolute bottom-0 left-0 h-1 w-0 bg-gradient-to-r from-transparent via-white/20 to-transparent transition-all duration-700 group-hover:w-full`} />
    </div>
  );
}
