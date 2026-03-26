import { create } from "zustand";
import { persist } from "zustand/middleware";

interface CompareState {
  channelUrls: string[];
  
  // Actions
  setChannelUrls: (urls: string[] | ((prev: string[]) => string[])) => void;
  addChannel: () => void;
  removeChannel: (index: number) => void;
  updateChannel: (index: number, url: string) => void;
}

const MAX_CHANNELS = 5;

export const useCompareStore = create<CompareState>()(
  persist(
    (set) => ({
      channelUrls: [""],

      setChannelUrls: (update) =>
        set((state) => ({
          channelUrls: typeof update === "function" ? update(state.channelUrls) : update,
        })),

      addChannel: () =>
        set((state) => {
          if (state.channelUrls.length >= MAX_CHANNELS) return state;
          return { channelUrls: [...state.channelUrls, ""] };
        }),

      removeChannel: (index) =>
        set((state) => {
          if (state.channelUrls.length <= 1) return state;
          return { channelUrls: state.channelUrls.filter((_, i) => i !== index) };
        }),

      updateChannel: (index, url) =>
        set((state) => {
          const next = [...state.channelUrls];
          next[index] = url;
          return { channelUrls: next };
        }),
    }),
    {
      name: "vidmetrics-compare-storage",
    }
  )
);
