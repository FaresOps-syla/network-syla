'use client';

import { useState } from 'react';
import { Search, Filter, ChevronLeft, ChevronRight, Calendar } from 'lucide-react';

type CategoryFilter = 'all' | 'package' | 'esim' | 'order' | 'cdr';

interface ApiCommand {
  id: string;
  apiName: string;
  category: CategoryFilter;
  executedAt: string;
  requestId?: string;
}

const CATEGORY_LABELS: Record<CategoryFilter, string> = {
  all: 'All Categories',
  package: 'Package',
  esim: 'eSIM',
  order: 'Order',
  cdr: 'CDR',
};

const mockApiCommands: ApiCommand[] = [
  { id: '1', apiName: 'Package Creation', category: 'package', executedAt: '2026-02-05T10:30:00', requestId: 'req-001' },
  { id: '2', apiName: 'Package Status', category: 'package', executedAt: '2026-02-05T10:28:00', requestId: 'req-002' },
  { id: '3', apiName: 'eSIM Details', category: 'esim', executedAt: '2026-02-05T09:15:00', requestId: 'req-003' },
  { id: '4', apiName: 'eSIM Activation', category: 'esim', executedAt: '2026-02-05T09:10:00', requestId: 'req-004' },
  { id: '5', apiName: 'Order Creation', category: 'order', executedAt: '2026-02-04T16:45:00', requestId: 'req-005' },
  { id: '6', apiName: 'Order Status', category: 'order', executedAt: '2026-02-04T16:40:00', requestId: 'req-006' },
  { id: '7', apiName: 'CDR Retrieval', category: 'cdr', executedAt: '2026-02-04T14:20:00', requestId: 'req-007' },
  { id: '8', apiName: 'Package Creation', category: 'package', executedAt: '2026-02-04T11:00:00', requestId: 'req-008' },
  { id: '9', apiName: 'eSIM Details', category: 'esim', executedAt: '2026-02-03T17:30:00', requestId: 'req-009' },
  { id: '10', apiName: 'Package Status', category: 'package', executedAt: '2026-02-03T08:22:00', requestId: 'req-010' },
  { id: '11', apiName: 'Order Creation', category: 'order', executedAt: '2026-02-02T19:10:00', requestId: 'req-011' },
  { id: '12', apiName: 'CDR Retrieval', category: 'cdr', executedAt: '2026-02-02T15:00:00', requestId: 'req-012' },
];

const ROWS_PER_PAGE_OPTIONS = [5, 10, 25, 50];

function formatDate(dateStr: string) {
  return new Date(dateStr).toLocaleString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
  });
}

export default function APICommandsPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [categoryFilter, setCategoryFilter] = useState<CategoryFilter>('all');
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);

  const filtered = mockApiCommands.filter((row) => {
    const matchesSearch =
      !searchQuery.trim() ||
      row.apiName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      row.requestId?.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = categoryFilter === 'all' || row.category === categoryFilter;
    return matchesSearch && matchesCategory;
  });

  const totalItems = filtered.length;
  const totalPages = Math.max(1, Math.ceil(totalItems / rowsPerPage));
  const start = (currentPage - 1) * rowsPerPage;
  const paginatedRows = filtered.slice(start, start + rowsPerPage);

  const goToPage = (page: number) => {
    setCurrentPage(Math.max(1, Math.min(page, totalPages)));
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900 mb-1">API Commands</h1>
        <p className="text-sm text-gray-500">Track and search API calls by name and category</p>
      </div>

      {/* Search + Category */}
      <div className="bg-white border border-gray-200 rounded-lg p-4 shadow-sm">
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              type="text"
              placeholder="Search by API name or request ID..."
              value={searchQuery}
              onChange={(e) => {
                setSearchQuery(e.target.value);
                setCurrentPage(1);
              }}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent outline-none text-sm"
            />
          </div>
          <div className="flex items-center gap-2">
            <Filter className="w-4 h-4 text-gray-400 flex-shrink-0" />
            <select
              value={categoryFilter}
              onChange={(e) => {
                setCategoryFilter(e.target.value as CategoryFilter);
                setCurrentPage(1);
              }}
              className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent outline-none text-sm bg-white min-w-[160px]"
            >
              {Object.entries(CATEGORY_LABELS).map(([value, label]) => (
                <option key={value} value={value}>
                  {label}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Table */}
      <div className="bg-white border border-gray-200 rounded-lg overflow-hidden shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="px-4 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                  API Name
                </th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                  Category
                </th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                  Date
                </th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                  Request ID
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {paginatedRows.length > 0 ? (
                paginatedRows.map((row) => (
                  <tr key={row.id} className="hover:bg-gray-50 transition-colors">
                    <td className="px-4 py-3 text-sm font-medium text-gray-900">{row.apiName}</td>
                    <td className="px-4 py-3">
                      <span className="inline-flex px-2 py-0.5 rounded text-xs font-medium bg-gray-100 text-gray-800 capitalize">
                        {row.category}
                      </span>
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-2 text-sm text-gray-700">
                        <Calendar className="w-4 h-4 text-gray-400 flex-shrink-0" />
                        {formatDate(row.executedAt)}
                      </div>
                    </td>
                    <td className="px-4 py-3 text-sm font-mono text-gray-600">{row.requestId ?? '—'}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={4} className="px-4 py-12 text-center text-gray-500 text-sm">
                    No API commands found. Try adjusting search or category.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="px-4 py-3 border-t border-gray-200 flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="flex items-center gap-2 text-sm text-gray-600">
            <span>Rows per page</span>
            <select
              value={rowsPerPage}
              onChange={(e) => {
                setRowsPerPage(Number(e.target.value));
                setCurrentPage(1);
              }}
              className="px-2 py-1 border border-gray-300 rounded text-sm"
            >
              {ROWS_PER_PAGE_OPTIONS.map((n) => (
                <option key={n} value={n}>
                  {n}
                </option>
              ))}
            </select>
            <span className="text-gray-500">
              Showing {totalItems === 0 ? 0 : start + 1}–{Math.min(start + rowsPerPage, totalItems)} of {totalItems}
            </span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-sm text-gray-600">
              Page {currentPage} of {totalPages}
            </span>
            <button
              type="button"
              onClick={() => goToPage(currentPage - 1)}
              disabled={currentPage <= 1}
              className="p-1.5 rounded border border-gray-300 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <button
              type="button"
              onClick={() => goToPage(currentPage + 1)}
              disabled={currentPage >= totalPages}
              className="p-1.5 rounded border border-gray-300 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
