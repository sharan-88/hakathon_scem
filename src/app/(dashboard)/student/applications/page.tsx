"use client";

import { useState } from "react";
import { Badge } from "@/components/ui/Badge";
import { BriefcaseIcon, BuildingOffice2Icon, CalendarIcon, XMarkIcon } from "@heroicons/react/24/outline";

const mockApplications = [
  {
    id: 1,
    company: "TechCorp Solutions",
    position: "Frontend Developer Intern",
    appliedDate: "2024-06-01",
    status: "Pending",
    details: "You applied for a 6-month internship working on React and Tailwind projects.",
    feedback: null,
  },
  {
    id: 2,
    company: "Marketify",
    position: "Marketing Intern",
    appliedDate: "2024-05-20",
    status: "Accepted",
    details: "You applied for a 3-month marketing internship focused on digital campaigns.",
    feedback: "Congratulations! We look forward to working with you.",
  },
  {
    id: 3,
    company: "DataWiz",
    position: "Data Analyst Intern",
    appliedDate: "2024-05-15",
    status: "Rejected",
    details: "You applied for a 4-month data analytics internship.",
    feedback: "Thank you for applying. We encourage you to apply again in the future.",
  },
];

export default function ApplicationsPage() {
  const [selected, setSelected] = useState(null);

  const statusColor = (status) => {
    switch (status) {
      case "Accepted":
        return "bg-emerald-100 text-emerald-700";
      case "Rejected":
        return "bg-red-100 text-red-700";
      default:
        return "bg-yellow-100 text-yellow-700";
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">My Applications</h1>
        <div className="space-y-6">
          {mockApplications.map((app) => (
            <div key={app.id} className="bg-white rounded-xl shadow p-8 flex flex-col md:flex-row md:items-center md:justify-between gap-6 border border-gray-100">
              <div className="flex items-center gap-6">
                <BuildingOffice2Icon className="h-12 w-12 text-indigo-400" />
                <div>
                  <div className="font-semibold text-xl text-gray-900">{app.position}</div>
                  <div className="text-gray-800 text-base">{app.company}</div>
                  <div className="text-gray-700 text-sm flex items-center gap-1"><CalendarIcon className="h-5 w-5" /> Applied: {app.appliedDate}</div>
                </div>
              </div>
              <div className="flex flex-col items-end gap-3">
                <Badge className={statusColor(app.status) + ' text-base px-4 py-1'}>{app.status}</Badge>
                <button
                  className="text-indigo-700 hover:underline text-base font-semibold"
                  onClick={() => setSelected(app)}
                >
                  View Details
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Modal */}
        {selected && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40">
            <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full p-10 relative animate-fadeIn">
              <button
                className="absolute top-4 right-4 text-gray-400 hover:text-gray-600"
                onClick={() => setSelected(null)}
                aria-label="Close"
              >
                <XMarkIcon className="h-7 w-7" />
              </button>
              <h3 className="text-2xl font-bold text-gray-900 mb-3 flex items-center gap-2">
                <BriefcaseIcon className="h-7 w-7 text-indigo-400" />
                {selected.position}
              </h3>
              <div className="mb-2 text-gray-800 text-lg">{selected.company}</div>
              <div className="mb-4 text-gray-700 text-base">Applied: {selected.appliedDate}</div>
              <div className="mb-4">
                <div className="font-semibold text-gray-900 mb-1 text-lg">Details</div>
                <div className="text-gray-800 text-base whitespace-pre-line">{selected.details}</div>
              </div>
              {selected.feedback && (
                <div className="mb-4">
                  <div className="font-semibold text-gray-900 mb-1 text-lg">Feedback</div>
                  <div className="text-gray-800 text-base whitespace-pre-line">{selected.feedback}</div>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
} 