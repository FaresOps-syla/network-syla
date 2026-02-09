'use client';

import { useState } from 'react';
import Link from 'next/link';
import { ChevronDown, ChevronUp } from 'lucide-react';

interface FAQItem {
  id: number;
  question: string;
  answer: string;
}

const faqItems: FAQItem[] = [
  {
    id: 1,
    question: 'How do I activate my eSIM?',
    answer: 'Activating your eSIM is simple! After purchase, you\'ll receive a QR code via email. Open your device settings, go to Cellular/Mobile Data, tap "Add Cellular Plan" or "Add eSIM", scan the QR code, and you\'re connected. The whole process takes just a few minutes.',
  },
  {
    id: 2,
    question: 'Which devices support eSIM?',
    answer: 'Most modern smartphones support eSIM, including iPhone XS and newer, Samsung Galaxy S20 and newer, Google Pixel 3 and newer, and many other recent models. Check your device settings to confirm eSIM compatibility.',
  },
  {
    id: 3,
    question: 'Can I use my eSIM in multiple countries?',
    answer: 'Each eSIM package is designed for a specific country or region. If you\'re traveling to multiple countries, you can purchase separate packages for each destination, or choose our multi-country regional packages for broader coverage.',
  },
  {
    id: 4,
    question: 'What happens if I run out of data?',
    answer: 'You can easily top up your eSIM package by purchasing additional data through your account. Top-ups are instant and you can continue using your connection without interruption.',
  },
  {
    id: 5,
    question: 'How long is my eSIM package valid?',
    answer: 'Package validity depends on the plan you choose. Daily packages are valid for 24 hours, weekly packages for 7 days, and monthly packages for 30 days. Validity starts when you first connect to the network in your destination country.',
  },
];

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="relative py-20 px-4 sm:px-6 lg:px-8 overflow-hidden bg-gradient-to-br from-blue-50 via-white to-purple-50">
      {/* Floating Background Shapes */}
      <div className="absolute inset-0 overflow-hidden" style={{ zIndex: 0 }}>
        {/* Large floating circles */}
        <div className="absolute top-20 left-10 w-80 h-80 bg-blue-300 rounded-full mix-blend-multiply filter blur-xl opacity-15 animate-blob animation-delay-1000" />
        <div className="absolute bottom-10 right-10 w-96 h-96 bg-purple-300 rounded-full mix-blend-multiply filter blur-xl opacity-15 animate-blob animation-delay-3000" />
        
        {/* Medium floating shapes */}
        <div className="absolute top-1/2 left-1/4 w-64 h-64 bg-gradient-to-br from-blue-200 to-purple-200 rounded-3xl rotate-45 opacity-10 animate-float animation-delay-2000" />
      </div>
      <div className="max-w-7xl mx-auto relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Left Side - Title, Paragraph and Button */}
          <div className="flex flex-col justify-center">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-8">
              Frequently Asked Questions
            </h2>
            <p className="text-gray-600 mb-6 leading-relaxed text-lg">
              Have questions about becoming a partner or integrating our platform? Our partner support team is here to help you succeed.
            </p>
            <Link
              href="/faq"
              className="inline-block text-blue-600 hover:text-blue-700 font-semibold transition-colors underline"
            >
              View All FAQs →
            </Link>
          </div>

          {/* Right Side - Questions */}
          <div>
            <div className="space-y-4">
              {faqItems.map((item, index) => (
                <div
                  key={item.id}
                  className="bg-white rounded-lg shadow-md border border-gray-200 overflow-hidden"
                >
                  <button
                    onClick={() => toggleFAQ(index)}
                    className="w-full px-6 py-4 flex items-center justify-between text-left hover:bg-gray-50 transition-colors"
                  >
                    <span className="font-semibold text-gray-900 pr-4">
                      {item.question}
                    </span>
                    {openIndex === index ? (
                      <ChevronUp className="w-5 h-5 text-gray-600 flex-shrink-0" />
                    ) : (
                      <ChevronDown className="w-5 h-5 text-gray-600 flex-shrink-0" />
                    )}
                  </button>
                  {openIndex === index && (
                    <div className="px-6 py-4 bg-gray-50 border-t border-gray-200">
                      <p className="text-gray-600 leading-relaxed">
                        {item.answer}
                      </p>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
