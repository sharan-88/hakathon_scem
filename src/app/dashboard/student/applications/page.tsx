'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { 
  BuildingOfficeIcon,
  CalendarIcon,
  ClockIcon,
  ArrowTopRightOnSquareIcon
} from '@heroicons/react/24/outline';

// Types for the application data
interface Application {
  id: string;
  internshipId: string;
  internshipTitle: string;
  companyName: string;
  appliedDate: string;
  status: 'Applied' | 'Under Review' | 'Accepted' | 'Rejected';
  companyLogo?: string;
}

// Mock data - Replace with actual API call
const mockApplications: Application[] = [
  {
    id: '1',
    internshipId: '101',
    internshipTitle: 'Frontend Developer Intern',
    companyName: 'TechCorp Solutions',
    appliedDate: '2024-03-15',
    status: 'Under Review'
  },
  {
    id: '2',
    internshipId: '102',
    internshipTitle: 'UI/UX Design Intern',
    companyName: 'Creative Studios',
    appliedDate: '2024-03-10',
    status: 'Accepted'
  },
  {
    id: '3',
    internshipId: '103',
    internshipTitle: 'Backend Developer Intern',
    companyName: 'DataTech Systems',
    appliedDate: '2024-03-01',
    status: 'Rejected'
  }
];

export default function ApplicationTracking() {
  const [applications, setApplications] = useState<Application[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Replace with actual API call
    const fetchApplications = async () => {
      try {
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 1000));
        setApplications(mockApplications);
      } catch (error) {
        console.error('Error fetching applications:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchApplications();
  }, []);

  const getStatusColor = (status: Application['status']) => {
    switch (status) {
      case 'Applied':
        return 'bg-blue-50 text-blue-700';
      case 'Under Review':
        return 'bg-yellow-50 text-yellow-700';
      case 'Accepted':
        return 'bg-green-50 text-green-700';
      case 'Rejected':
        return 'bg-red-50 text-red-700';
      default:
        return 'bg-gray-50 text-gray-700';
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 p-4 sm:p-6 lg:p-8">
        <div className="animate-pulse">
          <div className="h-8 bg-gray-200 rounded w-1/4 mb-8"></div>
          <div className="space-y-4">
            {[1, 2, 3].map((i) => (
              <div key={i} className="bg-white rounded-xl p-6">
                <div className="h-6 bg-gray-200 rounded w-3/4 mb-4"></div>
                <div className="h-4 bg-gray-200 rounded w-1/2"></div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Page Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">
            Your Internship Applications
          </h1>
          <p className="mt-2 text-gray-600">
            Track and manage your internship applications
          </p>
        </div>

        {/* Applications List */}
        <div className="space-y-6">
          {applications.length === 0 ? (
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-8 text-center">
              <h3 className="text-lg font-medium text-gray-900 mb-2">
                No applications yet
              </h3>
              <p className="text-gray-600 mb-6">
                Start exploring internships and apply to begin your professional journey
              </p>
              <Link
                href="/dashboard/student/internships"
                className="inline-flex items-center justify-center px-4 py-2 border border-transparent rounded-lg text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors"
              >
                Browse Internships
              </Link>
            </div>
          ) : (
            applications.map((application) => (
              <div
                key={application.id}
                className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow duration-200"
              >
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                  <div className="flex-grow">
                    <div className="flex items-start gap-4">
                      <div className="h-12 w-12 rounded-lg bg-gray-100 flex items-center justify-center flex-shrink-0">
                        {application.companyLogo ? (
                          <img
                            src={application.companyLogo}
                            alt={application.companyName}
                            className="h-8 w-8 rounded"
                          />
                        ) : (
                          <BuildingOfficeIcon className="h-6 w-6 text-gray-400" />
                        )}
                      </div>
                      <div>
                        <h3 className="text-lg font-semibold text-gray-900 mb-1">
                          {application.internshipTitle}
                        </h3>
                        <p className="text-gray-600 mb-2">
                          {application.companyName}
                        </p>
                        <div className="flex flex-wrap items-center gap-4 text-sm text-gray-500">
                          <div className="flex items-center">
                            <CalendarIcon className="h-4 w-4 mr-1.5" />
                            Applied on {new Date(application.appliedDate).toLocaleDateString()}
                          </div>
                          <div className="flex items-center">
                            <ClockIcon className="h-4 w-4 mr-1.5" />
                            Last updated {new Date(application.appliedDate).toLocaleDateString()}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-4">
                    <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(application.status)}`}>
                      {application.status}
                    </span>
                    <Link
                      href={`/internships/${application.internshipId}`}
                      className="inline-flex items-center text-gray-500 hover:text-gray-700"
                    >
                      <ArrowTopRightOnSquareIcon className="h-5 w-5" />
                      <span className="sr-only">View Internship</span>
                    </Link>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
} 