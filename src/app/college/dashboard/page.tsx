'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { 
  UserGroupIcon,
  ClipboardDocumentCheckIcon,
  BuildingLibraryIcon,
  ArrowRightIcon,
  ExclamationTriangleIcon,
  XMarkIcon,
  PencilIcon,
  CheckCircleIcon,
} from '@heroicons/react/24/outline';

// Mock data - Replace with actual data from your backend
const collegeData = {
  name: "University of Technology",
  email: "admin@university.edu",
  location: "San Francisco, CA",
  profileImage: null, // URL to college logo
  profileComplete: false,
  pendingVerifications: 12,
  totalStudents: 450,
  verifiedStudents: 380,
};

const stats = [
  {
    name: 'Total Students',
    value: collegeData.totalStudents,
    change: '+4.75%',
    changeType: 'positive',
  },
  {
    name: 'Verified Students',
    value: collegeData.verifiedStudents,
    change: '+54.02%',
    changeType: 'positive',
  },
  {
    name: 'Pending Verifications',
    value: collegeData.pendingVerifications,
    change: '-12.5%',
    changeType: 'negative',
  },
];

export default function CollegeDashboard() {
  const [showProfileAlert, setShowProfileAlert] = useState(true);

  return (
    <div>
      {/* Profile Completion Alert */}
      {!collegeData.profileComplete && showProfileAlert && (
        <div className="mb-6 bg-amber-50 border-l-4 border-amber-400 p-4 rounded-r-lg">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <ExclamationTriangleIcon className="h-5 w-5 text-amber-400 mr-3" />
              <p className="text-sm text-amber-700">
                Complete your college profile to help students better understand your institution.
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
          Welcome, {collegeData.name}!
        </h1>
        <p className="mt-2 text-lg text-gray-600">
          Manage your students and internship verifications.
        </p>
      </div>

      {/* College Profile Summary Card */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 md:p-8 mb-8">
        <div className="flex flex-col md:flex-row items-start md:items-center gap-6">
          {/* College Logo */}
          <div className="relative">
            <div className="h-24 w-24 rounded-lg bg-gray-200 flex items-center justify-center overflow-hidden border-2 border-gray-100">
              {collegeData.profileImage ? (
                <Image
                  src={collegeData.profileImage}
                  alt={collegeData.name}
                  width={96}
                  height={96}
                  className="object-cover"
                />
              ) : (
                <BuildingLibraryIcon className="h-12 w-12 text-gray-400" />
              )}
            </div>
          </div>

          {/* College Info */}
          <div className="flex-grow space-y-4">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between">
              <div>
                <h2 className="text-2xl font-semibold text-gray-900">
                  {collegeData.name}
                </h2>
                <p className="text-gray-600 mt-1">
                  {collegeData.location}
                </p>
              </div>
              <Link 
                href="/college/profile"
                className="inline-flex items-center px-4 py-2 mt-4 md:mt-0 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-all duration-200"
              >
                <PencilIcon className="h-4 w-4 mr-2" />
                Edit Profile
              </Link>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 sm:gap-8">
              <div>
                <p className="text-sm text-gray-500">Email</p>
                <p className="text-gray-900">{collegeData.email}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Profile Status</p>
                <div className="flex items-center mt-1">
                  {collegeData.profileComplete ? (
                    <span className="inline-flex items-center text-green-700 text-sm">
                      <CheckCircleIcon className="h-5 w-5 mr-1.5 text-green-500" />
                      Complete
                    </span>
                  ) : (
                    <span className="inline-flex items-center text-amber-600 text-sm">
                      <ExclamationTriangleIcon className="h-5 w-5 mr-1.5" />
                      Incomplete
                    </span>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        {stats.map((stat) => (
          <div
            key={stat.name}
            className="bg-white rounded-xl shadow-sm border border-gray-100 px-6 py-4"
          >
            <p className="text-sm font-medium text-gray-500">{stat.name}</p>
            <div className="mt-2 flex items-baseline gap-2">
              <p className="text-2xl font-semibold text-gray-900">
                {stat.value}
              </p>
              <span
                className={`
                  text-sm font-medium
                  ${stat.changeType === 'positive' ? 'text-green-600' : 'text-red-600'}
                `}
              >
                {stat.change}
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* Action Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Manage Students Card */}
        <Link 
          href="/college/students"
          className="group bg-white rounded-2xl shadow-sm border border-gray-100 p-6 hover:shadow-md transition-all duration-300 relative overflow-hidden"
        >
          <div className="absolute inset-0 bg-gradient-to-r from-blue-50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          <div className="relative">
            <div className="flex items-center justify-between mb-4">
              <div className="p-3 bg-blue-50 rounded-lg">
                <UserGroupIcon className="h-6 w-6 text-blue-600" />
              </div>
              <ArrowRightIcon className="h-5 w-5 text-gray-400 group-hover:text-blue-600 group-hover:transform group-hover:translate-x-1 transition-all" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              Manage Students
            </h3>
            <p className="text-gray-600 text-sm">
              View and verify student profiles
            </p>
          </div>
        </Link>

        {/* Verifications Card */}
        <Link 
          href="/college/verifications"
          className="group bg-white rounded-2xl shadow-sm border border-gray-100 p-6 hover:shadow-md transition-all duration-300 relative overflow-hidden"
        >
          <div className="absolute inset-0 bg-gradient-to-r from-purple-50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          <div className="relative">
            <div className="flex items-center justify-between mb-4">
              <div className="p-3 bg-purple-50 rounded-lg">
                <ClipboardDocumentCheckIcon className="h-6 w-6 text-purple-600" />
              </div>
              <ArrowRightIcon className="h-5 w-5 text-gray-400 group-hover:text-purple-600 group-hover:transform group-hover:translate-x-1 transition-all" />
            </div>
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-lg font-semibold text-gray-900">
                Pending Verifications
              </h3>
              {collegeData.pendingVerifications > 0 && (
                <span className="inline-flex items-center justify-center px-2.5 py-0.5 rounded-full bg-purple-100 text-purple-700 text-sm font-medium">
                  {collegeData.pendingVerifications}
                </span>
              )}
            </div>
            <p className="text-gray-600 text-sm">
              Review and approve student verifications
            </p>
          </div>
        </Link>

        {/* Edit College Profile Card */}
        <Link 
          href="/college/profile"
          className="group bg-white rounded-2xl shadow-sm border border-gray-100 p-6 hover:shadow-md transition-all duration-300 relative overflow-hidden"
        >
          <div className="absolute inset-0 bg-gradient-to-r from-emerald-50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          <div className="relative">
            <div className="flex items-center justify-between mb-4">
              <div className="p-3 bg-emerald-50 rounded-lg">
                <BuildingLibraryIcon className="h-6 w-6 text-emerald-600" />
              </div>
              <ArrowRightIcon className="h-5 w-5 text-gray-400 group-hover:text-emerald-600 group-hover:transform group-hover:translate-x-1 transition-all" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              Edit College Profile
            </h3>
            <p className="text-gray-600 text-sm">
              Update college information and settings
            </p>
            {!collegeData.profileComplete && (
              <span className="inline-flex items-center mt-3 px-2.5 py-0.5 rounded-full bg-amber-100 text-amber-700 text-sm">
                Incomplete
              </span>
            )}
          </div>
        </Link>
      </div>
    </div>
  );
} 