'use client';

import { useState } from 'react';
import Nav from '@/components/Nav';
import Footer from '@/components/Footer';
import Link from 'next/link';
import { Globe, Zap, Infinity, Check, ArrowRight, Calendar, MapPin, Clock, Smartphone } from 'lucide-react';

interface Package {
  id: string;
  name: string;
  type: 'custom' | 'regional' | 'unlimited';
  description: string;
  features: string[];
  price?: string;
  priceNote?: string;
  badge?: string;
}

const Coverage: Package[] = [
  {
    id: 'custom',
    name: 'Custom Coverage',
    type: 'custom',
    description: 'Create your own personalized eSIM package tailored to your specific travel needs. Choose data amount, duration, and countries.',
    features: [
      'Choose your own data amount',
      'Select specific countries or regions',
      'Flexible duration options',
      'Perfect for unique travel itineraries',
      'Bulk pricing available',
      'Dedicated account manager',
    ],
    badge: 'Most Flexible',
  },
  {
    id: 'regional-payg',
    name: 'Regional Coverage',
    type: 'regional',
    description: 'Pay-as-you-go regional Coverage covering multiple countries. Perfect for multi-country trips across regions.',
    features: [
      'Pay only for what you use',
      'Coverage across entire regions',
      'No long-term commitments',
      'Easy top-up options',
      'Works in 50+ countries per region',
      'Instant activation',
    ],
  },
  {
    id: 'unlimited-daily',
    name: 'Unlimited Daily',
    type: 'unlimited',
    description: 'Unlimited data for a full day. Perfect for short trips or when you need maximum connectivity.',
    features: [
      'Unlimited high-speed data',
      '24-hour validity',
      'No data caps or throttling',
      'Works in 200+ countries',
      'Instant activation',
      'No hidden fees',
    ],
    badge: 'Best Value',
  },
  {
    id: 'unlimited-monthly',
    name: 'Unlimited Monthly',
    type: 'unlimited',
    description: 'Unlimited data for an entire month. Ideal for extended stays, digital nomads, or frequent travelers.',
    features: [
      'Unlimited high-speed data',
      '30-day validity',
      'No data caps or throttling',
      'Works in 200+ countries',
      'Billed monthly, cancel anytime',
      'No hidden fees',
    ],
    badge: 'Most Popular',
  },
];

const regions = [
  { name: 'Europe', countries: 50, icon: '🇪🇺' },
  { name: 'Asia Pacific', countries: 45, icon: '🌏' },
  { name: 'Americas', countries: 35, icon: '🌎' },
  { name: 'Middle East & Africa', countries: 40, icon: '🌍' },
];

