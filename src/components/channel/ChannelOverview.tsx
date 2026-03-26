import Image from "next/image";
import Link from "next/link";
import { Users, Video, Eye, Calendar, ExternalLink } from "lucide-react";
import type { Channel } from "@/models/types/channel";
import { MetricCard } from "../dashboard/MetricCard";

interface ChannelOverviewProps {
  channel: Channel;
  averageEngagement?: number;
}

function formatNumber(num: number): string {
  if (num >= 1_000_000_000) return `${(num / 1_000_000_000).toFixed(1)}B`;
  if (num >= 1_000_000) return `${(num / 1_000_000).toFixed(1)}M`;
  if (num >= 1_000) return `${(num / 1_000).toFixed(1)}K`;
  return num.toString();
}

export function ChannelOverview({
  channel,
  averageEngagement,
}: ChannelOverviewProps) {
  const stats = [
    {
      label: "Subscribers",
      value: formatNumber(channel.subscriberCount),
      icon: Users,
    },
    {
      label: "Total Videos",
      value: formatNumber(channel.videoCount),
      icon: Video,
    },
    {
      label: "Total Views",
      value: formatNumber(channel.viewCount),
      icon: Eye,
    },
    {
      label: "Avg Engagement",
      value: averageEngagement ? `${averageEngagement}%` : "—",
      icon: Calendar,
      trend: averageEngagement ? { value: 2.1, isPositive: true } : undefined,
    },
  ];

  return (
    <div className="space-y-8">
      {/* Editorial Profile Header */}
      <div className="flex flex-col md:flex-row items-start md:items-end gap-6 pb-2">
        {/* Avatar with Atmospheric Depth */}
        <div className="relative group">
          <div className="absolute -inset-1 rounded-full bg-primary/20 blur opacity-0 group-hover:opacity-100 transition duration-500" />
          <div className="relative h-24 w-24 overflow-hidden rounded-full ring-2 ring-primary/20 bg-surface-container shadow-2xl">
            <Image
              src={channel.thumbnailUrl}
              alt={channel.title}
              fill
              className="object-cover"
            />
          </div>
        </div>

        {/* Info - Intentional Asymmetry */}
        <div className="flex-1 space-y-2">
          <div className="flex items-center gap-3">
            <h2 className="font-headline text-4xl font-extrabold tracking-tight text-on-surface">
              {channel.title}
            </h2>
            {channel.customUrl && (
              <span className="px-2 py-0.5 rounded bg-primary/10 text-primary text-xs font-medium">
                {channel.customUrl}
              </span>
            )}
          </div>
          <div className="flex items-center gap-4 text-sm text-on-surface-variant/80 font-medium">
            <span className="flex items-center gap-1.5">
              <Calendar className="h-4 w-4" />
              Joined {new Date(channel.publishedAt).toLocaleDateString("en-US", {
                month: "long",
                year: "numeric",
              })}
            </span>
          </div>
        </div>

        {/* Action / Tertiary Space (Asymmetrical) */}
        <div className="flex gap-3">
          <Link
            href={`https://www.youtube.com/channel/${channel.id}`}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 px-6 py-2.5 rounded-xl kinetic-lens-gradient text-white text-sm font-bold shadow-lg shadow-primary/20 active:scale-95 transition-all hover:brightness-110"
          >
            Open Channel
            <ExternalLink className="h-4 w-4" />
          </Link>
        </div>
      </div>

      {/* Stats Suite */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat) => (
          <MetricCard
            key={stat.label}
            label={stat.label}
            value={stat.value}
            icon={stat.icon}
            trend={stat.trend}
          />
        ))}
      </div>
    </div>
  );
}
