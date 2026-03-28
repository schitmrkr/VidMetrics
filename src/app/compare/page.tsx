"use client";

import { useCompare } from "@/viewmodels/useCompare";
import { ChannelCompareCard } from "@/components/compare/ChannelCompareCard";
import { CompareViewsOverTime } from "@/components/charts/CompareViewsOverTime";
import {
  GitCompareArrows,
  Plus,
  Trash2,
  Search,
  Loader2,
  Zap,
} from "lucide-react";

export default function ComparePage() {
  const {
    channelUrls,
    channels,
    validChannels,
    videosByChannel,
    isLoading,
    errors,
    addChannel,
    removeChannel,
    updateChannel,
    maxChannels,
  } = useCompare();

  return (
    <div className="min-h-screen bg-background text-on-background selection:bg-primary/30">
      <div className="mx-auto max-w-screen-2xl px-6 lg:px-12 py-12 space-y-16">
        
        {/* Editorial Header */}
        <header className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-outline-variant/10 pb-12">
          <div className="space-y-4">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-[10px] font-black uppercase tracking-widest">
              <Zap className="h-3 w-3" /> Kinetic Compare Engine
            </div>
            <h1 className="font-headline text-3xl lg:text-5xl font-black tracking-tighter text-on-surface">
               Channel <span className="text-primary/80">Parity</span>
            </h1>
            <p className="max-w-xl text-base font-medium text-on-surface-variant leading-relaxed">
              Side-by-side performance synthesis of multiple growth channels. 
              Benchmarking <span className="text-on-surface font-bold">Kinetic Reach</span> across your ecosystem.
            </p>
          </div>
        </header>

        {/* Source Explorer: Redesigned Input Area */}
        <section className="space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-sm font-black uppercase tracking-[0.2em] text-on-surface-variant/50 flex items-center gap-2">
              <Search className="h-4 w-4" /> Source Explorer
            </h2>
            <span className="text-[10px] font-bold text-on-surface-variant/30 uppercase tracking-widest">
              Max Load: {maxChannels} Nodes
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {channelUrls.map((url, index) => (
              <div key={index} className="group relative">
                <div className="absolute left-4 top-1/2 -translate-y-1/2 h-8 w-8 flex items-center justify-center rounded-xl bg-surface-container text-[10px] font-black text-on-surface-variant/40 group-focus-within:bg-primary/10 group-focus-within:text-primary transition-all">
                  {index + 1}
                </div>
                <input
                  type="text"
                  value={url}
                  onChange={(e) => updateChannel(index, e.target.value)}
                  placeholder="Paste URL or @handle"
                  className="w-full h-14 pl-16 pr-12 rounded-2xl bg-surface-container-low text-sm font-medium text-on-surface placeholder:text-on-surface-variant/30 focus:outline-none focus:ring-2 focus:ring-primary/40 focus:bg-surface-bright transition-all shadow-inner"
                />
                {channelUrls.length > 1 && (
                  <button
                    onClick={() => removeChannel(index)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 h-8 w-8 flex items-center justify-center rounded-lg text-on-surface-variant/30 hover:text-tertiary hover:bg-tertiary/10 transition-all"
                    aria-label="Remove channel"
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                )}
              </div>
            ))}

            {channelUrls.length < maxChannels && (
              <button
                onClick={addChannel}
                className="flex items-center justify-center gap-3 h-14 rounded-2xl border-2 border-dashed border-outline-variant/20 text-sm font-black uppercase tracking-widest text-on-surface-variant/40 hover:border-primary/40 hover:text-primary hover:bg-primary/5 transition-all group"
              >
                <Plus className="h-4 w-4 group-hover:rotate-90 transition-transform" />
                Add Channel
              </button>
            )}
          </div>
        </section>

        {/* Comparison Canvas */}
        <main className="space-y-12">
          {isLoading && (
            <div className="flex flex-col items-center justify-center py-24 space-y-4 animate-pulse">
              <div className="h-12 w-12 rounded-2xl bg-primary/10 flex items-center justify-center">
                <Loader2 className="h-6 w-6 animate-spin text-primary" />
              </div>
              <span className="text-xs font-bold text-on-surface-variant/40 uppercase tracking-widest font-headline">
                Synthesizing Parity Data...
              </span>
            </div>
          )}

          {validChannels.length > 0 && !isLoading && (
            <CompareViewsOverTime
              channels={validChannels}
              videosByChannel={videosByChannel}
            />
          )}

          {channels.some((c) => c !== undefined) && !isLoading && (
            <div className="overflow-x-auto pb-4">
              <div className="flex gap-4 min-w-max animate-in fade-in slide-in-from-bottom-4 duration-700">
                {channels.map(
                  (channel, index) =>
                    channel && (
                      <div key={channel.id} className="w-72 shrink-0">
                        <ChannelCompareCard
                          channel={channel}
                          index={index}
                        />
                      </div>
                    )
                )}
              </div>
            </div>
          )}

          {/* Empty State: Cinematic Landing */}
          {!isLoading && channels.every((c) => c === undefined) && (
            <div className="relative overflow-hidden rounded-2xl bg-surface-container-low border border-white/5 p-24 text-center space-y-8 min-h-[500px] flex flex-col items-center justify-center">
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_120%,rgba(66,133,244,0.05),transparent)]" />
              
              <div className="relative">
                <div className="mx-auto h-24 w-24 rounded-2xl bg-surface-container-high flex items-center justify-center shadow-2xl ring-1 ring-white/10 mb-8 animate-pulse">
                  <GitCompareArrows className="h-10 w-10 text-primary/40" />
                </div>
                <h2 className="font-headline text-2xl font-bold text-on-surface tracking-tight">
                   Parity scan inactive
                </h2>
                <p className="max-w-md mx-auto text-on-surface-variant font-medium leading-relaxed">
                  Bridge multiple data sources to visualize growth trajectories 
                  and identify kinetic outlier performance.
                </p>
              </div>
            </div>
          )}
        </main>

        {/* Footer Meta */}
        <footer className="pt-20 border-t border-outline-variant/10 text-[10px] font-bold text-on-surface-variant/40 tracking-[0.2em] uppercase text-center">
          &copy; 2026 VidMetrics Intelligent Systems — Project Kinetic Lens
        </footer>
      </div>
    </div>
  );
}
