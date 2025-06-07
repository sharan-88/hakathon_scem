'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { PencilIcon, XMarkIcon } from '@heroicons/react/24/outline';
import { UserCircleIcon } from '@heroicons/react/24/solid';

interface StudentProfile {
  name: string;
  email: string;
  institute: string;
  profilePicture?: string;
  hasResume: boolean;
}

// This would come from your auth/data layer in a real app
const mockStudentData: StudentProfile = {
  name: "John Doe",
  email: "john.doe@university.edu",
  institute: "University of Technology",
  hasResume: false,
};

export default function DashboardHeader() {
  const [showProfileAlert, setShowProfileAlert] = useState(!mockStudentData.hasResume);

  return (
    <div className="w-full bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Profile Completion Alert */}
        {showProfileAlert && (
          <div className="mb-6 rounded-lg bg-amber-50 p-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <svg className="h-5 w-5 text-amber-400" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M8.485 2.495c.673-1.167 2.357-1.167 3.03 0l6.28 10.875c.673 1.167-.17 2.625-1.516 2.625H3.72c-1.347 0-2.189-1.458-1.515-2.625L8.485 2.495zM10 6a.75.75 0 01.75.75v3.5a.75.75 0 01-1.5 0v-3.5A.75.75 0 0110 6zm0 9a1 1 0 100-2 1 1 0 000 2z" clipRule="evenodd" />
                  </svg>
                </div>
                <div className="ml-3">
                  <h3 className="text-sm font-medium text-amber-800">
                    Complete Your Profile
                  </h3>
                  <p className="mt-1 text-sm text-amber-700">
                    Upload your resume to increase your visibility to potential employers.
                  </p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setShowProfileAlert(false)}
                className="flex-shrink-0 rounded-md p-1.5 text-amber-600 hover:bg-amber-100 focus:outline-none focus:ring-2 focus:ring-amber-500"
              >
                <XMarkIcon className="h-5 w-5" />
              </button>
            </div>
          </div>
        )}

        {/* Profile Summary Card */}
        <div className="overflow-hidden rounded-xl bg-white shadow-lg transition-shadow hover:shadow-xl">
          {/* Welcome Section */}
          <div className="border-b border-gray-100 bg-white px-6 py-4">
            <div className="text-center">
              <h1 className="text-2xl font-bold text-gray-900">
                Welcome, {mockStudentData.name}!
              </h1>
              <p className="mt-1 text-base text-gray-600">
                Let's find the perfect internship for you
              </p>
            </div>
          </div>

          <div className="p-6">
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6">
              {/* Profile Picture */}
              <div className="flex-shrink-0">
                {mockStudentData.profilePicture ? (
                  <Image
                    src={mockStudentData.profilePicture}
                    alt="Profile"
                    width={96}
                    height={96}
                    className="rounded-full object-cover"
                  />
                ) : (
                  <UserCircleIcon className="h-24 w-24 text-gray-300" />
                )}
              </div>

              {/* Profile Info */}
              <div className="flex-grow space-y-4">
                <div className="space-y-1">
                  <p className="text-sm text-gray-500">Full Name</p>
                  <p className="text-lg font-medium text-gray-900">{mockStudentData.name}</p>
                </div>
                <div className="space-y-1">
                  <p className="text-sm text-gray-500">Email Address</p>
                  <p className="text-lg font-medium text-gray-900">{mockStudentData.email}</p>
                </div>
                <div className="space-y-1">
                  <p className="text-sm text-gray-500">Institute</p>
                  <p className="text-lg font-medium text-gray-900">{mockStudentData.institute}</p>
                </div>
              </div>

              {/* Resume Status & Edit Button */}
              <div className="flex flex-col gap-4 sm:text-right">
                <div className="flex items-center gap-2">
                  {mockStudentData.hasResume ? (
                    <span className="inline-flex items-center rounded-full bg-green-100 px-3 py-1 text-sm font-medium text-green-700">
                      ✅ Resume Uploaded
                    </span>
                  ) : (
                    <span className="inline-flex items-center rounded-full bg-red-100 px-3 py-1 text-sm font-medium text-red-700">
                      ❌ Resume Not Uploaded
                    </span>
                  )}
                </div>
                <Link
                  href="/student/edit-profile"
                  className="inline-flex items-center justify-center rounded-lg bg-indigo-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 transition-colors duration-200"
                >
                  <PencilIcon className="mr-2 h-4 w-4" />
                  Edit Profile
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 