'use client';

import { Package, ShoppingCart, Clock, CheckCircle2, Calendar } from 'lucide-react';

const orderCards = [
  { label: 'Total Orders', value: '1,248', subtext: 'All time', icon: ShoppingCart, color: 'bg-blue-100 text-blue-600' },
  { label: 'This Month', value: '86', subtext: 'January 2026', icon: Package, color: 'bg-green-100 text-green-600' },
  { label: 'Pending', value: '12', subtext: 'Awaiting activation', icon: Clock, color: 'bg-amber-100 text-amber-600' },
  { label: 'Completed', value: '1,236', subtext: 'Successfully delivered', icon: CheckCircle2, color: 'bg-gray-100 text-gray-600' },
];

const mockOrders = [
  { id: '1', iccid: '89012345678901234567', country: 'France', packageGb: 10, createdAt: '2026-02-05T10:30:00' },
  { id: '2', iccid: '89012345678901234568', country: 'United States', packageGb: 20, createdAt: '2026-02-05T09:15:00' },
  { id: '3', iccid: '89012345678901234569', country: 'Germany', packageGb: 15, createdAt: '2026-02-04T16:45:00' },
  { id: '4', iccid: '89012345678901234570', country: 'Spain', packageGb: 5, createdAt: '2026-02-04T14:20:00' },
  { id: '5', iccid: '89012345678901234571', country: 'Italy', packageGb: 10, createdAt: '2026-02-04T11:00:00' },
  { id: '6', iccid: '89012345678901234572', country: 'United Kingdom', packageGb: 25, createdAt: '2026-02-03T17:30:00' },
  { id: '7', iccid: '89012345678901234573', country: 'Japan', packageGb: 8, createdAt: '2026-02-03T08:22:00' },
  { id: '8', iccid: '89012345678901234574', country: 'UAE', packageGb: 12, createdAt: '2026-02-02T19:10:00' },
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

export default function OrdersPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900 mb-1">Orders</h1>
        <p className="text-sm text-gray-500">View and manage your eSIM orders</p>
      </div>

      {/* Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {orderCards.map((card) => {
          const Icon = card.icon;
          return (
            <div
              key={card.label}
              className="bg-white border border-gray-200 rounded-lg p-4 shadow-sm"
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs text-gray-500 mb-1">{card.label}</p>
                  <p className="text-2xl font-bold text-gray-900">{card.value}</p>
                  <p className="text-xs text-gray-500 mt-1">{card.subtext}</p>
                </div>
                <div className={`w-11 h-11 rounded-lg flex items-center justify-center ${card.color}`}>
                  <Icon className="w-5 h-5" />
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Orders table */}
      <div className="bg-white border border-gray-200 rounded-lg overflow-hidden shadow-sm">
        <div className="px-6 py-4 border-b border-gray-200">
          <h2 className="text-lg font-bold text-gray-900">Order history</h2>
          <p className="text-sm text-gray-500">Recent orders with ICCID, country, package and creation time</p>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="px-4 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                  ICCID
                </th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                  Country
                </th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                  Package (GB)
                </th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                  Created
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {mockOrders.map((order) => (
                <tr key={order.id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-4 py-3 text-sm font-mono text-gray-900">{order.iccid}</td>
                  <td className="px-4 py-3 text-sm text-gray-900">{order.country}</td>
                  <td className="px-4 py-3 text-sm font-semibold text-gray-900">{order.packageGb} GB</td>
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-2 text-sm text-gray-700">
                      <Calendar className="w-4 h-4 text-gray-400 flex-shrink-0" />
                      {formatDate(order.createdAt)}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
