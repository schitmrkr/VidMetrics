"use client";

import { useState, useEffect, useCallback } from "react";
import { db } from "@/models/services/db";
import type { RecentChannel } from "@/models/types/channel";

export function useHistory() {
  const [recentChannels, setRecentChannels] = useState<RecentChannel[]>([]);
  const [savedChannels, setSavedChannels] = useState<RecentChannel[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const loadData = async () => {
      try {
        const [recent, saved] = await Promise.all([
          db.getRecentChannels(),
          db.getSavedChannels(),
        ]);
        setRecentChannels(recent);
        setSavedChannels(saved);
      } catch (error) {
        console.error("Failed to load history from IndexedDB:", error);
      } finally {
        setIsLoaded(true);
      }
    };
    loadData();
  }, []);

  const toggleSaved = useCallback(async (channel: RecentChannel) => {
    try {
      const isSaved = await db.toggleSavedChannel(channel);
      const saved = await db.getSavedChannels();
      setSavedChannels(saved);
      return isSaved;
    } catch (error) {
      console.error("Failed to toggle saved channel:", error);
      return false;
    }
  }, []);

  const clearHistory = useCallback(async () => {
    try {
      await db.clearRecentChannels();
      setRecentChannels([]);
    } catch (error) {
      console.error("Failed to clear history:", error);
    }
  }, []);

  const checkSaved = useCallback(async (channelId: string) => {
    try {
      return await db.isChannelSaved(channelId);
    } catch (error) {
      console.error("Failed to check saved status:", error);
      return false;
    }
  }, []);

  const refresh = useCallback(async () => {
    try {
      const [recent, saved] = await Promise.all([
        db.getRecentChannels(),
        db.getSavedChannels(),
      ]);
      setRecentChannels(recent);
      setSavedChannels(saved);
    } catch (error) {
      console.error("Failed to refresh history:", error);
    }
  }, []);

  return {
    recentChannels,
    savedChannels,
    toggleSaved,
    clearHistory,
    checkSaved,
    refresh,
    isLoaded,
  };
}
