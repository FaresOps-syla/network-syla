'use client';

import { useState } from 'react';
import {
  Search,
  Filter,
  ChevronLeft,
  ChevronRight,
  MoreVertical,
  Calendar,
} from 'lucide-react';

type SearchFilterType = 'iccid' | 'imsi' | 'country' | 'carrier';

interface LocationUpdate {
  id: string;
  eventDateUtc: string;
  iccid: string;
  imsiProfileId: string;
  country: string;
  carrier: string;
  locationUpdateType: string;
  connectionStatus: string;
  mappedIMSI: string;
}

const MAX_ICCID_INPUT = 20;

function formatDate(dateStr: string) {
  const date = new Date(dateStr);
  return date.toLocaleString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    timeZoneName: 'short',
  });
}

// Mock data - only used after search
const mockLocationUpdates: LocationUpdate[] = [
  {
    id: 'LU-001',
    eventDateUtc: '2024-01-20T10:30:00Z',
    iccid: '89012345678901234567',
    imsiProfileId: '310150123456789',
    country: 'France',
    carrier: 'Orange',
    locationUpdateType: 'Attach',
    connectionStatus: 'Connected',
    mappedIMSI: '310150123456789',
  },
  {
    id: 'LU-002',
    eventDateUtc: '2024-01-20T11:15:00Z',
    iccid: '89012345678901234568',
    imsiProfileId: '310150123456790',
    country: 'United States',
    carrier: 'AT&T',
    locationUpdateType: 'TAU',
    connectionStatus: 'Connected',
    mappedIMSI: '310150123456790',
  },
];

