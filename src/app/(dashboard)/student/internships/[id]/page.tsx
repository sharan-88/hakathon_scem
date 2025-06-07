'use client';

import { useState } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import { 
  ArrowLeftIcon,
  BuildingOfficeIcon,
  MapPinIcon,
  CalendarIcon,
  CurrencyRupeeIcon,
  ClockIcon,
  CheckBadgeIcon,
  BriefcaseIcon,
  UserGroupIcon,
  DocumentTextIcon,
} from '@heroicons/react/24/outline';
import { Badge } from '@/components/ui/Badge';

// Mock data - Replace with API call
const MOCK_INTERNSHIP = {
  id: 'intern-1',
  title: 'Frontend Developer Intern',
  company: 'TechCorp Solutions',
  companyLogo: '/company-logo.png',
  location: 'Bangalore',
  locationType: 'hybrid' as const,
  stipend: 20000,
  duration: '6 months',
  domain: 'Software Development',
  postedDate: '2024-02-15',
  applicationDeadline: '2024-03-15',
  numberOfOpenings: 3,
  description: `We are looking for a passionate Frontend Developer Intern to join our dynamic team. You'll work on real-world projects and gain hands-on experience with modern web technologies.

Key Responsibilities:
• Develop and maintain responsive web applications
• Collaborate with the design team to implement UI/UX designs
• Write clean, efficient, and reusable code
• Participate in code reviews and team discussions
• Assist in troubleshooting and debugging

Learning Opportunities:
• Modern frontend frameworks (React, Next.js)
• State management and API integration
• Performance optimization techniques
• Version control and deployment processes`,
  requirements: [
    'Strong understanding of HTML, CSS, and JavaScript',
    'Basic knowledge of React.js or similar framework',
    'Familiarity with version control systems (Git)',
    'Good problem-solving skills',
    'Excellent communication and teamwork abilities',
    'Currently pursuing B.Tech/B.E in Computer Science or related field',
  ],
  skills: [
    'React',
    'JavaScript',
    'HTML',
    'CSS',
    'Git',
    'TypeScript',
  ],
  perks: [
    'Flexible work hours',
    'Certificate of completion',
    'Letter of recommendation',
    'Possibility of pre-placement offer',
    'Mentorship from industry experts',
  ],
  verifiedBy: {
    name: 'ABC Institute of Technology',
    verificationDate: '2024-02-10',
    rating: 4.5,
  },
};

