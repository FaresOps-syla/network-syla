'use client';

import { useState } from 'react';
import { Database, TrendingUp } from 'lucide-react';

const CHART_COLOR = '#19379D';

// Cards: data usage summary
const dataUsedThisMonth = { value: '2,847', unit: 'GB', subtext: 'February 2026' };
const totalDataUsed = { value: '48.2', unit: 'TB', subtext: 'All time' };

// Line chart: data consumption (GB) — by day or by week
const consumptionByDay = [
  { label: 'Mon', value: 312 },
  { label: 'Tue', value: 428 },
  { label: 'Wed', value: 385 },
  { label: 'Thu', value: 501 },
  { label: 'Fri', value: 467 },
  { label: 'Sat', value: 398 },
  { label: 'Sun', value: 356 },
];

const consumptionByWeek = [
  { label: 'W1', value: 2_240 },
  { label: 'W2', value: 2_180 },
  { label: 'W3', value: 2_650 },
  { label: 'W4', value: 2_410 },
  { label: 'W5', value: 2_890 },
  { label: 'W6', value: 2_720 },
];

// Top Countries by data usage
const topCountriesData = [
  { code: 'TN', label: 'Tunisia', dataGb: 1240, sessions: 892 },
  { code: 'TR', label: 'Turkey', dataGb: 890, sessions: 456 },
  { code: 'QA', label: 'Qatar', dataGb: 456, sessions: 234 },
  { code: 'AF', label: 'Afghanistan', dataGb: 120, sessions: 89 },
  { code: 'EG', label: 'Egypt', dataGb: 98, sessions: 67 },
  { code: 'FR', label: 'France', dataGb: 87, sessions: 54 },
  { code: 'MA', label: 'Morocco', dataGb: 76, sessions: 43 },
  { code: 'BE', label: 'Belgium', dataGb: 65, sessions: 38 },
  { code: 'DE', label: 'Germany', dataGb: 54, sessions: 32 },
  { code: 'ES', label: 'Spain', dataGb: 43, sessions: 28 },
];

function LineChart({
  data,
  color,
  height = 200,
}: {
  data: { label: string; value: number }[];
  color: string;
  height?: number;
}) {
  const width = 400;
  const padding = { top: 16, right: 16, bottom: 28, left: 40 };
  const innerWidth = width - padding.left - padding.right;
  const innerHeight = height - padding.top - padding.bottom;
  const maxVal = Math.max(...data.map((d) => d.value), 1);
  const minVal = Math.min(...data.map((d) => d.value), 0);

  const scaleY = (v: number) =>
    padding.top + innerHeight - ((v - minVal) / (maxVal - minVal || 1)) * innerHeight;
  const scaleX = (i: number) =>
    padding.left + (i / Math.max(1, data.length - 1)) * innerWidth;

  const points = data
    .map((d, i) => `${scaleX(i)},${scaleY(d.value)}`)
    .join(' ');
  const pathD = points ? `M ${points.replace(/ /g, ' L ')}` : '';

  return (
    <div className="w-full overflow-x-auto">
      <svg
        viewBox={`0 0 ${width} ${height}`}
        className="w-full max-w-full"
        style={{ minWidth: 320 }}
      >
        {[0.25, 0.5, 0.75].map((p) => (
          <line
            key={p}
            x1={padding.left}
            y1={padding.top + (1 - p) * innerHeight}
            x2={width - padding.right}
            y2={padding.top + (1 - p) * innerHeight}
            stroke="#e5e7eb"
            strokeDasharray="4 4"
            strokeWidth="1"
          />
        ))}
        <path
          d={pathD}
          fill="none"
          stroke={color}
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        {data.map((d, i) => (
          <circle
            key={d.label}
            cx={scaleX(i)}
            cy={scaleY(d.value)}
            r="4"
            fill={color}
            stroke="white"
            strokeWidth="2"
          />
        ))}
      </svg>
      <div
        className="flex justify-between mt-1 px-1"
        style={{ marginLeft: padding.left, marginRight: padding.right }}
      >
        {data.map((d) => (
          <span key={d.label} className="text-xs text-gray-600">
            {d.label}
          </span>
        ))}
      </div>
    </div>
  );
}

