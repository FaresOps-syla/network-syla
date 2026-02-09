'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import {
  LayoutDashboard,
  User,
  Package,
  Globe,
  Settings,
  HelpCircle,
  LogOut,
  ChevronLeft,
  ChevronRight,
  ChevronDown,
  CreditCard,
  BarChart3,
  Users,
  Bell,
  Zap,
  FileText,
  Proportions,
  Database,
  Shield,
  Activity,
  List as ListIcon,
  MapPin,
  Wrench,
  Box,
  TrendingUp,
  Smartphone,
  BookOpen,
  Tablet,
  ShoppingCart,
  Code,
} from 'lucide-react';
import { cn } from '@/lib/utils';

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
  onToggle: () => void;
  pathname: string;
}

interface NavItem {
  title: string;
  href: string;
  icon: React.ElementType;
  badge?: string | number;
  children?: NavItem[];
}

interface NavGroup {
  label: string;
  items: NavItem[];
}

const navigationGroups: NavGroup[] = [
  {
    label: 'Dashboard',
    items: [
      {
        title: 'Overview',
        href: '/dashboard',
        icon: LayoutDashboard,
      },
      {
        title: 'Analytics',
        href: '/analytics',
        icon: BarChart3,
      },
      // {
      //   title: 'Users',
      //   href: '/dashboard/users',
      //   icon: Users,
      //   children: [
      //     {
      //       title: 'All Users',
      //       href: '/dashboard/users/all',
      //       icon: Users,
      //     },
      //     {
      //       title: 'Active Users',
      //       href: '/dashboard/users/active',
      //       icon: Users,
      //     },
      //   ],
      // },
    ],
  },
  {
    label: 'Network',
    items: [
      // {
      //   title: 'Networking View',
      //   href: '/networking-view',
      //   icon: Activity,
      // },
      {
        title: 'CDRs',
        href: '/cdrs',
        icon: FileText,
      },
      {
        title: 'Location Updates',
        href: '/location-updates',
        icon: MapPin,
      },
      // {
      //   title: 'Troubleshooting',
      //   href: '/troubleshooting',
      //   icon: Wrench,
      // },
    ],
  },
  {
    label: 'eSIMs',
    items: [
      {
        title: 'Inventory',
        href: '/Inventory',
        icon: Package,
      },
      {
        title: 'Packages',
        href: '/view-packages',
        icon: Box,
      },
    ],
  },
  {
    label: 'Reports',
    items: [
      {
        title: 'Reports',
        href: '/Reports',
        icon: FileText,
        children: [
          // {
          //   title: 'Insights',
          //   href: '/Reports/Insights',
          //   icon: TrendingUp,
          // },
          {
            title: 'Active SIMs',
            href: '/Reports/ActiveSims',
            icon: Smartphone,
          },
          {
            title: 'Data Usage',
            href: '/Reports/DataUsage',
            icon: Database,
          },
        ],
      },
      // {
      //   title: 'Coverage',
      //   href: '/coverage',
      //   icon: Globe,
      //   children: [
      //     {
      //       title: 'Countries',
      //       href: '/coverage/countries',
      //       icon: Globe,
      //     },
      //     {
      //       title: 'Regions',
      //       href: '/coverage/regions',
      //       icon: Globe,
      //     },
      //   ],
      // },
      {
        title: 'Billing',
        href: '/billing',
        icon: CreditCard,
      },
    ],
  },
  {
    label: 'Orders',
    items: [
      {
        title: 'Orders',
        href: '/orders',
        icon: ShoppingCart,
      },
      {
        title: 'Commandes API',
        href: '/api-commands',
        icon: Code,
      },
    ],
  },
  {
    label: 'Support ',
    items: [
      {
        title: 'Help & Support',
        href: '/help',
        icon: HelpCircle,
      },
      {
        title: 'Centre d\'aide',
        href: '/help-center',
        icon: BookOpen,
      },
      {
        title: 'Appareils compatibles',
        href: '/compatible-devices',
        icon: Tablet,
      },
    ],
  },
 
];

