"use client";

import { Loader2 } from "lucide-react";
import { useEffect, useState } from "react";
import { validateChannelInput } from "@/models/services/youtube";

interface ChannelInputProps {
  value: string;
  onChange: (value: string) => void;
  onSubmit: () => void;
  isLoading?: boolean;
  error?: string | null;
  variant?: "hero" | "compact";
  debounceMs?: number;
}

export function ChannelInput({
  value,
  onChange,
  onSubmit,
  isLoading = false,
  error,
  variant = "hero",
  debounceMs = 500,
}: ChannelInputProps) {
  const [localError, setLocalError] = useState<string | null>(null);
  const [touched, setTouched] = useState(false);

  useEffect(() => {
    if (!touched || !value.trim()) {
      setLocalError(null);
      return;
    }

    const timer = setTimeout(() => {
      const validation = validateChannelInput(value);
      if (!validation.valid) {
        setLocalError(validation.error || "Invalid format");
      } else {
        setLocalError(null);
      }
    }, debounceMs);

    return () => clearTimeout(timer);
  }, [value, touched, debounceMs]);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !isLoading) {
      setTouched(true);
      const validation = validateChannelInput(value);
      if (validation.valid) {
        onSubmit();
      } else {
        setLocalError(validation.error || "Invalid format");
      }
    }
  };

  const handleBlur = () => {
    setTouched(true);
    if (value.trim()) {
      const validation = validateChannelInput(value);
      if (!validation.valid) {
        setLocalError(validation.error || "Invalid format");
      }
    }
  };

  const handleSubmitClick = () => {
    setTouched(true);
    const validation = validateChannelInput(value);
    if (validation.valid) {
      onSubmit();
    } else {
      setLocalError(validation.error || "Invalid format");
    }
  };

  const displayError = error || localError;
  const isValid = value.trim() && validateChannelInput(value).valid;

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
              onBlur={handleBlur}
              placeholder="Paste YouTube channel URL or @handle"
              className={`w-full h-12 pl-11 pr-4 rounded-xl bg-surface-container-highest text-base text-on-surface placeholder:text-on-surface-variant/40 focus:outline-none focus:ring-2 transition-all font-body ${
                displayError
                  ? "focus:ring-error/50 ring-1 ring-error/30"
                  : isValid
                  ? "focus:ring-primary/50 ring-1 ring-primary/30"
                  : "focus:ring-primary/50"
              }`}
            />
          </div>
          <button
            onClick={handleSubmitClick}
            disabled={isLoading || !!displayError}
            className="h-12 px-6 rounded-xl kinetic-lens-gradient text-on-primary-fixed text-sm font-bold font-headline transition-all disabled:opacity-50 flex items-center gap-2 hover:brightness-110 active:scale-95 shrink-0"
          >
            {isLoading ? <Loader2 className="h-4 w-4 animate-spin" /> : "Analyze"}
          </button>
        </div>
        {displayError && (
          <p className="text-xs text-error font-body flex items-center gap-1">
            <span className="material-symbols-outlined text-xs">error</span>
            {displayError}
          </p>
        )}
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-3">
      <div className="p-3 bg-white/5 backdrop-blur-xl rounded-2xl flex flex-col md:flex-row gap-4 border border-white/10 shadow-[0_0_50px_rgba(133,173,255,0.15)]">
        <div
          className={`flex-grow flex items-center px-4 py-3 bg-surface-container-highest rounded-xl focus-within:ring-2 ring-primary transition-all ${
            displayError ? "ring-1 ring-error/30" : isValid ? "ring-1 ring-primary/30" : ""
          }`}
        >
          <span className="material-symbols-outlined text-primary mr-3" data-icon="link">
            link
          </span>
          <input
            className="bg-transparent border-none focus:ring-0 w-full text-base text-on-surface placeholder:text-on-surface-variant/40 font-medium font-body focus:outline-none"
            placeholder="Paste YouTube Channel URL here"
            type="text"
            value={value}
            onChange={(e) => onChange(e.target.value)}
            onKeyDown={handleKeyDown}
            onBlur={handleBlur}
          />
        </div>
        <button
          onClick={handleSubmitClick}
          disabled={isLoading || !!displayError}
          className="kinetic-lens-gradient text-on-primary-fixed font-headline font-black text-base px-8 py-3 rounded-xl active:scale-95 transition-all shadow-[0_10px_30px_rgba(110,159,255,0.3)] hover:brightness-110 flex items-center justify-center gap-2 disabled:opacity-50"
        >
          {isLoading ? (
            <Loader2 className="h-5 w-5 animate-spin" />
          ) : (
            <>
              <span>Analyze Channel</span>
              <span className="material-symbols-outlined font-bold" data-icon="rocket_launch">
                rocket_launch
              </span>
            </>
          )}
        </button>
      </div>
      {displayError && (
        <p className="text-sm text-error ml-2 font-body font-medium flex items-center gap-1">
          <span className="material-symbols-outlined text-sm">error</span>
          {displayError}
        </p>
      )}
    </div>
  );
}
