"use client";

import { useState, useMemo, useCallback, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { fetchVideos, fetchVideoStats, calculateEngagementRate } from "@/models/services/youtube";
import type { VideoWithStats } from "@/models/types/video";
import type { FilterState, SortOption, DateRange } from "@/models/types/filters";
import { DEFAULT_FILTERS } from "@/models/types/filters";

export function useVideoList(channelId: string | undefined) {
  const [filters, setFilters] = useState<FilterState>(DEFAULT_FILTERS);

  const {
    data: videosData,
    isLoading: videosLoading,
    error: videosError,
  } = useQuery({
    queryKey: ["videos", channelId],
    queryFn: () => fetchVideos(channelId!),
    enabled: !!channelId,
    staleTime: 10 * 60 * 1000,
    gcTime: 30 * 60 * 1000,
  });

  const videoIds = videosData?.videos?.map((v) => v.id) ?? [];
  const {
    data: statsData,
    isLoading: statsLoading,
  } = useQuery({
    queryKey: ["videoStats", videoIds],
    queryFn: () => fetchVideoStats(videoIds),
    enabled: videoIds.length > 0,
    staleTime: 10 * 60 * 1000,
    gcTime: 30 * 60 * 1000,
  });

  const allVideos: VideoWithStats[] = useMemo(() => {
    if (!videosData?.videos) return [];

    const statsMap = new Map(statsData?.map((s) => [s.videoId, s]) ?? []);

    const merged: VideoWithStats[] = videosData.videos.map((video) => {
      const stats = statsMap.get(video.id);
      const viewCount = stats?.viewCount ?? 0;
      const likeCount = stats?.likeCount ?? 0;
      const commentCount = stats?.commentCount ?? 0;

      return {
        ...video,
        viewCount,
        likeCount,
        commentCount,
        engagementRate: calculateEngagementRate(likeCount, commentCount, viewCount),
        isTopPerformer: false,
      };
    });

    const sorted = [...merged].sort((a, b) => b.engagementRate - a.engagementRate);
    sorted.slice(0, 3).forEach((v) => {
      const target = merged.find((m) => m.id === v.id);
      if (target) target.isTopPerformer = true;
    });

    return merged;
  }, [videosData, statsData]);

  const filteredVideos = useMemo(() => {
    let result = [...allVideos];

    if (filters.dateRange !== "all") {
      const now = Date.now();
      const ranges: Record<string, number> = {
        "7d": 7 * 24 * 60 * 60 * 1000,
        "30d": 30 * 24 * 60 * 60 * 1000,
        "90d": 90 * 24 * 60 * 60 * 1000,
        "1y": 365 * 24 * 60 * 60 * 1000,
      };

      if (ranges[filters.dateRange]) {
        result = result.filter(
          (v) => now - new Date(v.publishedAt).getTime() <= ranges[filters.dateRange]
        );
      }
    }

    if (filters.searchQuery) {
      const query = filters.searchQuery.toLowerCase();
      result = result.filter((v) => v.title.toLowerCase().includes(query));
    }

    const sorters: Record<SortOption, (a: VideoWithStats, b: VideoWithStats) => number> = {
      views_desc: (a, b) => b.viewCount - a.viewCount,
      views_asc: (a, b) => a.viewCount - b.viewCount,
      engagement_desc: (a, b) => b.engagementRate - a.engagementRate,
      engagement_asc: (a, b) => a.engagementRate - b.engagementRate,
      date_desc: (a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime(),
      date_asc: (a, b) => new Date(a.publishedAt).getTime() - new Date(b.publishedAt).getTime(),
      likes_desc: (a, b) => b.likeCount - a.likeCount,
      comments_desc: (a, b) => b.commentCount - a.commentCount,
    };

    result.sort(sorters[filters.sortBy]);

    return result;
  }, [allVideos, filters]);

  const updateSort = useCallback((sortBy: SortOption) =>
    setFilters((prev) => ({ ...prev, sortBy })), []);

  const updateDateRange = useCallback((dateRange: DateRange) =>
    setFilters((prev) => ({ ...prev, dateRange })), []);

  const updateSearch = useCallback((searchQuery: string) =>
    setFilters((prev) => ({ ...prev, searchQuery })), []);

  return {
    videos: filteredVideos,
    allVideos,
    isLoading: videosLoading || statsLoading,
    error: videosError as Error | null,
    filters,
    updateSort,
    updateDateRange,
    updateSearch,
    setFilters,
  };
}
