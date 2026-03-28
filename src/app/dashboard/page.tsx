"use client";

import { useSearchParams } from "next/navigation";
import { Suspense, useEffect, useMemo, useState } from "react";
import { useChannelAnalysis } from "@/viewmodels/useChannelAnalysis";
import { useVideoList } from "@/viewmodels/useVideoList";
import { useTrends } from "@/viewmodels/useTrends";
import { ChannelInput } from "@/components/channel/ChannelInput";
import { ChannelOverview } from "@/components/channel/ChannelOverview";
import { TopPerformers } from "@/components/dashboard/TopPerformers";
import { VideoGrid } from "@/components/dashboard/VideoGrid";
import { FilterBar } from "@/components/dashboard/FilterBar";
import { downloadCSV } from "@/models/services/csv-export";
import { exportPDF } from "@/models/services/pdf-export";
import { db } from "@/models/services/db";
import { BarChart3, Database, FileDown, Loader2 } from "lucide-react";

function DashboardContent() {
  const searchParams = useSearchParams();
  const initialChannel = searchParams.get("channel");
  const [isExporting, setIsExporting] = useState(false);

  const {
    channelUrl,
    setChannelUrl,
    channel,
    isLoading: channelLoading,
    validationError,
    handleSubmit,
  } = useChannelAnalysis(initialChannel);

  const {
    videos,
    allVideos,
    isLoading: videosLoading,
    filters,
    updateSort,
    updateDateRange,
    updateSearch,
  } = useVideoList(channel?.id);

  const { trendMetrics, engagementBreakdown } = useTrends(allVideos);

  const handleExportPDF = async () => {
    if (!channel || allVideos.length === 0) return;
    
    setIsExporting(true);
    try {
      await exportPDF({
        channel,
        videos: allVideos,
        averageEngagement: averageEngagement || 0,
        topPerformers: topViewedVideos,
        trendMetrics,
        engagementBreakdown,
        dateRange: filters.dateRange,
      });
    } catch (error) {
      console.error("Failed to export PDF:", error);
    } finally {
      setIsExporting(false);
    }
  };

  useEffect(() => {
    if (channel && allVideos.length > 0 && !videosLoading) {
      db.saveAnalyzedChannel(channel, allVideos);
    }
  }, [channel, allVideos, videosLoading]);

  const averageEngagement =
    allVideos.length > 0
      ? Number(
          (
            allVideos.reduce((a, v) => a + v.engagementRate, 0) /
            allVideos.length
          ).toFixed(1)
        )
      : undefined;

  const topViewedVideos = useMemo(() => {
    const oneMonthAgo = new Date();
    oneMonthAgo.setMonth(oneMonthAgo.getMonth() - 1);
    
    const thisMonthVideos = allVideos.filter(
      (v) => new Date(v.publishedAt) >= oneMonthAgo
    );
    
    return thisMonthVideos
      .sort((a, b) => b.viewCount - a.viewCount)
      .slice(0, 3);
  }, [allVideos]);

  return (
    <div className="min-h-screen bg-background text-on-background selection:bg-primary/30">
      <div className="mx-auto max-w-screen-2xl px-6 lg:px-12 py-12 space-y-16">
        
        <header className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-outline-variant/10 pb-2">
          <div className="space-y-4">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-[10px] font-black uppercase tracking-widest">
              <Database className="h-3 w-3" /> Core Metrics Engine
            </div>
            <h1 className="font-headline text-3xl lg:text-5xl font-black tracking-tighter text-on-surface">
              Video <span className="text-primary/80">Dashboard</span>
            </h1>
            <p className="max-w-xl text-base font-medium text-on-surface-variant leading-relaxed">
              Deep telemetry and performance mapping for channel assets. 
              Powered by the <span className="text-on-surface font-bold">Kinetic Engine</span>.
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

        {channelLoading && (
          <div className="flex items-center justify-center py-12">
            <div className="flex items-center gap-3 px-6 py-3 bg-surface-container-high rounded-full border border-white/10 shadow-lg">
              <Loader2 className="h-5 w-5 animate-spin text-primary" />
              <span className="text-sm font-medium text-on-surface">Analyzing channel...</span>
            </div>
          </div>
        )}

        {channel ? (
          <main className="space-y-20 animate-in fade-in slide-in-from-bottom-4 duration-700">

            <section className="bg-surface-container-low/30 rounded-lg p-8 lg:p-12 ring-1 ring-white/5 shadow-inner">
              <ChannelOverview
                channel={channel}
                averageEngagement={averageEngagement}
                onExportPDF={handleExportPDF}
                isExporting={isExporting}
              />
            </section>

            <TopPerformers videos={topViewedVideos} />

            <section className="flex flex-col xl:flex-row gap-8">
              <aside className="w-full xl:w-80 shrink-0">
                <FilterBar
                  sortBy={filters.sortBy}
                  dateRange={filters.dateRange}
                  searchQuery={filters.searchQuery}
                  onSortChange={updateSort}
                  onDateRangeChange={updateDateRange}
                  onSearchChange={updateSearch}
                  onExport={() => downloadCSV(videos, channel.title)}
                  videoCount={videos.length}
                />
              </aside>

              <div className="flex-1 w-full min-w-0">
                <VideoGrid videos={videos} isLoading={videosLoading} />
              </div>
            </section>
          </main>
        ) : (
          <div className="relative overflow-hidden rounded-2xl bg-surface-container-low border border-white/5 p-20 text-center space-y-8 min-h-[500px] flex flex-col items-center justify-center">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_120%,rgba(133,173,255,0.1),transparent)]" />
            
            <div className="relative">
              <div className="mx-auto h-24 w-24 rounded-2xl bg-surface-container-high flex items-center justify-center shadow-2xl ring-1 ring-white/10 mb-8 animate-pulse">
                <BarChart3 className="h-10 w-10 text-primary/40" />
              </div>
              <h2 className="font-headline text-2xl font-bold text-on-surface tracking-tight">
                No channel found
              </h2>
              <p className="max-w-md mx-auto text-on-surface-variant font-medium leading-relaxed">
                Enter a YouTube channel URL in the field above to initialize data collection and start your kinetic performance analysis.
              </p>
            </div>
          </div>
        )}

        <footer className="pt-20 border-t border-outline-variant/10 text-[10px] font-bold text-on-surface-variant/40 tracking-[0.2em] uppercase text-center">
          &copy; 2026 VidMetrics Intelligent Systems — Kinetic Lens Architecture
        </footer>
      </div>
    </div>
  );
}

export default function DashboardPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-background flex items-center justify-center">
          <div className="flex flex-col items-center gap-6 animate-pulse">
            <div className="h-12 w-12 rounded-xl bg-primary/20 rotate-45" />
            <div className="h-4 bg-primary/20 w-48 rounded-full" />
          </div>
        </div>
      }
    >
      <DashboardContent />
    </Suspense>
  );
}
