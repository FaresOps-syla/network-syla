'use client';

import { useState } from 'react';
import {
  Search,
  CheckCircle2,
  Clock,
  XCircle,
  Package,
  Smartphone,
  Eye,
  Info,
} from 'lucide-react';
import { cn } from '@/lib/utils';

type ESIMStatus = 'pre-service' | 'in-service' | 'expired';
type InventoryTab = 'available' | 'in-use' | 'expired';

interface ESIM {
  id: string;
  iccid: string;
  imsi: string;
  status: ESIMStatus;
  country: string;
}

const mockESIMs: ESIM[] = [
  { id: '1', iccid: '89012345678901234567', imsi: '310150123456789', status: 'in-service', country: 'France' },
  { id: '2', iccid: '89012345678901234568', imsi: '310150123456790', status: 'in-service', country: 'United States' },
  { id: '3', iccid: '89012345678901234569', imsi: '310150123456791', status: 'pre-service', country: 'Japan' },
  { id: '4', iccid: '89012345678901234570', imsi: '310150123456792', status: 'expired', country: 'Germany' },
  { id: '5', iccid: '89012345678901234571', imsi: '310150123456793', status: 'in-service', country: 'UAE' },
  { id: '6', iccid: '89012345678901234572', imsi: '310150123456794', status: 'expired', country: 'Spain' },
  { id: '7', iccid: '89012345678901234573', imsi: '310150123456795', status: 'pre-service', country: 'United Kingdom' },
  { id: '8', iccid: '89012345678901234574', imsi: '310150123456796', status: 'in-service', country: 'Italy' },
];

const statusConfig: Record<ESIMStatus, { label: string; icon: typeof CheckCircle2; className: string }> = {
  'pre-service': { label: 'Pre-Service', icon: Clock, className: 'bg-gray-100 text-gray-800' },
  'in-service': { label: 'In-Service', icon: CheckCircle2, className: 'bg-green-100 text-green-800' },
  expired: { label: 'Expired', icon: XCircle, className: 'bg-red-100 text-red-800' },
};


const tabToStatus: Record<InventoryTab, ESIMStatus> = {
  available: 'pre-service',
  'in-use': 'in-service',
  expired: 'expired',
};

const tabs: { id: InventoryTab; label: string; icon: typeof Clock }[] = [
  { id: 'available', label: 'Available eSIMs', icon: Clock },
  { id: 'in-use', label: 'eSIM In Use', icon: Smartphone },
  { id: 'expired', label: 'Expired eSIMs', icon: XCircle },
];

