"use client";

import { useSearchParams } from "next/navigation";
import { Suspense } from "react";
import { useChannelAnalysis } from "@/viewmodels/useChannelAnalysis";
import { useVideoList } from "@/viewmodels/useVideoList";
import { useTrends } from "@/viewmodels/useTrends";
import { ChannelInput } from "@/components/channel/ChannelInput";
import { ViewsOverTime } from "@/components/charts/ViewsOverTime";
import { EngagementBreakdown } from "@/components/charts/EngagementBreakdown";
import { TrendMetrics } from "@/components/charts/TrendMetrics";
import { TrendingUp, Zap } from "lucide-react";

function TrendsContent() {
  const searchParams = useSearchParams();
  const initialChannel = searchParams.get("channel");

  const {
    channelUrl,
    setChannelUrl,
    channel,
    isLoading: channelLoading,
    validationError,
    handleSubmit,
  } = useChannelAnalysis(initialChannel);

  const { allVideos } = useVideoList(channel?.id);
  const { viewsOverTime, engagementBreakdown, trendMetrics } =
    useTrends(allVideos);

  return (
    <div className="min-h-screen bg-background text-on-background selection:bg-secondary/30">
      <div className="mx-auto max-w-screen-2xl px-6 lg:px-12 py-12 space-y-16">
        
        <header className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-outline-variant/10 pb-12">
          <div className="space-y-4">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-secondary/10 text-secondary text-[10px] font-black uppercase tracking-widest">
              <Zap className="h-3 w-3" /> Kinetic Trend Engine
            </div>
            <h1 className="font-headline text-3xl lg:text-5xl font-black tracking-tighter text-on-surface">
               Trend <span className="text-secondary/80">Mapping</span>
            </h1>
            <p className="max-w-xl text-base font-medium text-on-surface-variant leading-relaxed">
              Synthesizing temporal performance signals into actionable engagement 
              heuristics. Driven by the <span className="text-on-surface font-bold">VidMetrics Core</span>.
            </p>
          </div>
          
          <div className="w-full md:w-[500px]">
            <ChannelInput
              value={channelUrl}
              onChange={setChannelUrl}
              onSubmit={handleSubmit}
              isLoading={channelLoading}
              error={validationError}
              variant="compact"
            />
          </div>
        </header>

        {channel ? (
          <main className="space-y-20 animate-in fade-in slide-in-from-bottom-4 duration-700">
            
            <TrendMetrics metrics={trendMetrics} />

            <div className="flex flex-col lg:flex-row gap-6">
              <div className="flex-1 min-w-0 bg-surface-container-low/30 rounded-lg p-4 lg:p-8 ring-1 ring-white/5 shadow-inner overflow-x-auto">
                <ViewsOverTime data={viewsOverTime} />
              </div>
              <div className="w-full lg:w-[30%] shrink-0 bg-surface-container-low/30 rounded-lg p-4 lg:p-8 ring-1 ring-white/5 shadow-inner">
                <EngagementBreakdown data={engagementBreakdown} />
              </div>
            </div>
          </main>
        ) : (
          <div className="relative overflow-hidden rounded-2xl bg-surface-container-low border border-white/5 p-20 text-center space-y-8 min-h-[500px] flex flex-col items-center justify-center">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_120%,rgba(255,114,94,0.05),transparent)]" />
            
            <div className="relative">
              <div className="mx-auto h-24 w-24 rounded-2xl bg-surface-container-high flex items-center justify-center shadow-2xl ring-1 ring-white/10 mb-8 animate-pulse">
                <TrendingUp className="h-10 w-10 text-secondary/40" />
              </div>
              <h2 className="font-headline text-2xl font-bold text-on-surface tracking-tight">
                Signal mapping pending
              </h2>
              <p className="max-w-md mx-auto text-on-surface-variant font-medium leading-relaxed">
                Connect a YouTube source to bridge the gap between static data 
                and kinetic performance visualizations.
              </p>
            </div>
          </div>
        )}

        <footer className="pt-20 border-t border-outline-variant/10 text-[10px] font-bold text-on-surface-variant/40 tracking-[0.2em] uppercase text-center">
          &copy; 2026 VidMetrics Intelligent Systems — Project Kinetic Lens
        </footer>
      </div>
    </div>
  );
}

export default function TrendsPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-background flex items-center justify-center">
          <div className="flex flex-col items-center gap-6 animate-pulse">
            <div className="h-12 w-12 rounded-xl bg-secondary/20 rotate-45" />
            <div className="h-4 bg-secondary/20 w-48 rounded-full" />
          </div>
        </div>
      }
    >
      <TrendsContent />
    </Suspense>
  );
}
