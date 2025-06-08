"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Badge } from "@/components/ui/Badge";
import {
  BuildingOffice2Icon,
  ClipboardDocumentListIcon,
  XMarkIcon,
} from "@heroicons/react/24/outline";

// Mock: Replace with real auth/user context
const mockCollegeUser = {
  name: "ABC Institute of Technology",
  email: "admin@abc.edu",
  role: "college",
};

// Mock: Replace with API data
const pendingJobs = [
  {
    id: 1,
    title: "Frontend Developer Intern",
    company: "TechCorp Solutions",
    submissionDate: "2024-06-01",
    status: "Pending",
    description: "Work on modern web apps using React and Tailwind.",
    duration: "6 months",
    stipend: 20000,
    companyInfo: "TechCorp Solutions is a leading software company.",
    skills: ["React", "Tailwind CSS", "JavaScript"],
    links: ["https://techcorp.com/internships/frontend"],
  },
  {
    id: 2,
    title: "Marketing Intern",
    company: "Marketify",
    submissionDate: "2024-06-03",
    status: "Pending",
    description: "Assist in digital marketing campaigns and analytics.",
    duration: "3 months",
    stipend: 12000,
    companyInfo: "Marketify specializes in digital marketing solutions.",
    skills: ["SEO", "Analytics", "Content Creation"],
    links: [],
  },
  {
    id: 3,
    title: "Data Analyst Intern",
    company: "DataWiz",
    submissionDate: "2024-06-05",
    status: "Pending",
    description: "Analyze datasets and generate business insights.",
    duration: "4 months",
    stipend: 15000,
    companyInfo: "DataWiz is a data analytics startup.",
    skills: ["Python", "SQL", "Data Visualization"],
    links: ["https://datawiz.com/careers/data-analyst-intern"],
  },
];

