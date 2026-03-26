import { create } from "zustand";
import { persist } from "zustand/middleware";

interface CompareChannelsState {
  channelUrls: string[];
  isInitialized: boolean;
  setChannelUrls: (urls: string[]) => void;
  setInitialized: (value: boolean) => void;
}

export const useCompareChannelsStore = create<CompareChannelsState>()(
  persist(
    (set) => ({
      channelUrls: [],
      isInitialized: false,
      setChannelUrls: (urls) => set({ channelUrls: urls }),
      setInitialized: (value) => set({ isInitialized: value }),
    }),
    {
      name: "vidmetrics-compare-channels",
    }
  )
);
