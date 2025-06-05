'use client';

import DashboardHeader from '@/components/DashboardHeader';

export default function CompanyDashboard() {
  return (
    <div className="min-h-screen bg-gray-50">
      <DashboardHeader />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <h1 className="text-3xl font-bold text-gray-900">Company Dashboard</h1>
        {/* Add your company dashboard content here */}
      </div>
    </div>
  );
} 