export default function LocationUpdatesPage() {
  const [searchFilter, setSearchFilter] = useState<SearchFilterType>('iccid');
  const [searchInput, setSearchInput] = useState('');
  const [hasSearched, setHasSearched] = useState(false);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);

  const inputLength = searchInput.replace(/\s/g, '').length;
  const isValidSearch =
    searchInput.trim().length >= 1 &&
    (searchFilter !== 'iccid' ||
      (inputLength === 19 || (inputLength >= 5 && inputLength <= 14)));

  const handleSearch = () => {
    if (!isValidSearch) return;
    setHasSearched(true);
    setCurrentPage(1);
  };

  const handleReset = () => {
    setSearchInput('');
    setHasSearched(false);
    setCurrentPage(1);
  };

  const filteredResults = hasSearched && isValidSearch ? mockLocationUpdates : [];
  const totalResults = filteredResults.length;
  const totalPages = Math.max(1, Math.ceil(totalResults / rowsPerPage));
  const paginatedResults = filteredResults.slice(
    (currentPage - 1) * rowsPerPage,
    currentPage * rowsPerPage
  );

  const getPlaceholder = () => {
    switch (searchFilter) {
      case 'iccid':
        return 'Enter between 5 to 14 digits or complete 19 digits of the ICCID';
      case 'imsi':
        return 'Enter IMSI to search';
      case 'country':
        return 'Enter country name';
      case 'carrier':
        return 'Enter carrier name';
      default:
        return 'Enter search term...';
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-gray-900 mb-2">Location Updates</h1>
      </div>

      {/* Filter and Search */}
      <div className="bg-white border border-gray-200 rounded-lg p-4">
        <div className="flex flex-col md:flex-row gap-4 items-start md:items-center flex-wrap">
          <div className="flex flex-col gap-1 flex-1 min-w-0">
            <div className="flex gap-2 flex-wrap">
              <div className="flex items-center gap-2">
                <Filter className="w-4 h-4 text-gray-400 flex-shrink-0" />
                <select
                  value={searchFilter}
                  onChange={(e) => {
                    setSearchFilter(e.target.value as SearchFilterType);
                    setSearchInput('');
                  }}
                  className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent outline-none text-sm bg-white min-w-[120px]"
                >
                  <option value="iccid">ICCID</option>
                  <option value="imsi">IMSI</option>
                  <option value="country">Country</option>
                  <option value="carrier">Carrier</option>
                </select>
              </div>
              <div className="flex-1 min-w-[200px]">
                <input
                  type="text"
                  placeholder={getPlaceholder()}
                  value={searchInput}
                  onChange={(e) => {
                    const val =
                      searchFilter === 'iccid'
                        ? e.target.value.replace(/\D/g, '').slice(0, MAX_ICCID_INPUT)
                        : e.target.value.slice(0, 50);
                    setSearchInput(val);
                  }}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent outline-none text-sm"
                />
                {searchFilter === 'iccid' && (
                  <p className="text-xs text-gray-500 mt-1">
                    {inputLength}/{MAX_ICCID_INPUT}
                  </p>
                )}
              </div>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={handleSearch}
              disabled={!isValidSearch}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg text-sm font-medium hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              Search
            </button>
            <button
              onClick={handleReset}
              className="px-4 py-2 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors"
            >
              Reset
            </button>
          </div>
          <div className="relative">
            <select className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent outline-none text-sm bg-white appearance-none pr-8">
              <option>Actions</option>
            </select>
            <MoreVertical className="w-4 h-4 text-gray-500 absolute right-2 top-1/2 -translate-y-1/2 pointer-events-none" />
          </div>
        </div>
      </div>

      {/* Results count and table */}
      <div className="bg-white border border-gray-200 rounded-lg overflow-hidden">
        <div className="px-4 py-3 border-b border-gray-200 flex items-center justify-between flex-wrap gap-2">
          <span className="text-sm text-gray-600">
            Viewing {paginatedResults.length} of {totalResults} results
          </span>
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <span className="text-sm text-gray-600">Rows per page</span>
              <select
                value={rowsPerPage}
                onChange={(e) => {
                  setRowsPerPage(Number(e.target.value));
                  setCurrentPage(1);
                }}
                className="px-2 py-1 border border-gray-300 rounded text-sm"
              >
                <option value={10}>10</option>
                <option value={25}>25</option>
                <option value={50}>50</option>
                <option value={100}>100</option>
              </select>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-sm text-gray-600">
                Page {currentPage} of {totalPages}
              </span>
              <button
                disabled={currentPage <= 1}
                onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                className="p-1.5 rounded border border-gray-300 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              <button
                disabled={currentPage >= totalPages}
                onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
                className="p-1.5 rounded border border-gray-300 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="px-4 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                  Location Update ID
                </th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                  Event Date (UTC)
                </th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                  ICCID
                </th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                  IMSI Profile ID
                </th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                  Country
                </th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                  Carrier
                </th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                  Location Update
                </th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                  Connection Status
                </th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                  Mapped IMSI
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {paginatedResults.length > 0 ? (
                paginatedResults.map((row) => (
                  <tr key={row.id} className="hover:bg-gray-50 transition-colors">
                    <td className="px-4 py-3 text-sm font-medium text-gray-900">{row.id}</td>
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-2">
                        <Calendar className="w-4 h-4 text-gray-400 flex-shrink-0" />
                        <span className="text-sm text-gray-900">{formatDate(row.eventDateUtc)}</span>
                      </div>
                    </td>
                    <td className="px-4 py-3 text-sm font-mono text-gray-900">{row.iccid}</td>
                    <td className="px-4 py-3 text-sm font-mono text-gray-900">{row.imsiProfileId}</td>
                    <td className="px-4 py-3 text-sm text-gray-900">{row.country}</td>
                    <td className="px-4 py-3 text-sm text-gray-900">{row.carrier}</td>
                    <td className="px-4 py-3 text-sm text-gray-900">{row.locationUpdateType}</td>
                    <td className="px-4 py-3 text-sm text-gray-900">{row.connectionStatus}</td>
                    <td className="px-4 py-3 text-sm font-mono text-gray-900">{row.mappedIMSI}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={9} className="px-4 py-12 text-center">
                    <p className="text-gray-600 font-medium">
                      {!hasSearched
                        ? 'Search to view location updates'
                        : 'No location updates found'}
                    </p>
                    <p className="text-sm text-gray-500 mt-1">
                      {!hasSearched
                        ? 'Use the filter and input above, then click Search'
                        : 'Try adjusting your search criteria'}
                    </p>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
