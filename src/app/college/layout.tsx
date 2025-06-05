'use client';

import { usePathname } from 'next/navigation';
import Link from 'next/link';
import DashboardHeader from '@/components/DashboardHeader';
import {
  HomeIcon,
  UserGroupIcon,
  ClipboardDocumentCheckIcon,
  BuildingLibraryIcon,
} from '@heroicons/react/24/outline';

const navigation = [
  {
    name: 'Overview',
    href: '/college/dashboard',
    icon: HomeIcon,
  },
  {
    name: 'Students',
    href: '/college/students',
    icon: UserGroupIcon,
  },
  {
    name: 'Verifications',
    href: '/college/verifications',
    icon: ClipboardDocumentCheckIcon,
  },
  {
    name: 'College Profile',
    href: '/college/profile',
    icon: BuildingLibraryIcon,
  },
];

export default function CollegeLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  return (
    <div className="min-h-screen bg-gray-50">
      <DashboardHeader />
      
      {/* Navigation */}
      <div className="sticky top-0 z-10 border-b border-gray-200 bg-white shadow-sm">
        <div className="max-w-7xl mx-auto">
          <div className="flex justify-center items-center py-4 px-4 sm:px-6 lg:px-8">
            <nav className="flex space-x-6 sm:space-x-10 overflow-x-auto no-scrollbar">
              {navigation.map((item) => {
                const isActive = pathname === item.href;
                return (
                  <Link
                    key={item.name}
                    href={item.href}
                    className={`
                      flex items-center gap-2 px-1 py-2
                      text-base sm:text-lg whitespace-nowrap
                      font-medium transition-all duration-200
                      ${isActive 
                        ? 'text-blue-600 font-semibold border-b-2 border-blue-600' 
                        : 'text-gray-600 hover:text-blue-500'}
                    `}
                  >
                    <item.icon className={`h-5 w-5 ${isActive ? 'text-blue-600' : 'text-gray-500'}`} />
                    <span>{item.name}</span>
                  </Link>
                );
              })}
            </nav>
          </div>
        </div>
      </div>

      {/* Content Area with Max Width and Padding */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <main className="py-8">
          {children}
        </main>
      </div>
    </div>
  );
} 