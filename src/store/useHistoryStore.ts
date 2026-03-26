import { create } from "zustand";
import { persist } from "zustand/middleware";
import { RecentChannel } from "@/models/types/channel";

interface HistoryState {
  recentChannels: RecentChannel[];
  savedChannels: RecentChannel[];

  // Actions
  addRecentChannel: (channel: RecentChannel) => void;
  toggleSavedChannel: (channel: RecentChannel) => boolean;
  isChannelSaved: (channelId: string) => boolean;
  clearRecent: () => void;
}

export const useHistoryStore = create<HistoryState>()(
  persist(
    (set, get) => ({
      recentChannels: [],
      savedChannels: [],

      addRecentChannel: (channel) =>
        set((state) => {
          const filtered = state.recentChannels.filter((c) => c.id !== channel.id);
          return {
            recentChannels: [channel, ...filtered].slice(0, 10),
          };
        }),

      toggleSavedChannel: (channel) => {
        let isSaved = false;
        set((state) => {
          const exists = state.savedChannels.some((c) => c.id === channel.id);
          if (exists) {
            isSaved = false;
            return {
              savedChannels: state.savedChannels.filter((c) => c.id !== channel.id),
            };
          } else {
            isSaved = true;
            return {
              savedChannels: [channel, ...state.savedChannels],
            };
          }
        });
        return isSaved;
      },

      isChannelSaved: (channelId) => {
        return get().savedChannels.some((c) => c.id === channelId);
      },

      clearRecent: () => set({ recentChannels: [] }),
    }),
    {
      name: "vidmetrics-history-storage",
    }
  )
);
