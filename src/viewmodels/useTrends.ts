"use client";

import { useMemo } from "react";
import type { VideoWithStats } from "@/models/types/video";

export interface TrendDataPoint {
  date: string;
  views: number;
  likes: number;
  comments: number;
  engagementRate: number;
  videoTitle: string;
  videoId: string;
}

export interface EngagementBreakdown {
  name: string;
  views: number;
  likes: number;
  comments: number;
  engagementRate: number;
}

export interface TrendMetric {
  label: string;
  value: string;
  subValue?: string;
  trend?: {
    value: number;
    isPositive: boolean;
  };
  icon: "velocity" | "quality" | "momentum" | "peak" | "sync";
}

function formatNumber(num: number): string {
  if (num >= 1_000_000_000) return `${(num / 1_000_000_000).toFixed(1)}B`;
  if (num >= 1_000_000) return `${(num / 1_000_000).toFixed(1)}M`;
  if (num >= 1_000) return `${(num / 1_000).toFixed(1)}K`;
  return num.toString();
}

function getDaysSinceUpload(publishedAt: string): number {
  const uploadDate = new Date(publishedAt);
  const now = new Date();
  const diffTime = Math.abs(now.getTime() - uploadDate.getTime());
  return Math.max(1, Math.ceil(diffTime / (1000 * 60 * 60 * 24)));
}

export function useTrends(videos: VideoWithStats[]) {
  const viewsOverTime = useMemo<TrendDataPoint[]>(() => {
    if (!videos.length) return [];

    return [...videos]
      .sort(
        (a, b) =>
          new Date(a.publishedAt).getTime() - new Date(b.publishedAt).getTime()
      )
      .map((v) => ({
        date: new Date(v.publishedAt).toLocaleDateString("en-US", {
          month: "short",
          day: "numeric",
        }),
        views: v.viewCount,
        likes: v.likeCount,
        comments: v.commentCount,
        engagementRate: v.engagementRate,
        videoTitle: v.title.length > 40 ? v.title.slice(0, 40) + "…" : v.title,
        videoId: v.id,
      }));
  }, [videos]);

  const engagementBreakdown = useMemo<EngagementBreakdown[]>(() => {
    if (!videos.length) return [];

    return [...videos]
      .sort((a, b) => b.engagementRate - a.engagementRate)
      .slice(0, 4)
      .map((v) => ({
        name: v.title.length > 20 ? v.title.slice(0, 20) + "…" : v.title,
        views: v.viewCount,
        likes: v.likeCount,
        comments: v.commentCount,
        engagementRate: Number(v.engagementRate.toFixed(1)),
      }));
  }, [videos]);

  const averageEngagement = useMemo(() => {
    if (!videos.length) return 0;
    const sum = videos.reduce((acc, v) => acc + v.engagementRate, 0);
    return Number((sum / videos.length).toFixed(2));
  }, [videos]);

  const totalViews = useMemo(
    () => videos.reduce((acc, v) => acc + v.viewCount, 0),
    [videos]
  );

  const trendMetrics = useMemo<TrendMetric[]>(() => {
    if (!videos.length) return [];

    const sortedByDate = [...videos].sort(
      (a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime()
    );

    const recentVideos = sortedByDate.slice(0, 10);
    const olderVideos = sortedByDate.slice(10, 20);

    const recentAvgEngagement = recentVideos.length > 0
      ? recentVideos.reduce((acc, v) => acc + v.engagementRate, 0) / recentVideos.length
      : 0;

    const olderAvgEngagement = olderVideos.length > 0
      ? olderVideos.reduce((acc, v) => acc + v.engagementRate, 0) / olderVideos.length
      : 0;

    const momentumChange = olderAvgEngagement > 0
      ? ((recentAvgEngagement - olderAvgEngagement) / olderAvgEngagement) * 100
      : 0;

    const velocityScore = videos.reduce((acc, v) => {
      const days = getDaysSinceUpload(v.publishedAt);
      return acc + v.viewCount / days;
    }, 0) / videos.length;

    const engagementQuality = videos.reduce((acc, v) => {
      const totalInteractions = v.likeCount + v.commentCount;
      if (totalInteractions === 0) return acc;
      return acc + (v.commentCount / totalInteractions) * 100;
    }, 0) / videos.length;

    const peakVideo = [...videos].sort((a, b) => b.engagementRate - a.engagementRate)[0];
    const peakDays = peakVideo ? getDaysSinceUpload(peakVideo.publishedAt) : 0;
    const peakVelocity = peakVideo ? Math.round(peakVideo.viewCount / peakDays) : 0;

    const uploadIntervals: number[] = [];
    for (let i = 0; i < sortedByDate.length - 1; i++) {
      const days = getDaysSinceUpload(sortedByDate[i].publishedAt) -
        getDaysSinceUpload(sortedByDate[i + 1].publishedAt);
      uploadIntervals.push(Math.abs(days));
    }
    const avgUploadInterval = uploadIntervals.length > 0
      ? uploadIntervals.reduce((a, b) => a + b, 0) / uploadIntervals.length
      : 0;

    return [
      {
        label: "Velocity Index",
        value: formatNumber(Math.round(velocityScore)),
        subValue: "avg daily views",
        trend: velocityScore > 10000 ? { value: 12.5, isPositive: true } : undefined,
        icon: "velocity" as const,
      },
      {
        label: "Engagement Quality",
        value: `${engagementQuality.toFixed(1)}%`,
        subValue: "comment ratio",
        icon: "quality" as const,
      },
      {
        label: "Trend Momentum",
        value: momentumChange >= 0 ? `+${momentumChange.toFixed(1)}%` : `${momentumChange.toFixed(1)}%`,
        subValue: "vs previous 10",
        trend: momentumChange >= 0 ? { value: momentumChange, isPositive: true } : { value: Math.abs(momentumChange), isPositive: false },
        icon: "momentum" as const,
      },
      {
        label: "Peak Velocity",
        value: formatNumber(peakVelocity),
        subValue: peakVideo?.title.slice(0, 25) + (peakVideo?.title.length > 25 ? "..." : ""),
        icon: "peak" as const,
      },
      {
        label: "Upload Cadence",
        value: avgUploadInterval > 0 ? `${Math.round(avgUploadInterval)} days` : "N/A",
        subValue: "avg between videos",
        icon: "sync" as const,
      },
    ];
  }, [videos]);

  return {
    viewsOverTime,
    engagementBreakdown,
    averageEngagement,
    totalViews,
    trendMetrics,
  };
}
