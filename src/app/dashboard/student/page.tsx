'use client';

import { useState } from 'react';
import Image from 'next/image';
import { 
  PencilIcon, 
  ExclamationTriangleIcon, 
  XMarkIcon,
  BriefcaseIcon,
  ClipboardDocumentListIcon,
  UserCircleIcon,
  ArrowRightIcon
} from '@heroicons/react/24/outline';
import { CheckCircleIcon } from '@heroicons/react/24/solid';
import Link from 'next/link';

// Mock data - Replace with actual data from your backend
const studentData = {
  name: "John Doe",
  email: "john.doe@university.edu",
  institute: "University of Technology",
  profileImage: null, // URL to profile image
  hasResume: false,
  profileComplete: false,
  activeApplications: 3
};

export default function StudentDashboard() {
  const [showProfileAlert, setShowProfileAlert] = useState(true);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Main Content Container */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {/* Profile Completion Alert */}
        {!studentData.profileComplete && showProfileAlert && (
          <div className="mb-6 bg-amber-50 border-l-4 border-amber-400 p-4 rounded-r-lg">
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <ExclamationTriangleIcon className="h-5 w-5 text-amber-400 mr-3" />
                <p className="text-sm text-amber-700">
                  Complete your profile to increase your visibility to potential employers.
                  {!studentData.hasResume && " Don't forget to upload your resume!"}
                </p>
              </div>
              <button 
                onClick={() => setShowProfileAlert(false)}
                className="text-amber-500 hover:text-amber-700 transition-colors"
              >
                <XMarkIcon className="h-5 w-5" />
              </button>
            </div>
          </div>
        )}

        {/* Welcome Section */}
        <div className="mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900">
            Welcome, {studentData.name}!
          </h1>
          <p className="mt-2 text-lg text-gray-600">
            Let's find the perfect internship for you.
          </p>
        </div>

        {/* Profile Summary Card */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 md:p-8 mb-8">
          <div className="flex flex-col md:flex-row items-start md:items-center gap-6">
            {/* Profile Image */}
            <div className="relative">
              <div className="h-24 w-24 rounded-full bg-gray-200 flex items-center justify-center overflow-hidden border-2 border-gray-100">
                {studentData.profileImage ? (
                  <Image
                    src={studentData.profileImage}
                    alt={studentData.name}
                    width={96}
                    height={96}
                    className="object-cover"
                  />
                ) : (
                  <span className="text-4xl text-gray-400">
                    {studentData.name.charAt(0)}
                  </span>
                )}
              </div>
            </div>

            {/* Profile Info */}
            <div className="flex-grow space-y-4">
              <div className="flex flex-col md:flex-row md:items-center md:justify-between">
                <div>
                  <h2 className="text-2xl font-semibold text-gray-900">
                    {studentData.name}
                  </h2>
                  <p className="text-gray-600 mt-1">
                    {studentData.institute}
                  </p>
                </div>
                <Link 
                  href="/dashboard/student/profile"
                  className="inline-flex items-center px-4 py-2 mt-4 md:mt-0 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-all duration-200"
                >
                  <PencilIcon className="h-4 w-4 mr-2" />
                  Edit Profile
                </Link>
              </div>

              <div className="flex flex-col sm:flex-row gap-4 sm:gap-8">
                <div>
                  <p className="text-sm text-gray-500">Email</p>
                  <p className="text-gray-900">{studentData.email}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Resume Status</p>
                  <div className="flex items-center mt-1">
                    {studentData.hasResume ? (
                      <span className="inline-flex items-center text-green-700 text-sm">
                        <CheckCircleIcon className="h-5 w-5 mr-1.5 text-green-500" />
                        Uploaded
                      </span>
                    ) : (
                      <span className="inline-flex items-center text-red-600 text-sm">
                        <XMarkIcon className="h-5 w-5 mr-1.5" />
                        Not Uploaded
                      </span>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="mt-8 pt-6 border-t border-gray-100">
            <h3 className="text-sm font-medium text-gray-500 mb-4">Quick Actions</h3>
            <div className="flex flex-wrap gap-3">
              {!studentData.hasResume && (
                <button className="inline-flex items-center px-4 py-2 border border-transparent rounded-lg text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-all duration-200">
                  Upload Resume
                </button>
              )}
              <button className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-all duration-200">
                View Applications
              </button>
              <button className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-all duration-200">
                Browse Internships
              </button>
            </div>
          </div>
        </div>

        {/* Action Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Browse Internships Card */}
          <Link 
            href="/dashboard/student/internships"
            className="group bg-white rounded-2xl shadow-sm border border-gray-100 p-6 hover:shadow-md transition-all duration-300 relative overflow-hidden"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-blue-50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            <div className="relative">
              <div className="flex items-center justify-between mb-4">
                <div className="p-3 bg-blue-50 rounded-lg">
                  <BriefcaseIcon className="h-6 w-6 text-blue-600" />
                </div>
                <ArrowRightIcon className="h-5 w-5 text-gray-400 group-hover:text-blue-600 group-hover:transform group-hover:translate-x-1 transition-all" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                Browse Verified Internships
              </h3>
              <p className="text-gray-600 text-sm">
                Explore curated opportunities from top companies
              </p>
            </div>
          </Link>

          {/* Track Applications Card */}
          <Link 
            href="/dashboard/student/applications"
            className="group bg-white rounded-2xl shadow-sm border border-gray-100 p-6 hover:shadow-md transition-all duration-300 relative overflow-hidden"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-purple-50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            <div className="relative">
              <div className="flex items-center justify-between mb-4">
                <div className="p-3 bg-purple-50 rounded-lg">
                  <ClipboardDocumentListIcon className="h-6 w-6 text-purple-600" />
                </div>
                <ArrowRightIcon className="h-5 w-5 text-gray-400 group-hover:text-purple-600 group-hover:transform group-hover:translate-x-1 transition-all" />
              </div>
              <div className="flex items-center justify-between mb-2">
                <h3 className="text-lg font-semibold text-gray-900">
                  Track Applications
                </h3>
                {studentData.activeApplications > 0 && (
                  <span className="inline-flex items-center justify-center px-2.5 py-0.5 rounded-full bg-purple-100 text-purple-700 text-sm font-medium">
                    {studentData.activeApplications}
                  </span>
                )}
              </div>
              <p className="text-gray-600 text-sm">
                Monitor your application status and updates
              </p>
            </div>
          </Link>

          {/* Edit Profile Card */}
          <Link 
            href="/dashboard/student/profile"
            className="group bg-white rounded-2xl shadow-sm border border-gray-100 p-6 hover:shadow-md transition-all duration-300 relative overflow-hidden"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-emerald-50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            <div className="relative">
              <div className="flex items-center justify-between mb-4">
                <div className="p-3 bg-emerald-50 rounded-lg">
                  <UserCircleIcon className="h-6 w-6 text-emerald-600" />
                </div>
                <ArrowRightIcon className="h-5 w-5 text-gray-400 group-hover:text-emerald-600 group-hover:transform group-hover:translate-x-1 transition-all" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                Edit Profile
              </h3>
              <p className="text-gray-600 text-sm">
                Update your details and resume
              </p>
              {!studentData.profileComplete && (
                <span className="inline-flex items-center mt-3 px-2.5 py-0.5 rounded-full bg-amber-100 text-amber-700 text-sm">
                  Incomplete
                </span>
              )}
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
} 