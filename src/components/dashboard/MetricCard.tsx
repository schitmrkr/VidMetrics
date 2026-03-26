import { LucideIcon } from "lucide-react";

interface MetricCardProps {
  label: string;
  value: string | number;
  icon: LucideIcon;
  trend?: {
    value: number;
    isPositive: boolean;
  };
  subtitle?: string;
  className?: string;
}

export function MetricCard({
  label,
  value,
  icon: Icon,
  trend,
  subtitle,
  className = "",
}: MetricCardProps) {
  return (
    <div
      className={`relative overflow-hidden rounded-2xl bg-surface-container-high p-6 transition-all duration-300 hover:bg-surface-bright group ${className}`}
    >
      {/* Background Glow */}
      <div className="absolute -right-4 -top-4 h-24 w-24 rounded-full bg-primary/5 blur-3xl group-hover:bg-primary/10 transition-colors" />

      <div className="relative flex flex-col h-full">
        <div className="flex items-start justify-between mb-4">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10 text-primary group-hover:scale-110 transition-transform">
            <Icon className="h-5 w-5" />
          </div>
          {trend && (
            <div
              className={`flex items-center gap-1 rounded-full px-2 py-1 text-xs font-medium ${
                trend.isPositive
                  ? "bg-secondary/10 text-secondary"
                  : "bg-tertiary/10 text-tertiary"
              }`}
            >
              {trend.isPositive ? "+" : "-"}
              {Math.abs(trend.value)}%
            </div>
          )}
        </div>

        <div className="mt-auto">
          <p className="text-sm font-medium text-on-surface-variant mb-1">
            {label}
          </p>
          <h3 className="font-headline text-3xl font-bold tracking-tight text-on-surface">
            {value}
          </h3>
          {subtitle && (
            <p className="mt-1 text-xs text-on-surface-variant/70">{subtitle}</p>
          )}
        </div>
      </div>
    </div>
  );
}
