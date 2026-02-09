'use client';

import { usePathname } from 'next/navigation';
import type { ReactNode } from 'react';
import AuthLeftSide from '@/components/auth/AuthLeftSide';

const authConfig = {
  '/login': {
    title: 'Welcome Back',
    phrases: [
      'Sign in to your account to continue',
      'Connect with SYLA Network worldwide',
      'Your gateway to global connectivity',
      'Experience seamless network access',
    ],
    features: [
      { text: 'Enterprise-grade security protecting your data', color: 'blue' as const },
      { text: 'Seamless access across all your devices', color: 'purple' as const },
      { text: 'Round-the-clock support when you need it', color: 'indigo' as const },
    ],
  },
  '/forgot': {
    title: 'Forgot Password?',
    phrases: [
      'We will help you reset your password',
      'Secure password recovery process',
      'Get back to your account quickly',
      'Your security is our priority',
    ],
    features: [
      { text: 'Secure password recovery process', color: 'blue' as const },
      { text: 'Reset link sent to your email', color: 'purple' as const },
      { text: 'Quick and easy account recovery', color: 'indigo' as const },
    ],
  },
};

export default function AuthLayout({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const config = authConfig[pathname as keyof typeof authConfig] || authConfig['/login'];

  return (
    <div className="min-h-screen flex bg-white">
      {/* Left Section */}
      <AuthLeftSide
        title={config.title}
        phrases={config.phrases}
        features={config.features}
      />

      {/* Right Section - w-1/2 */}
      <div className="w-1/2 bg-white flex items-center justify-center relative">
        {children}
      </div>
    </div>
  );
}
