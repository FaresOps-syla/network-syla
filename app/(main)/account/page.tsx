'use client';

import { useState } from 'react';
import { ChevronDown, Bell, Link2, FileText, Trash2, User } from 'lucide-react';
import { cn } from '@/lib/utils';

type AccountSection = 'account' | 'notifications' | 'linked' | 'contract' | 'delete';

const navItems: { id: AccountSection; label: string; icon: typeof User }[] = [
  { id: 'account', label: 'Account', icon: User },
  { id: 'notifications', label: 'Notifications', icon: Bell },
  { id: 'linked', label: 'Linked Account', icon: Link2 },
  { id: 'contract', label: 'Contract', icon: FileText },
  { id: 'delete', label: 'Delete Account', icon: Trash2 },
];

const sectors = ['Technology', 'Telecommunications', 'Travel', 'Retail', 'Other'];
const regions = ['Europe', 'North America', 'Asia Pacific', 'Middle East', 'Latin America', 'Africa'];
const employeeSizes = ['1-10', '11-50', '51-200', '201-500', '500+'];

export default function AccountPage() {
  const [section, setSection] = useState<AccountSection>('account');
  const [profile, setProfile] = useState({
    name: 'Fares Safer',
    email: 'faressafer05@gmail.com',
    phone: '970235288',
  });
  const [company, setCompany] = useState({
    companyName: '',
    billingEmail: '',
    sector: '',
    region: '',
    employees: '',
  });

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900 mb-1">Manage your account with ease</h1>
        <p className="text-sm text-gray-500">Update your profile and company settings</p>
      </div>

      <div className="flex flex-col lg:flex-row gap-6">
        {/* Left: vertical nav */}
        <nav className="lg:w-56 flex-shrink-0">
          <ul className="space-y-1 p-1 bg-gray-50 rounded-lg border border-gray-200 w-full lg:w-auto">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = section === item.id;
              return (
                <li key={item.id}>
                  <button
                    type="button"
                    onClick={() => setSection(item.id)}
                    className={cn(
                      'w-full flex items-center gap-3 px-4 py-3 text-left text-sm font-medium rounded-lg transition-colors',
                      isActive
                        ? 'bg-blue-50 text-blue-700 border border-blue-200'
                        : 'text-gray-700 hover:bg-gray-100 border border-transparent'
                    )}
                  >
                    <Icon className="w-4 h-4 flex-shrink-0" />
                    {item.label}
                  </button>
                </li>
              );
            })}
          </ul>
        </nav>

        {/* Right: content */}
        <div className="flex-1 min-w-0 bg-white border border-gray-200 rounded-lg shadow-sm overflow-hidden">
          {section === 'account' && (
            <div className="p-6 space-y-8">
              <div>
                <h2 className="text-xl font-bold text-gray-900">Account</h2>
                <p className="text-sm text-gray-500 mt-0.5">
                  Manage your account settings and preferences
                </p>
              </div>

              {/* Profile Information */}
              <div className="space-y-4">
                <div>
                  <h3 className="text-base font-semibold text-gray-900">Profile information</h3>
                  <p className="text-sm text-gray-500 mt-0.5">
                    Update your personal information and contact details
                  </p>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1.5">
                      Name
                    </label>
                    <input
                      id="name"
                      type="text"
                      value={profile.name}
                      onChange={(e) => setProfile((p) => ({ ...p, name: e.target.value }))}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                    />
                  </div>
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1.5">
                      Email
                    </label>
                    <input
                      id="email"
                      type="email"
                      value={profile.email}
                      onChange={(e) => setProfile((p) => ({ ...p, email: e.target.value }))}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                    />
                  </div>
                  <div>
                    <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1.5">
                      Phone number
                    </label>
                    <input
                      id="phone"
                      type="tel"
                      value={profile.phone}
                      onChange={(e) => setProfile((p) => ({ ...p, phone: e.target.value }))}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                    />
                  </div>
                </div>
              </div>

              {/* Company Profile */}
              <div className="space-y-4 pt-4 border-t border-gray-200">
                <div>
                  <h3 className="text-base font-semibold text-gray-900">Company profile</h3>
                  <p className="text-sm text-gray-500 mt-0.5">
                    Manage your company information and business details
                  </p>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="companyName" className="block text-sm font-medium text-gray-700 mb-1.5">
                      Company name
                    </label>
                    <input
                      id="companyName"
                      type="text"
                      placeholder="Enter company name"
                      value={company.companyName}
                      onChange={(e) => setCompany((c) => ({ ...c, companyName: e.target.value }))}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm placeholder:text-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                    />
                  </div>
                  <div>
                    <label htmlFor="billingEmail" className="block text-sm font-medium text-gray-700 mb-1.5">
                      Billing email
                    </label>
                    <input
                      id="billingEmail"
                      type="email"
                      placeholder="Enter billing email"
                      value={company.billingEmail}
                      onChange={(e) => setCompany((c) => ({ ...c, billingEmail: e.target.value }))}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm placeholder:text-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                    />
                  </div>
                  <div>
                    <label htmlFor="sector" className="block text-sm font-medium text-gray-700 mb-1.5">
                      Sector
                    </label>
                    <div className="relative">
                      <select
                        id="sector"
                        value={company.sector}
                        onChange={(e) => setCompany((c) => ({ ...c, sector: e.target.value }))}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm appearance-none bg-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                      >
                        <option value="">Select sector</option>
                        {sectors.map((s) => (
                          <option key={s} value={s}>
                            {s}
                          </option>
                        ))}
                      </select>
                      <ChevronDown className="w-4 h-4 text-gray-500 absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
                    </div>
                  </div>
                  <div>
                    <label htmlFor="region" className="block text-sm font-medium text-gray-700 mb-1.5">
                      Region
                    </label>
                    <div className="relative">
                      <select
                        id="region"
                        value={company.region}
                        onChange={(e) => setCompany((c) => ({ ...c, region: e.target.value }))}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm appearance-none bg-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                      >
                        <option value="">Select region</option>
                        {regions.map((r) => (
                          <option key={r} value={r}>
                            {r}
                          </option>
                        ))}
                      </select>
                      <ChevronDown className="w-4 h-4 text-gray-500 absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
                    </div>
                  </div>
                  <div className="sm:col-span-2">
                    <label htmlFor="employees" className="block text-sm font-medium text-gray-700 mb-1.5">
                      Number of employees
                    </label>
                    <div className="relative max-w-xs">
                      <select
                        id="employees"
                        value={company.employees}
                        onChange={(e) => setCompany((c) => ({ ...c, employees: e.target.value }))}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm appearance-none bg-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                      >
                        <option value="">Select size</option>
                        {employeeSizes.map((s) => (
                          <option key={s} value={s}>
                            {s}
                          </option>
                        ))}
                      </select>
                      <ChevronDown className="w-4 h-4 text-gray-500 absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
                    </div>
                  </div>
                </div>
              </div>

              <div className="pt-4">
                <button
                  type="button"
                  className="px-4 py-2 bg-[#19379D] text-white text-sm font-medium rounded-lg hover:opacity-90 transition-opacity"
                >
                  Save changes
                </button>
              </div>
            </div>
          )}

          {section === 'notifications' && (
            <div className="p-6">
              <h2 className="text-xl font-bold text-gray-900">Notifications</h2>
              <p className="text-sm text-gray-500 mt-0.5 mb-6">
                Configure how and when you receive notifications
              </p>
              <p className="text-sm text-gray-600">Notification preferences will go here.</p>
            </div>
          )}

          {section === 'linked' && (
            <div className="p-6">
              <h2 className="text-xl font-bold text-gray-900">Linked account</h2>
              <p className="text-sm text-gray-500 mt-0.5 mb-6">
                Connect or manage linked accounts and services
              </p>
              <p className="text-sm text-gray-600">Linked accounts will be listed here.</p>
            </div>
          )}

          {section === 'contract' && (
            <div className="p-6">
              <h2 className="text-xl font-bold text-gray-900">Contract</h2>
              <p className="text-sm text-gray-500 mt-0.5 mb-6">
                View and manage your contract details
              </p>
              <p className="text-sm text-gray-600">Contract information will go here.</p>
            </div>
          )}

          {section === 'delete' && (
            <div className="p-6">
              <h2 className="text-xl font-bold text-gray-900">Delete account</h2>
              <p className="text-sm text-gray-500 mt-0.5 mb-6">
                Permanently delete your account and all associated data
              </p>
              <p className="text-sm text-gray-600 mb-4">
                This action cannot be undone. All your data will be removed.
              </p>
              <button
                type="button"
                className="px-4 py-2 bg-red-600 text-white text-sm font-medium rounded-lg hover:bg-red-700 transition-colors"
              >
                Delete account
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
