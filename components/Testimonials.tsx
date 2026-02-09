'use client';

import { useState, useEffect } from 'react';
import { Quote } from 'lucide-react';

interface Testimonial {
  id: number;
  name: string;
  role: string;
  company: string;
  content: string;
  avatar?: string;
}

const testimonials: Testimonial[] = [
  {
    id: 1,
    name: 'Sarah Johnson',
    role: 'CEO',
    company: 'TravelTech Solutions',
    content: 'Partnering with SYLA NETWORK has transformed our business. We can now offer eSIM Coverage to our customers seamlessly. The platform integration was smooth and their support team is exceptional.',
  },
  {
    id: 2,
    name: 'Michael Chen',
    role: 'Founder',
    company: 'Global Connectivity Hub',
    content: 'As a business owner, SYLA NETWORK provides everything we need. The API integration was straightforward, and our customers love the instant activation. Revenue has increased significantly since we started offering eSIM Coverage.',
  },
  {
    id: 3,
    name: 'Emily Rodriguez',
    role: 'Business Development Manager',
    company: 'Digital Services Inc',
    content: 'The white-label solution allows us to maintain our brand while offering eSIM services. Our customers get great connectivity, and we get a new revenue stream. The partner support is outstanding!',
  },
  {
    id: 4,
    name: 'David Thompson',
    role: 'Operations Director',
    company: 'Travel Agency Network',
    content: 'We\'ve been partners with SYLA NETWORK for over a year. The platform is reliable, the Coverage are competitive, and our customers are happy. It\'s been a game-changer for our business.',
  },
  {
    id: 5,
    name: 'Lisa Anderson',
    role: 'Co-Founder',
    company: 'Nomad Workspace',
    content: 'SYLA NETWORK enabled us to add eSIM services to our platform quickly. The custom Coverage feature lets us serve our digital nomad customers perfectly. Highly recommend for any business looking to offer connectivity solutions.',
  },
];

export default function Testimonials() {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % testimonials.length);
    }, 5000); // Change every 5 seconds

    return () => clearInterval(interval);
  }, []);

  return (
    <section className="relative py-20 px-4 sm:px-6 lg:px-8 overflow-hidden bg-gradient-to-br from-blue-50 via-white to-purple-50">
      {/* Floating Background Shapes */}
      <div className="absolute inset-0 overflow-hidden" style={{ zIndex: 0 }}>
        <div className="absolute top-10 left-20 w-80 h-80 bg-blue-300 rounded-full mix-blend-multiply filter blur-xl opacity-15 animate-blob" />
        <div className="absolute bottom-20 right-20 w-96 h-96 bg-purple-300 rounded-full mix-blend-multiply filter blur-xl opacity-15 animate-blob animation-delay-2000" />
        <div className="absolute top-1/2 left-1/3 w-64 h-64 bg-pink-300 rounded-full mix-blend-multiply filter blur-xl opacity-15 animate-blob animation-delay-4000" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left Side - Text */}
          <div className="space-y-6">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900">
              What Our Partners Say
            </h2>
            <p className="text-xl text-gray-600 leading-relaxed">
              Don't just take our word for it. See what our business partners have to say about partnering with SYLA NETWORK and selling eSIM Coverage.
            </p>
            <div className="flex items-center gap-2 pt-4">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentIndex(index)}
                  className={`h-2 rounded-full transition-all duration-300 ${
                    index === currentIndex
                      ? 'w-8 bg-blue-600'
                      : 'w-2 bg-gray-300 hover:bg-gray-400'
                  }`}
                  aria-label={`Go to testimonial ${index + 1}`}
                />
              ))}
            </div>
          </div>

          {/* Right Side - Testimonial Cards */}
          <div className="relative h-[400px] overflow-hidden">
            {/* Card Container with Vertical Translation Animation */}
            <div className="relative h-full">
              {testimonials.map((testimonial, index) => {
                const isActive = index === currentIndex;
                const offset = index - currentIndex;
                
                return (
                  <div
                    key={testimonial.id}
                    className={`absolute inset-0 transition-all duration-700 ease-in-out ${
                      isActive ? 'opacity-100 translate-y-0 z-10' : 'opacity-0 translate-y-8 z-0 pointer-events-none'
                    }`}
                    style={{
                      transform: isActive ? 'translateY(0)' : `translateY(${offset > 0 ? 40 : -40}px)`,
                    }}
                  >
                    <div className="bg-white rounded-2xl p-8 shadow-xl h-full flex flex-col">
                      {/* Quote Icon */}
                      <div className="mb-4">
                        <Quote className="w-12 h-12 text-blue-600" />
                      </div>

                      {/* Testimonial Content */}
                      <p className="text-gray-700 text-lg leading-relaxed mb-6 flex-grow">
                        "{testimonial.content}"
                      </p>

                      {/* Author Info */}
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-400 to-purple-400 flex items-center justify-center text-white font-bold text-lg">
                          {testimonial.name.charAt(0)}
                        </div>
                        <div>
                          <h4 className="font-semibold text-gray-900">
                            {testimonial.name}
                          </h4>
                          <p className="text-sm text-gray-600">
                            {testimonial.role} at {testimonial.company}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
