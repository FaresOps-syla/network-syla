'use client';

import { MapPin } from 'lucide-react';

// Mock data — replace with real API later
const mockRegions = [
  { id: '1', name: 'Europe', countriesCount: 28, packagesCount: 45, fromPrice: '€3.99' },
  { id: '2', name: 'North America', countriesCount: 3, packagesCount: 15, fromPrice: '€8.99' },
  { id: '3', name: 'Asia Pacific', countriesCount: 18, packagesCount: 32, fromPrice: '€6.99' },
  { id: '4', name: 'Middle East', countriesCount: 12, packagesCount: 20, fromPrice: '€7.49' },
  { id: '5', name: 'Latin America', countriesCount: 22, packagesCount: 28, fromPrice: '€5.99' },
  { id: '6', name: 'Africa', countriesCount: 15, packagesCount: 24, fromPrice: '€4.99' },
];

export default function RegionCards() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
      {mockRegions.map((region) => (
        <div
          key={region.id}
          className="bg-white border border-gray-200 rounded-lg p-4 shadow-sm hover:border-gray-300 transition-colors"
        >
          <div className="flex items-start justify-between gap-3">
            <div className="min-w-0 flex-1">
              <p className="text-sm font-semibold text-gray-900 truncate">{region.name}</p>
              <p className="text-xs text-gray-500 mt-0.5">
                {region.countriesCount} countries · {region.packagesCount} packages
              </p>
              <p className="text-sm font-medium text-emerald-600 mt-2">From {region.fromPrice}</p>
            </div>
            <div className="w-10 h-10 rounded-lg bg-emerald-100 text-emerald-600 flex items-center justify-center flex-shrink-0">
              <MapPin className="w-5 h-5" />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
