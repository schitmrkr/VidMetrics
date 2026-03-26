import Link from "next/link";
import { Eye } from "lucide-react";
import type { VideoWithStats } from "@/models/types/video";

interface TopPerformersProps {
  videos: VideoWithStats[];
}

function formatNumber(num: number): string {
  if (num >= 1_000_000_000) return `${(num / 1_000_000_000).toFixed(1)}B`;
  if (num >= 1_000_000) return `${(num / 1_000_000).toFixed(1)}M`;
  if (num >= 1_000) return `${(num / 1_000).toFixed(1)}K`;
  return num.toString();
}

export function TopPerformers({ videos }: TopPerformersProps) {
  if (videos.length === 0) return null;

  return (
    <section className="bg-surface-container-low/30 rounded-lg p-8 lg:p-12 ring-1 ring-white/5 shadow-inner">
      <div className="flex items-center gap-3 mb-8">
        <div className="h-10 w-10 rounded-xl bg-primary/10 flex items-center justify-center">
          <svg className="h-5 w-5 text-primary" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <polyline points="23 6 13.5 15.5 8.5 10.5 1 18" />
            <polyline points="17 6 23 6 23 12" />
          </svg>
        </div>
        <div>
          <h2 className="text-lg font-headline font-bold text-on-surface">Top Performers This Month</h2>
          <p className="text-sm text-on-surface-variant">Most viewed videos in the last 30 days</p>
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {videos.map((video, index) => (
          <Link
            key={video.id}
            href={`https://www.youtube.com/watch?v=${video.id}`}
            target="_blank"
            rel="noopener noreferrer"
            className="group relative bg-surface-container-high rounded-2xl overflow-hidden ring-1 ring-white/5 hover:ring-primary/30 transition-all duration-300 hover:-translate-y-1"
          >
            <div className="relative aspect-video bg-surface-container">
              <img
                src={video.thumbnailUrl}
                alt={video.title}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
              <div className="absolute top-3 left-3 h-7 w-7 rounded-lg bg-primary flex items-center justify-center text-xs font-black text-white">
                {index + 1}
              </div>
              <div className="absolute bottom-3 left-3 right-3">
                <p className="text-sm font-semibold text-white line-clamp-2">{video.title}</p>
              </div>
            </div>
            <div className="p-4 flex items-center gap-4">
              <div className="flex items-center gap-1.5 text-sm text-on-surface-variant">
                <Eye className="h-4 w-4" />
                <span>{formatNumber(video.viewCount)}</span>
              </div>
              <div className="flex items-center gap-1.5 text-sm text-on-surface-variant">
                <span className="material-symbols-outlined text-sm">thumb_up</span>
                <span>{formatNumber(video.likeCount)}</span>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
