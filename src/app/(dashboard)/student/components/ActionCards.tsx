'use client';

import Link from 'next/link';
import {
  BriefcaseIcon,
  ClipboardDocumentCheckIcon,
  UserIcon
} from '@heroicons/react/24/outline';

interface ActionCard {
  title: string;
  description: string;
  icon: React.ElementType;
  href: string;
  badge?: number;
  color: string;
}

const actionCards: ActionCard[] = [
  {
    title: 'Browse Verified Internships',
    description: 'Explore curated opportunities from top companies',
    icon: BriefcaseIcon,
    href: '/student/internships',
    color: 'indigo'
  },
  {
    title: 'Track My Applications',
    description: 'Monitor your ongoing application status',
    icon: ClipboardDocumentCheckIcon,
    href: '/student/applications',
    badge: 3, // This would come from your data layer
    color: 'emerald'
  },
  {
    title: 'Edit Profile',
    description: 'Update your details and resume',
    icon: UserIcon,
    href: '/student/edit-profile',
    color: 'violet'
  }
];

export default function ActionCards() {
  const getColorClasses = (color: string) => {
    const classes = {
      indigo: {
        bg: 'bg-indigo-50 group-hover:bg-indigo-100',
        text: 'text-indigo-600',
        border: 'border-indigo-200 group-hover:border-indigo-300',
        icon: 'text-indigo-500',
        badge: 'bg-indigo-100 text-indigo-600'
      },
      emerald: {
        bg: 'bg-emerald-50 group-hover:bg-emerald-100',
        text: 'text-emerald-600',
        border: 'border-emerald-200 group-hover:border-emerald-300',
        icon: 'text-emerald-500',
        badge: 'bg-emerald-100 text-emerald-600'
      },
      violet: {
        bg: 'bg-violet-50 group-hover:bg-violet-100',
        text: 'text-violet-600',
        border: 'border-violet-200 group-hover:border-violet-300',
        icon: 'text-violet-500',
        badge: 'bg-violet-100 text-violet-600'
      }
    };
    return classes[color as keyof typeof classes];
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 px-4 sm:px-6 lg:px-8 mb-8">
      {actionCards.map((card) => {
        const colorClasses = getColorClasses(card.color);
        
        return (
          <Link
            key={card.title}
            href={card.href}
            className={`group relative overflow-hidden rounded-2xl border p-6 
              transition-all duration-300 hover:shadow-lg ${colorClasses.border} ${colorClasses.bg}`}
          >
            <div className="flex h-full flex-col justify-between space-y-4">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className={`rounded-lg p-2.5 ${colorClasses.bg}`}>
                    <card.icon className={`h-6 w-6 ${colorClasses.icon}`} />
                  </span>
                  {card.badge && (
                    <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-sm font-medium ${colorClasses.badge}`}>
                      {card.badge} Active
                    </span>
                  )}
                </div>
                <div>
                  <h3 className={`text-lg font-semibold ${colorClasses.text}`}>
                    {card.title}
                  </h3>
                  <p className="mt-2 text-sm text-gray-600">
                    {card.description}
                  </p>
                </div>
              </div>
              
              <div className="flex items-center">
                <span className={`text-sm font-medium ${colorClasses.text}`}>
                  Learn more
                </span>
                <svg
                  className={`ml-2 h-4 w-4 transition-transform duration-300 group-hover:translate-x-1 ${colorClasses.text}`}
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 5l7 7-7 7"
                  />
                </svg>
              </div>
            </div>

            {/* Decorative corner shape */}
            <div className={`absolute right-0 top-0 -mr-16 -mt-16 h-32 w-32 rounded-full 
              opacity-10 transform rotate-45 ${colorClasses.bg}`} />
          </Link>
        );
      })}
    </div>
  );
} 