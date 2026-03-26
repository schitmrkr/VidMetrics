"use client";

interface MiniChartProps {
  className?: string;
}

export function MiniChart({ className = "" }: MiniChartProps) {
  const data = [30, 45, 35, 60, 55, 70, 65, 85, 75, 90, 80, 95];
  const maxValue = Math.max(...data);
  const width = 100;
  const height = 50;
  const pointSpacing = width / (data.length - 1);

  const points = data.map((value, index) => ({
    x: index * pointSpacing,
    y: height - (value / maxValue) * height,
  }));

  const pathD = points
    .map((point, index) => (index === 0 ? `M ${point.x} ${point.y}` : `L ${point.x} ${point.y}`))
    .join(" ");

  const areaD = `${pathD} L ${width} ${height} L 0 ${height} Z`;

  return (
    <svg viewBox={`0 0 ${width} ${height}`} className={className} preserveAspectRatio="none">
      <defs>
        <linearGradient id="chartGradient" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#85adff" stopOpacity="0.4" />
          <stop offset="100%" stopColor="#85adff" stopOpacity="0" />
        </linearGradient>
        <linearGradient id="lineGradient" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#6e9fff" />
          <stop offset="100%" stopColor="#85adff" />
        </linearGradient>
      </defs>
      <path d={areaD} fill="url(#chartGradient)" />
      <path d={pathD} fill="none" stroke="url(#lineGradient)" strokeWidth="0.8" />
      {points.slice(-3).map((point, index) => (
        <circle
          key={index}
          cx={point.x}
          cy={point.y}
          r="1.2"
          fill="#85adff"
          className="animate-pulse"
          style={{ animationDelay: `${index * 200}ms` }}
        />
      ))}
    </svg>
  );
}
