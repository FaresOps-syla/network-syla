'use client';

import { useState } from 'react';
import { Headphones, Calendar } from 'lucide-react';

const CHART_BAR_COLOR = '#19379D';

// Top Countries - for now use letter icons (replace with country flags later)
const topCountriesData = [
  { code: 'TN', label: 'Tunisia', value: 135 },
  { code: 'TR', label: 'Turkey', value: 30 },
  { code: 'QA', label: 'Qatar', value: 21 },
  { code: 'AF', label: 'Afghanistan', value: 6 },
  { code: 'EG', label: 'Egypt', value: 3 },
  { code: 'FR', label: 'France', value: 3 },
  { code: 'MA', label: 'Morocco', value: 3 },
  { code: 'BE', label: 'Belgium', value: 3 },
];

// Last consumption records in detail
const lastConsumptionRecords = [
  {
    id: '1',
    date: '2024-01-20T14:32:00',
    iccid: '89012345678901234567',
    imsi: '310150123456789',
    dataGb: 2.45,
    country: 'France',
    carrier: 'Orange',
  },
  {
    id: '2',
    date: '2024-01-20T12:15:00',
    iccid: '89012345678901234568',
    imsi: '310150123456790',
    dataGb: 1.82,
    country: 'United States',
    carrier: 'AT&T',
  },
  {
    id: '3',
    date: '2024-01-20T09:48:00',
    iccid: '89012345678901234569',
    imsi: '310150123456791',
    dataGb: 0.95,
    country: 'Germany',
    carrier: 'Vodafone',
  },
  {
    id: '4',
    date: '2024-01-19T18:22:00',
    iccid: '89012345678901234570',
    imsi: '310150123456792',
    dataGb: 3.12,
    country: 'Spain',
    carrier: 'Telefonica',
  },
  {
    id: '5',
    date: '2024-01-19T11:05:00',
    iccid: '89012345678901234571',
    imsi: '310150123456793',
    dataGb: 0.56,
    country: 'Italy',
    carrier: 'TIM',
  },
];

function formatDate(dateStr: string) {
  return new Date(dateStr).toLocaleString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });
}

export default function AnalyticsPage() {
  const [topCountriesMode, setTopCountriesMode] = useState<'orders' | 'data'>('orders');
  const maxCountryValue = Math.max(...topCountriesData.map((d) => d.value));

  // Gauge: spending vs budget style for consumption (e.g. used vs limit)
  const spendingMonthly = 3974.09; // GB
  const budget = 5000;
  const recurringFees = 29;
  const gaugePercent = budget > 0 ? Math.min(100, Math.round((spendingMonthly / budget) * 100)) : 0;

  return (
    <div className="space-y-6">


      <div className="flex flex-col lg:flex-row gap-6">
        {/* w-2/3: Gauge + Last consumption records */}
        <div className="lg:w-2/3 space-y-6">
          {/* Consumption gauge (semi-circular) */}
          <div className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
              <div className="flex flex-col items-center">
                <div className="relative w-48 h-24">
                  <svg viewBox="0 0 200 100" className="w-full h-full">
                    <path
                      d="M 20 90 A 80 80 0 0 1 180 90"
                      fill="none"
                      stroke="#e5e7eb"
                      strokeWidth="16"
                      strokeLinecap="round"
                    />
                    <path
                      d="M 20 90 A 80 80 0 0 1 180 90"
                      fill="none"
                      stroke={CHART_BAR_COLOR}
                      strokeWidth="16"
                      strokeLinecap="round"
                      strokeDasharray={`${(gaugePercent / 100) * 251.2} 251.2`}
                    />
                  </svg>
                  <span className="absolute inset-0 flex items-center justify-center pt-6 text-2xl font-bold text-gray-900">
                    {gaugePercent}%
                  </span>
                </div>
              </div>
              <div className="flex-1 space-y-3">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-[#19379D]" />
                  <span className="text-sm text-gray-700">
                    Spending (Monthly): <strong>{spendingMonthly.toLocaleString()} GB</strong>
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-[#93c5fd]" />
                  <span className="text-sm text-gray-700">
                    Budget: <strong>{budget.toLocaleString()} GB</strong>
                  </span>
                </div>
                <div className="text-sm text-gray-600 pt-1">
                  Recurring Fees: <strong>{recurringFees.toLocaleString()}</strong>
                </div>
              </div>
            </div>
          </div>

          {/* Last consumption records in detail */}
          <div className="bg-white border border-gray-200 rounded-lg overflow-hidden shadow-sm">
            <div className="px-6 py-4 border-b border-gray-200">
              <h2 className="text-lg font-bold text-gray-900">Last consumption records</h2>
              <p className="text-sm text-gray-500">Detailed view of recent data usage</p>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50 border-b border-gray-200">
                  <tr>
                    <th className="px-4 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                      Date
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                      ICCID
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                      IMSI
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                      Data (GB)
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                      Country
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                      Carrier
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {lastConsumptionRecords.map((row) => (
                    <tr key={row.id} className="hover:bg-gray-50 transition-colors">
                      <td className="px-4 py-3">
                        <div className="flex items-center gap-2 text-sm text-gray-700">
                          <Calendar className="w-4 h-4 text-gray-400 flex-shrink-0" />
                          {formatDate(row.date)}
                        </div>
                      </td>
                      <td className="px-4 py-3 text-sm font-mono text-gray-900">{row.iccid}</td>
                      <td className="px-4 py-3 text-sm font-mono text-gray-900">{row.imsi}</td>
                      <td className="px-4 py-3 text-sm font-semibold text-gray-900">
                        {row.dataGb.toFixed(2)} GB
                      </td>
                      <td className="px-4 py-3 text-sm text-gray-900">{row.country}</td>
                      <td className="px-4 py-3 text-sm text-gray-900">{row.carrier}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* w-1/3: Top Countries widget */}
        <div className="lg:w-1/3">
          <div className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm relative pb-16">
            <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3 mb-4">
              <div>
                <h2 className="text-lg font-bold text-gray-900">Top Countries</h2>
                <p className="text-sm text-gray-500 mt-0.5">
                  Most visited countries across all companies
                </p>
              </div>
              <div className="flex rounded-lg overflow-hidden border border-gray-200 flex-shrink-0">
                <button
                  onClick={() => setTopCountriesMode('orders')}
                  className={`px-3 py-1.5 text-sm font-medium transition-colors ${
                    topCountriesMode === 'orders'
                      ? 'bg-[#19379D] text-white'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  Orders
                </button>
                <button
                  onClick={() => setTopCountriesMode('data')}
                  className={`px-3 py-1.5 text-sm font-medium transition-colors ${
                    topCountriesMode === 'data'
                      ? 'bg-[#19379D] text-white'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  Data
                </button>
              </div>
            </div>

            <ul className="space-y-4">
              {topCountriesData.map((country, index) => (
                <li key={`${country.code}-${index}`} className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-full bg-gray-100 flex items-center justify-center flex-shrink-0 text-xs font-bold text-gray-700">
                    {country.code}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                      <div
                        className="h-full rounded-full bg-[#19379D]"
                        style={{
                          width: `${maxCountryValue > 0 ? (country.value / maxCountryValue) * 100 : 0}%`,
                        }}
                      />
                    </div>
                  </div>
                  <span className="text-sm font-bold text-gray-900 w-10 text-right flex-shrink-0">
                    {country.value}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
