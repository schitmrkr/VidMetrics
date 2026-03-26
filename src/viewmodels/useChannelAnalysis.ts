"use client";

import { useState, useCallback, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import {
  validateChannelInput,
  fetchChannel,
} from "@/models/services/youtube";
import { db } from "@/models/services/db";
import { useCurrentChannelStore } from "@/store/useCurrentChannelStore";
import type { Channel, RecentChannel } from "@/models/types/channel";

export function useChannelAnalysis(initialUrl?: string | null) {
  const [channelUrl, setChannelUrl] = useState("");
  const [submittedUrl, setSubmittedUrl] = useState<string | null>(null);
  const [validationError, setValidationError] = useState<string | null>(null);
  
  const { currentChannelUrl, setCurrentChannelUrl } = useCurrentChannelStore();

  const effectiveUrl = initialUrl || currentChannelUrl;

  const {
    data: channel,
    isLoading,
    error,
    refetch,
    isFetched,
  } = useQuery<Channel>({
    queryKey: ["channel", effectiveUrl],
    queryFn: () => fetchChannel(effectiveUrl!),
    enabled: !!effectiveUrl,
    staleTime: 10 * 60 * 1000,
    gcTime: 30 * 60 * 1000,
  });

  useEffect(() => {
    if (channel) {
      const recentChannel: RecentChannel = {
        id: channel.id,
        title: channel.title,
        thumbnailUrl: channel.thumbnailUrl,
        analyzedAt: new Date().toISOString(),
      };
      db.addRecentChannel(recentChannel);
    }
  }, [channel]);

  useEffect(() => {
    if (initialUrl) {
      setChannelUrl(initialUrl);
      setSubmittedUrl(initialUrl);
    } else if (currentChannelUrl && !channelUrl) {
      setChannelUrl(currentChannelUrl);
      setSubmittedUrl(currentChannelUrl);
    }
  }, [initialUrl, currentChannelUrl, channelUrl]);

  const handleSubmit = useCallback(() => {
    const validation = validateChannelInput(channelUrl);

    if (!validation.valid) {
      setValidationError(validation.error || "Invalid input");
      return;
    }

    setValidationError(null);
    setSubmittedUrl(channelUrl);
    setCurrentChannelUrl(channelUrl);
  }, [channelUrl, setCurrentChannelUrl]);

  const reset = useCallback(() => {
    setChannelUrl("");
    setSubmittedUrl(null);
    setValidationError(null);
  }, []);

  return {
    channelUrl,
    setChannelUrl,
    channel,
    isLoading,
    isFetched,
    error: error as Error | null,
    validationError,
    handleSubmit,
    reset,
    refetch,
  };
}
