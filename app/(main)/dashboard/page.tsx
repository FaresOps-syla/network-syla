'use client';

import { useState } from 'react';
import { TrendingUp, Package, Smartphone, Clock, ChevronDown } from 'lucide-react';

// Chart style - match reference
const CHART_BAR_COLOR = '#19379D';
const CARD_BG = 'bg-white';
const CARD_BORDER = 'border border-gray-200';
const TEXT_TITLE = 'text-gray-900 font-bold';
const TEXT_SUBTITLE = 'text-sm text-gray-500';
const TEXT_MUTED = 'text-gray-600';

// Mock data for cards - same clean style
const cardStats = [
  { label: 'Total eSIMs', value: '248', subtext: '+12% from last month', icon: Package },
  { label: 'In-Service', value: '186', subtext: 'Active connections', icon: Smartphone },
  { label: 'Pre-Service', value: '48', subtext: 'Ready to activate', icon: Clock },
  { label: 'Consumption (GB)', value: '1,240', subtext: 'This month', icon: TrendingUp },
];

// Full 12 months for bar chart (GB)
const consumptionData = [
  { label: 'Jan', value: 106.6 },
  { label: 'Feb', value: 21.8 },
  { label: 'Mar', value: 14.2 },
  { label: 'Apr', value: 20.9 },
  { label: 'May', value: 23.3 },
  { label: 'Jun', value: 15.9 },
  { label: 'Jul', value: 18.3 },
  { label: 'Aug', value: 20.8 },
  { label: 'Sep', value: 28.2 },
  { label: 'Oct', value: 18.2 },
  { label: 'Nov', value: 18.3 },
  { label: 'Dec', value: 8.5 },
];

const esimStatusData = [
  { label: 'In-Service', value: 186, color: '#19379D' },
  { label: 'Pre-Service', value: 62, color: '#6b7280' },
];

const Y_AXIS_TICKS = 5;

