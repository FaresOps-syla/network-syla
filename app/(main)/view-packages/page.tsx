'use client';

import { useState } from 'react';
import { cn } from '@/lib/utils';
import CountryCards from '@/components/view-packages/CountryCards';
import RegionCards from '@/components/view-packages/RegionCards';
import UnlimitedCards from '@/components/view-packages/UnlimitedCards';

type TabId = 'countries' | 'regions' | 'unlimited';

const tabs: { id: TabId; label: string }[] = [
  { id: 'countries', label: 'Countries' },
  { id: 'regions', label: 'Regions' },
  { id: 'unlimited', label: 'Unlimited' },
];

export default function ViewPackagesPage() {
  const [activeTab, setActiveTab] = useState<TabId>('countries');

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900 mb-1">View packages</h1>
        <p className="text-sm text-gray-500">Browse packages by country, region, or unlimited plans</p>
      </div>

      {/* Tabs */}
      <div className="border-b border-gray-200">
        <nav className="flex gap-1" aria-label="Package tabs">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              type="button"
              onClick={() => setActiveTab(tab.id)}
              className={cn(
                'px-4 py-2.5 text-sm font-medium rounded-t-lg transition-colors',
                activeTab === tab.id
                  ? 'bg-white border border-b-0 border-gray-200 text-blue-600 -mb-px'
                  : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
              )}
            >
              {tab.label}
            </button>
          ))}
        </nav>
      </div>

      {/* Tab content */}
      <div className="pt-2">
        {activeTab === 'countries' && <CountryCards />}
        {activeTab === 'regions' && <RegionCards />}
        {activeTab === 'unlimited' && <UnlimitedCards />}
      </div>
    </div>
  );
}
