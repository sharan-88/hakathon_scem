'use client';

import LogoutButton from './LogoutButton';

export default function DashboardHeader() {
  return (
    <header className="bg-white shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-end items-center py-3">
          <LogoutButton />
        </div>
      </div>
    </header>
  );
} 