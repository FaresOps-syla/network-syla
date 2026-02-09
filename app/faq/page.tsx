'use client';

import { useState, useEffect, useMemo } from 'react';
import Nav from '@/components/Nav';
import Footer from '@/components/Footer';
import { ChevronDown, ChevronUp, Search, X, HelpCircle, MessageCircle, ArrowRight } from 'lucide-react';
import Link from 'next/link';

interface FAQItem {
  id: number;
  category: string;
  question: string;
  answer: string;
}

const faqItems: FAQItem[] = [
  {
    id: 1,
    category: 'Getting Started',
    question: 'How do I become a partner?',
    answer: 'Becoming a partner is simple! Book a meeting with our commercial team through our booking page. We\'ll discuss your business model, the packages you want to offer, and guide you through the partnership setup process.',
  },
  {
    id: 2,
    category: 'Getting Started',
    question: 'What types of packages can I sell?',
    answer: 'You can offer custom packages, regional pay-as-you-go packages, unlimited daily packages, and unlimited monthly packages. You can also create your own custom packages tailored to your customers\' needs.',
  },
  {
    id: 3,
    category: 'Getting Started',
    question: 'Do I need technical knowledge to integrate the platform?',
    answer: 'No, you don\'t need extensive technical knowledge. We provide comprehensive API documentation, integration support, and our technical team will assist you throughout the setup process.',
  },
  {
    id: 4,
    category: 'Packages & Pricing',
    question: 'How do I set prices for my customers?',
    answer: 'As a partner, you have flexibility in pricing. You purchase packages from us at wholesale rates and set your own retail prices for your customers. We provide pricing guidelines and can help you determine competitive pricing strategies.',
  },
  {
    id: 5,
    category: 'Packages & Pricing',
    question: 'What are the minimum order requirements?',
    answer: 'We offer flexible partnership terms. There are no strict minimum order requirements - you can start small and scale as your business grows. Contact our commercial team to discuss terms that work for your business.',
  },
  {
    id: 6,
    category: 'Packages & Pricing',
    question: 'Can I create custom packages for my customers?',
    answer: 'Yes! Our custom packages feature allows you to create personalized eSIM packages with specific data amounts, durations, and country selections tailored to your customers\' needs.',
  },
  {
    id: 7,
    category: 'Packages & Pricing',
    question: 'What payment terms are available?',
    answer: 'We offer various payment terms including pay-as-you-go, monthly billing, and prepaid options. Payment terms can be customized based on your business volume and partnership agreement.',
  },
  {
    id: 8,
    category: 'Platform & Integration',
    question: 'Do you offer white-label solutions?',
    answer: 'Yes! We offer white-label solutions that allow you to brand the platform as your own. Your customers will see your branding while using our eSIM infrastructure.',
  },
  {
    id: 9,
    category: 'Platform & Integration',
    question: 'How do I integrate your API?',
    answer: 'We provide comprehensive API documentation and SDKs for easy integration. Our technical support team will assist you with integration, testing, and deployment. Integration typically takes a few days to a few weeks depending on your requirements.',
  },
  {
    id: 10,
    category: 'Platform & Integration',
    question: 'What kind of support do you provide?',
    answer: 'We provide dedicated partner support including technical assistance, API integration help, marketing materials, and business growth strategies. Our support team is available to help you succeed.',
  },
  {
    id: 11,
    category: 'Technical Support',
    question: 'Who handles customer support for my customers?',
    answer: 'You can choose to handle customer support yourself, or we can provide white-label support services. We also offer comprehensive documentation and training materials to help your team support your customers effectively.',
  },
  {
    id: 12,
    category: 'Technical Support',
    question: 'How do my customers activate their eSIM?',
    answer: 'Your customers receive a QR code after purchase (either through your platform or via email). They scan the QR code in their device settings to activate. The process takes just a few minutes and we provide activation guides.',
  },
  {
    id: 13,
    category: 'Payment & Billing',
    question: 'How do I pay for packages?',
    answer: 'We accept various payment methods including bank transfers, credit cards, and other business payment options. Payment terms and methods can be discussed during your partnership setup.',
  },
  {
    id: 14,
    category: 'Payment & Billing',
    question: 'How do I track sales and revenue?',
    answer: 'Our partner dashboard provides comprehensive analytics including sales tracking, revenue reports, customer analytics, and package performance metrics. You\'ll have full visibility into your eSIM business.',
  },
  {
    id: 15,
    category: 'General',
    question: 'What countries and regions are covered?',
    answer: 'Our platform covers 200+ countries and regions worldwide. We offer regional packages covering Europe, Asia Pacific, Americas, and Middle East & Africa. You can offer packages for any of these regions to your customers.',
  },
];

const categories = ['All', 'Getting Started', 'Packages & Pricing', 'Usage & Connectivity', 'Technical Support', 'Payment & Billing', 'General'];

// Most popular FAQs (shown at top)
const popularFAQs = [1, 2, 4, 5, 11];

