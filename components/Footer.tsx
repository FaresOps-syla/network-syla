'use client';

import Link from 'next/link';
import Image from 'next/image';

export default function Footer() {
  return (
    <footer className="relative w-full overflow-hidden bg-gradient-to-br from-blue-50 via-white to-purple-50 backdrop-blur-md border-t border-white/20 mt-20">
      {/* Floating Background Shapes */}
      <div className="absolute inset-0 overflow-hidden" style={{ zIndex: 0 }}>
        <div className="absolute top-0 left-1/4 w-64 h-64 bg-blue-200 rounded-full mix-blend-multiply filter blur-xl opacity-10 animate-blob" />
        <div className="absolute bottom-0 right-1/4 w-72 h-72 bg-purple-200 rounded-full mix-blend-multiply filter blur-xl opacity-10 animate-blob animation-delay-2000" />
      </div>
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand Section */}
          <div className="col-span-1">
            <Link href="/" className="flex items-center gap-3 mb-4">
              <Image
                src="/images/logo.png"
                alt="SYLA NETWORK Logo"
                width={100}
                height={40}
                className="object-contain"
              />
            </Link>
            <p className="text-gray-600 text-sm drop-shadow-sm">
              Your eSIM platform provider. Enable businesses to sell eSIM Coverage in 200+ countries with instant activation.
            </p>
          </div>

          {/* Quick Links */}
          <div className="col-span-1">
            <h3 className="text-gray-800 font-semibold mb-4 drop-shadow-sm">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/Coverage" className="text-gray-600 hover:text-gray-900 transition-colors text-sm drop-shadow-sm">
                  Browse Coverage
                </Link>
              </li>
              <li>
                <Link href="/countries" className="text-gray-600 hover:text-gray-900 transition-colors text-sm drop-shadow-sm">
                  Coverage Countries
                </Link>
              </li>
              <li>
                <Link href="/faq" className="text-gray-600 hover:text-gray-900 transition-colors text-sm drop-shadow-sm">
                  FAQ
                </Link>
              </li>
            </ul>
          </div>

          {/* Resources */}
          <div className="col-span-1">
            <h3 className="text-gray-800 font-semibold mb-4 drop-shadow-sm">Resources</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/how-it-works" className="text-gray-600 hover:text-gray-900 transition-colors text-sm drop-shadow-sm">
                  How It Works
                </Link>
              </li>
              <li>
                <Link href="/device-compatibility" className="text-gray-600 hover:text-gray-900 transition-colors text-sm drop-shadow-sm">
                  Device Compatibility
                </Link>
              </li>
              <li>
                <Link href="/support" className="text-gray-600 hover:text-gray-900 transition-colors text-sm drop-shadow-sm">
                  Support
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div className="col-span-1">
            <h3 className="text-gray-800 font-semibold mb-4 drop-shadow-sm">Contact</h3>
            <ul className="space-y-2">
              <li className="text-gray-600 text-sm drop-shadow-sm">
                Email: support@sylanetwork.com
              </li>
              <li className="text-gray-600 text-sm drop-shadow-sm">
                24/7 Support Available
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-8 pt-8 border-t border-white/20">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-600 text-sm drop-shadow-sm">
              © {new Date().getFullYear()} SYLA NETWORK. All rights reserved.
            </p>
            <div className="flex gap-6 mt-4 md:mt-0">
              <Link href="/privacy" className="text-gray-600 hover:text-gray-900 transition-colors text-sm drop-shadow-sm">
                Privacy Policy
              </Link>
              <Link href="/terms" className="text-gray-600 hover:text-gray-900 transition-colors text-sm drop-shadow-sm">
                Terms of Service
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
