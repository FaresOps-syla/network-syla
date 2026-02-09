'use client';

import { useState } from 'react';
import {
  Search,
  Filter,
  FileText,
  Phone,
  MessageSquare,
  Calendar,
} from 'lucide-react';

type SearchFilterType = 'all' | 'iccid' | 'country' | 'carrier';
import { cn } from '@/lib/utils';

type CDRType = 'data' | 'voice' | 'sms';

interface CDR {
  id: string;
  eventDate: string;
  iccid: string;
  imsi: string;
  profile: string;
  dataUsage: number; // in MB
  country: string;
  mappedIMSIDI: string;
  carrier?: string;
}

const mockDataCDRs: CDR[] = [
  {
    id: 'CDR-001',
    eventDate: '2024-01-20T10:30:00',
    iccid: '89012345678901234567',
    imsi: '310150123456789',
    profile: 'Europe 10GB',
    dataUsage: 125.5,
    country: 'France',
    mappedIMSIDI: '310150123456789',
    carrier: 'Orange',
  },
  {
    id: 'CDR-002',
    eventDate: '2024-01-20T11:15:00',
    iccid: '89012345678901234568',
    imsi: '310150123456790',
    profile: 'Global 20GB',
    dataUsage: 89.2,
    country: 'United States',
    mappedIMSIDI: '310150123456790',
    carrier: 'AT&T',
  },
  {
    id: 'CDR-003',
    eventDate: '2024-01-20T12:00:00',
    iccid: '89012345678901234567',
    imsi: '310150123456789',
    profile: 'Europe 10GB',
    dataUsage: 45.8,
    country: 'Germany',
    mappedIMSIDI: '310150123456789',
    carrier: 'Vodafone',
  },
];

const mockVoiceCDRs: CDR[] = [
  {
    id: 'CDR-V001',
    eventDate: '2024-01-20T09:00:00',
    iccid: '89012345678901234567',
    imsi: '310150123456789',
    profile: 'Europe 10GB',
    dataUsage: 0,
    country: 'France',
    mappedIMSIDI: '310150123456789',
    carrier: 'Orange',
  },
  {
    id: 'CDR-V002',
    eventDate: '2024-01-20T14:30:00',
    iccid: '89012345678901234568',
    imsi: '310150123456790',
    profile: 'Global 20GB',
    dataUsage: 0,
    country: 'United States',
    mappedIMSIDI: '310150123456790',
    carrier: 'AT&T',
  },
];

const mockSMSCDRs: CDR[] = [
  {
    id: 'CDR-S001',
    eventDate: '2024-01-20T08:15:00',
    iccid: '89012345678901234567',
    imsi: '310150123456789',
    profile: 'Europe 10GB',
    dataUsage: 0,
    country: 'France',
    mappedIMSIDI: '310150123456789',
    carrier: 'Orange',
  },
  {
    id: 'CDR-S002',
    eventDate: '2024-01-20T16:45:00',
    iccid: '89012345678901234568',
    imsi: '310150123456790',
    profile: 'Global 20GB',
    dataUsage: 0,
    country: 'United States',
    mappedIMSIDI: '310150123456790',
    carrier: 'AT&T',
  },
];

function formatDate(dateStr: string) {
  const date = new Date(dateStr);
  return date.toLocaleString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });
}