export default function JobVerificationPage() {
  const router = useRouter();
  const [jobs, setJobs] = useState(pendingJobs);
  const [selectedJob, setSelectedJob] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [actionLoading, setActionLoading] = useState(false);
  const [comment, setComment] = useState("");
  const [rating, setRating] = useState(0);
  const [actionType, setActionType] = useState(null); // 'approve' or 'reject'
  const [showActionPrompt, setShowActionPrompt] = useState(false);

  // Role-based access control (replace with real auth check)
  useEffect(() => {
    if (mockCollegeUser.role !== "college") {
      router.replace("/login");
    }
  }, []);

  const handleViewDetails = (job) => {
    setSelectedJob(job);
    setModalOpen(true);
  };

  const handleActionClick = (type) => {
    setActionType(type);
    setShowActionPrompt(true);
  };

  const handleActionSubmit = () => {
    if (!selectedJob) return;
    setActionLoading(true);
    setTimeout(() => {
      setJobs((prev) => prev.filter((job) => job.id !== selectedJob.id));
      setModalOpen(false);
      setShowActionPrompt(false);
      setActionLoading(false);
      setComment("");
      setRating(0);
      setActionType(null);
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50">
      {/* Header */}
      <header className="w-full bg-white border-b border-gray-100 shadow-sm sticky top-0 z-20">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 flex flex-col items-center">
          <h1 className="text-3xl font-bold text-indigo-700 mb-2 flex items-center gap-2">
            <ClipboardDocumentListIcon className="h-8 w-8 text-indigo-400" />
            Verify Internship Listings
          </h1>
          <p className="text-gray-600 text-base">Review and verify new internship postings submitted by companies.</p>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-5xl mx-auto py-10 px-4 sm:px-6 lg:px-8">
        <div className="overflow-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {jobs.map((job) => (
              <div
                key={job.id}
                className="bg-white rounded-2xl shadow-md hover:shadow-xl transition-shadow p-6 flex flex-col gap-4 border border-gray-100"
              >
                <div className="flex items-center gap-3">
                  <BuildingOffice2Icon className="h-8 w-8 text-indigo-400" />
                  <div>
                    <h3 className="text-lg font-bold text-gray-900">{job.title}</h3>
                    <p className="text-sm text-gray-600">{job.company}</p>
                  </div>
                </div>
                <div className="flex items-center justify-between mt-2">
                  <span className="text-sm text-gray-500">Submitted: <span className="font-medium text-gray-700">{job.submissionDate}</span></span>
                  <Badge variant="default">{job.status}</Badge>
                </div>
                <button
                  className="mt-4 w-full rounded-lg bg-indigo-600 text-white font-medium py-2 transition-colors hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                  onClick={() => handleViewDetails(job)}
                >
                  View Details
                </button>
              </div>
            ))}
            {jobs.length === 0 && (
              <div className="col-span-full text-center text-gray-500 py-12">
                No new job postings awaiting verification.
              </div>
            )}
          </div>
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
              disabled={actionLoading}
            >
              <XMarkIcon className="h-6 w-6" />
            </button>
            <h3 className="text-2xl font-bold text-gray-900 mb-2 flex items-center gap-2">
              <BuildingOffice2Icon className="h-7 w-7 text-indigo-400" />
              {selectedJob.title}
            </h3>
            <div className="mb-2 text-gray-600">{selectedJob.company}</div>
            <div className="mb-4 text-sm text-gray-500">Submitted: {selectedJob.submissionDate}</div>
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
            <div className="mb-2">
              <span className="font-medium text-gray-700">Company Info:</span> {selectedJob.companyInfo}
            </div>
            <div className="mb-2">
              <span className="font-medium text-gray-700">Skills Required:</span>
              <ul className="flex flex-wrap gap-2 mt-1">
                {selectedJob.skills && selectedJob.skills.length > 0 ? (
                  selectedJob.skills.map((skill, idx) => (
                    <li key={idx} className="px-2 py-1 bg-indigo-100 text-indigo-700 rounded text-xs font-medium">{skill}</li>
                  ))
                ) : (
                  <li className="text-gray-400 text-xs">None listed</li>
                )}
              </ul>
            </div>
            <div className="mb-4">
              <span className="font-medium text-gray-700">Links:</span>
              <ul className="flex flex-col gap-1 mt-1">
                {selectedJob.links && selectedJob.links.length > 0 ? (
                  selectedJob.links.map((link, idx) => (
                    <li key={idx}>
                      <a href={link} target="_blank" rel="noopener noreferrer" className="text-indigo-600 hover:underline text-xs">{link}</a>
                    </li>
                  ))
                ) : (
                  <li className="text-gray-400 text-xs">No links attached</li>
                )}
              </ul>
            </div>
            {/* Approve/Reject Buttons */}
            {!showActionPrompt && (
              <div className="flex gap-4 mt-6">
                <button
                  className="flex-1 rounded-lg bg-emerald-600 text-white font-medium py-2 transition-colors hover:bg-emerald-700 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2 disabled:opacity-60"
                  onClick={() => handleActionClick('approve')}
                  disabled={actionLoading}
                >
                  Approve
                </button>
                <button
                  className="flex-1 rounded-lg bg-red-500 text-white font-medium py-2 transition-colors hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 disabled:opacity-60"
                  onClick={() => handleActionClick('reject')}
                  disabled={actionLoading}
                >
                  Reject
                </button>
              </div>
            )}
            {/* Action Prompt for Comment/Rating */}
            {showActionPrompt && (
              <div className="mt-6">
                <label className="block text-sm font-medium text-gray-700 mb-1">Comment (optional)</label>
                <textarea
                  className="w-full rounded-lg border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 text-sm"
                  rows={2}
                  value={comment}
                  onChange={e => setComment(e.target.value)}
                  placeholder="Add a comment for the company or student..."
                  disabled={actionLoading}
                />
                <label className="block text-sm font-medium text-gray-700 mb-1 mt-4">Rating (optional)</label>
                <div className="flex gap-1 mb-4">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      key={star}
                      type="button"
                      className={`text-yellow-400 ${rating >= star ? "" : "opacity-30"}`}
                      onClick={() => setRating(star)}
                      disabled={actionLoading}
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20" className="h-6 w-6">
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.286 3.967a1 1 0 00.95.69h4.175c.969 0 1.371 1.24.588 1.81l-3.38 2.455a1 1 0 00-.364 1.118l1.287 3.966c.3.922-.755 1.688-1.54 1.118l-3.38-2.454a1 1 0 00-1.175 0l-3.38 2.454c-.784.57-1.838-.196-1.54-1.118l1.287-3.966a1 1 0 00-.364-1.118L2.05 9.394c-.783-.57-.38-1.81.588-1.81h4.175a1 1 0 00.95-.69l1.286-3.967z" />
                      </svg>
                    </button>
                  ))}
                </div>
                <div className="flex gap-4">
                  <button
                    className="flex-1 rounded-lg bg-indigo-600 text-white font-medium py-2 transition-colors hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 disabled:opacity-60"
                    onClick={handleActionSubmit}
                    disabled={actionLoading}
                  >
                    {actionLoading ? "Submitting..." : actionType === 'approve' ? "Approve & Submit" : "Reject & Submit"}
                  </button>
                  <button
                    className="flex-1 rounded-lg bg-gray-200 text-gray-700 font-medium py-2 transition-colors hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-300 focus:ring-offset-2 disabled:opacity-60"
                    onClick={() => { setShowActionPrompt(false); setComment(""); setRating(0); setActionType(null); }}
                    disabled={actionLoading}
                  >
                    Cancel
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
} 