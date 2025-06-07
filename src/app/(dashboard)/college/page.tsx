"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Badge } from "@/components/ui/Badge";
import {
  UserCircleIcon,
  BuildingOffice2Icon,
  ClipboardDocumentListIcon,
  CheckCircleIcon,
  ClockIcon,
  ChatBubbleLeftRightIcon,
  XMarkIcon,
  StarIcon,
  ArrowRightOnRectangleIcon,
} from "@heroicons/react/24/outline";

// Mock: Replace with real auth/user context
const mockCollegeUser = {
  name: "ABC Institute of Technology",
  email: "admin@abc.edu",
  role: "college",
};

// Mock: Replace with API data
const initialVerifications = [
  {
    id: 1,
    title: "Frontend Developer Intern",
    company: "TechCorp Solutions",
    domain: "Software Development",
    status: "Pending",
    description: "Work on modern web apps using React and Tailwind.",
    duration: "6 months",
    stipend: 20000,
    companyInfo: "TechCorp Solutions is a leading software company.",
  },
  {
    id: 2,
    title: "Marketing Intern",
    company: "Marketify",
    domain: "Marketing",
    status: "Reviewed",
    description: "Assist in digital marketing campaigns and analytics.",
    duration: "3 months",
    stipend: 12000,
    companyInfo: "Marketify specializes in digital marketing solutions.",
  },
  {
    id: 3,
    title: "Data Analyst Intern",
    company: "DataWiz",
    domain: "Analytics",
    status: "Pending",
    description: "Analyze datasets and generate business insights.",
    duration: "4 months",
    stipend: 15000,
    companyInfo: "DataWiz is a data analytics startup.",
  },
];

