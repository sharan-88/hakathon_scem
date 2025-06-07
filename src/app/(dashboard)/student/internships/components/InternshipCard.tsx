'use client';

import { Badge } from '@/components/ui/Badge';
import { MapPinIcon, BriefcaseIcon, CalendarIcon, CurrencyRupeeIcon, ArrowRightIcon } from '@heroicons/react/24/outline';
import { CheckBadgeIcon } from '@heroicons/react/24/solid';
import Link from 'next/link';

interface InternshipCardProps {
  id: string;
  title: string;
  company: string;
  location: string;
  locationType: 'remote' | 'on-site' | 'hybrid';
  stipend: number;
  duration: string;
  domain: string;
  skills: string[];
  isVerified: boolean;
  postedDate: string;
}

export default function InternshipCard({
  id,
  title,
  company,
  location,
  locationType,
  stipend,
  duration,
  domain,
  skills,
  isVerified,
  postedDate,
}: InternshipCardProps) {
  const locationTypeColors = {
    remote: 'bg-green-100 text-green-800',
    'on-site': 'bg-blue-100 text-blue-800',
    hybrid: 'bg-purple-100 text-purple-800',
  };

  return (
    <div className="group relative rounded-lg border border-gray-200 bg-white p-6 shadow-sm transition-all hover:shadow-md">
      {/* Header */}
      <div className="mb-4">
        <div className="flex items-start justify-between">
          <div>
            <h3 className="text-lg font-medium text-gray-900 group-hover:text-indigo-600">
              {title}
            </h3>
            <div className="mt-1 flex items-center space-x-2">
              <span className="text-sm font-medium text-gray-700">{company}</span>
              {isVerified && (
                <CheckBadgeIcon className="h-5 w-5 text-indigo-600" title="Verified Company" />
              )}
            </div>
          </div>
          <Badge className={locationTypeColors[locationType]}>
            {locationType.charAt(0).toUpperCase() + locationType.slice(1)}
          </Badge>
        </div>
      </div>

      {/* Details */}
      <div className="mb-4 grid grid-cols-2 gap-4">
        <div className="flex items-center space-x-2 text-sm text-gray-500">
          <MapPinIcon className="h-4 w-4" />
          <span>{location}</span>
        </div>
        <div className="flex items-center space-x-2 text-sm text-gray-500">
          <BriefcaseIcon className="h-4 w-4" />
          <span>{domain}</span>
        </div>
        <div className="flex items-center space-x-2 text-sm text-gray-500">
          <CurrencyRupeeIcon className="h-4 w-4" />
          <span>₹{stipend.toLocaleString('en-IN')}/month</span>
        </div>
        <div className="flex items-center space-x-2 text-sm text-gray-500">
          <CalendarIcon className="h-4 w-4" />
          <span>{duration}</span>
        </div>
      </div>

      {/* Skills */}
      <div className="mb-4">
        <div className="flex flex-wrap gap-2">
          {skills.slice(0, 4).map((skill) => (
            <Badge key={skill} variant="secondary">
              {skill}
            </Badge>
          ))}
          {skills.length > 4 && (
            <Badge variant="secondary">+{skills.length - 4} more</Badge>
          )}
        </div>
      </div>

      {/* Footer */}
      <div className="flex items-center justify-between">
        <span className="text-xs text-gray-500">
          Posted {postedDate}
        </span>
        <Link
          href={`/student/internships/${id}`}
          className="inline-flex items-center space-x-2 text-sm font-medium text-indigo-600 hover:text-indigo-700"
        >
          <span>View Details</span>
          <ArrowRightIcon className="h-4 w-4" />
        </Link>
      </div>
    </div>
  );
} 