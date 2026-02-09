'use client';

import { Wallet, Zap, FileText, CheckCircle2, Calendar, Download } from 'lucide-react';

const billingCards = [
  {
    label: 'Prepaid balance',
    value: '$24,500',
    subtext: 'Across prepayment clients',
    icon: Wallet,
    color: 'bg-blue-100 text-blue-600',
  },
  {
    label: 'Pay-as-you-go due',
    value: '$3,200',
    subtext: 'Current period',
    icon: Zap,
    color: 'bg-amber-100 text-amber-600',
  },
  {
    label: 'Outstanding invoices',
    value: '$1,840',
    subtext: '5 unpaid',
    icon: FileText,
    color: 'bg-red-100 text-red-600',
  },
  {
    label: 'Paid this month',
    value: '$18,200',
    subtext: 'February 2026',
    icon: CheckCircle2,
    color: 'bg-green-100 text-green-600',
  },
];

type BillingType = 'Prepayment' | 'Pay-as-you-go';
type InvoiceStatus = 'Paid' | 'Pending' | 'Overdue';

interface Invoice {
  id: string;
  invoiceNumber: string;
  accountName: string;
  billingType: BillingType;
  period: string;
  amount: number;
  status: InvoiceStatus;
  dueDate: string;
  paidDate?: string;
}

const mockInvoices: Invoice[] = [
  {
    id: '1',
    invoiceNumber: 'INV-2026-0042',
    accountName: 'Acme Travel Ltd',
    billingType: 'Prepayment',
    period: 'Feb 2026',
    amount: 4200,
    status: 'Paid',
    dueDate: '2026-02-10',
    paidDate: '2026-02-05',
  },
  {
    id: '2',
    invoiceNumber: 'INV-2026-0041',
    accountName: 'Global Roaming Inc',
    billingType: 'Pay-as-you-go',
    period: 'Jan 2026',
    amount: 1850,
    status: 'Pending',
    dueDate: '2026-02-15',
  },
  {
    id: '3',
    invoiceNumber: 'INV-2026-0040',
    accountName: 'Mobile Solutions',
    billingType: 'Prepayment',
    period: 'Feb 2026',
    amount: 6200,
    status: 'Paid',
    dueDate: '2026-02-28',
    paidDate: '2026-02-01',
  },
  {
    id: '4',
    invoiceNumber: 'INV-2026-0039',
    accountName: 'Travel Hub Co',
    billingType: 'Pay-as-you-go',
    period: 'Dec 2025',
    amount: 920,
    status: 'Overdue',
    dueDate: '2026-01-20',
  },
  {
    id: '5',
    invoiceNumber: 'INV-2026-0038',
    accountName: 'Connect Worldwide',
    billingType: 'Prepayment',
    period: 'Jan 2026',
    amount: 3100,
    status: 'Paid',
    dueDate: '2026-01-31',
    paidDate: '2026-01-28',
  },
  {
    id: '6',
    invoiceNumber: 'INV-2026-0037',
    accountName: 'Roam Free SA',
    billingType: 'Pay-as-you-go',
    period: 'Jan 2026',
    amount: 2450,
    status: 'Pending',
    dueDate: '2026-02-20',
  },
];

function formatDate(dateStr: string) {
  return new Date(dateStr).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  });
}

function formatCurrency(amount: number) {
  return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(amount);
}

function statusStyles(status: InvoiceStatus) {
  switch (status) {
    case 'Paid':
      return 'bg-green-100 text-green-800';
    case 'Pending':
      return 'bg-amber-100 text-amber-800';
    case 'Overdue':
      return 'bg-red-100 text-red-800';
    default:
      return 'bg-gray-100 text-gray-800';
  }
}

export default function BillingPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900 mb-1">Billing</h1>
        <p className="text-sm text-gray-500">
          Prepayment and pay-as-you-go clients — balances, dues, and invoices
        </p>
      </div>

      {/* Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {billingCards.map((card) => {
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
                <div
                  className={`w-11 h-11 rounded-lg flex items-center justify-center ${card.color}`}
                >
                  <Icon className="w-5 h-5" />
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Invoices table */}
      <div className="bg-white border border-gray-200 rounded-lg overflow-hidden shadow-sm">
        <div className="px-6 py-4 border-b border-gray-200">
          <h2 className="text-lg font-bold text-gray-900">Invoices</h2>
          <p className="text-sm text-gray-500">
            All invoices for prepayment and pay-as-you-go accounts
          </p>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="px-4 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                  Invoice #
                </th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                  Account
                </th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                  Billing type
                </th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                  Period
                </th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                  Amount
                </th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                  Due date
                </th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                  Paid
                </th>
                <th className="px-4 py-3 text-right text-xs font-semibold text-gray-700 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {mockInvoices.map((inv) => (
                <tr key={inv.id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-4 py-3 text-sm font-mono font-medium text-gray-900">
                    {inv.invoiceNumber}
                  </td>
                  <td className="px-4 py-3 text-sm text-gray-900">{inv.accountName}</td>
                  <td className="px-4 py-3">
                    <span
                      className={
                        inv.billingType === 'Prepayment'
                          ? 'inline-flex px-2 py-0.5 rounded text-xs font-medium bg-blue-100 text-blue-800'
                          : 'inline-flex px-2 py-0.5 rounded text-xs font-medium bg-amber-100 text-amber-800'
                      }
                    >
                      {inv.billingType}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-sm text-gray-700">{inv.period}</td>
                  <td className="px-4 py-3 text-sm font-semibold text-gray-900">
                    {formatCurrency(inv.amount)}
                  </td>
                  <td className="px-4 py-3">
                    <span
                      className={`inline-flex px-2 py-0.5 rounded text-xs font-medium ${statusStyles(inv.status)}`}
                    >
                      {inv.status}
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-2 text-sm text-gray-700">
                      <Calendar className="w-4 h-4 text-gray-400 flex-shrink-0" />
                      {formatDate(inv.dueDate)}
                    </div>
                  </td>
                  <td className="px-4 py-3 text-sm text-gray-600">
                    {inv.paidDate ? formatDate(inv.paidDate) : '—'}
                  </td>
                  <td className="px-4 py-3 text-right">
                    <button
                      type="button"
                      className="inline-flex items-center gap-1.5 px-2 py-1.5 text-sm font-medium text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                    >
                      <Download className="w-4 h-4" />
                      PDF
                    </button>
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
