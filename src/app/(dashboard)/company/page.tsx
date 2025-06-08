"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import {
  BriefcaseIcon,
  CheckCircleIcon,
  UsersIcon,
  PlusCircleIcon,
  ClipboardDocumentListIcon,
  EyeIcon,
  ArrowRightOnRectangleIcon,
} from "@heroicons/react/24/outline";

// Mock: Replace with real auth/user context
const mockCompanyUser = {
  name: "TechCorp Solutions",
  email: "hr@techcorp.com",
  role: "company",
};

// Mock: Replace with API data
const stats = {
  totalInternships: 8,
  verifiedPosts: 5,
  totalApplications: 120,
};

// Mock: Recent activity data
const recentActivity = [
  {
    id: 1,
    type: "approved",
    title: "Frontend Developer Intern",
    timestamp: "2024-06-10 14:32",
    status: "Approved",
    link: "/dashboard/company/manage-posts/1",
  },
  {
    id: 2,
    type: "application",
    title: "Backend Developer Intern",
    timestamp: "2024-06-10 13:20",
    status: "New Application",
    link: "/dashboard/company/view-applications/2",
  },
  {
    id: 3,
    type: "pending",
    title: "UI/UX Designer Intern",
    timestamp: "2024-06-09 17:45",
    status: "Pending Verification",
    link: "/dashboard/company/manage-posts/3",
  },
];

export default function CompanyDashboard() {
  const router = useRouter();

  // Role-based access control (replace with real auth check)
  useEffect(() => {
    if (mockCompanyUser.role !== "company") {
      router.replace("/login");
    }
  }, []);

  const handleLogout = () => {
    // Clear auth (mock)
    router.replace("/login");
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col md:flex-row">
      {/* Sidebar Navigation */}
      <aside className="w-full md:w-64 bg-white border-r border-gray-100 shadow-sm flex flex-row md:flex-col items-center md:items-stretch py-4 md:py-8 px-4 md:px-0">
        <div className="flex-1 flex flex-row md:flex-col gap-4 w-full">
          <span className="text-xl font-bold text-blue-700 tracking-tight mb-4 md:mb-8 text-center md:text-left">Company Portal</span>
          <a href="#" className="flex items-center gap-2 text-gray-700 hover:text-blue-600 font-medium transition-colors px-2 py-2 rounded-lg md:rounded-none md:px-4 md:py-2">
            <PlusCircleIcon className="h-5 w-5" /> Post Internship
          </a>
          <a href="#" className="flex items-center gap-2 text-gray-700 hover:text-blue-600 font-medium transition-colors px-2 py-2 rounded-lg md:rounded-none md:px-4 md:py-2">
            <ClipboardDocumentListIcon className="h-5 w-5" /> Manage Posts
          </a>
          <a href="#" className="flex items-center gap-2 text-gray-700 hover:text-blue-600 font-medium transition-colors px-2 py-2 rounded-lg md:rounded-none md:px-4 md:py-2">
            <EyeIcon className="h-5 w-5" /> View Applications
          </a>
        </div>
        <button
          onClick={handleLogout}
          className="flex items-center gap-2 text-gray-500 hover:text-red-600 font-medium transition-colors mt-4 md:mt-auto px-2 py-2 md:px-4 md:py-2"
        >
          <ArrowRightOnRectangleIcon className="h-5 w-5" /> Logout
        </button>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col">
        {/* Header */}
        <header className="w-full bg-white border-b border-gray-100 shadow-sm sticky top-0 z-10">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 flex flex-col items-center md:items-start">
            <h1 className="text-3xl font-bold text-blue-700 mb-2 flex items-center gap-2">
              Welcome to Your Dashboard
            </h1>
            <p className="text-gray-600 text-base">Overview of your company activity and stats.</p>
          </div>
        </header>

        {/* Stats Grid */}
        <section className="max-w-5xl mx-auto py-10 px-4 sm:px-6 lg:px-8 w-full">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <button
              className="bg-white rounded-2xl shadow-md p-6 flex items-center gap-4 border border-gray-100 w-full text-left hover:shadow-lg transition-shadow focus:outline-none"
              onClick={() => router.push('/dashboard/company/manage-posts')}
            >
              <BriefcaseIcon className="h-10 w-10 text-blue-500" />
              <div>
                <div className="text-2xl font-bold text-gray-900">{stats.totalInternships}</div>
                <div className="text-gray-600 text-sm">Total Internships Posted</div>
              </div>
            </button>
            <button
              className="bg-white rounded-2xl shadow-md p-6 flex items-center gap-4 border border-gray-100 w-full text-left hover:shadow-lg transition-shadow focus:outline-none"
              onClick={() => router.push('/dashboard/company/manage-posts?filter=verified')}
            >
              <CheckCircleIcon className="h-10 w-10 text-green-500" />
              <div>
                <div className="text-2xl font-bold text-gray-900">{stats.verifiedPosts}</div>
                <div className="text-gray-600 text-sm">Verified Posts</div>
              </div>
            </button>
            <button
              className="bg-white rounded-2xl shadow-md p-6 flex items-center gap-4 border border-gray-100 w-full text-left hover:shadow-lg transition-shadow focus:outline-none"
              onClick={() => router.push('/dashboard/company/view-applications')}
            >
              <UsersIcon className="h-10 w-10 text-indigo-500" />
              <div>
                <div className="text-2xl font-bold text-gray-900">{stats.totalApplications}</div>
                <div className="text-gray-600 text-sm">Total Applications</div>
              </div>
            </button>
          </div>
        </section>

        {/* Recent Activity Section */}
        <section className="max-w-5xl mx-auto pb-10 px-4 sm:px-6 lg:px-8 w-full">
          <h2 className="text-xl font-semibold text-gray-800 mb-6 mt-2">Recent Activity</h2>
          <div className="bg-white rounded-2xl shadow-md border border-gray-100 divide-y divide-gray-100">
            {recentActivity.length === 0 ? (
              <div className="text-center text-gray-500 py-8">No recent activity.</div>
            ) : (
              recentActivity.map((activity) => (
                <button
                  key={activity.id}
                  className="w-full flex flex-col md:flex-row items-start md:items-center justify-between gap-2 px-6 py-4 hover:bg-blue-50 transition-colors text-left focus:outline-none"
                  onClick={() => router.push(activity.link)}
                >
                  <div className="flex flex-col md:flex-row md:items-center gap-2">
                    <span className="font-medium text-gray-900">{activity.title}</span>
                    <span className="text-xs text-gray-500 md:ml-4">{activity.status}</span>
                  </div>
                  <span className="text-xs text-gray-400">{activity.timestamp}</span>
                </button>
              ))
            )}
          </div>
        </section>
      </main>
    </div>
  );
} 