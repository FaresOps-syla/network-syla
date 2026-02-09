'use client';

import { Globe } from 'lucide-react';

// Mock data — replace with real API later
const mockCountries = [
  { id: '1', name: 'France', code: 'FR', packagesCount: 12, fromPrice: '€4.99' },
  { id: '2', name: 'United States', code: 'US', packagesCount: 8, fromPrice: '€9.99' },
  { id: '3', name: 'Germany', code: 'DE', packagesCount: 10, fromPrice: '€3.99' },
  { id: '4', name: 'Spain', code: 'ES', packagesCount: 9, fromPrice: '€4.49' },
  { id: '5', name: 'United Kingdom', code: 'GB', packagesCount: 11, fromPrice: '€5.99' },
  { id: '6', name: 'Japan', code: 'JP', packagesCount: 6, fromPrice: '€12.99' },
];

export default function CountryCards() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
      {mockCountries.map((country) => (
        <div
          key={country.id}
          className="bg-white border border-gray-200 rounded-lg p-4 shadow-sm hover:border-gray-300 transition-colors"
        >
          <div className="flex items-start justify-between gap-3">
            <div className="min-w-0 flex-1">
              <p className="text-sm font-semibold text-gray-900 truncate">{country.name}</p>
              <p className="text-xs text-gray-500 mt-0.5">{country.packagesCount} packages</p>
              <p className="text-sm font-medium text-blue-600 mt-2">From {country.fromPrice}</p>
            </div>
            <div className="w-10 h-10 rounded-lg bg-blue-100 text-blue-600 flex items-center justify-center flex-shrink-0">
              <Globe className="w-5 h-5" />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