export default function Sidebar({ isOpen, onClose, onToggle, pathname }: SidebarProps) {
  const [expandedItems, setExpandedItems] = useState<string[]>([]);

  const toggleExpanded = (href: string) => {
    setExpandedItems((prev) =>
      prev.includes(href)
        ? prev.filter((item) => item !== href)
        : [...prev, href]
    );
  };

  const isItemActive = (item: NavItem): boolean => {
    if (pathname === item.href || pathname.startsWith(item.href + '/')) {
      return true;
    }
    if (item.children) {
      return item.children.some((child) => isItemActive(child));
    }
    return false;
  };

  return (
    <>
      {/* Desktop Sidebar */}
      <aside
        className={cn(
          'fixed left-0 top-0 z-50 h-screen bg-white border-r border-gray-200 transition-all duration-300 ease-in-out flex flex-col shadow-sm',
          isOpen ? 'translate-x-0 w-56' : '-translate-x-full lg:translate-x-0 lg:w-16'
        )}
      >
        {/* Logo Section */}
        <div className="flex items-center justify-between h-14 px-3 border-b border-gray-200 bg-gray-50/50">
          {isOpen && (
            <div className="flex items-center gap-3 flex-1">
              <Link href="/dashboard" className="flex items-center gap-2 hover:opacity-80 transition-opacity flex-1">
                <Image
                  src="/images/logo.png"
                  alt="SYLA NETWORK Logo"
                  width={100}
                  height={32}
                  className="object-contain h-7 w-auto"
                  priority
                />
              </Link>
              <button
                onClick={onToggle}
                className="p-1.5 rounded-lg hover:bg-gray-100 transition-colors"
                aria-label="Toggle sidebar"
              >
                <ChevronLeft className="w-5 h-5 text-gray-600" />
              </button>
            </div>
          )}
          {!isOpen && (
            <div className="flex items-center justify-center w-full">
              <Link href="/dashboard" className="flex items-center justify-center hover:opacity-80 transition-opacity">
                <Image
                  src="/images/logo.png"
                  alt="SYLA NETWORK Logo"
                  width={40}
                  height={40}
                  className="object-contain h-8 w-auto"
                  priority
                />
              </Link>
            </div>
          )}
          <button
            onClick={onClose}
            className="lg:hidden p-1.5 rounded-lg hover:bg-gray-100 transition-colors"
            aria-label="Close sidebar"
          >
            <ChevronLeft className="w-5 h-5 text-gray-600" />
          </button>
        </div>

        {/* Navigation */}
        <nav className="flex-1 overflow-y-auto py-3 px-2 sidebar-scrollbar">
          {navigationGroups.map((group, groupIndex) => (
            <div key={group.label} className={cn('mb-6', groupIndex === 0 && 'mt-2')}>
              {/* Group Label */}
              {isOpen && (
                <div className="px-2 mb-1.5">
                  <h3 className="text-[10px] font-semibold text-gray-500 uppercase tracking-wider">
                    {group.label}
                  </h3>
                </div>
              )}

              {/* Group Items */}
              <ul className="space-y-1">
                {group.items.map((item) => {
                  const Icon = item.icon;
                  const isActive = isItemActive(item);
                  const hasChildren = item.children && item.children.length > 0;
                  const isExpanded = expandedItems.includes(item.href);

                  return (
                    <li key={item.href}>
                      <div className="relative">
                        <Link
                          href={item.href}
                          onClick={(e) => {
                            if (hasChildren) {
                              e.preventDefault();
                              toggleExpanded(item.href);
                            }
                          }}
                          className={cn(
                            'flex items-center gap-2 px-2 py-2 rounded-lg text-xs font-medium transition-all duration-200 group relative',
                            isActive
                              ? 'bg-blue-50 text-blue-600 shadow-sm'
                              : 'text-gray-700 hover:bg-gray-50 hover:text-gray-900',
                            !isOpen && 'justify-center'
                          )}
                        >
                          {/* Active Indicator */}
                          {isActive && (
                            <div className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-5 bg-blue-600 rounded-r-full" />
                          )}
                          
                          <Icon className={cn(
                            'w-5 h-5 flex-shrink-0 transition-colors',
                            isActive ? 'text-blue-600' : 'text-gray-500 group-hover:text-gray-700'
                          )} />
                          
                          {isOpen && (
                            <>
                              <span className="flex-1 truncate text-xs">{item.title}</span>
                              {item.badge && (
                                <span className={cn(
                                  'px-1.5 py-0.5 text-[10px] font-semibold rounded-full flex-shrink-0',
                                  typeof item.badge === 'number'
                                    ? 'bg-red-100 text-red-600'
                                    : 'bg-blue-100 text-blue-600'
                                )}>
                                  {item.badge}
                                </span>
                              )}
                              {hasChildren && (
                                <ChevronDown
                                  className={cn(
                                    'w-3 h-3 text-gray-400 transition-transform flex-shrink-0',
                                    isExpanded && 'rotate-180'
                                  )}
                                />
                              )}
                            </>
                          )}
                        </Link>
                      </div>

                      {/* Subnavigation */}
                      {hasChildren && isExpanded && isOpen && (
                        <ul className="ml-3 mt-0.5 space-y-0.5 border-l-2 border-gray-100 pl-1.5 py-0.5">
                          {item.children!.map((child) => {
                            const ChildIcon = child.icon;
                            const isChildActive = pathname === child.href || pathname.startsWith(child.href + '/');

                            return (
                              <li key={child.href}>
                                <Link
                                  href={child.href}
                                  className={cn(
                                    'flex items-center gap-1.5 px-2 py-1.5 rounded-md text-xs transition-all duration-200 group',
                                    isChildActive
                                      ? 'bg-blue-50 text-blue-600 font-medium'
                                      : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                                  )}
                                >
                                  <div className={cn(
                                    'w-1 h-1 rounded-full transition-colors',
                                    isChildActive ? 'bg-blue-600' : 'bg-gray-300 group-hover:bg-gray-400'
                                  )} />
                                  <ChildIcon className={cn(
                                    'w-3.5 h-3.5',
                                    isChildActive ? 'text-blue-600' : 'text-gray-500'
                                  )} />
                                  <span className="truncate text-xs">{child.title}</span>
                                </Link>
                              </li>
                            );
                          })}
                        </ul>
                      )}
                    </li>
                  );
                })}
              </ul>

              {/* Group Separator */}
              {isOpen && groupIndex < navigationGroups.length - 1 && (
                <div className="mt-3 mx-2 border-t border-gray-200" />
              )}
            </div>
          ))}
        </nav>

        {/* Bottom Section */}
        <div className="border-t border-gray-200 bg-gray-50/50">
          {/* User Section */}
          {/* <div className="p-4">
            {isOpen ? (
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 to-purple-500 flex items-center justify-center text-white font-semibold shadow-sm">
                  JD
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-gray-900 truncate">John Doe</p>
                  <p className="text-xs text-gray-500 truncate">john@example.com</p>
                </div>
              </div>
            ) : (
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 to-purple-500 flex items-center justify-center text-white font-semibold mx-auto shadow-sm">
                JD
              </div>
            )}
          </div> */}

          {/* Logout */}
          <div className="p-2 border-t border-gray-200">
            <button
              className={cn(
                'w-full flex items-center gap-2 px-2 py-2 rounded-lg text-xs font-medium text-red-600 hover:bg-red-50 transition-colors',
                !isOpen && 'justify-center'
              )}
            >
              <LogOut className="w-6 h-6" />
              {isOpen && <span className="text-xs">Logout</span>}
            </button>
          </div>
        </div>
      </aside>
    </>
  );
}
