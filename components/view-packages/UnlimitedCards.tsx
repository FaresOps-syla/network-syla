'use client';

import { Infinity } from 'lucide-react';

// Mock data — replace with real API later
const mockUnlimited = [
  { id: '1', name: 'Unlimited EU 7 days', duration: '7 days', fromPrice: '€14.99' },
  { id: '2', name: 'Unlimited EU 15 days', duration: '15 days', fromPrice: '€24.99' },
  { id: '3', name: 'Unlimited EU 30 days', duration: '30 days', fromPrice: '€39.99' },
  { id: '4', name: 'Unlimited Global 7 days', duration: '7 days', fromPrice: '€29.99' },
  { id: '5', name: 'Unlimited Global 15 days', duration: '15 days', fromPrice: '€49.99' },
  { id: '6', name: 'Unlimited Global 30 days', duration: '30 days', fromPrice: '€79.99' },
];

export default function UnlimitedCards() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
      {mockUnlimited.map((pkg) => (
        <div
          key={pkg.id}
          className="bg-white border border-gray-200 rounded-lg p-4 shadow-sm hover:border-gray-300 transition-colors"
        >
          <div className="flex items-start justify-between gap-3">
            <div className="min-w-0 flex-1">
              <p className="text-sm font-semibold text-gray-900 truncate">{pkg.name}</p>
              <p className="text-xs text-gray-500 mt-0.5">{pkg.duration}</p>
              <p className="text-sm font-medium text-violet-600 mt-2">{pkg.fromPrice}</p>
            </div>
            <div className="w-10 h-10 rounded-lg bg-violet-100 text-violet-600 flex items-center justify-center flex-shrink-0">
              <Infinity className="w-5 h-5" />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
