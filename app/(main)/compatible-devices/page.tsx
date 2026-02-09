'use client';

import { useState } from 'react';
import { Search, Smartphone, Tablet, Watch, CheckCircle2, XCircle, Filter } from 'lucide-react';
import { cn } from '@/lib/utils';

interface Device {
  id: string;
  name: string;
  brand: string;
  category: 'smartphone' | 'tablet' | 'watch' | 'laptop';
  os: 'iOS' | 'Android' | 'Other';
  compatible: boolean;
  releaseYear: number;
  image?: string;
}

const devices: Device[] = [
  // iOS Devices
  { id: '1', name: 'iPhone 15 Pro Max', brand: 'Apple', category: 'smartphone', os: 'iOS', compatible: true, releaseYear: 2023 },
  { id: '2', name: 'iPhone 15 Pro', brand: 'Apple', category: 'smartphone', os: 'iOS', compatible: true, releaseYear: 2023 },
  { id: '3', name: 'iPhone 15', brand: 'Apple', category: 'smartphone', os: 'iOS', compatible: true, releaseYear: 2023 },
  { id: '4', name: 'iPhone 14 Pro Max', brand: 'Apple', category: 'smartphone', os: 'iOS', compatible: true, releaseYear: 2022 },
  { id: '5', name: 'iPhone 14 Pro', brand: 'Apple', category: 'smartphone', os: 'iOS', compatible: true, releaseYear: 2022 },
  { id: '6', name: 'iPhone 14', brand: 'Apple', category: 'smartphone', os: 'iOS', compatible: true, releaseYear: 2022 },
  { id: '7', name: 'iPhone 13 Pro Max', brand: 'Apple', category: 'smartphone', os: 'iOS', compatible: true, releaseYear: 2021 },
  { id: '8', name: 'iPhone 13 Pro', brand: 'Apple', category: 'smartphone', os: 'iOS', compatible: true, releaseYear: 2021 },
  { id: '9', name: 'iPhone 13', brand: 'Apple', category: 'smartphone', os: 'iOS', compatible: true, releaseYear: 2021 },
  { id: '10', name: 'iPhone 12 Pro Max', brand: 'Apple', category: 'smartphone', os: 'iOS', compatible: true, releaseYear: 2020 },
  { id: '11', name: 'iPhone 12 Pro', brand: 'Apple', category: 'smartphone', os: 'iOS', compatible: true, releaseYear: 2020 },
  { id: '12', name: 'iPhone 12', brand: 'Apple', category: 'smartphone', os: 'iOS', compatible: true, releaseYear: 2020 },
  { id: '13', name: 'iPhone XS Max', brand: 'Apple', category: 'smartphone', os: 'iOS', compatible: true, releaseYear: 2018 },
  { id: '14', name: 'iPhone XS', brand: 'Apple', category: 'smartphone', os: 'iOS', compatible: true, releaseYear: 2018 },
  { id: '15', name: 'iPhone XR', brand: 'Apple', category: 'smartphone', os: 'iOS', compatible: true, releaseYear: 2018 },
  { id: '16', name: 'iPad Pro 12.9"', brand: 'Apple', category: 'tablet', os: 'iOS', compatible: true, releaseYear: 2022 },
  { id: '17', name: 'iPad Pro 11"', brand: 'Apple', category: 'tablet', os: 'iOS', compatible: true, releaseYear: 2022 },
  { id: '18', name: 'iPad Air', brand: 'Apple', category: 'tablet', os: 'iOS', compatible: true, releaseYear: 2022 },
  { id: '19', name: 'iPad Mini', brand: 'Apple', category: 'tablet', os: 'iOS', compatible: true, releaseYear: 2021 },
  { id: '20', name: 'Apple Watch Series 9', brand: 'Apple', category: 'watch', os: 'iOS', compatible: true, releaseYear: 2023 },
  { id: '21', name: 'Apple Watch Ultra 2', brand: 'Apple', category: 'watch', os: 'iOS', compatible: true, releaseYear: 2023 },
  
  // Android Devices
  { id: '22', name: 'Samsung Galaxy S24 Ultra', brand: 'Samsung', category: 'smartphone', os: 'Android', compatible: true, releaseYear: 2024 },
  { id: '23', name: 'Samsung Galaxy S24+', brand: 'Samsung', category: 'smartphone', os: 'Android', compatible: true, releaseYear: 2024 },
  { id: '24', name: 'Samsung Galaxy S24', brand: 'Samsung', category: 'smartphone', os: 'Android', compatible: true, releaseYear: 2024 },
  { id: '25', name: 'Samsung Galaxy S23 Ultra', brand: 'Samsung', category: 'smartphone', os: 'Android', compatible: true, releaseYear: 2023 },
  { id: '26', name: 'Samsung Galaxy S23+', brand: 'Samsung', category: 'smartphone', os: 'Android', compatible: true, releaseYear: 2023 },
  { id: '27', name: 'Samsung Galaxy S23', brand: 'Samsung', category: 'smartphone', os: 'Android', compatible: true, releaseYear: 2023 },
  { id: '28', name: 'Samsung Galaxy S22 Ultra', brand: 'Samsung', category: 'smartphone', os: 'Android', compatible: true, releaseYear: 2022 },
  { id: '29', name: 'Samsung Galaxy S22+', brand: 'Samsung', category: 'smartphone', os: 'Android', compatible: true, releaseYear: 2022 },
  { id: '30', name: 'Samsung Galaxy S22', brand: 'Samsung', category: 'smartphone', os: 'Android', compatible: true, releaseYear: 2022 },
  { id: '31', name: 'Samsung Galaxy Z Fold 5', brand: 'Samsung', category: 'smartphone', os: 'Android', compatible: true, releaseYear: 2023 },
  { id: '32', name: 'Samsung Galaxy Z Flip 5', brand: 'Samsung', category: 'smartphone', os: 'Android', compatible: true, releaseYear: 2023 },
  { id: '33', name: 'Google Pixel 8 Pro', brand: 'Google', category: 'smartphone', os: 'Android', compatible: true, releaseYear: 2023 },
  { id: '34', name: 'Google Pixel 8', brand: 'Google', category: 'smartphone', os: 'Android', compatible: true, releaseYear: 2023 },
  { id: '35', name: 'Google Pixel 7 Pro', brand: 'Google', category: 'smartphone', os: 'Android', compatible: true, releaseYear: 2022 },
  { id: '36', name: 'Google Pixel 7', brand: 'Google', category: 'smartphone', os: 'Android', compatible: true, releaseYear: 2022 },
  { id: '37', name: 'OnePlus 12', brand: 'OnePlus', category: 'smartphone', os: 'Android', compatible: true, releaseYear: 2024 },
  { id: '38', name: 'OnePlus 11', brand: 'OnePlus', category: 'smartphone', os: 'Android', compatible: true, releaseYear: 2023 },
  { id: '39', name: 'Xiaomi 14 Pro', brand: 'Xiaomi', category: 'smartphone', os: 'Android', compatible: true, releaseYear: 2024 },
  { id: '40', name: 'Samsung Galaxy Tab S9 Ultra', brand: 'Samsung', category: 'tablet', os: 'Android', compatible: true, releaseYear: 2023 },
  { id: '41', name: 'Samsung Galaxy Tab S9+', brand: 'Samsung', category: 'tablet', os: 'Android', compatible: true, releaseYear: 2023 },
  { id: '42', name: 'Samsung Galaxy Tab S9', brand: 'Samsung', category: 'tablet', os: 'Android', compatible: true, releaseYear: 2023 },
  { id: '43', name: 'Google Pixel Tablet', brand: 'Google', category: 'tablet', os: 'Android', compatible: true, releaseYear: 2023 },
];

