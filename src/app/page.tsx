"use client";

import { ChannelInput } from "@/components/channel/ChannelInput";
import { MiniChart } from "@/components/ui/MiniChart";
import { useChannelAnalysis } from "@/viewmodels/useChannelAnalysis";
import { useHistory } from "@/viewmodels/useHistory";
import { useRouter } from "next/navigation";
import Image from "next/image";

export default function LandingPage() {
  const { channelUrl, setChannelUrl, isLoading, validationError, handleSubmit } =
    useChannelAnalysis();
  const { recentChannels } = useHistory();
  const router = useRouter();

  const onAnalyze = () => {
    handleSubmit();
    if (!validationError && channelUrl.trim()) {
      router.push(`/dashboard?channel=${encodeURIComponent(channelUrl.trim())}`);
    }
  };

  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="relative pt-24 pb-20 overflow-hidden">
        {/* Background Atmospheric Depth Elements */}
        <div
          className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[500px] opacity-20 pointer-events-none"
          style={{
            background: "radial-gradient(circle at center, #85adff 0%, transparent 70%)",
          }}
        />

        <div className="max-w-6xl mx-auto px-6 relative z-10 text-center">
          <div className="mb-6 inline-flex items-center gap-2 px-3 py-1 rounded-full bg-surface-container-high border border-outline-variant/30">
            <span className="w-2 h-2 rounded-full bg-secondary animate-pulse" />
            <span className="text-xs font-label uppercase tracking-widest text-secondary">
              Kinetic Lens Engine Active
            </span>
          </div>

          <h1 className="text-4xl md:text-6xl font-headline font-extrabold tracking-tighter text-on-surface mb-4 leading-[1.1]">
            Instantly see which competitor <br />
            <span className="kinetic-lens-gradient-text">
              videos are crushing it.
            </span>
          </h1>

          <p className="text-base md:text-lg text-on-surface-variant max-w-2xl mx-auto mb-12 font-body">
            Deep telemetry analysis for YouTube creators. Paste a channel URL
            below to unlock performance metrics and content gaps.
          </p>

          {/* Input Field CTA - Hero Focus */}
          <div className="max-w-4xl mx-auto mb-16">
            <ChannelInput
              value={channelUrl}
              onChange={setChannelUrl}
              onSubmit={onAnalyze}
              isLoading={isLoading}
              error={validationError}
              variant="hero"
            />

          </div>

          {/* Recent Analyses Section */}
          <div className="max-w-3xl mx-auto">
            <h2 className="text-sm font-label uppercase tracking-[0.2em] text-on-surface-variant/60 mb-8">
              Recently Analyzed Channels
            </h2>
            <div className="flex flex-wrap justify-center gap-6 md:gap-10">
              {recentChannels.length > 0 ? (
                recentChannels.slice(0, 5).map((ch) => (
                  <div
                    key={ch.id}
                    onClick={() => {
                      setChannelUrl(ch.title);
                      router.push(
                        `/dashboard?channel=${encodeURIComponent(ch.id)}`
                      );
                    }}
                    className="flex flex-col items-center gap-3 group cursor-pointer"
                  >
                    <div className="w-16 h-16 rounded-full ring-2 ring-outline-variant/30 ring-offset-4 ring-offset-background overflow-hidden transition-all group-hover:ring-primary group-hover:scale-110 bg-surface-container flex items-center justify-center">
                      {ch.thumbnailUrl ? (
                        <Image
                          alt={ch.title}
                          className="w-full h-full object-cover"
                          src={ch.thumbnailUrl}
                          width={64}
                          height={64}
                          unoptimized
                        />
                      ) : (
                        <span className="material-symbols-outlined text-on-surface-variant text-2xl">person</span>
                      )}
                    </div>
                    <span className="text-xs font-bold font-body text-on-surface-variant group-hover:text-on-surface transition-colors truncate max-w-[80px]">
                      {ch.title.substring(0, 10)}
                    </span>
                  </div>
                ))
              ) : (
                <>
                  <div className="flex flex-col items-center gap-3 group cursor-pointer">
                    <div className="w-16 h-16 rounded-full ring-2 ring-outline-variant/30 ring-offset-4 ring-offset-background overflow-hidden transition-all group-hover:ring-primary group-hover:scale-110 bg-surface-container flex items-center justify-center">
                      <span className="material-symbols-outlined text-on-surface-variant text-2xl">person</span>
                    </div>
                    <span className="text-xs font-bold text-on-surface-variant group-hover:text-on-surface transition-colors">
                      MrBeast
                    </span>
                  </div>
                  <div className="flex flex-col items-center gap-3 group cursor-pointer">
                    <div className="w-16 h-16 rounded-full ring-2 ring-outline-variant/30 ring-offset-4 ring-offset-background overflow-hidden transition-all group-hover:ring-primary group-hover:scale-110 bg-surface-container flex items-center justify-center">
                      <span className="material-symbols-outlined text-on-surface-variant text-2xl">person</span>
                    </div>
                    <span className="text-xs font-bold text-on-surface-variant group-hover:text-on-surface transition-colors">
                      MKBHD
                    </span>
                  </div>
                  <div className="flex flex-col items-center gap-3 group cursor-pointer">
                    <div className="w-16 h-16 rounded-full ring-2 ring-outline-variant/30 ring-offset-4 ring-offset-background overflow-hidden transition-all group-hover:ring-primary group-hover:scale-110 bg-surface-container flex items-center justify-center">
                      <span className="material-symbols-outlined text-on-surface-variant text-2xl">person</span>
                    </div>
                    <span className="text-xs font-bold text-on-surface-variant group-hover:text-on-surface transition-colors">
                      Ali Abdaal
                    </span>
                  </div>
                  <div className="flex flex-col items-center gap-3 group cursor-pointer">
                    <div className="w-16 h-16 rounded-full ring-2 ring-outline-variant/30 ring-offset-4 ring-offset-background overflow-hidden transition-all group-hover:ring-primary group-hover:scale-110 bg-surface-container flex items-center justify-center">
                      <span className="material-symbols-outlined text-on-surface-variant text-2xl">person</span>
                    </div>
                    <span className="text-xs font-bold text-on-surface-variant group-hover:text-on-surface transition-colors">
                      Veritasium
                    </span>
                  </div>
                  <div className="flex flex-col items-center gap-3 group cursor-pointer">
                    <div className="w-16 h-16 rounded-full ring-2 ring-outline-variant/30 ring-offset-4 ring-offset-background overflow-hidden transition-all group-hover:ring-primary group-hover:scale-110 bg-surface-container flex items-center justify-center">
                      <span className="material-symbols-outlined text-on-surface-variant text-2xl">person</span>
                    </div>
                    <span className="text-xs font-bold text-on-surface-variant group-hover:text-on-surface transition-colors">
                      McKinnon
                    </span>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="max-w-7xl mx-auto px-6 pb-24">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
          {/* Large Feature */}
          <div className="md:col-span-8 bg-surface-container-high rounded-2xl p-6 md:p-10 flex flex-col justify-between min-h-[380px] overflow-hidden group border border-outline-variant/10">
            <div>
              <span className="text-xs font-label uppercase tracking-widest text-secondary mb-4 block">
                Performance Analytics
              </span>
              <h3 className="text-2xl md:text-3xl font-headline font-extrabold text-on-surface mb-4">
                Granular Video Intelligence
              </h3>
              <p className="text-on-surface-variant font-body text-base max-w-md leading-relaxed">
                Compare view velocity, engagement ratios, and estimated revenue
                across any competitor's entire library with surgical precision.
              </p>
            </div>
            <div className="mt-12 relative h-56 rounded-xl overflow-hidden ring-1 ring-outline-variant/20 shadow-inner bg-surface-container flex items-end justify-center p-6">
              <MiniChart className="w-full h-full" />
              <div className="absolute inset-0 kinetic-lens-gradient opacity-5 pointer-events-none" />
            </div>
          </div>

          {/* Small Feature 1 */}
          <div className="md:col-span-4 bg-surface-container-low rounded-2xl p-8 border border-outline-variant/10 hover:bg-surface-container-high transition-colors flex flex-col items-start">
            <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-6">
              <span className="material-symbols-outlined text-primary text-2xl">
                timeline
              </span>
            </div>
            <h3 className="text-xl font-headline font-bold text-on-surface mb-3">
              Trend Tracking
            </h3>
            <p className="text-on-surface-variant font-body leading-relaxed">
              Identify viral outliers before they peak. Our Kinetic Lens maps
              momentum shifts in real-time across niches.
            </p>
          </div>

          {/* Small Feature 2 */}
          <div className="md:col-span-4 bg-surface-container-low rounded-2xl p-8 border border-outline-variant/10 hover:bg-surface-container-high transition-colors flex flex-col items-start">
            <div className="w-12 h-12 rounded-xl bg-secondary/10 flex items-center justify-center mb-6">
              <span className="material-symbols-outlined text-secondary text-2xl">
                file_download
              </span>
            </div>
            <h3 className="text-xl font-headline font-bold text-on-surface mb-3">
              Easy Export
            </h3>
            <p className="text-on-surface-variant font-body leading-relaxed">
              One-click CSV and PDF reporting for your production team or brand
              sponsors. Professional insights, ready to share.
            </p>
          </div>

          {/* Medium Feature */}
          <div className="md:col-span-8 bg-surface-container-high rounded-2xl p-8 flex flex-col md:flex-row items-center gap-8 border border-outline-variant/10">
            <div className="flex-grow">
              <h3 className="text-2xl font-headline font-bold text-on-surface mb-3">
                Creator-First Workflow
              </h3>
              <p className="text-on-surface-variant font-body text-base leading-relaxed">
                Built by creators for teams that need fast, actionable data
                without the spreadsheet headache. Get the "why" behind the
                numbers.
              </p>
            </div>
            <div className="w-full md:w-1/3 aspect-square bg-surface-container-highest rounded-2xl flex items-center justify-center relative overflow-hidden ring-1 ring-outline-variant/20">
              <div className="absolute inset-0 kinetic-lens-gradient opacity-10"></div>
              <span className="material-symbols-outlined text-8xl text-primary animate-pulse">
                bolt
              </span>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
