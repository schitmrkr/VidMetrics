import Image from "next/image";
import { Eye, ThumbsUp, MessageCircle, TrendingUp, Award, Calendar } from "lucide-react";
import type { VideoWithStats } from "@/models/types/video";

interface VideoCardProps {
  video: VideoWithStats;
}

function formatNumber(num: number): string {
  if (num >= 1_000_000) return `${(num / 1_000_000).toFixed(1)}M`;
  if (num >= 1_000) return `${(num / 1_000).toFixed(1)}K`;
  return num.toString();
}

function timeAgo(dateStr: string): string {
  const diff = Date.now() - new Date(dateStr).getTime();
  const days = Math.floor(diff / (1000 * 60 * 60 * 24));
  if (days < 1) return "Today";
  if (days === 1) return "Yesterday";
  if (days < 30) return `${days}d ago`;
  if (days < 365) return `${Math.floor(days / 30)}mo ago`;
  return `${Math.floor(days / 365)}y ago`;
}

export function VideoCard({ video }: VideoCardProps) {
  return (
    <a
      href={`https://youtube.com/watch?v=${video.id}`}
      target="_blank"
      rel="noopener noreferrer"
      className={`group relative flex flex-col overflow-hidden rounded-2xl bg-surface-container transition-all duration-500 hover:bg-surface-bright hover:scale-[1.02] hover:shadow-2xl hover:shadow-primary/5 active:scale-95 ${
        video.isTopPerformer ? "ring-1 ring-primary/20" : ""
      }`}
    >
      {/* Background Glow on Hover */}
      <div className="absolute -inset-px bg-gradient-to-br from-primary/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

      {/* Thumbnail Area */}
      <div className="relative aspect-video overflow-hidden">
        <Image
          src={video.thumbnailUrl}
          alt={video.title}
          fill
          className="object-cover transition-transform duration-700 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-surface/80 via-transparent to-transparent opacity-60" />
        
        {video.isTopPerformer && (
          <div className="absolute top-3 left-3 flex items-center gap-1.5 px-3 py-1 rounded-full bg-primary text-[10px] font-black uppercase tracking-wider text-on-primary shadow-lg shadow-primary/20">
            <Award className="h-3 w-3" />
            Top Performer
          </div>
        )}
        
        <div className="absolute bottom-3 right-3 flex items-center gap-1.5 px-2 py-1 rounded-lg bg-surface/80 backdrop-blur-md text-[10px] font-bold text-on-surface ring-1 ring-white/10">
          <Calendar className="h-3 w-3" />
          {timeAgo(video.publishedAt).toUpperCase()}
        </div>
      </div>

      {/* Content Section - Asymmetrical Layout */}
      <div className="relative p-5 flex flex-col flex-1">
        <h3 className="font-headline text-base font-bold leading-tight line-clamp-2 text-on-surface group-hover:text-primary transition-colors mb-4">
          {video.title}
        </h3>

        {/* Dynamic Metric Grid */}
        <div className="mt-auto grid grid-cols-2 gap-y-4 pt-4 border-t border-outline-variant/10">
          <div className="flex flex-col">
            <span className="text-[9px] font-black text-on-surface-variant uppercase tracking-widest flex items-center gap-1.5 mb-1">
              <Eye className="h-2.5 w-2.5" /> VIEWS
            </span>
            <span className="font-headline text-lg font-bold text-on-surface">
              {formatNumber(video.viewCount)}
            </span>
          </div>
          
          <div className="flex flex-col items-end text-right">
            <span className="text-[9px] font-black text-on-surface-variant uppercase tracking-widest flex items-center gap-1.5 mb-1">
               ENGAGEMENT <TrendingUp className="h-2.5 w-2.5 text-secondary" />
            </span>
            <span className="font-headline text-lg font-bold text-secondary">
              {video.engagementRate}%
            </span>
          </div>

          <div className="flex items-center gap-4 col-span-2 pt-2">
            <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-surface-container-highest text-[10px] font-bold text-on-surface-variant">
              <ThumbsUp className="h-3 w-3" />
              {formatNumber(video.likeCount)}
            </div>
            <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-surface-container-highest text-[10px] font-bold text-on-surface-variant">
              <MessageCircle className="h-3 w-3" />
              {formatNumber(video.commentCount)}
            </div>
          </div>
        </div>
      </div>
    </a>
  );
}
