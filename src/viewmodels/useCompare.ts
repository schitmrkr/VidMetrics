"use client";

import { useState, useCallback, useEffect, useRef, useMemo } from "react";
import { useQueries, useQuery } from "@tanstack/react-query";
import { fetchChannel, fetchVideos, fetchVideoStats } from "@/models/services/youtube";
import { useCurrentChannelStore } from "@/store/useCurrentChannelStore";
import { useCompareChannelsStore } from "@/store/useCompareChannelsStore";
import type { Channel } from "@/models/types/channel";
import type { VideoStats } from "@/models/types/video";

const MAX_CHANNELS = 5;

export function useCompare() {
  const [localUrls, setLocalUrls] = useState<string[]>([]);
  const [firstChannelSet, setFirstChannelSet] = useState(false);
  const { currentChannelUrl } = useCurrentChannelStore();
  const { channelUrls: storedUrls, setChannelUrls, isInitialized, setInitialized } = useCompareChannelsStore();
  const isInitialMount = useRef(true);

  useEffect(() => {
    if (isInitialMount.current) {
      if (isInitialized && storedUrls.length > 0) {
        setLocalUrls(storedUrls);
      } else if (currentChannelUrl) {
        setLocalUrls([currentChannelUrl]);
        setChannelUrls([currentChannelUrl]);
        setInitialized(true);
      } else {
        setLocalUrls([""]);
      }
      isInitialMount.current = false;
    }
  }, [currentChannelUrl, storedUrls, isInitialized, setChannelUrls, setInitialized]);

  const addChannel = useCallback(() => {
    setLocalUrls((prev) => {
      if (prev.length >= MAX_CHANNELS) return prev;
      const next = [...prev, ""];
      setChannelUrls(next);
      return next;
    });
  }, [setChannelUrls]);

  const removeChannel = useCallback((index: number) => {
    setLocalUrls((prev) => {
      if (prev.length <= 1) return prev;
      const next = prev.filter((_, i) => i !== index);
      setChannelUrls(next);
      return next;
    });
    if (index === 0) {
      setFirstChannelSet(false);
    }
  }, [setChannelUrls]);

  const updateChannel = useCallback((index: number, url: string) => {
    if (index === 0) {
      setFirstChannelSet(true);
    }
    setLocalUrls((prev) => {
      const next = [...prev];
      next[index] = url;
      setChannelUrls(next);
      return next;
    });
  }, [setChannelUrls]);

  const validUrls = localUrls.filter((url) => url.trim().length > 0);

  const channelQueries = useQueries({
    queries: validUrls.map((url) => ({
      queryKey: ["channel", url],
      queryFn: () => fetchChannel(url),
      enabled: url.trim().length > 0,
      staleTime: 10 * 60 * 1000,
      gcTime: 30 * 60 * 1000,
    })),
  });

  const channels: (Channel | undefined)[] = channelQueries.map((q) => q.data);
  const validChannels = channels.filter(Boolean) as Channel[];

  const videoQueries = useQueries({
    queries: validChannels.map((channel) => ({
      queryKey: ["videos", channel.id],
      queryFn: () => fetchVideos(channel.id),
      enabled: true,
      staleTime: 10 * 60 * 1000,
      gcTime: 30 * 60 * 1000,
    })),
  });

  const allVideoIds = useMemo(() => {
    const ids: string[] = [];
    validChannels.forEach((channel, index) => {
      const videoData = videoQueries[index]?.data;
      if (videoData?.videos) {
        ids.push(...videoData.videos.map((v) => v.id));
      }
    });
    return ids;
  }, [validChannels, videoQueries]);

  const statsQuery = useQuery<VideoStats[]>({
    queryKey: ["videoStats", ...allVideoIds],
    queryFn: () => fetchVideoStats(allVideoIds),
    enabled: allVideoIds.length > 0,
    staleTime: 10 * 60 * 1000,
    gcTime: 30 * 60 * 1000,
  });

  const videosByChannel = useMemo(() => {
    const map = new Map<string, { publishedAt: string; viewCount: number }[]>();
    
    if (!statsQuery.data) return map;
    
    const statsMap = new Map(statsQuery.data.map((s) => [s.videoId, s]));
    
    validChannels.forEach((channel, index) => {
      const videoData = videoQueries[index]?.data;
      if (videoData?.videos) {
        const channelVideos = videoData.videos.map((v) => {
          const stats = statsMap.get(v.id);
          return {
            publishedAt: v.publishedAt,
            viewCount: stats?.viewCount ?? 0,
          };
        });
        map.set(channel.id, channelVideos);
      }
    });
    
    return map;
  }, [validChannels, videoQueries, statsQuery.data]);

  const isLoading = channelQueries.some((q) => q.isLoading) || 
                    videoQueries.some((q) => q.isLoading) || 
                    statsQuery.isLoading;
  
  const errors = channelQueries
    .map((q, i) => (q.error ? { index: i, error: q.error as Error } : null))
    .filter(Boolean);

  return {
    channelUrls: localUrls,
    channels,
    validChannels,
    videosByChannel,
    isLoading,
    errors,
    addChannel,
    removeChannel,
    updateChannel,
    maxChannels: MAX_CHANNELS,
  };
}