export default function DataUsagePage() {
  const [chartRange, setChartRange] = useState<'day' | 'week'>('day');
  const [topCountriesMode, setTopCountriesMode] = useState<'data' | 'sessions'>('data');

  const chartData = chartRange === 'day' ? consumptionByDay : consumptionByWeek;
  const topCountriesValues = topCountriesData.map((c) =>
    topCountriesMode === 'data' ? c.dataGb : c.sessions
  );
  const maxCountryValue = Math.max(...topCountriesValues, 1);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900 mb-1">Data usage</h1>
        <p className="text-sm text-gray-500">Consumption over time and by country</p>
      </div>

      <div className="flex flex-col lg:flex-row gap-6">
        {/* Left: w-2/3 — cards + line chart */}
        <div className="lg:w-2/3 space-y-6">
          {/* 2 cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="bg-white border border-gray-200 rounded-lg p-5 shadow-sm">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs text-gray-600 mb-1">Data used this month</p>
                  <p className="text-2xl font-bold text-gray-900">
                    {dataUsedThisMonth.value} <span className="text-lg font-semibold text-gray-600">{dataUsedThisMonth.unit}</span>
                  </p>
                  <p className="text-xs text-gray-500 mt-1">{dataUsedThisMonth.subtext}</p>
                </div>
                <div className="w-11 h-11 rounded-lg bg-blue-100 flex items-center justify-center">
                  <Database className="w-5 h-5 text-blue-600" />
                </div>
              </div>
            </div>
            <div className="bg-white border border-gray-200 rounded-lg p-5 shadow-sm">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs text-gray-600 mb-1">Total data used</p>
                  <p className="text-2xl font-bold text-gray-900">
                    {totalDataUsed.value} <span className="text-lg font-semibold text-gray-600">{totalDataUsed.unit}</span>
                  </p>
                  <p className="text-xs text-gray-500 mt-1">{totalDataUsed.subtext}</p>
                </div>
                <div className="w-11 h-11 rounded-lg bg-emerald-100 flex items-center justify-center">
                  <TrendingUp className="w-5 h-5 text-emerald-600" />
                </div>
              </div>
            </div>
          </div>

          {/* Line chart: data consumption with day/week filter */}
          <div className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-4">
              <div>
                <h2 className="text-lg font-bold text-gray-900">Consumption over time</h2>
                <p className="text-sm text-gray-500">Data usage (GB) by day or week</p>
              </div>
              <div className="flex rounded-lg overflow-hidden border border-gray-200 w-fit">
                <button
                  type="button"
                  onClick={() => setChartRange('day')}
                  className={`px-3 py-2 text-sm font-medium transition-colors ${
                    chartRange === 'day'
                      ? 'bg-[#19379D] text-white'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  By day
                </button>
                <button
                  type="button"
                  onClick={() => setChartRange('week')}
                  className={`px-3 py-2 text-sm font-medium transition-colors ${
                    chartRange === 'week'
                      ? 'bg-[#19379D] text-white'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  By week
                </button>
              </div>
            </div>
            <div className="flex items-center gap-2 mb-4">
              <div
                className="w-4 h-4 rounded-sm flex-shrink-0"
                style={{ backgroundColor: CHART_COLOR }}
              />
              <span className="text-sm text-gray-700">
                {chartRange === 'day' ? 'GB per day' : 'GB per week'}
              </span>
            </div>
            <LineChart data={chartData} color={CHART_COLOR} height={220} />
          </div>
        </div>

        {/* Right: w-1/3 — Top Countries */}
        <div className="lg:w-1/3">
          <div className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm sticky top-4">
            <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3 mb-4">
              <div>
                <h2 className="text-lg font-bold text-gray-900">Top countries</h2>
                <p className="text-sm text-gray-500 mt-0.5">
                  Data consumption by country
                </p>
              </div>
              <div className="flex rounded-lg overflow-hidden border border-gray-200 flex-shrink-0">
                <button
                  type="button"
                  onClick={() => setTopCountriesMode('data')}
                  className={`px-3 py-1.5 text-sm font-medium transition-colors ${
                    topCountriesMode === 'data'
                      ? 'bg-[#19379D] text-white'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  Data (GB)
                </button>
                <button
                  type="button"
                  onClick={() => setTopCountriesMode('sessions')}
                  className={`px-3 py-1.5 text-sm font-medium transition-colors ${
                    topCountriesMode === 'sessions'
                      ? 'bg-[#19379D] text-white'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  Sessions
                </button>
              </div>
            </div>

            <ul className="space-y-4 max-h-[340px] overflow-y-auto pr-1">
              {topCountriesData.map((country, index) => {
                const value = topCountriesMode === 'data' ? country.dataGb : country.sessions;
                return (
                  <li key={`${country.code}-${index}`} className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-full bg-gray-100 flex items-center justify-center flex-shrink-0 text-xs font-bold text-gray-700">
                      {country.code}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                        <div
                          className="h-full rounded-full bg-[#19379D]"
                          style={{
                            width: `${maxCountryValue > 0 ? (value / maxCountryValue) * 100 : 0}%`,
                          }}
                        />
                      </div>
                    </div>
                    <span className="text-sm font-bold text-gray-900 w-12 text-right flex-shrink-0">
                      {topCountriesMode === 'data' ? `${value} GB` : value}
                    </span>
                  </li>
                );
              })}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
