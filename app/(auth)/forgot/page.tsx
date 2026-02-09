'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Languages, ChevronDown, Mail, ChevronLeft } from 'lucide-react';

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [currentLang, setCurrentLang] = useState('en');
  const [isLangDropdownOpen, setIsLangDropdownOpen] = useState(false);

  const languages = [
    { code: 'en', name: 'English', flag: '🇬🇧' },
    { code: 'fr', name: 'Français', flag: '🇫🇷' },
    { code: 'es', name: 'Español', flag: '🇪🇸' },
    { code: 'ar', name: 'العربية', flag: '🇸🇦' },
  ];

  const toggleLanguage = (langCode: string) => {
    setCurrentLang(langCode);
    setIsLangDropdownOpen(false);
    // Add language change logic here
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle password reset logic here
    console.log('Password reset requested for:', email);
    setIsSubmitted(true);
    // Reset after 5 seconds
    setTimeout(() => {
      setIsSubmitted(false);
      setEmail('');
    }, 5000);
  };

  return (
    <>
      {/* Top Bar - Back button and Language Selector */}
      <div className="absolute top-6 left-6 right-6 flex items-center justify-between z-20">
          {/* Back to Login Link */}
          <div className="rounded-lg border border-gray-200 bg-white hover:border-gray-300 transition-all duration-200">
            <Link
              href="/login"
              className="flex items-center justify-center w-10 h-10 text-gray-700 hover:text-gray-900 transition-colors"
              aria-label="Back to login"
            >
              <ChevronLeft size={20} />
            </Link>
          </div>

          {/* Language Selector */}
          <div className="relative">
            <button
              onClick={() => setIsLangDropdownOpen(!isLangDropdownOpen)}
              className="flex items-center gap-2 px-3 py-2 text-sm text-gray-700 hover:text-gray-900 bg-white border border-gray-200 rounded-lg hover:border-gray-300 transition-all duration-200 shadow-sm hover:shadow-md"
              aria-label="Select language"
            >
              <Languages size={18} className="text-blue-600" />
              <span className="font-medium">
                {languages.find(lang => lang.code === currentLang)?.flag} {languages.find(lang => lang.code === currentLang)?.code.toUpperCase()}
              </span>
              <ChevronDown size={16} className={`transition-transform duration-200 ${isLangDropdownOpen ? 'rotate-180' : ''}`} />
            </button>

            {/* Dropdown Menu */}
            {isLangDropdownOpen && (
              <>
                <div 
                  className="fixed inset-0 z-10" 
                  onClick={() => setIsLangDropdownOpen(false)}
                ></div>
                <div className="absolute right-0 mt-2 w-48 bg-white border border-gray-200 rounded-lg shadow-lg z-20 overflow-hidden">
                  {languages.map((lang) => (
                    <button
                      key={lang.code}
                      onClick={() => toggleLanguage(lang.code)}
                      className={`w-full px-4 py-2.5 text-left flex items-center gap-3 hover:bg-blue-50 transition-colors ${
                        currentLang === lang.code ? 'bg-blue-50 text-blue-600 font-medium' : 'text-gray-700'
                      }`}
                    >
                      <span className="text-lg">{lang.flag}</span>
                      <span>{lang.name}</span>
                      {currentLang === lang.code && (
                        <span className="ml-auto text-blue-600">✓</span>
                      )}
                    </button>
                  ))}
                </div>
              </>
            )}
          </div>
        </div>

      <div className="p-4 w-full max-w-md">
          <div className="mb-8">
            <h2 className="text-4xl font-bold text-gray-900 mb-2">Reset your password</h2>
            <p className="text-gray-500 text-sm">Enter your email address and we'll send you a link to reset your password.</p>
          </div>
          
          {isSubmitted ? (
            <div className="space-y-6">
              <div className="bg-green-50 border border-green-200 rounded-lg p-6 text-center">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Mail className="w-8 h-8 text-green-600" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Check your email!</h3>
                <p className="text-sm text-gray-600">
                  We've sent a password reset link to <span className="font-medium">{email}</span>
                </p>
                <p className="text-xs text-gray-500 mt-2">Didn't receive it? Check your spam folder or try again.</p>
              </div>
              <Link
                href="/login"
                className="block text-center text-sm text-blue-600 hover:text-blue-700 font-medium"
              >
                Back to login
              </Link>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                  Email Address
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent outline-none transition-all"
                  placeholder="Enter your email address"
                  required
                />
              </div>

              <button
                type="submit"
                className="w-full px-6 py-3.5 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-lg hover:from-blue-700 hover:to-blue-800 transition-all duration-200 font-semibold text-base shadow-md hover:shadow-lg transform hover:scale-[1.02] active:scale-[0.98]"
              >
                Send Reset Link
              </button>
            </form>
          )}
      </div>
    </>
  );
}
