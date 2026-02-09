'use client';

import { useState, useEffect } from 'react';
import Earth from '@/components/globe';

interface AuthLeftSideProps {
  title: string;
  phrases: string[];
  features: Array<{
    text: string;
    color: 'blue' | 'purple' | 'indigo';
  }>;
}

export default function AuthLeftSide({ title, phrases, features }: AuthLeftSideProps) {
  const [currentPhraseIndex, setCurrentPhraseIndex] = useState(0);
  const [displayedText, setDisplayedText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);
  const [typingSpeed, setTypingSpeed] = useState(100);

  useEffect(() => {
    const currentPhrase = phrases[currentPhraseIndex];
    
    if (!isDeleting && displayedText === currentPhrase) {
      // Pause at the end of typing
      setTimeout(() => {
        setIsDeleting(true);
        setTypingSpeed(50); // Faster deletion
      }, 2000);
    } else if (isDeleting && displayedText === '') {
      // Move to next phrase
      setIsDeleting(false);
      setCurrentPhraseIndex((prev) => (prev + 1) % phrases.length);
      setTypingSpeed(100); // Normal typing speed
    } else {
      // Type or delete
      const timeout = setTimeout(() => {
        if (isDeleting) {
          setDisplayedText(currentPhrase.substring(0, displayedText.length - 1));
        } else {
          setDisplayedText(currentPhrase.substring(0, displayedText.length + 1));
        }
      }, typingSpeed);

      return () => clearTimeout(timeout);
    }
  }, [displayedText, isDeleting, currentPhraseIndex, phrases, typingSpeed]);

  const colorClasses = {
    blue: 'bg-blue-600',
    purple: 'bg-purple-600',
    indigo: 'bg-indigo-600',
  };

  return (
    <div className="w-2/3 bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 m-4 flex flex-col relative overflow-hidden rounded-3xl shadow-xl">
      {/* Subtle background pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-20 left-20 w-72 h-72 bg-blue-400 rounded-full mix-blend-multiply filter blur-3xl animate-blob"></div>
        <div className="absolute top-40 right-20 w-72 h-72 bg-purple-400 rounded-full mix-blend-multiply filter blur-3xl animate-blob animation-delay-2000"></div>
      </div>

      {/* Content Container */}
      <div className="relative z-10 w-full h-full flex flex-col justify-between px-12 py-16">
        {/* Top Section - Welcome Content */}
        <div className="flex flex-col space-y-6">
          {/* Logo/Brand Area */}
          <div className="mb-8">
            <h1 className="text-5xl font-bold text-gray-900 mb-2 leading-tight">
              {title}
            </h1>
            <div className="w-20 h-1 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full"></div>
          </div>

          {/* Typing Animation */}
          <div className="space-y-4">
            <p className="text-xl text-gray-700 min-h-[32px] leading-relaxed font-medium">
              {displayedText}
              <span className="animate-pulse ml-1 text-blue-600">|</span>
            </p>
          </div>

          {/* Feature highlights */}
          <div className="mt-12 space-y-4">
            {features.map((feature, index) => (
              <div key={index} className="flex items-start gap-3">
                <div className={`mt-1 w-2 h-2 ${colorClasses[feature.color]} rounded-full`}></div>
                <p className="text-gray-600 text-sm leading-relaxed">{feature.text}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom decorative element */}
        <div className="mt-auto pt-8">
          <div className="flex items-center gap-2 text-sm text-gray-500">
            <div className="w-8 h-px bg-gradient-to-r from-transparent via-gray-300 to-transparent"></div>
            <span>SYLA Network</span>
            <div className="w-8 h-px bg-gradient-to-r from-transparent via-gray-300 to-transparent"></div>
          </div>
        </div>
      </div>

      {/* Globe at bottom right corner - showing only half */}
      <div className="absolute bottom-0 right-0 w-2/3 h-2/3 overflow-hidden pointer-events-none">
        <div className="relative w-full h-full flex items-end justify-end" style={{ transform: 'translateY(50%) translateX(30%)' }}>
          <Earth />
        </div>
      </div>
    </div>
  );
}
