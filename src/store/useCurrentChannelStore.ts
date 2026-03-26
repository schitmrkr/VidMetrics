import { create } from "zustand";
import { persist } from "zustand/middleware";

interface CurrentChannelState {
  currentChannelUrl: string | null;
  setCurrentChannelUrl: (url: string | null) => void;
}

export const useCurrentChannelStore = create<CurrentChannelState>()(
  persist(
    (set) => ({
      currentChannelUrl: null,
      setCurrentChannelUrl: (url) => set({ currentChannelUrl: url }),
    }),
    {
      name: "vidmetrics-current-channel",
    }
  )
);
