"use client";

import { Loader2 } from "lucide-react";
import { useState } from "react";

interface ChannelInputProps {
  value: string;
  onChange: (value: string) => void;
  onSubmit: () => void;
  isLoading?: boolean;
  error?: string | null;
  variant?: "hero" | "compact";
}

export function ChannelInput({
  value,
  onChange,
  onSubmit,
  isLoading = false,
  error,
  variant = "hero",
}: ChannelInputProps) {
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !isLoading) {
      onSubmit();
    }
  };

  if (variant === "compact") {
    return (
      <div className="flex flex-col gap-1">
        <div className="flex items-center gap-3">
          <div className="relative flex-1 min-w-0">
            <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-on-surface-variant">link</span>
            <input
              type="text"
              value={value}
              onChange={(e) => onChange(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Paste YouTube channel URL or @handle"
              className="w-full h-12 pl-11 pr-4 rounded-xl bg-surface-container-highest text-base text-on-surface placeholder:text-on-surface-variant/40 focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all font-body"
            />
          </div>
          <button
            onClick={onSubmit}
            disabled={isLoading}
            className="h-12 px-6 rounded-xl kinetic-lens-gradient text-on-primary-fixed text-sm font-bold font-headline transition-all disabled:opacity-50 flex items-center gap-2 hover:brightness-110 active:scale-95 shrink-0"
          >
            {isLoading ? <Loader2 className="h-4 w-4 animate-spin" /> : "Analyze"}
          </button>
        </div>
        {error && <p className="text-xs text-error font-body">{error}</p>}
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-3">
      <div className="p-3 bg-white/5 backdrop-blur-xl rounded-2xl flex flex-col md:flex-row gap-4 border border-white/10 shadow-[0_0_50px_rgba(133,173,255,0.15)]">
        <div className="flex-grow flex items-center px-4 py-3 bg-surface-container-highest rounded-xl focus-within:ring-2 ring-primary transition-all">
          <span className="material-symbols-outlined text-primary mr-3" data-icon="link">link</span>
          <input
            className="bg-transparent border-none focus:ring-0 w-full text-base text-on-surface placeholder:text-on-surface-variant/40 font-medium font-body focus:outline-none"
            placeholder="Paste YouTube Channel URL here"
            type="text"
            value={value}
            onChange={(e) => onChange(e.target.value)}
            onKeyDown={handleKeyDown}
          />
        </div>
        <button
          onClick={onSubmit}
          disabled={isLoading}
          className="kinetic-lens-gradient text-on-primary-fixed font-headline font-black text-base px-8 py-3 rounded-xl active:scale-95 transition-all shadow-[0_10px_30px_rgba(110,159,255,0.3)] hover:brightness-110 flex items-center justify-center gap-2 disabled:opacity-50"
        >
          {isLoading ? (
            <Loader2 className="h-5 w-5 animate-spin" />
          ) : (
            <>
              <span>Analyze Channel</span>
              <span className="material-symbols-outlined font-bold" data-icon="rocket_launch">rocket_launch</span>
            </>
          )}
        </button>
      </div>
      {error && (
        <p className="text-sm text-error ml-2 font-body font-medium">{error}</p>
      )}
    </div>
  );
}