export default function InventoryPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeTab, setActiveTab] = useState<InventoryTab>('available');

  const statusForTab = tabToStatus[activeTab];
  const filteredESIMs = mockESIMs.filter((esim) => {
    const matchesTab = esim.status === statusForTab;
    const matchesSearch =
      !searchQuery.trim() ||
      esim.iccid.includes(searchQuery) ||
      esim.imsi.includes(searchQuery) ||
      esim.country.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesTab && matchesSearch;
  });

  const totalESIMs = mockESIMs.length;
  const preServiceESIMs = mockESIMs.filter((e) => e.status === 'pre-service').length;
  const inServiceESIMs = mockESIMs.filter((e) => e.status === 'in-service').length;
  const expiredESIMs = mockESIMs.filter((e) => e.status === 'expired').length;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-gray-900 mb-2">eSIM Inventory</h1>
        <p className="text-sm text-gray-600">
          Manage and monitor all your eSIMs in one place
        </p>
      </div>

      {/* Statistics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-white border border-gray-200 rounded-lg p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs text-gray-500 mb-1">Total eSIMs</p>
              <p className="text-2xl font-bold text-gray-900">{totalESIMs}</p>
            </div>
            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
              <Package className="w-6 h-6 text-blue-600" />
            </div>
          </div>
        </div>

        <div className="bg-white border border-gray-200 rounded-lg p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs text-gray-500 mb-1">Pre-Service</p>
              <p className="text-2xl font-bold text-gray-600">{preServiceESIMs}</p>
            </div>
            <div className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center">
              <Clock className="w-6 h-6 text-gray-600" />
            </div>
          </div>
        </div>

        <div className="bg-white border border-gray-200 rounded-lg p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs text-gray-500 mb-1">In-Service</p>
              <p className="text-2xl font-bold text-green-600">{inServiceESIMs}</p>
            </div>
            <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
              <Smartphone className="w-6 h-6 text-green-600" />
            </div>
          </div>
        </div>

        <div className="bg-white border border-gray-200 rounded-lg p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs text-gray-500 mb-1">Expired</p>
              <p className="text-2xl font-bold text-red-600">{expiredESIMs}</p>
            </div>
            <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center">
              <XCircle className="w-6 h-6 text-red-600" />
            </div>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="border-b border-gray-200">
        <nav className="flex gap-1" aria-label="Inventory tabs">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                type="button"
                onClick={() => setActiveTab(tab.id)}
                className={cn(
                  'flex items-center gap-2 px-4 py-2.5 text-sm font-medium rounded-t-lg transition-colors border-b-2 -mb-px',
                  isActive
                    ? 'bg-white border-blue-600 text-blue-600'
                    : 'border-transparent text-gray-600 hover:text-gray-900'
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
        <div className="relative max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
          <input
            type="text"
            placeholder="Search by ICCID, IMSI, or country..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent outline-none text-sm"
          />
        </div>
      </div>

      {/* Note: eSIM related to country */}
      <div className="flex items-start gap-2 p-3 bg-blue-50 border border-blue-100 rounded-lg text-sm text-blue-800">
        <Info className="w-4 h-4 flex-shrink-0 mt-0.5" />
        <p>Note: Each eSIM is related to a country.</p>
      </div>

      {/* Table */}
      <div className="bg-white border border-gray-200 rounded-lg overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="px-4 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                  ICCID
                </th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                  IMSI
                </th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                  Country
                </th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-4 py-3 text-right text-xs font-semibold text-gray-700 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {filteredESIMs.length > 0 ? (
                filteredESIMs.map((esim) => {
                  const status = statusConfig[esim.status];
                  const StatusIcon = status.icon;

                  return (
                    <tr key={esim.id} className="hover:bg-gray-50 transition-colors">
                      <td className="px-4 py-3">
                        <span className="text-sm font-mono text-gray-900">{esim.iccid}</span>
                      </td>
                      <td className="px-4 py-3">
                        <span className="text-sm font-mono text-gray-900">{esim.imsi}</span>
                      </td>
                      <td className="px-4 py-3">
                        <span className="text-sm text-gray-900">{esim.country}</span>
                      </td>
                      <td className="px-4 py-3">
                        <span
                          className={cn(
                            'inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium',
                            status.className
                          )}
                        >
                          <StatusIcon className="w-3 h-3" />
                          {status.label}
                        </span>
                      </td>
                      <td className="px-4 py-3 text-right">
                        <button
                          className="p-1.5 hover:bg-gray-100 rounded transition-colors"
                          title="View details"
                        >
                          <Eye className="w-4 h-4 text-gray-600" />
                        </button>
                      </td>
                    </tr>
                  );
                })
              ) : (
                <tr>
                  <td colSpan={5} className="px-4 py-12 text-center">
                    <Package className="w-12 h-12 text-gray-400 mx-auto mb-3" />
                    <p className="text-gray-600 font-medium">No eSIMs found</p>
                    <p className="text-sm text-gray-500 mt-1">
                      Try adjusting your search or switch tab
                    </p>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Summary */}
      <div className="flex items-center justify-between text-sm text-gray-600">
        <span>
          Showing {filteredESIMs.length} of {mockESIMs.filter((e) => e.status === statusForTab).length} in this tab
        </span>
        <div className="flex items-center gap-4">
          <button className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
            Export CSV
          </button>
        </div>
      </div>
    </div>
  );
}
