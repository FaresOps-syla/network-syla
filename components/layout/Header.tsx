'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  Menu,
  Search,
  Bell,
  Settings,
  User,
  UserCircle,
  Users,
  LogOut,
  ChevronDown,
  Sun,
  Moon,
  Languages,
  ChevronRight,
  AlertCircle,
  HelpCircle,
} from 'lucide-react';
import { cn } from '@/lib/utils';

interface HeaderProps {
  onMenuClick: () => void;
  sidebarOpen: boolean;
}

const rightNavLinks = [
  { href: '/help-center', label: 'Help', icon: HelpCircle },
  { href: '/account', label: 'Account', icon: UserCircle },
];

export default function Header({ onMenuClick, sidebarOpen }: HeaderProps) {
  const pathname = usePathname();
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);
  const [showLangMenu, setShowLangMenu] = useState(false);
  const [currentLang, setCurrentLang] = useState('en');

  const languages = [
    { code: 'en', name: 'English', flag: '🇬🇧' },
    { code: 'fr', name: 'Français', flag: '🇫🇷' },
    { code: 'es', name: 'Español', flag: '🇪🇸' },
    { code: 'ar', name: 'العربية', flag: '🇸🇦' },
  ];

  const notifications = [
    { id: 1, title: 'New package available', message: 'Europe package is now live', time: '2m ago', unread: true },
    { id: 2, title: 'Payment received', message: 'Payment of $299 received', time: '1h ago', unread: true },
    { id: 3, title: 'System update', message: 'System maintenance completed', time: '3h ago', unread: false },
  ];

  const unreadCount = notifications.filter((n) => n.unread).length;

  return (
    <header className="sticky top-0 z-30 bg-white border-b border-gray-200 shadow-sm">
      <div className="flex items-center justify-between h-14 px-3 sm:px-4 lg:px-6">
        {/* Left Section */}
        <div className="flex items-center gap-3">
          <button
            onClick={onMenuClick}
            className="p-1.5 rounded-lg hover:bg-gray-100 transition-colors lg:hidden"
            aria-label="Toggle menu"
          >
            <Menu className="w-4 h-4 text-gray-600" />
          </button>

          {!sidebarOpen && (
            <button
              onClick={onMenuClick}
              className="hidden lg:flex p-1.5 rounded-lg hover:bg-gray-100 transition-colors"
              aria-label="Toggle sidebar"
            >
              <ChevronRight className="w-4 h-4 text-gray-600" />
            </button>
          )}

          <div className="hidden md:flex items-center gap-2 bg-gray-50 rounded-lg px-3 py-1.5 w-56 lg:w-80">
            <Search className="w-3.5 h-3.5 text-gray-400" />
            <input
              type="text"
              placeholder="Search..."
              className="flex-1 bg-transparent border-none outline-none text-xs text-gray-700 placeholder-gray-400"
            />
          </div>
        </div>

        {/* Right navigation */}
        <nav className="flex items-center gap-2 sm:gap-4" aria-label="Header navigation">
          <div className="hidden sm:flex items-center gap-1 border-r border-gray-200 pr-3 mr-1">
            {rightNavLinks.map((item) => {
              const Icon = item.icon;
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={cn(
                    'flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-sm font-medium transition-colors',
                    isActive ? 'bg-blue-50 text-blue-600' : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900'
                  )}
                >
                  <Icon className="w-4 h-4" />
                  {item.label}
                </Link>
              );
            })}
          </div>

          <div className="flex items-center gap-1.5">
            <button
              onClick={() => setIsDarkMode(!isDarkMode)}
              className="p-1.5 rounded-lg hover:bg-gray-100 transition-colors"
              aria-label="Toggle theme"
            >
              {isDarkMode ? <Sun className="w-4 h-4 text-gray-600" /> : <Moon className="w-4 h-4 text-gray-600" />}
            </button>

            <div className="relative">
              <button
                onClick={() => setShowLangMenu(!showLangMenu)}
                className="p-1.5 rounded-lg hover:bg-gray-100 transition-colors"
                aria-label="Select language"
              >
                <Languages className="w-4 h-4 text-gray-600" />
              </button>
              {showLangMenu && (
                <>
                  <div className="fixed inset-0 z-10" onClick={() => setShowLangMenu(false)} />
                  <div className="absolute right-0 mt-2 w-44 bg-white border border-gray-200 rounded-lg shadow-lg z-20 overflow-hidden">
                    {languages.map((lang) => (
                      <button
                        key={lang.code}
                        onClick={() => {
                          setCurrentLang(lang.code);
                          setShowLangMenu(false);
                        }}
                        className={cn(
                          'w-full px-3 py-2 text-left flex items-center gap-2 hover:bg-blue-50 transition-colors',
                          currentLang === lang.code ? 'bg-blue-50 text-blue-600 font-medium' : 'text-gray-700'
                        )}
                      >
                        <span className="text-base">{lang.flag}</span>
                        <span className="text-xs">{lang.name}</span>
                        {currentLang === lang.code && <span className="ml-auto text-blue-600 text-xs">✓</span>}
                      </button>
                    ))}
                  </div>
                </>
              )}
            </div>

            <div className="relative">
              <button
                onClick={() => setShowNotifications(!showNotifications)}
                className="relative p-2 rounded-lg hover:bg-gray-100 transition-colors"
                aria-label="Notifications"
              >
                <Bell className="w-5 h-5 text-gray-600" />
                {unreadCount > 0 && (
                  <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full border-2 border-white" />
                )}
              </button>
              {showNotifications && (
                <>
                  <div className="fixed inset-0 z-10" onClick={() => setShowNotifications(false)} />
                  <div className="absolute right-0 mt-2 w-80 bg-white border border-gray-200 rounded-lg shadow-lg z-20 overflow-hidden">
                    <div className="p-4 border-b border-gray-200">
                      <h3 className="font-semibold text-gray-900">Notifications</h3>
                      {unreadCount > 0 && <p className="text-xs text-gray-500 mt-1">{unreadCount} unread</p>}
                    </div>
                    <div className="max-h-96 overflow-y-auto">
                      {notifications.map((notification) => (
                        <div
                          key={notification.id}
                          className={cn(
                            'p-4 border-b border-gray-100 hover:bg-gray-50 transition-colors cursor-pointer',
                            notification.unread && 'bg-blue-50/50'
                          )}
                        >
                          <div className="flex items-start gap-3">
                            <div
                              className={cn(
                                'w-2 h-2 rounded-full mt-2 flex-shrink-0',
                                notification.unread ? 'bg-blue-600' : 'bg-gray-300'
                              )}
                            />
                            <div className="flex-1 min-w-0">
                              <p className="text-sm font-medium text-gray-900">{notification.title}</p>
                              <p className="text-xs text-gray-600 mt-1">{notification.message}</p>
                              <p className="text-xs text-gray-400 mt-1">{notification.time}</p>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                    <div className="p-2 border-t border-gray-200">
                      <button className="w-full text-center text-sm text-blue-600 hover:text-blue-700 font-medium py-2">
                        View all notifications
                      </button>
                    </div>
                  </div>
                </>
              )}
            </div>

            <div className="relative">
              <button
                onClick={() => setShowUserMenu(!showUserMenu)}
                className="flex items-center gap-1.5 p-1 rounded-lg hover:bg-gray-100 transition-colors"
              >
                <div className="w-7 h-7 rounded-full bg-gradient-to-br from-blue-500 to-purple-500 flex items-center justify-center text-white text-xs font-semibold">
                  JD
                </div>
                <ChevronDown
                  className={cn('w-3.5 h-3.5 text-gray-600 transition-transform hidden sm:block', showUserMenu && 'rotate-180')}
                />
              </button>
              {showUserMenu && (
                <>
                  <div className="fixed inset-0 z-10" onClick={() => setShowUserMenu(false)} />
                  <div className="absolute right-0 mt-2 w-48 bg-white border border-gray-200 rounded-lg shadow-lg z-20 overflow-hidden">
                    <div className="p-3 border-b border-gray-200">
                      <p className="text-xs font-medium text-gray-900">John Doe</p>
                      <p className="text-[10px] text-gray-500 mt-0.5">john@example.com</p>
                    </div>
                    <div className="py-0.5">
                      <Link
                        href="/account"
                        onClick={() => setShowUserMenu(false)}
                        className="w-full px-3 py-1.5 text-left text-xs text-gray-700 hover:bg-gray-50 flex items-center gap-2"
                      >
                        <User className="w-3.5 h-3.5" />
                        Profile
                      </Link>
                      <button className="w-full px-3 py-1.5 text-left text-xs text-gray-700 hover:bg-gray-50 flex items-center gap-2">
                        <Users className="w-3.5 h-3.5" />
                        Team
                      </button>
                      <button className="w-full px-3 py-1.5 text-left text-xs text-gray-700 hover:bg-gray-50 flex items-center gap-2">
                        <AlertCircle className="w-3.5 h-3.5" />
                        Report A Problem
                      </button>
                      <button className="w-full px-3 py-1.5 text-left text-xs text-gray-700 hover:bg-gray-50 flex items-center gap-2">
                        <Settings className="w-3.5 h-3.5" />
                        Settings
                      </button>
                    </div>
                    <div className="border-t border-gray-200 py-0.5">
                      <button className="w-full px-3 py-1.5 text-left text-xs text-red-600 hover:bg-red-50 flex items-center gap-2">
                        <LogOut className="w-3.5 h-3.5" />
                        Logout
                      </button>
                    </div>
                  </div>
                </>
              )}
            </div>
          </div>
        </nav>
      </div>
    </header>
  );
}
