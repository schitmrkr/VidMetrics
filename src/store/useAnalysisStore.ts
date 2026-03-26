import { create } from "zustand";
import { persist } from "zustand/middleware";
import { FilterState, DEFAULT_FILTERS } from "@/models/types/filters";

interface AnalysisState {
  channelUrl: string;
  submittedUrl: string | null;
  filters: FilterState;
  
  // Actions
  setChannelUrl: (url: string) => void;
  setSubmittedUrl: (url: string | null) => void;
  setFilters: (filters: FilterState | ((prev: FilterState) => FilterState)) => void;
  resetAnalysis: () => void;
}

export const useAnalysisStore = create<AnalysisState>()(
  persist(
    (set) => ({
      channelUrl: "",
      submittedUrl: null,
      filters: DEFAULT_FILTERS,

      setChannelUrl: (channelUrl) => set({ channelUrl }),
      
      setSubmittedUrl: (submittedUrl) => set({ submittedUrl }),
      
      setFilters: (update) => 
        set((state) => ({
          filters: typeof update === "function" ? update(state.filters) : update,
        })),

      resetAnalysis: () => set({
        channelUrl: "",
        submittedUrl: null,
        filters: DEFAULT_FILTERS,
      }),
    }),
    {
      name: "vidmetrics-analysis-storage",
      // Only persist submittedUrl and filters
      partialize: (state) => ({
        submittedUrl: state.submittedUrl,
        filters: state.filters,
      }),
    }
  )
);