export default function FAQPage() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');

  // Get category counts
  const categoryCounts = useMemo(() => {
    const counts: Record<string, number> = {};
    categories.forEach(cat => {
      if (cat === 'All') {
        counts[cat] = faqItems.length;
      } else {
        counts[cat] = faqItems.filter(item => item.category === cat).length;
      }
    });
    return counts;
  }, []);

  const toggleFAQ = (itemId: number) => {
    setOpenIndex(openIndex === itemId ? null : itemId);
  };

  const filteredFAQs = useMemo(() => {
    return faqItems.filter((item) => {
      const matchesCategory = selectedCategory === 'All' || item.category === selectedCategory;
      const matchesSearch = searchQuery === '' || 
        item.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.answer.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesCategory && matchesSearch;
    });
  }, [selectedCategory, searchQuery]);

  // Highlight search terms in text
  const highlightText = (text: string, query: string) => {
    if (!query) return text;
    const parts = text.split(new RegExp(`(${query})`, 'gi'));
    return parts.map((part, i) => 
      part.toLowerCase() === query.toLowerCase() ? (
        <mark key={i} className="bg-yellow-200 px-1 rounded">{part}</mark>
      ) : part
    );
  };

  // Clear search
  const clearSearch = () => {
    setSearchQuery('');
  };

  // Reset filters when category changes
  useEffect(() => {
    setOpenIndex(null);
  }, [selectedCategory, searchQuery]);

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

        <div className="max-w-5xl mx-auto relative z-10">
          {/* Header */}
          <div className="text-center mb-10">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-4">
              Frequently Asked Questions
            </h1>
            <p className="text-lg md:text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed">
              Find answers to common questions about eSIM packages, activation, and usage
            </p>
          </div>

          {/* Search Bar */}
          <div className="mb-6">
            <div className="relative max-w-2xl mx-auto">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Search questions... (e.g., activation, pricing, devices)"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-12 pr-12 py-4 rounded-xl border-2 border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all text-base"
                aria-label="Search FAQ questions"
              />
              {searchQuery && (
                <button
                  onClick={clearSearch}
                  className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                  aria-label="Clear search"
                >
                  <X className="w-5 h-5" />
                </button>
              )}
            </div>
          </div>

          {/* Results Count & Category Filter */}
          <div className="mb-8">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-4">
              <div className="text-sm text-gray-600">
                {searchQuery ? (
                  <span>
                    Found <strong className="text-gray-900">{filteredFAQs.length}</strong> {filteredFAQs.length === 1 ? 'result' : 'results'} for "{searchQuery}"
                  </span>
                ) : (
                  <span>
                    Showing <strong className="text-gray-900">{filteredFAQs.length}</strong> {filteredFAQs.length === 1 ? 'question' : 'questions'}
                    {selectedCategory !== 'All' && ` in ${selectedCategory}`}
                  </span>
                )}
              </div>
            </div>
            
            {/* Category Filter - Horizontal Scroll on Mobile */}
            <div className="overflow-x-auto pb-2 -mx-2 px-2">
              <div className="flex flex-wrap gap-2 min-w-max sm:min-w-0 sm:justify-center">
                {categories.map((category) => (
                  <button
                    key={category}
                    onClick={() => setSelectedCategory(category)}
                    className={`px-4 py-2.5 rounded-lg font-medium text-sm transition-all duration-200 whitespace-nowrap ${
                      selectedCategory === category
                        ? 'bg-blue-600 text-white shadow-md scale-105'
                        : 'bg-white text-gray-700 hover:bg-gray-50 border border-gray-200 hover:border-gray-300 hover:shadow-sm'
                    }`}
                    aria-pressed={selectedCategory === category}
                  >
                    {category}
                    {category !== 'All' && (
                      <span className={`ml-2 px-1.5 py-0.5 rounded text-xs ${
                        selectedCategory === category
                          ? 'bg-blue-700 text-white'
                          : 'bg-gray-100 text-gray-600'
                      }`}>
                        {categoryCounts[category]}
                      </span>
                    )}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Popular FAQs Section (only show when no filters) */}
          {!searchQuery && selectedCategory === 'All' && (
            <div className="mb-10">
              <div className="flex items-center gap-2 mb-4">
                <HelpCircle className="w-5 h-5 text-blue-600" />
                <h2 className="text-xl font-bold text-gray-900">Most Asked Questions</h2>
              </div>
              <div className="space-y-3">
                {faqItems
                  .filter(item => popularFAQs.includes(item.id))
                  .map((item) => (
                    <div
                      key={item.id}
                      className={`bg-white rounded-xl shadow-sm border-2 overflow-hidden transition-all duration-300 ${
                        openIndex === item.id
                          ? 'border-blue-500 shadow-md'
                          : 'border-gray-200 hover:border-gray-300 hover:shadow-md'
                      }`}
                    >
                      <button
                        onClick={() => toggleFAQ(item.id)}
                        className="w-full px-6 py-4 flex items-center justify-between text-left hover:bg-gray-50 transition-colors group"
                        aria-expanded={openIndex === item.id}
                      >
                        <div className="flex-1 pr-4">
                          <span className="text-xs font-semibold text-blue-600 mb-2 block">
                            {item.category}
                          </span>
                          <span className="font-semibold text-gray-900 text-base group-hover:text-blue-600 transition-colors">
                            {highlightText(item.question, searchQuery)}
                          </span>
                        </div>
                        <div className={`flex-shrink-0 transition-transform duration-300 ${
                          openIndex === item.id ? 'rotate-180' : ''
                        }`}>
                          <ChevronDown className="w-5 h-5 text-gray-400 group-hover:text-blue-600 transition-colors" />
                        </div>
                      </button>
                      {openIndex === item.id && (
                        <div className="px-6 py-5 bg-gradient-to-br from-blue-50 to-white border-t-2 border-blue-100 animate-fade-in">
                          <p className="text-gray-700 leading-relaxed text-base">
                            {highlightText(item.answer, searchQuery)}
                          </p>
                        </div>
                      )}
                    </div>
                  ))}
              </div>
            </div>
          )}

          {/* All FAQ Items */}
          <div className="space-y-3">
            {filteredFAQs.length > 0 ? (
              filteredFAQs
                .filter(item => !popularFAQs.includes(item.id) || searchQuery || selectedCategory !== 'All')
                .map((item) => (
                  <div
                    key={item.id}
                    className={`bg-white rounded-xl shadow-sm border-2 overflow-hidden transition-all duration-300 ${
                      openIndex === item.id
                        ? 'border-blue-500 shadow-md'
                        : 'border-gray-200 hover:border-gray-300 hover:shadow-md'
                    }`}
                  >
                    <button
                      onClick={() => toggleFAQ(item.id)}
                      className="w-full px-6 py-4 flex items-center justify-between text-left hover:bg-gray-50 transition-colors group"
                      aria-expanded={openIndex === item.id}
                    >
                      <div className="flex-1 pr-4">
                        <span className="text-xs font-semibold text-blue-600 mb-2 block">
                          {item.category}
                        </span>
                        <span className="font-semibold text-gray-900 text-base group-hover:text-blue-600 transition-colors">
                          {highlightText(item.question, searchQuery)}
                        </span>
                      </div>
                      <div className={`flex-shrink-0 transition-transform duration-300 ${
                        openIndex === item.id ? 'rotate-180' : ''
                      }`}>
                        <ChevronDown className="w-5 h-5 text-gray-400 group-hover:text-blue-600 transition-colors" />
                      </div>
                    </button>
                    {openIndex === item.id && (
                      <div className="px-6 py-5 bg-gradient-to-br from-blue-50 to-white border-t-2 border-blue-100 animate-fade-in">
                        <p className="text-gray-700 leading-relaxed text-base">
                          {highlightText(item.answer, searchQuery)}
                        </p>
                      </div>
                    )}
                  </div>
                ))
            ) : (
              <div className="text-center py-16 bg-white rounded-xl border-2 border-dashed border-gray-300">
                <HelpCircle className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                <p className="text-gray-600 text-lg font-medium mb-2">
                  No FAQs found
                </p>
                <p className="text-gray-500 text-sm mb-6">
                  Try adjusting your search or selecting a different category
                </p>
                <div className="flex flex-wrap gap-2 justify-center">
                  <button
                    onClick={clearSearch}
                    className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-all duration-200 font-semibold shadow-md hover:shadow-lg transform hover:scale-105"
                  >
                    Clear Search
                  </button>
                  <button
                    onClick={() => setSelectedCategory('All')}
                    className="px-6 py-3 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-all duration-200 font-semibold border-2 border-gray-200 hover:border-gray-300"
                  >
                    Show All Categories
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Contact Support Section */}
          <div className="mt-16 bg-gradient-to-br from-blue-50 to-purple-50 rounded-2xl p-8 md:p-10 shadow-xl border border-blue-100">
            <div className="max-w-2xl mx-auto text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-600 rounded-full mb-4">
                <MessageCircle className="w-8 h-8 text-white" />
              </div>
              <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-3">
                Still have questions?
              </h2>
              <p className="text-gray-600 mb-8 text-lg">
                Can't find what you're looking for? Our partner support team is available to help you succeed with our platform.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link
                  href="mailto:support@sylanetwork.com"
                  className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-all duration-200 font-semibold shadow-md hover:shadow-lg transform hover:scale-105 flex items-center justify-center gap-2"
                >
                  Contact Support
                  <ArrowRight className="w-4 h-4" />
                </Link>
                <Link
                  href="/packages"
                  className="px-6 py-3 bg-white text-gray-900 rounded-lg hover:bg-gray-50 transition-all duration-200 font-semibold border-2 border-gray-200 hover:border-gray-300 shadow-sm hover:shadow-md"
                >
                  Browse Packages
                </Link>
              </div>
              <div className="mt-6 pt-6 border-t border-gray-200">
                <p className="text-sm text-gray-500">
                  Average response time: <span className="font-semibold text-gray-700">Under 5 minutes</span>
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </>
  );
}
