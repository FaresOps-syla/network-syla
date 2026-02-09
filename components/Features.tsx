'use client';

import Image from 'next/image';

interface Feature {
  id: number;
  title: string;
  description: string;
  image?: string;
  colSpan?: number;
  variant?: 'light' | 'dark';
}

const features: Feature[] = [
  {
    id: 1,
    title: 'eSIM Platform',
    description: 'SYLA NETWORK provides a complete eSIM platform with connectivity in over 200+ countries. We are your technology provider - you sell to your customers.',
    colSpan: 1,
    variant: 'light',
  },
  {
    id: 2,
    title: 'White-Label Solution',
    description: 'Brand the platform as your own. We provide the infrastructure, you maintain your brand identity and customer relationships.',
    colSpan: 1,
    variant: 'light',
  },
  {
    id: 3,
    title: 'Flexible Packages',
    description: 'Offer your customers daily, weekly, or monthly data packages. Choose from our range or create custom packages for your business needs.',
    colSpan: 1,
    variant: 'light',
  },
  {
    id: 4,
    title: 'Global Coverage',
    description: 'Provide your customers with connectivity in 200+ countries and regions worldwide. One platform, unlimited destinations. Perfect for businesses serving travelers and digital nomads.',
    colSpan: 2,
    variant: 'dark',
  },
  {
    id: 5,
    title: 'API Integration',
    description: 'Integrate our eSIM platform into your existing systems. Complete API access for seamless integration with your business operations.',
    colSpan: 1,
    variant: 'light',
  },
  {
    id: 6,
    title: 'Easy Setup',
    description: 'Simple QR code activation for your customers. Compatible with all eSIM-enabled devices. No technical knowledge required from your customers.',
    colSpan: 1,
    variant: 'light',
  },
  {
    id: 7,
    title: 'Partner Support',
    description: 'Our dedicated partner support team is available around the clock to help with platform integration, technical issues, and business growth strategies. We support your success.',
    colSpan: 2,
    variant: 'dark',
  },
];

export default function Features() {
  return (
    <section className="relative py-20 px-4 sm:px-6 lg:px-8 overflow-hidden bg-gradient-to-br from-blue-50 via-white to-purple-50">
      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Why Partner With SYLA NETWORK
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Everything you need to start selling eSIM packages to your customers
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 relative z-10">
          {features.map((feature) => (
            <div
              key={feature.id}
              className={`bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden flex flex-col ${
                feature.colSpan === 2 ? 'md:col-span-2' : ''
              }`}
            >
              {/* Text Content - Top Section */}
              <div className="p-6 pb-4 flex flex-col flex-grow">
                {/* Title */}
                <h3 className="text-xl font-bold text-gray-900 mb-3 text-left">
                  {feature.title}
                </h3>

                {/* Description */}
                <p className="text-gray-600 text-sm leading-relaxed text-left">
                  {feature.description}
                </p>
              </div>

              {/* Image/Graphic - Bottom Section with Overflow */}
              <div className="relative h-64 overflow-hidden rounded-b-2xl">
                {feature.image ? (
                  <Image
                    src={feature.image}
                    alt={feature.title}
                    fill
                    className="object-cover object-bottom"
                    style={{ transform: 'scale(1.1)' }}
                  />
                ) : (
                  <div className="w-full h-full bg-gradient-to-br from-blue-400 via-purple-500 to-pink-400 flex items-center justify-center relative">
                    {/* Placeholder Globe-like Graphic */}
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="w-48 h-48 rounded-full bg-blue-600/30 blur-3xl"></div>
                      <div className="absolute w-32 h-32 rounded-full border-2 border-blue-500/50"></div>
                      <div className="absolute w-24 h-24 rounded-full border border-purple-400/50"></div>
                      {/* Dots pattern */}
                      <div className="absolute top-1/4 left-1/3 w-2 h-2 bg-blue-300 rounded-full"></div>
                      <div className="absolute top-1/3 right-1/4 w-2 h-2 bg-blue-300 rounded-full"></div>
                      <div className="absolute bottom-1/3 left-1/4 w-2 h-2 bg-blue-300 rounded-full"></div>
                      <div className="absolute bottom-1/4 right-1/3 w-2 h-2 bg-blue-300 rounded-full"></div>
                      <div className="absolute top-1/2 left-1/2 w-2 h-2 bg-blue-300 rounded-full"></div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
