"use client";

import { useState } from "react";
import { TrendingUp, TrendingDown, Gauge, Zap, Target, Clock, Activity, HelpCircle } from "lucide-react";
import type { TrendMetric } from "@/viewmodels/useTrends";

interface TrendMetricsProps {
  metrics: TrendMetric[];
}

interface MetricInfo {
  description: string;
  tip: string;
}

const METRIC_INFO: Record<string, MetricInfo> = {
  velocity: {
    description: "Average daily views per video",
    tip: "Measures how quickly your content gains traction. Higher velocity means videos reach their audience faster after upload.",
  },
  quality: {
    description: "Comment-to-engagement ratio",
    tip: "Shows how many comments you get relative to likes. Higher ratios indicate deeper audience engagement and discussion.",
  },
  momentum: {
    description: "Performance trend direction",
    tip: "Compares engagement of your 10 most recent videos against the previous 10. Positive means your content is improving.",
  },
  peak: {
    description: "Your best performing video's daily views",
    tip: "The highest-performing video's average daily view velocity. Your ceiling for viral potential.",
  },
  sync: {
    description: "Average upload frequency",
    tip: "How often you publish new content. Consistent cadence helps algorithm favorability and audience retention.",
  },
};

const ICONS = {
  velocity: Gauge,
  quality: Target,
  momentum: Activity,
  peak: Zap,
  sync: Clock,
};

const COLORS = {
  velocity: "text-primary",
  quality: "text-secondary",
  momentum: "text-tertiary",
  peak: "text-primary",
  sync: "text-secondary",
};

const BG_COLORS = {
  velocity: "bg-primary/10",
  quality: "bg-secondary/10",
  momentum: "bg-tertiary/10",
  peak: "bg-primary/10",
  sync: "bg-secondary/10",
};

const TOOLTIP_COLORS = {
  velocity: "border-primary/30",
  quality: "border-secondary/30",
  momentum: "border-tertiary/30",
  peak: "border-primary/30",
  sync: "border-secondary/30",
};

export function TrendMetrics({ metrics }: TrendMetricsProps) {
  const [hoveredMetric, setHoveredMetric] = useState<string | null>(null);

  if (!metrics.length) return null;

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
      {metrics.map((metric) => {
        const Icon = ICONS[metric.icon];
        const colorClass = COLORS[metric.icon];
        const bgClass = BG_COLORS[metric.icon];
        const borderClass = TOOLTIP_COLORS[metric.icon];
        const info = METRIC_INFO[metric.icon];

        return (
          <div
            key={metric.label}
            className="bg-surface-container-low/30 rounded-lg p-5 ring-1 ring-white/5 relative"
          >
            <div className="flex items-center gap-3 mb-3">
              <div className={`p-2 rounded-lg ${bgClass}`}>
                <Icon className={`h-4 w-4 ${colorClass}`} />
              </div>
              <span className="text-[10px] font-bold uppercase tracking-widest text-on-surface-variant">
                {metric.label}
              </span>
              <button
                onMouseEnter={() => setHoveredMetric(metric.icon)}
                onMouseLeave={() => setHoveredMetric(null)}
                className="ml-auto relative"
              >
                <HelpCircle className="h-4 w-4 text-on-surface-variant/50 hover:text-on-surface-variant transition-colors" />
                {hoveredMetric === metric.icon && (
                  <div className={`absolute right-0 top-8 w-64 p-4 rounded-lg bg-surface-container-high border ${borderClass} shadow-xl z-50`}>
                    <p className="text-sm font-semibold text-on-surface mb-1">{info.description}</p>
                    <p className="text-xs text-on-surface-variant leading-relaxed">{info.tip}</p>
                  </div>
                )}
              </button>
            </div>
            <div className="flex items-baseline gap-2">
              <span className="text-2xl font-bold font-headline text-on-surface">
                {metric.value}
              </span>
              {metric.trend && (
                <div className={`flex items-center gap-0.5 ${metric.trend.isPositive ? "text-green-400" : "text-red-400"}`}>
                  {metric.trend.isPositive ? (
                    <TrendingUp className="h-3 w-3" />
                  ) : (
                    <TrendingDown className="h-3 w-3" />
                  )}
                  <span className="text-xs font-medium">
                    {metric.trend.value.toFixed(1)}%
                  </span>
                </div>
              )}
            </div>
            <p className="text-[10px] text-on-surface-variant mt-1 truncate">
              {metric.subValue}
            </p>
          </div>
        );
      })}
    </div>
  );
}
