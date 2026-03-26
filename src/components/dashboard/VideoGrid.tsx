import { VideoCard } from "./VideoCard";
import type { VideoWithStats } from "@/models/types/video";

interface VideoGridProps {
  videos: VideoWithStats[];
  isLoading?: boolean;
}

function VideoCardSkeleton() {
  return (
    <div className="rounded-xl overflow-hidden bg-card animate-pulse">
      <div className="aspect-video bg-surface-container" />
      <div className="p-4 space-y-3">
        <div className="h-4 bg-surface-container rounded w-3/4" />
        <div className="h-3 bg-surface-container rounded w-1/2" />
        <div className="flex gap-3">
          <div className="h-3 bg-surface-container rounded w-12" />
          <div className="h-3 bg-surface-container rounded w-12" />
          <div className="h-3 bg-surface-container rounded w-12" />
        </div>
      </div>
    </div>
  );
}

export function VideoGrid({ videos, isLoading }: VideoGridProps) {
  if (isLoading) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {Array.from({ length: 6 }).map((_, i) => (
          <VideoCardSkeleton key={i} />
        ))}
      </div>
    );
  }

  if (videos.length === 0) {
    return (
      <div className="rounded-2xl bg-card p-12 text-center">
        <p className="text-muted-foreground">No videos found matching your filters.</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
      {videos.map((video) => (
        <VideoCard key={video.id} video={video} />
      ))}
    </div>
  );
}