export default function InternshipDetailsPage() {
  const { id } = useParams();
  const [isApplying, setIsApplying] = useState(false);

  const locationTypeColors = {
    remote: 'bg-green-100 text-green-800',
    'on-site': 'bg-blue-100 text-blue-800',
    hybrid: 'bg-purple-100 text-purple-800',
  };

  const handleApply = () => {
    setIsApplying(true);
    // Add application logic here
    setTimeout(() => setIsApplying(false), 1000);
  };

  return (
    <div className="min-h-screen bg-gray-50 pb-12">
      {/* Top Navigation Bar */}
      <div className="sticky top-0 z-10 border-b border-gray-200 bg-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 items-center justify-between">
            <div className="flex items-center">
              <Link
                href="/student/internships"
                className="inline-flex items-center text-sm font-medium text-gray-500 hover:text-gray-700"
              >
                <ArrowLeftIcon className="mr-2 h-5 w-5" />
                Back to Internships
              </Link>
            </div>
            <button
              onClick={handleApply}
              disabled={isApplying}
              className="inline-flex items-center justify-center rounded-lg bg-indigo-600 px-6 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 disabled:cursor-not-allowed disabled:opacity-50"
            >
              {isApplying ? 'Applying...' : 'Apply Now'}
            </button>
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-4 pt-8 sm:px-6 lg:px-8">
        <div className="grid gap-8 lg:grid-cols-3">
          {/* Main Content */}
          <div className="lg:col-span-2">
            {/* Header Section */}
            <div className="rounded-lg bg-white p-6 shadow-sm">
              <div className="flex items-start justify-between">
                <div>
                  <h1 className="text-2xl font-bold text-gray-900">{MOCK_INTERNSHIP.title}</h1>
                  <div className="mt-2 flex items-center space-x-2">
                    <BuildingOfficeIcon className="h-5 w-5 text-gray-400" />
                    <span className="text-lg text-gray-700">{MOCK_INTERNSHIP.company}</span>
                  </div>
                </div>
                <Badge className={locationTypeColors[MOCK_INTERNSHIP.locationType]}>
                  {MOCK_INTERNSHIP.locationType.charAt(0).toUpperCase() + MOCK_INTERNSHIP.locationType.slice(1)}
                </Badge>
              </div>

              <div className="mt-6 grid grid-cols-2 gap-4 sm:grid-cols-4">
                <div className="flex items-center space-x-2 text-sm text-gray-500">
                  <MapPinIcon className="h-5 w-5" />
                  <span>{MOCK_INTERNSHIP.location}</span>
                </div>
                <div className="flex items-center space-x-2 text-sm text-gray-500">
                  <CurrencyRupeeIcon className="h-5 w-5" />
                  <span>₹{MOCK_INTERNSHIP.stipend.toLocaleString('en-IN')}/month</span>
                </div>
                <div className="flex items-center space-x-2 text-sm text-gray-500">
                  <CalendarIcon className="h-5 w-5" />
                  <span>{MOCK_INTERNSHIP.duration}</span>
                </div>
                <div className="flex items-center space-x-2 text-sm text-gray-500">
                  <BriefcaseIcon className="h-5 w-5" />
                  <span>{MOCK_INTERNSHIP.domain}</span>
                </div>
              </div>
            </div>

            {/* Description Section */}
            <div className="mt-6 rounded-lg bg-white p-6 shadow-sm">
              <h2 className="text-lg font-semibold text-gray-900">About the Internship</h2>
              <div className="mt-4 whitespace-pre-wrap text-gray-600">
                {MOCK_INTERNSHIP.description}
              </div>
            </div>

            {/* Requirements Section */}
            <div className="mt-6 rounded-lg bg-white p-6 shadow-sm">
              <h2 className="text-lg font-semibold text-gray-900">Requirements</h2>
              <ul className="mt-4 list-inside list-disc space-y-2 text-gray-600">
                {MOCK_INTERNSHIP.requirements.map((requirement, index) => (
                  <li key={index}>{requirement}</li>
                ))}
              </ul>
            </div>

            {/* Skills Section */}
            <div className="mt-6 rounded-lg bg-white p-6 shadow-sm">
              <h2 className="text-lg font-semibold text-gray-900">Required Skills</h2>
              <div className="mt-4 flex flex-wrap gap-2">
                {MOCK_INTERNSHIP.skills.map((skill) => (
                  <Badge key={skill} variant="secondary">
                    {skill}
                  </Badge>
                ))}
              </div>
            </div>

            {/* Perks Section */}
            <div className="mt-6 rounded-lg bg-white p-6 shadow-sm">
              <h2 className="text-lg font-semibold text-gray-900">Perks & Benefits</h2>
              <ul className="mt-4 list-inside list-disc space-y-2 text-gray-600">
                {MOCK_INTERNSHIP.perks.map((perk, index) => (
                  <li key={index}>{perk}</li>
                ))}
              </ul>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Important Dates */}
            <div className="rounded-lg bg-white p-6 shadow-sm">
              <h2 className="text-lg font-semibold text-gray-900">Important Dates</h2>
              <div className="mt-4 space-y-4">
                <div className="flex items-start space-x-3">
                  <ClockIcon className="h-5 w-5 text-gray-400" />
                  <div>
                    <p className="text-sm font-medium text-gray-500">Posted On</p>
                    <p className="text-gray-900">
                      {new Date(MOCK_INTERNSHIP.postedDate).toLocaleDateString('en-US', {
                        day: 'numeric',
                        month: 'long',
                        year: 'numeric',
                      })}
                    </p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <CalendarIcon className="h-5 w-5 text-gray-400" />
                  <div>
                    <p className="text-sm font-medium text-gray-500">Apply Before</p>
                    <p className="text-gray-900">
                      {new Date(MOCK_INTERNSHIP.applicationDeadline).toLocaleDateString('en-US', {
                        day: 'numeric',
                        month: 'long',
                        year: 'numeric',
                      })}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Openings */}
            <div className="rounded-lg bg-white p-6 shadow-sm">
              <div className="flex items-start space-x-3">
                <UserGroupIcon className="h-5 w-5 text-gray-400" />
                <div>
                  <h2 className="text-lg font-semibold text-gray-900">Number of Openings</h2>
                  <p className="mt-1 text-gray-600">{MOCK_INTERNSHIP.numberOfOpenings} positions</p>
                </div>
              </div>
            </div>

            {/* Verification Details */}
            <div className="rounded-lg bg-white p-6 shadow-sm">
              <div className="flex items-start space-x-3">
                <CheckBadgeIcon className="h-5 w-5 text-indigo-600" />
                <div>
                  <h2 className="text-lg font-semibold text-gray-900">Verification Details</h2>
                  <div className="mt-2 space-y-2">
                    <p className="text-gray-600">Verified by {MOCK_INTERNSHIP.verifiedBy.name}</p>
                    <p className="text-sm text-gray-500">
                      Verified on{' '}
                      {new Date(MOCK_INTERNSHIP.verifiedBy.verificationDate).toLocaleDateString(
                        'en-US',
                        {
                          day: 'numeric',
                          month: 'long',
                          year: 'numeric',
                        }
                      )}
                    </p>
                    <div className="flex items-center space-x-1">
                      <span className="text-sm font-medium text-gray-600">
                        College Rating:
                      </span>
                      <span className="text-sm text-gray-900">
                        {MOCK_INTERNSHIP.verifiedBy.rating}/5
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Application Instructions */}
            <div className="rounded-lg bg-white p-6 shadow-sm">
              <div className="flex items-start space-x-3">
                <DocumentTextIcon className="h-5 w-5 text-gray-400" />
                <div>
                  <h2 className="text-lg font-semibold text-gray-900">How to Apply</h2>
                  <p className="mt-2 text-gray-600">
                    Click the "Apply Now" button at the top of the page. Make sure your profile is
                    complete and your resume is up to date before applying.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 