export default function CDRsPage() {
  const [activeTab, setActiveTab] = useState<CDRType>('data');
  const [searchQuery, setSearchQuery] = useState('');
  const [searchFilter, setSearchFilter] = useState<SearchFilterType>('all');

  const getCDRsForTab = (): CDR[] => {
    switch (activeTab) {
      case 'data':
        return mockDataCDRs;
      case 'voice':
        return mockVoiceCDRs;
      case 'sms':
        return mockSMSCDRs;
      default:
        return [];
    }
  };

  const allCDRs = getCDRsForTab();

  const filteredCDRs = searchQuery.trim()
    ? allCDRs.filter((cdr) => {
        const query = searchQuery.toLowerCase();
        switch (searchFilter) {
          case 'iccid':
            return cdr.iccid.includes(query);
          case 'country':
            return cdr.country.toLowerCase().includes(query);
          case 'carrier':
            return cdr.carrier?.toLowerCase().includes(query) ?? false;
          default:
            return (
              cdr.iccid.includes(query) ||
              cdr.country.toLowerCase().includes(query) ||
              cdr.carrier?.toLowerCase().includes(query)
            );
        }
      })
    : [];

  const tabs = [
    { id: 'data' as CDRType, label: 'Data CDRs', icon: FileText },
    { id: 'voice' as CDRType, label: 'Voice CDRs', icon: Phone },
    { id: 'sms' as CDRType, label: 'SMS CDRs', icon: MessageSquare },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-gray-900 mb-2">CDRs</h1>
        <p className="text-sm text-gray-600">
          View and search Call Detail Records for data, voice, and SMS
        </p>
      </div>

      {/* Tabs */}
      <div className="border-b border-gray-200">
        <nav className="flex gap-1">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            return (
              <button
                key={tab.id}
                onClick={() => {
                  setActiveTab(tab.id);
                  setSearchQuery('');
                }}
                className={cn(
                  'flex items-center gap-2 px-4 py-3 text-sm font-medium border-b-2 transition-colors',
                  activeTab === tab.id
                    ? 'border-blue-600 text-blue-600'
                    : 'border-transparent text-gray-600 hover:text-gray-900 hover:border-gray-300'
                )}
              >
                <Icon className="w-4 h-4" />
                {tab.label}
              </button>
            );
          })}
        </nav>
      </div>

      {/* Search */}
      <div className="bg-white border border-gray-200 rounded-lg p-4">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              type="text"
              placeholder={
                searchFilter === 'all'
                  ? 'Search by ICCID, Country, or Carrier...'
                  : `Search by ${searchFilter.charAt(0).toUpperCase() + searchFilter.slice(1)}...`
              }
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent outline-none text-sm"
            />
          </div>
          <div className="flex items-center gap-2">
            <Filter className="w-4 h-4 text-gray-400 flex-shrink-0" />
            <select
              value={searchFilter}
              onChange={(e) => setSearchFilter(e.target.value as SearchFilterType)}
              className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent outline-none text-sm bg-white min-w-[140px]"
            >
              <option value="all">All</option>
              <option value="iccid">ICCID</option>
              <option value="country">Country</option>
              <option value="carrier">Carrier</option>
            </select>
          </div>
        </div>
      </div>

      {/* Table */}
      <div className="bg-white border border-gray-200 rounded-lg overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="px-4 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                  CDR ID
                </th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                  Event Date
                </th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                  ICCID
                </th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                  IMSI
                </th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                  Profile
                </th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                  Data Usage
                </th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                  Country
                </th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                  Mapped IMSIDI
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {searchQuery.trim() ? (
                filteredCDRs.length > 0 ? (
                  filteredCDRs.map((cdr) => (
                    <tr key={cdr.id} className="hover:bg-gray-50 transition-colors">
                      <td className="px-4 py-3">
                        <span className="text-sm font-medium text-gray-900">{cdr.id}</span>
                      </td>
                      <td className="px-4 py-3">
                        <div className="flex items-center gap-2">
                          <Calendar className="w-4 h-4 text-gray-400" />
                          <span className="text-sm text-gray-900">{formatDate(cdr.eventDate)}</span>
                        </div>
                      </td>
                      <td className="px-4 py-3">
                        <span className="text-sm font-mono text-gray-900">{cdr.iccid}</span>
                      </td>
                      <td className="px-4 py-3">
                        <span className="text-sm font-mono text-gray-900">{cdr.imsi}</span>
                      </td>
                      <td className="px-4 py-3">
                        <span className="text-sm text-gray-900">{cdr.profile}</span>
                      </td>
                      <td className="px-4 py-3">
                        <span className="text-sm text-gray-900">
                          {cdr.dataUsage > 0 ? `${cdr.dataUsage.toFixed(2)} MB` : '—'}
                        </span>
                      </td>
                      <td className="px-4 py-3">
                        <span className="text-sm text-gray-900">{cdr.country}</span>
                      </td>
                      <td className="px-4 py-3">
                        <span className="text-sm font-mono text-gray-900">{cdr.mappedIMSIDI}</span>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={8} className="px-4 py-12 text-center">
                      <Search className="w-12 h-12 text-gray-400 mx-auto mb-3" />
                      <p className="text-gray-600 font-medium">No CDRs found</p>
                      <p className="text-sm text-gray-500 mt-1">
                        Try adjusting your search query
                      </p>
                    </td>
                  </tr>
                )
              ) : (
                <tr>
                  <td colSpan={8} className="px-4 py-12 text-center">
                    <Search className="w-12 h-12 text-gray-400 mx-auto mb-3" />
                    <p className="text-gray-600 font-medium">Search to view CDRs</p>
                    <p className="text-sm text-gray-500 mt-1">
                      Enter ICCID, Country, or Carrier to search for CDRs
                    </p>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Summary */}
      {searchQuery.trim() && filteredCDRs.length > 0 && (
        <div className="flex items-center justify-between text-sm text-gray-600">
          <span>
            Showing {filteredCDRs.length} {activeTab} CDR{filteredCDRs.length !== 1 ? 's' : ''}
          </span>
        </div>
      )}
    </div>
  );
}
