'use client';

import { useState, useMemo } from 'react';
import Nav from '@/components/Nav';
import Footer from '@/components/Footer';
import Link from 'next/link';
import { Search, Smartphone, CheckCircle, Code, Calendar, ArrowRight } from 'lucide-react';

interface Device {
  id: string;
  brand: string;
  model: string;
  year: string;
  compatible: boolean;
  category: 'iphone' | 'samsung' | 'google' | 'other';
}

const devices: Device[] = [
  // iPhone
  { id: 'iphone-15-pro-max', brand: 'Apple', model: 'iPhone 15 Pro Max', year: '2023', compatible: true, category: 'iphone' },
  { id: 'iphone-15-pro', brand: 'Apple', model: 'iPhone 15 Pro', year: '2023', compatible: true, category: 'iphone' },
  { id: 'iphone-15', brand: 'Apple', model: 'iPhone 15', year: '2023', compatible: true, category: 'iphone' },
  { id: 'iphone-14-pro-max', brand: 'Apple', model: 'iPhone 14 Pro Max', year: '2022', compatible: true, category: 'iphone' },
  { id: 'iphone-14-pro', brand: 'Apple', model: 'iPhone 14 Pro', year: '2022', compatible: true, category: 'iphone' },
  { id: 'iphone-14', brand: 'Apple', model: 'iPhone 14', year: '2022', compatible: true, category: 'iphone' },
  { id: 'iphone-13-pro-max', brand: 'Apple', model: 'iPhone 13 Pro Max', year: '2021', compatible: true, category: 'iphone' },
  { id: 'iphone-13-pro', brand: 'Apple', model: 'iPhone 13 Pro', year: '2021', compatible: true, category: 'iphone' },
  { id: 'iphone-13', brand: 'Apple', model: 'iPhone 13', year: '2021', compatible: true, category: 'iphone' },
  { id: 'iphone-12-pro-max', brand: 'Apple', model: 'iPhone 12 Pro Max', year: '2020', compatible: true, category: 'iphone' },
  { id: 'iphone-12-pro', brand: 'Apple', model: 'iPhone 12 Pro', year: '2020', compatible: true, category: 'iphone' },
  { id: 'iphone-12', brand: 'Apple', model: 'iPhone 12', year: '2020', compatible: true, category: 'iphone' },
  { id: 'iphone-11-pro', brand: 'Apple', model: 'iPhone 11 Pro', year: '2019', compatible: true, category: 'iphone' },
  { id: 'iphone-xs-max', brand: 'Apple', model: 'iPhone XS Max', year: '2018', compatible: true, category: 'iphone' },
  { id: 'iphone-xs', brand: 'Apple', model: 'iPhone XS', year: '2018', compatible: true, category: 'iphone' },
  
  // Samsung
  { id: 'samsung-s24-ultra', brand: 'Samsung', model: 'Galaxy S24 Ultra', year: '2024', compatible: true, category: 'samsung' },
  { id: 'samsung-s24-plus', brand: 'Samsung', model: 'Galaxy S24+', year: '2024', compatible: true, category: 'samsung' },
  { id: 'samsung-s24', brand: 'Samsung', model: 'Galaxy S24', year: '2024', compatible: true, category: 'samsung' },
  { id: 'samsung-s23-ultra', brand: 'Samsung', model: 'Galaxy S23 Ultra', year: '2023', compatible: true, category: 'samsung' },
  { id: 'samsung-s23-plus', brand: 'Samsung', model: 'Galaxy S23+', year: '2023', compatible: true, category: 'samsung' },
  { id: 'samsung-s23', brand: 'Samsung', model: 'Galaxy S23', year: '2023', compatible: true, category: 'samsung' },
  { id: 'samsung-s22-ultra', brand: 'Samsung', model: 'Galaxy S22 Ultra', year: '2022', compatible: true, category: 'samsung' },
  { id: 'samsung-s22-plus', brand: 'Samsung', model: 'Galaxy S22+', year: '2022', compatible: true, category: 'samsung' },
  { id: 'samsung-s22', brand: 'Samsung', model: 'Galaxy S22', year: '2022', compatible: true, category: 'samsung' },
  { id: 'samsung-s21-ultra', brand: 'Samsung', model: 'Galaxy S21 Ultra', year: '2021', compatible: true, category: 'samsung' },
  { id: 'samsung-s21-plus', brand: 'Samsung', model: 'Galaxy S21+', year: '2021', compatible: true, category: 'samsung' },
  { id: 'samsung-s21', brand: 'Samsung', model: 'Galaxy S21', year: '2021', compatible: true, category: 'samsung' },
  { id: 'samsung-s20-ultra', brand: 'Samsung', model: 'Galaxy S20 Ultra', year: '2020', compatible: true, category: 'samsung' },
  { id: 'samsung-s20-plus', brand: 'Samsung', model: 'Galaxy S20+', year: '2020', compatible: true, category: 'samsung' },
  { id: 'samsung-s20', brand: 'Samsung', model: 'Galaxy S20', year: '2020', compatible: true, category: 'samsung' },
  { id: 'samsung-z-fold5', brand: 'Samsung', model: 'Galaxy Z Fold 5', year: '2023', compatible: true, category: 'samsung' },
  { id: 'samsung-z-flip5', brand: 'Samsung', model: 'Galaxy Z Flip 5', year: '2023', compatible: true, category: 'samsung' },
  
  // Google Pixel
  { id: 'pixel-8-pro', brand: 'Google', model: 'Pixel 8 Pro', year: '2023', compatible: true, category: 'google' },
  { id: 'pixel-8', brand: 'Google', model: 'Pixel 8', year: '2023', compatible: true, category: 'google' },
  { id: 'pixel-7-pro', brand: 'Google', model: 'Pixel 7 Pro', year: '2022', compatible: true, category: 'google' },
  { id: 'pixel-7', brand: 'Google', model: 'Pixel 7', year: '2022', compatible: true, category: 'google' },
  { id: 'pixel-6-pro', brand: 'Google', model: 'Pixel 6 Pro', year: '2021', compatible: true, category: 'google' },
  { id: 'pixel-6', brand: 'Google', model: 'Pixel 6', year: '2021', compatible: true, category: 'google' },
  { id: 'pixel-5', brand: 'Google', model: 'Pixel 5', year: '2020', compatible: true, category: 'google' },
  { id: 'pixel-4', brand: 'Google', model: 'Pixel 4', year: '2019', compatible: true, category: 'google' },
  { id: 'pixel-3', brand: 'Google', model: 'Pixel 3', year: '2018', compatible: true, category: 'google' },
  
  // Other brands
  { id: 'oneplus-12', brand: 'OnePlus', model: 'OnePlus 12', year: '2024', compatible: true, category: 'other' },
  { id: 'oneplus-11', brand: 'OnePlus', model: 'OnePlus 11', year: '2023', compatible: true, category: 'other' },
  { id: 'xiaomi-14', brand: 'Xiaomi', model: 'Xiaomi 14', year: '2024', compatible: true, category: 'other' },
  { id: 'huawei-p60', brand: 'Huawei', model: 'Huawei P60 Pro', year: '2023', compatible: true, category: 'other' },
];