export default function CollegeDashboard() {
  const router = useRouter();
  const [verifications, setVerifications] = useState(initialVerifications);
  const [selectedJob, setSelectedJob] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [actionLoading, setActionLoading] = useState(false);
  const [comment, setComment] = useState("");
  const [rating, setRating] = useState(0);

  // Stats
  const totalVerified = verifications.filter((v) => v.status === "Reviewed").length;
  const pendingReviews = verifications.filter((v) => v.status === "Pending").length;
  const feedbackGiven = verifications.filter((v) => v.status === "Reviewed" && v.comment).length;

  // Role-based access control (replace with real auth check)
  useEffect(() => {
    if (mockCollegeUser.role !== "college") {
      router.replace("/login");
    }
  }, []);

  // Modal open handler
  const handleViewDetails = (job) => {
    setSelectedJob(job);
    setComment(job.comment || "");
    setRating(job.rating || 0);
    setModalOpen(true);
  };

  // Approve/Reject handlers
  const handleAction = (status) => {
    if (!selectedJob) return;
    setActionLoading(true);
    setTimeout(() => {
      setVerifications((prev) =>
        prev.map((v) =>
          v.id === selectedJob.id
            ? { ...v, status: "Reviewed", comment: comment.trim() || undefined, rating: rating || undefined, action: status }
            : v
        )
      );
      setModalOpen(false);
      setActionLoading(false);
    }, 800);
  };

  // Navigation actions
  const handleLogout = () => {
    // Clear auth (mock)
    router.replace("/login");
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Top Nav */}
      <nav className="w-full bg-white border-b border-gray-100 shadow-sm sticky top-0 z-20">
        <div className="max-w-7xl mx-auto flex items-center justify-between px-4 sm:px-6 lg:px-8 h-16">
          <div className="flex items-center gap-8">
            <span className="text-xl font-bold text-indigo-700 tracking-tight">Internship Portal</span>
            <a href="#" className="text-gray-700 hover:text-indigo-600 font-medium transition-colors">Dashboard</a>
            <a href="#" className="text-gray-700 hover:text-indigo-600 font-medium transition-colors">Rating History</a>
          </div>
          <button
            onClick={handleLogout}
            className="flex items-center gap-2 text-gray-500 hover:text-red-600 font-medium transition-colors"
          >
            <ArrowRightOnRectangleIcon className="h-5 w-5" /> Logout
          </button>
        </div>
      </nav>

      {/* Header */}
      <div className="w-full bg-gradient-to-r from-indigo-50 to-blue-50 border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="overflow-hidden rounded-xl bg-white shadow-lg transition-shadow hover:shadow-xl">
            <div className="border-b border-gray-100 bg-white px-6 py-6 text-center">
              <h1 className="text-2xl font-bold text-gray-900 flex items-center justify-center gap-2">
                <UserCircleIcon className="h-8 w-8 text-indigo-400" />
                Welcome, {mockCollegeUser.name}!
              </h1>
              <p className="mt-2 text-base text-gray-600">
                Manage and Verify Internship Opportunities
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <main>
        <div className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
          {/* Pending Verifications */}
          <section>
            <h2 className="text-xl font-semibold text-gray-800 mb-6 flex items-center gap-2">
              <ClipboardDocumentListIcon className="h-6 w-6 text-indigo-500" />
              Pending Verifications
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {verifications.map((post) => (
                <div
                  key={post.id}
                  className="bg-white rounded-2xl shadow-md hover:shadow-xl transition-shadow p-6 flex flex-col gap-4 border border-gray-100"
                >
                  <div className="flex items-center gap-3">
                    <BuildingOffice2Icon className="h-8 w-8 text-indigo-400" />
                    <div>
                      <h3 className="text-lg font-bold text-gray-900">{post.title}</h3>
                      <p className="text-sm text-gray-600">{post.company}</p>
                    </div>
                  </div>
                  <div className="flex items-center justify-between mt-2">
                    <span className="text-sm text-gray-500">Domain: <span className="font-medium text-gray-700">{post.domain}</span></span>
                    <Badge variant={post.status === "Pending" ? "default" : "secondary"}>
                      {post.status}
                    </Badge>
                  </div>
                  <button
                    className="mt-4 w-full rounded-lg bg-indigo-600 text-white font-medium py-2 transition-colors hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                    onClick={() => handleViewDetails(post)}
                  >
                    View Details
                  </button>
                </div>
              ))}
              {verifications.length === 0 && (
                <div className="col-span-full text-center text-gray-500 py-12">
                  No pending verifications at the moment.
                </div>
              )}
            </div>
          </section>

          {/* Stats/Activity Section */}
          <section className="mt-12">
            <h2 className="text-xl font-semibold text-gray-800 mb-6 flex items-center gap-2">
              <CheckCircleIcon className="h-6 w-6 text-emerald-500" />
              Activity & Stats
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-white rounded-2xl shadow-md p-6 flex items-center gap-4 border border-gray-100">
                <CheckCircleIcon className="h-10 w-10 text-indigo-500" />
                <div>
                  <div className="text-2xl font-bold text-gray-900">{totalVerified}</div>
                  <div className="text-gray-600 text-sm">Total Verified Jobs</div>
                </div>
              </div>
              <div className="bg-white rounded-2xl shadow-md p-6 flex items-center gap-4 border border-gray-100">
                <ClockIcon className="h-10 w-10 text-yellow-500" />
                <div>
                  <div className="text-2xl font-bold text-gray-900">{pendingReviews}</div>
                  <div className="text-gray-600 text-sm">Pending Reviews</div>
                </div>
              </div>
              <div className="bg-white rounded-2xl shadow-md p-6 flex items-center gap-4 border border-gray-100">
                <ChatBubbleLeftRightIcon className="h-10 w-10 text-emerald-500" />
                <div>
                  <div className="text-2xl font-bold text-gray-900">{feedbackGiven}</div>
                  <div className="text-gray-600 text-sm">Feedback Given</div>
                </div>
              </div>
            </div>
          </section>
        </div>
      </main>

      {/* Modal for Job Details */}
      {modalOpen && selectedJob && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40">
          <div className="bg-white rounded-2xl shadow-2xl max-w-lg w-full p-8 relative animate-fadeIn">
            <button
              className="absolute top-4 right-4 text-gray-400 hover:text-gray-600"
              onClick={() => setModalOpen(false)}
              aria-label="Close"
            >
              <XMarkIcon className="h-6 w-6" />
            </button>
            <h3 className="text-2xl font-bold text-gray-900 mb-2 flex items-center gap-2">
              <BuildingOffice2Icon className="h-7 w-7 text-indigo-400" />
              {selectedJob.title}
            </h3>
            <div className="mb-2 text-gray-600">{selectedJob.company}</div>
            <div className="mb-4 text-sm text-gray-500">{selectedJob.domain}</div>
            <div className="mb-4">
              <div className="font-semibold text-gray-800 mb-1">Description</div>
              <div className="text-gray-700 text-sm whitespace-pre-line">{selectedJob.description}</div>
            </div>
            <div className="mb-2 flex gap-4">
              <div>
                <span className="font-medium text-gray-700">Duration:</span> {selectedJob.duration}
              </div>
              <div>
                <span className="font-medium text-gray-700">Stipend:</span> ₹{selectedJob.stipend}
              </div>
            </div>
            <div className="mb-4">
              <span className="font-medium text-gray-700">Company Info:</span> {selectedJob.companyInfo}
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-1">Comment (optional)</label>
              <textarea
                className="w-full rounded-lg border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 text-sm"
                rows={2}
                value={comment}
                onChange={e => setComment(e.target.value)}
                placeholder="Add a comment for the company or student..."
              />
            </div>
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-1">Rating (optional)</label>
              <div className="flex gap-1">
                {[1, 2, 3, 4, 5].map((star) => (
                  <button
                    key={star}
                    type="button"
                    className={`text-yellow-400 ${rating >= star ? "" : "opacity-30"}`}
                    onClick={() => setRating(star)}
                  >
                    <StarIcon className="h-6 w-6" />
                  </button>
                ))}
              </div>
            </div>
            <div className="flex gap-4">
              <button
                className="flex-1 rounded-lg bg-emerald-600 text-white font-medium py-2 transition-colors hover:bg-emerald-700 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2 disabled:opacity-60"
                onClick={() => handleAction("approved")}
                disabled={actionLoading}
              >
                Approve
              </button>
              <button
                className="flex-1 rounded-lg bg-red-500 text-white font-medium py-2 transition-colors hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 disabled:opacity-60"
                onClick={() => handleAction("rejected")}
                disabled={actionLoading}
              >
                Reject
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
} 