const categories = [
  { id: 'all', label: 'All Devices', icon: Smartphone },
  { id: 'smartphone', label: 'Smartphones', icon: Smartphone },
  { id: 'tablet', label: 'Tablets', icon: Tablet },
  { id: 'watch', label: 'Smartwatches', icon: Watch },
];

const osFilters = [
  { id: 'all', label: 'All OS' },
  { id: 'iOS', label: 'iOS' },
  { id: 'Android', label: 'Android' },
];

export default function CompatibleDevicesPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedOS, setSelectedOS] = useState<string>('all');
  const [showOnlyCompatible, setShowOnlyCompatible] = useState(true);

  const filteredDevices = devices.filter((device) => {
    const matchesSearch = device.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         device.brand.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || device.category === selectedCategory;
    const matchesOS = selectedOS === 'all' || device.os === selectedOS;
    const matchesCompatible = !showOnlyCompatible || device.compatible;

    return matchesSearch && matchesCategory && matchesOS && matchesCompatible;
  });

  const compatibleCount = devices.filter(d => d.compatible).length;
  const totalCount = devices.length;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-gray-900 mb-2">Appareils compatibles</h1>
        <p className="text-sm text-gray-600">
          Trouvez votre appareil dans la liste ci-dessous pour vérifier sa compatibilité avec nos eSIM
        </p>
      </div>
    {/* Stats */}
      {/* <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-white border border-gray-200 rounded-lg p-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
              <Smartphone className="w-5 h-5 text-blue-600" />
            </div>
            <div>
              <p className="text-xs text-gray-500">Total Devices</p>
              <p className="text-lg font-semibold text-gray-900">{totalCount}</p>
            </div>
          </div>
        </div>
        <div className="bg-white border border-gray-200 rounded-lg p-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
              <CheckCircle2 className="w-5 h-5 text-green-600" />
            </div>
            <div>
              <p className="text-xs text-gray-500">Compatible</p>
              <p className="text-lg font-semibold text-gray-900">{compatibleCount}</p>
            </div>
          </div>
        </div>
        <div className="bg-white border border-gray-200 rounded-lg p-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
              <Filter className="w-5 h-5 text-purple-600" />
            </div>
            <div>
              <p className="text-xs text-gray-500">Filtered</p>
              <p className="text-lg font-semibold text-gray-900">{filteredDevices.length}</p>
            </div>
          </div>
        </div>
      </div> */}

      {/* Search and Filters */}
      <div className="bg-white border border-gray-200 rounded-lg p-4 space-y-4">
        {/* Search Bar */}
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
          <input
            type="text"
            placeholder="Rechercher un appareil ou une marque..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent outline-none text-sm"
          />
        </div>

        {/* Category Filters */}
        <div className="flex flex-wrap gap-2">
          {categories.map((category) => {
            const Icon = category.icon;
            return (
              <button
                key={category.id}
                onClick={() => setSelectedCategory(category.id)}
                className={cn(
                  'flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-medium transition-colors',
                  selectedCategory === category.id
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                )}
              >
                <Icon className="w-3.5 h-3.5" />
                {category.label}
              </button>
            );
          })}
        </div>

        {/* OS and Compatibility Filters */}
        <div className="flex flex-wrap items-center gap-4">
          <div className="flex items-center gap-2">
            <span className="text-xs text-gray-600">OS:</span>
            {osFilters.map((filter) => (
              <button
                key={filter.id}
                onClick={() => setSelectedOS(filter.id)}
                className={cn(
                  'px-3 py-1 rounded-md text-xs font-medium transition-colors',
                  selectedOS === filter.id
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                )}
              >
                {filter.label}
              </button>
            ))}
          </div>
          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="checkbox"
              checked={showOnlyCompatible}
              onChange={(e) => setShowOnlyCompatible(e.target.checked)}
              className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
            />
            <span className="text-xs text-gray-700">Compatible uniquement</span>
          </label>
        </div>
      </div>

      {/* Devices Grid */}
      {filteredDevices.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredDevices.map((device) => {
            const CategoryIcon = categories.find(c => c.id === device.category)?.icon || Smartphone;
            return (
              <div
                key={device.id}
                className="bg-white border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow"
              >
                <div className="flex items-start justify-between mb-3">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 bg-gray-100 rounded-lg flex items-center justify-center">
                      <CategoryIcon className="w-4 h-4 text-gray-600" />
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-gray-900">{device.name}</p>
                      <p className="text-xs text-gray-500">{device.brand}</p>
                    </div>
                  </div>
                  {device.compatible ? (
                    <CheckCircle2 className="w-5 h-5 text-green-600 flex-shrink-0" />
                  ) : (
                    <XCircle className="w-5 h-5 text-red-600 flex-shrink-0" />
                  )}
                </div>
                <div className="flex items-center justify-between text-xs">
                  <span className={cn(
                    'px-2 py-1 rounded',
                    device.os === 'iOS' ? 'bg-blue-100 text-blue-700' : 'bg-green-100 text-green-700'
                  )}>
                    {device.os}
                  </span>
                  <span className="text-gray-500">{device.releaseYear}</span>
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        <div className="bg-white border border-gray-200 rounded-lg p-12 text-center">
          <Search className="w-12 h-12 text-gray-400 mx-auto mb-4" />
          <p className="text-gray-600 font-medium mb-1">Aucun appareil trouvé</p>
          <p className="text-sm text-gray-500">Essayez de modifier vos filtres de recherche</p>
        </div>
      )}
    </div>
  );
}