export default function DevicesPage() {
  const [searchQuery, setSearchQuery] = useState('');

  const filteredDevices = useMemo(() => {
    if (!searchQuery.trim()) {
      return devices;
    }
    const query = searchQuery.toLowerCase();
    return devices.filter(
      device =>
        device.brand.toLowerCase().includes(query) ||
        device.model.toLowerCase().includes(query) ||
        device.year.includes(query)
    );
  }, [searchQuery]);

  return (
    <>
      <Nav />
      <section className="relative min-h-screen py-20 px-4 sm:px-6 lg:px-8 overflow-hidden bg-gradient-to-br from-blue-50 via-white to-purple-50 pt-32">
        {/* Floating Background Shapes */}
        <div className="absolute inset-0 overflow-hidden" style={{ zIndex: 0 }}>
          <div className="absolute top-20 left-10 w-80 h-80 bg-blue-300 rounded-full mix-blend-multiply filter blur-xl opacity-15 animate-blob animation-delay-1000" />
          <div className="absolute bottom-10 right-10 w-96 h-96 bg-purple-300 rounded-full mix-blend-multiply filter blur-xl opacity-15 animate-blob animation-delay-3000" />
          <div className="absolute top-1/2 left-1/4 w-64 h-64 bg-gradient-to-br from-blue-200 to-purple-200 rounded-3xl rotate-45 opacity-10 animate-float animation-delay-2000" />
        </div>

        <div className="max-w-7xl mx-auto relative z-10">
          {/* Header */}
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-4">
              eSIM Compatible Devices
            </h1>
            <p className="text-lg md:text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              Help your customers check device compatibility. All devices listed below are fully compatible with our eSIM platform. Use our API to integrate this data into your platform.
            </p>
          </div>

          {/* Search Input */}
          <div className="mb-8 max-w-2xl mx-auto">
            <div className="relative">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Search for your device (e.g., iPhone 15, Galaxy S24, Pixel 8)..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-12 pr-4 py-4 rounded-xl border-2 border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all text-base shadow-md"
                aria-label="Search compatible devices"
              />
            </div>
            {searchQuery && (
              <p className="mt-3 text-sm text-gray-600 text-center">
                Found <strong className="text-gray-900">{filteredDevices.length}</strong> compatible {filteredDevices.length === 1 ? 'device' : 'devices'}
              </p>
            )}
          </div>

          {/* Device Cards Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 mb-16">
            {filteredDevices.map((device) => (
              <div
                key={device.id}
                className="bg-white rounded-xl p-5 shadow-md border-2 border-gray-200 hover:border-blue-300 hover:shadow-lg transition-all duration-200"
              >
                <div className="flex items-start gap-3">
                  <div className="p-2 bg-blue-100 rounded-lg">
                    <Smartphone className="w-5 h-5 text-blue-600" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <h3 className="font-bold text-gray-900 text-sm truncate">
                        {device.brand}
                      </h3>
                      <CheckCircle className="w-4 h-4 text-green-600 flex-shrink-0" />
                    </div>
                    <p className="text-sm text-gray-700 font-medium mb-1">
                      {device.model}
                    </p>
                    <p className="text-xs text-gray-500">
                      {device.year}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Empty State */}
          {filteredDevices.length === 0 && (
            <div className="text-center py-16 bg-white rounded-xl border-2 border-dashed border-gray-300">
              <Smartphone className="w-12 h-12 text-gray-400 mx-auto mb-4" />
              <p className="text-gray-600 text-lg font-medium mb-2">
                No devices found
              </p>
              <p className="text-gray-500 text-sm mb-6">
                Try a different search term or contact us to check compatibility
              </p>
              <Link
                href="/book"
                className="inline-block px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-all duration-200 font-semibold shadow-md hover:shadow-lg transform hover:scale-105"
              >
                Contact Support
              </Link>
            </div>
          )}

          {/* API Section */}
          <div className="bg-gradient-to-br from-blue-600 to-purple-600 rounded-2xl p-8 md:p-12 text-white shadow-2xl">
            <div className="max-w-4xl mx-auto">
              <div className="flex flex-col md:flex-row items-center gap-8">
                <div className="flex-shrink-0">
                  <div className="w-20 h-20 bg-white/20 rounded-2xl flex items-center justify-center">
                    <Code className="w-10 h-10" />
                  </div>
                </div>
                <div className="flex-1 text-center md:text-left">
                  <h2 className="text-3xl md:text-4xl font-bold mb-4">
                    Complete Device Compatibility API
                  </h2>
                  <p className="text-lg md:text-xl text-blue-100 mb-6 leading-relaxed">
                    As a business partner, get access to our comprehensive API with all compatible eSIM devices. Integrate real-time device compatibility data and specifications into your platform to help your customers find compatible devices.
                  </p>
                  <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
                    <Link
                      href="/book"
                      className="px-6 py-3 bg-white text-blue-600 rounded-lg hover:bg-gray-100 transition-all duration-200 font-semibold shadow-lg hover:shadow-xl transform hover:scale-105 flex items-center justify-center gap-2"
                    >
                      <Calendar className="w-5 h-5" />
                      Book a Meeting
                      <ArrowRight className="w-5 h-5" />
                    </Link>
                    <Link
                      href="/faq"
                      className="px-6 py-3 bg-white/10 text-white border-2 border-white/30 rounded-lg hover:bg-white/20 transition-all duration-200 font-semibold shadow-md hover:shadow-lg"
                    >
                      Learn More
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Info Section */}
          <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white rounded-xl p-6 shadow-md text-center">
              <CheckCircle className="w-8 h-8 text-green-600 mx-auto mb-3" />
              <h3 className="font-bold text-gray-900 mb-2">100% Compatible</h3>
              <p className="text-gray-600 text-sm">
                All listed devices are tested and verified for eSIM compatibility
              </p>
            </div>
            <div className="bg-white rounded-xl p-6 shadow-md text-center">
              <Smartphone className="w-8 h-8 text-blue-600 mx-auto mb-3" />
              <h3 className="font-bold text-gray-900 mb-2">50+ Brands</h3>
              <p className="text-gray-600 text-sm">
                Support for major smartphone manufacturers worldwide
              </p>
            </div>
            <div className="bg-white rounded-xl p-6 shadow-md text-center">
              <Code className="w-8 h-8 text-purple-600 mx-auto mb-3" />
              <h3 className="font-bold text-gray-900 mb-2">API Access</h3>
              <p className="text-gray-600 text-sm">
                Integrate device compatibility data into your platform
              </p>
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </>
  );
}
