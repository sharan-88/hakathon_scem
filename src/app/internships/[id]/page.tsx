'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { 
  BuildingOfficeIcon, 
  CalendarIcon, 
  CurrencyRupeeIcon,
  MapPinIcon,
  CheckBadgeIcon,
  ArrowLeftIcon,
  ClockIcon
} from '@heroicons/react/24/outline';

// Mock data - Replace with actual API call
const mockInternshipData = {
  id: '1',
  title: 'Frontend Developer Intern',
  company: {
    name: 'TechCorp Solutions',
    logo: '/company-logo.png', // Add default company logo
    location: 'Bangalore, India'
  },
  description: `We are looking for a passionate Frontend Developer Intern to join our dynamic team. 
  You will be working on real-world projects using modern technologies like React, Next.js, and Tailwind CSS.
  
  Key Responsibilities:
  • Develop and maintain responsive web applications
  • Collaborate with senior developers and learn best practices
  • Participate in code reviews and team discussions
  • Implement UI/UX designs with pixel-perfect accuracy
  
  What you'll learn:
  • Modern frontend development workflows
  • Version control with Git
  • Agile development practices
  • Performance optimization techniques`,
  skills: [
    'React.js',
    'JavaScript',
    'HTML/CSS',
    'Git',
    'Responsive Design'
  ],
  duration: '6 months',
  stipend: '15000-20000',
  workMode: 'Hybrid',
  startDate: '2024-06-01',
  verifiedBy: {
    collegeName: 'ABC Institute of Technology',
    verificationDate: '2024-03-15'
  },
  applicationsClose: '2024-04-30'
};

export default function InternshipDetails({ params }: { params: { id: string } }) {
  const [internship, setInternship] = useState(mockInternshipData);
  const [isApplying, setIsApplying] = useState(false);

  // Replace with actual API call
  useEffect(() => {
    // Fetch internship details using params.id
    // setInternship(data)
  }, [params.id]);

  const handleApply = () => {
    setIsApplying(true);
    // Add application logic here
    setTimeout(() => {
      setIsApplying(false);
    }, 1000);
  };

  return (
    <main className="min-h-screen bg-gray-50 pb-12">
      {/* Back Navigation */}
      <div className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <Link 
            href="/dashboard/student/internships" 
            className="inline-flex items-center text-sm text-gray-500 hover:text-gray-700"
          >
            <ArrowLeftIcon className="h-4 w-4 mr-2" />
            Back to Internships
          </Link>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Verification Badge */}
        <div className="mb-6">
          <div className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-green-50 text-green-700">
            <CheckBadgeIcon className="h-5 w-5 mr-2" />
            Verified by {internship.verifiedBy.collegeName}
          </div>
        </div>

        {/* Header Section */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 md:p-8 mb-6">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">
                {internship.title}
              </h1>
              <div className="flex items-center text-gray-600">
                <BuildingOfficeIcon className="h-5 w-5 mr-2" />
                <span className="font-medium">{internship.company.name}</span>
              </div>
            </div>
            <button
              onClick={handleApply}
              disabled={isApplying}
              className="inline-flex items-center justify-center px-6 py-3 border border-transparent rounded-lg text-base font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors disabled:bg-blue-400"
            >
              {isApplying ? 'Applying...' : 'Apply Now'}
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Key Details */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">Key Details</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="flex items-start">
                  <CalendarIcon className="h-5 w-5 text-gray-400 mr-3 mt-0.5" />
                  <div>
                    <p className="text-sm font-medium text-gray-500">Duration</p>
                    <p className="text-gray-900">{internship.duration}</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <CurrencyRupeeIcon className="h-5 w-5 text-gray-400 mr-3 mt-0.5" />
                  <div>
                    <p className="text-sm font-medium text-gray-500">Monthly Stipend</p>
                    <p className="text-gray-900">₹{internship.stipend}</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <MapPinIcon className="h-5 w-5 text-gray-400 mr-3 mt-0.5" />
                  <div>
                    <p className="text-sm font-medium text-gray-500">Work Mode</p>
                    <p className="text-gray-900">{internship.workMode}</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <ClockIcon className="h-5 w-5 text-gray-400 mr-3 mt-0.5" />
                  <div>
                    <p className="text-sm font-medium text-gray-500">Start Date</p>
                    <p className="text-gray-900">{new Date(internship.startDate).toLocaleDateString()}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Description */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">Description</h2>
              <div className="prose max-w-none">
                {internship.description.split('\n').map((paragraph, index) => (
                  <p key={index} className="mb-4 text-gray-600 whitespace-pre-line">
                    {paragraph}
                  </p>
                ))}
              </div>
            </div>

            {/* Required Skills */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">Required Skills</h2>
              <div className="flex flex-wrap gap-2">
                {internship.skills.map((skill, index) => (
                  <span
                    key={index}
                    className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-blue-50 text-blue-700"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Company Card */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">About Company</h2>
              <div className="flex items-center mb-4">
                <div className="h-12 w-12 rounded-full bg-gray-200 flex items-center justify-center mr-3">
                  {internship.company.logo ? (
                    <Image
                      src={internship.company.logo}
                      alt={internship.company.name}
                      width={48}
                      height={48}
                      className="rounded-full"
                    />
                  ) : (
                    <BuildingOfficeIcon className="h-6 w-6 text-gray-400" />
                  )}
                </div>
                <div>
                  <h3 className="font-medium text-gray-900">{internship.company.name}</h3>
                  <p className="text-sm text-gray-500">{internship.company.location}</p>
                </div>
              </div>
            </div>

            {/* Important Dates */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">Important Dates</h2>
              <div className="space-y-4">
                <div>
                  <p className="text-sm font-medium text-gray-500">Applications Close</p>
                  <p className="text-gray-900">{new Date(internship.applicationsClose).toLocaleDateString()}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-500">Verification Date</p>
                  <p className="text-gray-900">{new Date(internship.verifiedBy.verificationDate).toLocaleDateString()}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
} 