export default function CoveragePage() {
  const [selectedType, setSelectedType] = useState<string>('all');

  const filteredCoverage = Coverage.filter(
    pkg => selectedType === 'all' || pkg.type === selectedType
  );

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
              Coverage You Can Sell
            </h1>
            <p className="text-lg md:text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              As a business owner, choose from our range of eSIM Coverage to offer your customers. From custom solutions to unlimited data plans, we provide the platform - you sell to your customers.
            </p>
          </div>

          {/* Package Type Filter */}
          <div className="flex flex-wrap gap-3 justify-center mb-12">
            {['all', 'custom', 'regional', 'unlimited'].map((type) => (
              <button
                key={type}
                onClick={() => setSelectedType(type)}
                className={`px-6 py-3 rounded-lg font-medium transition-all duration-200 capitalize ${
                  selectedType === type
                    ? 'bg-blue-600 text-white shadow-md scale-105'
                    : 'bg-white text-gray-700 hover:bg-gray-50 border-2 border-gray-200 hover:border-gray-300'
                }`}
              >
                {type === 'all' ? 'All Coverage' : `${type} Coverage`}
              </button>
            ))}
          </div>

          {/* Coverage Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
            {filteredCoverage.map((pkg) => (
              <div
                key={pkg.id}
                className={`bg-white rounded-2xl shadow-lg border-2 overflow-hidden transition-all duration-300 hover:shadow-xl ${
                  pkg.badge ? 'border-blue-500' : 'border-gray-200 hover:border-gray-300'
                }`}
              >
                {/* Badge */}
                {pkg.badge && (
                  <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white text-center py-2 text-sm font-semibold">
                    {pkg.badge}
                  </div>
                )}

                <div className="p-8">
                  {/* Icon & Title */}
                  <div className="flex items-start gap-4 mb-4">
                    <div className={`p-3 rounded-xl ${
                      pkg.type === 'custom' ? 'bg-purple-100' :
                      pkg.type === 'regional' ? 'bg-blue-100' :
                      'bg-green-100'
                    }`}>
                      {pkg.type === 'custom' ? (
                        <Zap className="w-6 h-6 text-purple-600" />
                      ) : pkg.type === 'regional' ? (
                        <Globe className="w-6 h-6 text-blue-600" />
                      ) : (
                        <Infinity className="w-6 h-6 text-green-600" />
                      )}
                    </div>
                    <div className="flex-1">
                      <h3 className="text-2xl font-bold text-gray-900 mb-2">
                        {pkg.name}
                      </h3>
                      <p className="text-gray-600 leading-relaxed">
                        {pkg.description}
                      </p>
                    </div>
                  </div>


                  {/* Features */}
                  <ul className="space-y-3 mb-6">
                    {pkg.features.map((feature, index) => (
                      <li key={index} className="flex items-start gap-3">
                        <Check className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                        <span className="text-gray-700">{feature}</span>
                      </li>
                    ))}
                  </ul>

                  {/* CTA Button */}
                  <Link
                    href="/book"
                    className="w-full px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-all duration-200 font-semibold text-center shadow-md hover:shadow-lg transform hover:scale-105 flex items-center justify-center gap-2"
                  >
                    Get Started
                    <ArrowRight className="w-5 h-5" />
                  </Link>
                </div>
              </div>
            ))}
          </div>

          {/* Regional Coverage Section */}
          {selectedType === 'all' || selectedType === 'regional' ? (
            <div className="mb-16">
              <h2 className="text-3xl font-bold text-gray-900 text-center mb-8">
                Regional Coverage
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {regions.map((region) => (
                  <div
                    key={region.name}
                    className="bg-white rounded-xl p-6 shadow-md border-2 border-gray-200 hover:border-blue-300 transition-all text-center"
                  >
                    <div className="text-4xl mb-3">{region.icon}</div>
                    <h3 className="text-lg font-bold text-gray-900 mb-2">
                      {region.name}
                    </h3>
                    <p className="text-gray-600 text-sm">
                      {region.countries}+ countries
                    </p>
                  </div>
                ))}
              </div>
            </div>
          ) : null}

          {/* CTA Section */}
          <div className="bg-gradient-to-br from-blue-600 to-purple-600 rounded-2xl p-8 md:p-12 text-white shadow-2xl text-center">
            <div className="max-w-3xl mx-auto">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-white/20 rounded-full mb-6">
                <Calendar className="w-8 h-8" />
              </div>
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                Book a Meeting Now
              </h2>
              <p className="text-xl mb-2 text-blue-100">
                Be the first to partner with us
              </p>
              <p className="text-lg mb-8 text-blue-100">
                Schedule a call with our commercial team to discuss how you can start selling eSIM Coverage to your customers and become a partner
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link
                  href="/book"
                  className="px-6 py-3 bg-white text-blue-600 rounded-lg hover:bg-gray-100 transition-all duration-200 font-semibold shadow-lg hover:shadow-xl transform hover:scale-105 flex items-center justify-center gap-2"
                >
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

          {/* Additional Info */}
          <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-6">
            <Link href="/devices" className="bg-white rounded-xl p-6 shadow-md text-center hover:shadow-lg transition-all border-2 border-transparent hover:border-blue-300">
              <Smartphone className="w-8 h-8 text-blue-600 mx-auto mb-3" />
              <h3 className="font-bold text-gray-900 mb-2">Device Compatibility</h3>
              <p className="text-gray-600 text-sm">
                Check if your device supports eSIM
              </p>
            </Link>
            <div className="bg-white rounded-xl p-6 shadow-md text-center">
              <Clock className="w-8 h-8 text-blue-600 mx-auto mb-3" />
              <h3 className="font-bold text-gray-900 mb-2">Instant Activation</h3>
              <p className="text-gray-600 text-sm">
                Get connected in minutes, not days
              </p>
            </div>
            <div className="bg-white rounded-xl p-6 shadow-md text-center">
              <Check className="w-8 h-8 text-green-600 mx-auto mb-3" />
              <h3 className="font-bold text-gray-900 mb-2">No Hidden Fees</h3>
              <p className="text-gray-600 text-sm">
                Transparent pricing, no surprises
              </p>
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </>
  );
}