export default function DashboardPage() {
  const [selectedYear, setSelectedYear] = useState('2026');
  const maxConsumption = Math.max(...consumptionData.map((d) => d.value));
  const totalEsims = esimStatusData.reduce((s, d) => s + d.value, 0);

  return (
    <div className="space-y-6">
      {/* <div>
        <h1 className="text-2xl font-bold text-gray-900 mb-1">Overview</h1>
        <p className="text-sm text-gray-500">Your eSIM and consumption summary</p>
      </div> */}

      {/* 4 Cards - same clean style as chart container */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {cardStats.map((stat) => {
          const Icon = stat.icon;
          return (
            <div
              key={stat.label}
              className={`${CARD_BG} ${CARD_BORDER} rounded-lg p-5 shadow-sm`}
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className={`text-xs ${TEXT_MUTED} mb-1`}>{stat.label}</p>
                  <p className={`text-2xl ${TEXT_TITLE}`}>{stat.value}</p>
                  <p className={`text-xs ${TEXT_SUBTITLE} mt-1`}>{stat.subtext}</p>
                </div>
                <div className="w-11 h-11 rounded-lg bg-gray-100 flex items-center justify-center">
                  <Icon className="w-5 h-5 text-gray-600" />
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <div className="flex flex-col lg:flex-row gap-6">
        {/* Bar chart - same style as reference */}
        <div className={`lg:w-3/4 ${CARD_BG} ${CARD_BORDER} rounded-lg p-6 shadow-sm`}>
          <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4 mb-4">
            <div>
              <h2 className={`text-xl ${TEXT_TITLE}`}>Consumption</h2>
              <p className={TEXT_SUBTITLE}>Monthly consumption overview and trends</p>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-sm text-gray-600">Year:</span>
              <div className="relative">
                <select
                  value={selectedYear}
                  onChange={(e) => setSelectedYear(e.target.value)}
                  className="appearance-none pl-3 pr-8 py-2 border border-gray-300 rounded text-sm font-medium text-gray-700 bg-white focus:ring-2 focus:ring-gray-200 focus:border-gray-400 outline-none"
                >
                  <option value="2024">2024</option>
                  <option value="2025">2025</option>
                  <option value="2026">2026</option>
                </select>
                <ChevronDown className="w-4 h-4 text-gray-500 absolute right-2 top-1/2 -translate-y-1/2 pointer-events-none" />
              </div>
            </div>
          </div>
          <div className="flex items-center gap-2 mb-6">
            <div
              className="w-4 h-4 rounded-sm flex-shrink-0"
              style={{ backgroundColor: CHART_BAR_COLOR }}
            />
            <span className="text-sm text-gray-700">Consumption GB</span>
          </div>

          {/* Chart with Y-axis and grid */}
          <div className="flex gap-4">
            <div className="flex flex-col justify-between py-1 text-xs text-gray-600 min-w-[48px]">
              {Array.from({ length: Y_AXIS_TICKS }, (_, i) => {
                const val = maxConsumption * (1 - i / (Y_AXIS_TICKS - 1));
                return (
                  <span key={i}>
                    {val >= 1000 ? `${(val / 1000).toFixed(0)}k` : val.toFixed(0)} GB
                  </span>
                );
              })}
            </div>
            <div className="flex-1 relative min-h-[240px]">
              {/* Dashed horizontal grid lines */}
              <div className="absolute inset-0 flex flex-col justify-between pointer-events-none">
                {Array.from({ length: Y_AXIS_TICKS - 1 }, (_, i) => (
                  <div
                    key={i}
                    className="border-b border-gray-200 border-dashed"
                    style={{ flex: 1 }}
                  />
                ))}
              </div>
              {/* Bars */}
              <div className="relative h-56 flex items-end justify-around gap-1 pt-2">
                {consumptionData.map((d) => (
                  <div
                    key={d.label}
                    className="flex-1 flex flex-col items-center justify-end min-w-0 max-w-[36px]"
                  >
                    <span className="text-xs font-semibold text-gray-800 mb-1 truncate w-full text-center">
                      {d.value >= 100 ? `${d.value.toFixed(0)}` : d.value.toFixed(1)} GB
                    </span>
                    <div
                      className="w-full rounded-t min-h-[4px]"
                      style={{
                        height: `${Math.max(2, (d.value / maxConsumption) * 100)}%`,
                        backgroundColor: CHART_BAR_COLOR,
                      }}
                    />
                  </div>
                ))}
              </div>
              {/* X-axis labels */}
              <div className="flex justify-around gap-1 mt-2">
                {consumptionData.map((d) => (
                  <span
                    key={d.label}
                    className="text-xs text-gray-600 flex-1 text-center min-w-0 max-w-[36px]"
                  >
                    {d.label}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Pie chart - same clean style */}
        <div className={`lg:w-1/4 ${CARD_BG} ${CARD_BORDER} rounded-lg p-6 shadow-sm`}>
          <h2 className={`text-xl ${TEXT_TITLE} mb-1`}>eSIM Status</h2>
          <p className={`text-sm ${TEXT_SUBTITLE} mb-4`}>Pre-Service vs In-Service</p>
          <div className="flex flex-col items-center">
            <PieChart data={esimStatusData} total={totalEsims} size={160} />
            <div className="mt-4 space-y-3 w-full">
              {esimStatusData.map((d) => (
                <div
                  key={d.label}
                  className="flex items-center justify-between text-sm"
                >
                  <div className="flex items-center gap-2">
                    <div
                      className="w-3.5 h-3.5 rounded-sm flex-shrink-0"
                      style={{ backgroundColor: d.color }}
                    />
                    <span className="text-gray-700">{d.label}</span>
                  </div>
                  <span className="font-semibold text-gray-900">{d.value}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function PieChart({
  data,
  total,
  size = 160,
}: {
  data: { label: string; value: number; color: string }[];
  total: number;
  size?: number;
}) {
  const cx = size / 2;
  const cy = size / 2;
  const rOuter = size / 2 - 4;
  const rInner = rOuter * 0.55; // inner radius for donut hole
  let offset = 0;

  const segments = data.map((d) => {
    const ratio = total > 0 ? d.value / total : 0;
    const angle = ratio * 360;
    const startAngle = offset;
    offset += angle;
    return { ...d, ratio, startAngle, angle };
  });

  const describeDonutSegment = (startAngle: number, sweepAngle: number) => {
    if (sweepAngle <= 0) return '';
    const outerStart = polarToCartesian(cx, cy, rOuter, startAngle);
    const outerEnd = polarToCartesian(cx, cy, rOuter, startAngle + sweepAngle);
    const innerEnd = polarToCartesian(cx, cy, rInner, startAngle + sweepAngle);
    const innerStart = polarToCartesian(cx, cy, rInner, startAngle);
    const largeArc = sweepAngle > 180 ? 1 : 0;
    return `M ${outerStart.x} ${outerStart.y} A ${rOuter} ${rOuter} 0 ${largeArc} 1 ${outerEnd.x} ${outerEnd.y} L ${innerEnd.x} ${innerEnd.y} A ${rInner} ${rInner} 0 ${largeArc} 0 ${innerStart.x} ${innerStart.y} Z`;
  };

  return (
    <svg width={size} height={size} className="flex-shrink-0">
      {segments.map((seg) => (
        <path
          key={seg.label}
          d={describeDonutSegment(seg.startAngle, seg.angle)}
          fill={seg.color}
          stroke="white"
          strokeWidth={2}
        />
      ))}
      {/* Inner circle (ensures clean donut hole) */}
      <circle
        cx={cx}
        cy={cy}
        r={rInner}
        fill="white"
      />
    </svg>
  );
}

function polarToCartesian(
  cx: number,
  cy: number,
  r: number,
  angleDeg: number
) {
  const angleRad = ((angleDeg - 90) * Math.PI) / 180;
  return {
    x: cx + r * Math.cos(angleRad),
    y: cy + r * Math.sin(angleRad),
  };
}
