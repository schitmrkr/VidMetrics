export interface Video {
  id: string;
  title: string;
  description: string;
  thumbnailUrl: string;
  publishedAt: string;
  channelId: string;
}

export interface VideoStats {
  videoId: string;
  viewCount: number;
  likeCount: number;
  commentCount: number;
}

export interface VideoWithStats extends Video {
  viewCount: number;
  likeCount: number;
  commentCount: number;
  engagementRate: number; // (likes + comments) / views * 100
  isTopPerformer?: boolean;
}
