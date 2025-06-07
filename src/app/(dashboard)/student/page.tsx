'use client';

import DashboardHeader from './components/DashboardHeader';
import ActionCards from './components/ActionCards';

export default function StudentDashboard() {
  return (
    <div className="min-h-screen bg-gray-50">
      <DashboardHeader />
      <main>
        <div className="max-w-7xl mx-auto py-6">
          <ActionCards />
        </div>
      </main>
    </div>
  );
} 