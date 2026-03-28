interface MiniBarChartProps {
  color?: string;
  data?: number[];
  className?: string;
}

export function MiniBarChart({ 
  color = "#85adff", 
  data,
  className = "" 
}: MiniBarChartProps) {
  const bars = data || [30, 45, 35, 60, 55];
  const maxValue = Math.max(...bars);
  const width = 100;
  const height = 50;
  const barWidth = 14;
  const gap = 4;
  const totalWidth = bars.length * barWidth + (bars.length - 1) * gap;
  const offsetX = (width - totalWidth) / 2;

  return (
    <svg viewBox={`0 0 ${width} ${height}`} className={className} preserveAspectRatio="none">
      {bars.map((value, index) => {
        const x = offsetX + index * (barWidth + gap);
        const barHeight = (value / maxValue) * (height - 4);
        const y = height - barHeight;
        
        return (
          <rect
            key={index}
            x={x}
            y={y}
            width={barWidth}
            height={barHeight}
            rx={2}
            fill={color}
            opacity={0.6 + (value / maxValue) * 0.4}
            className="transition-all duration-300"
          />
        );
      })}
    </svg>
  );
}

interface MiniLineChartProps {
  color?: string;
  className?: string;
}

export function MiniLineChart({ 
  color = "#6df5e1",
  className = "" 
}: MiniLineChartProps) {
  const data = [20, 45, 35, 60, 50, 75, 65, 85, 70, 90, 80, 95];
  const width = 100;
  const height = 50;
  const pointSpacing = width / (data.length - 1);

  const points = data.map((value, index) => ({
    x: index * pointSpacing,
    y: height - (value / 100) * height,
  }));

  const pathD = points
    .map((point, index) => (index === 0 ? `M ${point.x} ${point.y}` : `L ${point.x} ${point.y}`))
    .join(" ");

  const areaD = `${pathD} L ${width} ${height} L 0 ${height} Z`;

  return (
    <svg viewBox={`0 0 ${width} ${height}`} className={className} preserveAspectRatio="none">
      <defs>
        <linearGradient id={`lineGrad-${color.replace('#', '')}`} x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor={color} stopOpacity="0.3" />
          <stop offset="100%" stopColor={color} stopOpacity="0" />
        </linearGradient>
        <linearGradient id={`lineStroke-${color.replace('#', '')}`} x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor={color} stopOpacity="0.6" />
          <stop offset="100%" stopColor={color} />
        </linearGradient>
      </defs>
      <path d={areaD} fill={`url(#lineGrad-${color.replace('#', '')})`} />
      <path d={pathD} fill="none" stroke={`url(#lineStroke-${color.replace('#', '')})`} strokeWidth="0.8" strokeLinecap="round" strokeLinejoin="round" />
      {points.slice(-3).map((point, index) => (
        <circle
          key={index}
          cx={point.x}
          cy={point.y}
          r="1.2"
          fill={color}
          className="animate-pulse"
          style={{ animationDelay: `${index * 200}ms` }}
        />
      ))}
    </svg>
  );
}
