"use client";

import { useHistory } from "@/viewmodels/useHistory";
import { useRouter } from "next/navigation";
import { useMemo } from "react";
import {
  Bookmark,
  Clock,
  Trash2,
  ArrowRight,
  Star,
  StarOff,
  ShieldCheck,
} from "lucide-react";

export default function HistoryPage() {
  const { recentChannels, savedChannels, toggleSaved, clearHistory } =
    useHistory();
  const router = useRouter();

  const savedIds = useMemo(
    () => new Set(savedChannels.map((c) => c.id)),
    [savedChannels]
  );

  const handleToggleSaved = async (channel: typeof recentChannels[0]) => {
    await toggleSaved(channel);
  };

  return (
    <div className="min-h-screen bg-background text-on-background selection:bg-primary/30">
      <div className="mx-auto max-w-screen-2xl px-6 lg:px-12 py-12 space-y-16">
        
        <header className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-outline-variant/10 pb-12">
          <div className="space-y-4">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-[10px] font-black uppercase tracking-widest">
              <ShieldCheck className="h-3 w-3" /> Kinetic Vault
            </div>
            <h1 className="font-headline text-3xl lg:text-5xl font-black tracking-tighter text-on-surface">
               History & <span className="text-primary/80">Saved</span>
            </h1>
            <p className="max-w-xl text-base font-medium text-on-surface-variant leading-relaxed">
              Archival access to your performance ecosystem. Re-bridge 
              <span className="text-on-surface font-bold"> Temporal Traces</span> and manage your high-priority signals.
            </p>
          </div>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
          <section className="lg:col-span-5 space-y-8">
            <div className="flex items-center gap-3">
              <div className="h-8 w-8 rounded-lg bg-primary/10 flex items-center justify-center">
                <Bookmark className="h-4 w-4 text-primary" />
              </div>
              <h2 className="text-sm font-black uppercase tracking-[0.2em] text-on-surface-variant/50">
                Pinned Signals
              </h2>
              <span className="text-[10px] font-bold text-on-surface-variant/20 ml-auto border border-outline-variant/10 px-2 py-0.5 rounded-full">
                {savedChannels.length} Linked
              </span>
            </div>

            {savedChannels.length === 0 ? (
              <div className="relative overflow-hidden rounded-lg bg-surface-container-low border border-white/5 p-12 text-center space-y-4 min-h-[300px] flex flex-col items-center justify-center group">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(66,133,244,0.03),transparent)]" />
                <Star className="h-10 w-10 text-on-surface-variant/20 group-hover:scale-110 transition-transform" />
                <p className="text-sm font-medium text-on-surface-variant/40 max-w-[200px] mx-auto leading-relaxed">
                  No high-priority nodes identified. Star from trace history to pin.
                </p>
              </div>
            ) : (
              <div className="space-y-3">
                {savedChannels.map((channel) => (
                  <div
                    key={channel.id}
                    className="group relative flex items-center gap-4 rounded-2xl bg-surface-container-low p-4 transition-all duration-300 hover:bg-surface-bright hover:shadow-xl hover:shadow-primary/5 ring-1 ring-white/5"
                  >
                    <div className="relative h-12 w-12 rounded-xl bg-surface-container-high overflow-hidden shadow-inner ring-1 ring-white/10 group-hover:ring-white/20 transition-all">
                      {channel.thumbnailUrl && (
                        <img
                          src={channel.thumbnailUrl}
                          alt={channel.title}
                          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
                        />
                      )}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="font-headline font-bold text-base text-on-surface truncate">
                        {channel.title}
                      </p>
                      <p className="text-[10px] font-bold text-primary uppercase tracking-widest opacity-60 group-hover:opacity-100 transition-opacity">
                        Pinned Signal
                      </p>
                    </div>
                    <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-all">
                      <button
                        onClick={() => handleToggleSaved(channel)}
                        className="h-10 w-10 flex items-center justify-center rounded-xl text-on-surface-variant/40 hover:text-tertiary hover:bg-tertiary/10 transition-colors"
                        aria-label="Unsave"
                      >
                        <StarOff className="h-4 w-4" />
                      </button>
                      <button
                        onClick={() =>
                          router.push(
                            `/dashboard?channel=${encodeURIComponent(channel.id)}`
                          )
                        }
                        className="h-10 w-10 flex items-center justify-center rounded-xl text-primary hover:bg-primary/10 transition-colors border border-primary/20"
                      >
                        <ArrowRight className="h-4 w-4" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </section>

          <section className="lg:col-span-7 space-y-8">
            <div className="flex items-center gap-3">
              <div className="h-8 w-8 rounded-lg bg-secondary/10 flex items-center justify-center">
                <Clock className="h-4 w-4 text-secondary" />
              </div>
              <h2 className="text-sm font-black uppercase tracking-[0.2em] text-on-surface-variant/50">
                Temporal Trace
              </h2>
              {recentChannels.length > 0 && (
                <button
                  onClick={clearHistory}
                  className="ml-auto flex items-center gap-1.5 text-[10px] font-bold text-on-surface-variant/30 hover:text-tertiary transition-colors uppercase tracking-widest"
                >
                  <Trash2 className="h-3 w-3" />
                  Wipe Data
                </button>
              )}
            </div>

            {recentChannels.length === 0 ? (
              <div className="relative overflow-hidden rounded-xl bg-surface-container-low border border-white/5 p-20 text-center space-y-6 min-h-[400px] flex flex-col items-center justify-center group">
                 <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_120%,rgba(255,114,94,0.03),transparent)]" />
                 <Clock className="h-12 w-12 text-on-surface-variant/10 group-hover:rotate-45 transition-transform duration-700" />
                 <div className="space-y-2">
                    <p className="font-headline text-xl font-bold text-on-surface-variant/40">Zero latency trace</p>
                    <p className="text-sm font-medium text-on-surface-variant/20 max-w-[280px] mx-auto leading-relaxed">
                      Start an analysis to generate kinetic performance markers within the vault.
                    </p>
                 </div>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {recentChannels.map((channel) => {
                  const isSaved = savedIds.has(channel.id);
                  return (
                    <div
                      key={channel.id}
                      className="group relative overflow-hidden rounded-lg bg-surface-container-high p-6 transition-all duration-500 hover:bg-surface-bright hover:-translate-y-1 hover:shadow-2xl shadow-inner ring-1 ring-white/5"
                    >
                      <div className="relative z-10 flex items-start justify-between mb-6">
                        <div className="h-10 w-10 rounded-xl bg-surface-container overflow-hidden ring-1 ring-white/10 group-hover:ring-white/20 transition-all">
                          {channel.thumbnailUrl && (
                            <img
                              src={channel.thumbnailUrl}
                              alt={channel.title}
                              className="h-full w-full object-cover"
                            />
                          )}
                        </div>
                        <button
                          onClick={() => handleToggleSaved(channel)}
                          className={`h-9 w-9 flex items-center justify-center rounded-xl transition-all shadow-sm ${
                            isSaved
                              ? "bg-primary/10 text-primary ring-1 ring-primary/30"
                              : "bg-surface-container text-on-surface-variant/30 hover:text-primary hover:bg-primary/5 ring-1 ring-white/5 hover:ring-primary/20"
                          }`}
                          aria-label={isSaved ? "Unsave" : "Save"}
                        >
                          <Star
                            className="h-4 w-4"
                            fill={isSaved ? "currentColor" : "none"}
                          />
                        </button>
                      </div>

                      <div className="relative z-10 space-y-2">
                        <p className="font-headline font-black text-lg text-on-surface truncate tracking-tight">
                          {channel.title}
                        </p>
                        <div className="flex items-center gap-2">
                           <div className="h-1 w-1 rounded-full bg-secondary" />
                           <p className="text-[10px] font-bold text-on-surface-variant/40 uppercase tracking-widest">
                              {new Date(channel.analyzedAt).toLocaleDateString("en-US", {
                                month: "short",
                                day: "numeric",
                                hour: "numeric",
                                minute: "2-digit",
                              })}
                           </p>
                        </div>
                      </div>

                      <button
                        onClick={() =>
                          router.push(
                            `/dashboard?channel=${encodeURIComponent(channel.id)}`
                          )
                        }
                        className="absolute bottom-0 right-0 h-10 w-10 bg-primary/10 rounded-tl-2xl flex items-center justify-center text-primary group-hover:bg-primary transition-all group-hover:text-on-primary"
                      >
                        <ArrowRight className="h-4 w-4" />
                      </button>
                    </div>
                  );
                })}
              </div>
            )}
          </section>
        </div>

        <footer className="pt-20 border-t border-outline-variant/10 text-[10px] font-bold text-on-surface-variant/40 tracking-[0.2em] uppercase text-center">
          &copy; 2026 VidMetrics Intelligent Systems — Project Kinetic Lens
        </footer>
      </div>
    </div>
  );
}
