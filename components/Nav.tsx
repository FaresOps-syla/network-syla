'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';
import { Menu, X, Sun, Moon, Languages } from 'lucide-react';

export default function Nav() {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [currentLang, setCurrentLang] = useState('fr');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
    // Add theme toggle logic here
  };

  const toggleLanguage = () => {
    setCurrentLang(currentLang === 'fr' ? 'en' : 'fr');
    // Add language toggle logic here
  };

  return (
    <nav className="fixed top-0 left-0 right-0 w-full bg-transparent backdrop-blur-md border-white/20 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Brand Section - Left */}
          <div className="flex items-center gap-3">
            <Link href="/" className="flex items-center gap-3">
              <Image
                src="/images/logo.png"
                alt="SYLA NETWORK Logo"
                width={100}
                height={40}
                className="object-contain"
              />
            </Link>
          </div>

          {/* Navigation Links - Center */}
          <div className="hidden md:flex items-center gap-8">
            <Link
              href="/"
              className="text-gray-800 hover:text-gray-900 transition-colors font-medium drop-shadow-sm"
            >
              Home
            </Link>
            <Link
              href="/Coverage"
              className="text-gray-800 hover:text-gray-900 transition-colors font-medium drop-shadow-sm"
            >
              Coverage
            </Link>
            <Link
              href="/devices"
              className="text-gray-800 hover:text-gray-900 transition-colors font-medium drop-shadow-sm"
            >
              Devices
            </Link>
            <Link
              href="/faq"
              className="text-gray-800 hover:text-gray-900 transition-colors font-medium drop-shadow-sm"
            >
              FAQ
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden p-2 text-gray-800 hover:text-gray-900 drop-shadow-sm"
            aria-label="Toggle menu"
          >
            {isMobileMenuOpen ? (
              <X size={24} />
            ) : (
              <Menu size={24} />
            )}
          </button>

          {/* Utility Icons and Action Buttons - Right */}
          <div className="hidden md:flex items-center gap-4">
            {/* Theme Toggle Icon */}
            <button
              onClick={toggleTheme}
              className="p-2 text-blue-600 hover:text-blue-700 transition-colors"
              aria-label="Toggle theme"
            >
              {isDarkMode ? <Sun size={20} /> : <Moon size={20} />}
            </button>

            {/* Language Selector Icon */}
            <button
              onClick={toggleLanguage}
              className="p-2 text-blue-600 hover:text-blue-700 transition-colors"
              aria-label="Toggle language"
            >
              <Languages size={20} />
            </button>

            {/* Action Buttons */}
            <Link
              href="/login"
              className="px-4 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-all duration-200 font-semibold text-sm whitespace-nowrap shadow-md hover:shadow-lg"
            >
              Login
            </Link>
            <Link
              href="/book"
              className="px-4 py-3 bg-black text-white rounded-lg hover:bg-gray-800 transition-all duration-200 font-semibold text-sm whitespace-nowrap shadow-md hover:shadow-lg"
            >
              Book a Meeting
            </Link>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden border-t border-white/20 py-4 bg-white/80 backdrop-blur-md">
            <div className="flex flex-col gap-4">
              <Link
                href="/"
                className="text-gray-800 hover:text-gray-900 transition-colors font-medium px-2"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Home
              </Link>
              <Link
                href="/Coverage"
                className="text-gray-800 hover:text-gray-900 transition-colors font-medium px-2"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Coverage
              </Link>
              <Link
                href="/devices"
                className="text-gray-800 hover:text-gray-900 transition-colors font-medium px-2"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Devices
              </Link>
              <Link
                href="/faq"
                className="text-gray-800 hover:text-gray-900 transition-colors font-medium px-2"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                FAQ
              </Link>
              <div className="flex items-center gap-4 pt-4 border-t border-white/20">
                <button
                  onClick={toggleTheme}
                  className="p-2 text-blue-600 hover:text-blue-700 transition-colors"
                  aria-label="Toggle theme"
                >
                  {isDarkMode ? <Sun size={20} /> : <Moon size={20} />}
                </button>
                <button
                  onClick={toggleLanguage}
                  className="p-2 text-blue-600 hover:text-blue-700 transition-colors"
                  aria-label="Toggle language"
                >
                  <Languages size={20} />
                </button>
                <Link
                  href="/login"
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-all duration-200 font-semibold text-sm shadow-md hover:shadow-lg"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Login
                </Link>
                <Link
                  href="/book"
                  className="px-4 py-2 bg-black text-white rounded-lg hover:bg-gray-800 transition-all duration-200 font-semibold text-sm shadow-md hover:shadow-lg"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Book a Meeting
                </Link>
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
