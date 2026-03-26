export interface Channel {
  id: string;
  title: string;
  description: string;
  customUrl: string;
  publishedAt: string;
  thumbnailUrl: string;
  bannerUrl?: string;
  subscriberCount: number;
  videoCount: number;
  viewCount: number;
  uploadsPlaylistId: string;
}

export interface ChannelMetadata {
  id: string;
  title: string;
  thumbnailUrl: string;
  subscriberCount: number;
  videoCount: number;
  viewCount: number;
  averageEngagementRate: number;
  publishedAt: string;
}

export interface RecentChannel {
  id: string;
  title: string;
  thumbnailUrl: string;
  analyzedAt: string;
}
