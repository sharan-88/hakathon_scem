"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { ExclamationCircleIcon, CheckCircleIcon } from "@heroicons/react/24/outline";

// Mock: Replace with real auth/user context
const mockCompanyUser = {
  name: "TechCorp Solutions",
  email: "hr@techcorp.com",
  role: "company",
};

const initialForm = {
  title: "",
  location: "Remote",
  duration: "",
  stipend: "",
  skills: [],
  description: "",
  deadline: "",
  contactEmail: mockCompanyUser.email,
  skillInput: "",
};

export default function PostInternshipPage() {
  const router = useRouter();
  const [form, setForm] = useState(initialForm);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const [errors, setErrors] = useState({});
  const [showModal, setShowModal] = useState(false);

  // Role-based access control (replace with real auth check)
  useEffect(() => {
    if (mockCompanyUser.role !== "company") {
      router.replace("/login");
    }
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSkillInput = (e) => {
    setForm((prev) => ({ ...prev, skillInput: e.target.value }));
  };

  const handleSkillKeyDown = (e) => {
    if ((e.key === "Enter" || e.key === ",") && form.skillInput.trim()) {
      e.preventDefault();
      if (!form.skills.includes(form.skillInput.trim())) {
        setForm((prev) => ({
          ...prev,
          skills: [...prev.skills, prev.skillInput.trim()],
          skillInput: "",
        }));
      }
    }
  };

  const removeSkill = (skill) => {
    setForm((prev) => ({
      ...prev,
      skills: prev.skills.filter((s) => s !== skill),
    }));
  };

  const validate = () => {
    const newErrors = {};
    if (!form.title.trim()) newErrors.title = "Title is required.";
    if (!form.location) newErrors.location = "Location is required.";
    if (!form.duration.trim()) newErrors.duration = "Duration is required.";
    if (!form.stipend || isNaN(Number(form.stipend)) || Number(form.stipend) < 0) newErrors.stipend = "Valid stipend is required.";
    if (form.skills.length === 0) newErrors.skills = "At least one skill is required.";
    if (!form.description.trim()) newErrors.description = "Description is required.";
    if (!form.deadline) newErrors.deadline = "Deadline is required.";
    if (!form.contactEmail.trim() || !/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(form.contactEmail)) newErrors.contactEmail = "Valid email is required.";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setError("");
    setSuccess(false);
    if (!validate()) return;
    setSubmitting(true);
    // Mock submit and store as 'Pending'
    setTimeout(() => {
      setSubmitting(false);
      setShowModal(true);
      setForm(initialForm);
      // Optionally, here you would update the dashboard state or context
      setTimeout(() => {
        setShowModal(false);
        router.push("/dashboard/company/manage-posts");
      }, 1800);
    }, 1200);
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center py-8 px-4">
      <div className="w-full max-w-xl bg-white rounded-2xl shadow-lg p-8">
        <h1 className="text-2xl font-bold text-blue-700 mb-6 text-center">Post a New Internship</h1>
        <form className="space-y-6" onSubmit={handleSubmit}>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Internship Title</label>
            <input
              type="text"
              name="title"
              value={form.title}
              onChange={handleChange}
              required
              className={`w-full rounded-lg border-gray-300 focus:border-blue-500 focus:ring-blue-500 text-sm p-2 ${errors.title ? 'border-red-400' : ''}`}
              placeholder="e.g. Frontend Developer Intern"
            />
            {errors.title && (
              <div className="flex items-center gap-1 text-xs text-red-500 mt-1">
                <ExclamationCircleIcon className="h-4 w-4" /> {errors.title}
              </div>
            )}
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Location</label>
            <select
              name="location"
              value={form.location}
              onChange={handleChange}
              className={`w-full rounded-lg border-gray-300 focus:border-blue-500 focus:ring-blue-500 text-sm p-2 ${errors.location ? 'border-red-400' : ''}`}
            >
              <option value="Remote">Remote</option>
              <option value="On-site">On-site</option>
              <option value="Hybrid">Hybrid</option>
            </select>
            {errors.location && (
              <div className="flex items-center gap-1 text-xs text-red-500 mt-1">
                <ExclamationCircleIcon className="h-4 w-4" /> {errors.location}
              </div>
            )}
          </div>
          <div className="flex gap-4">
            <div className="flex-1">
              <label className="block text-sm font-medium text-gray-700 mb-1">Duration</label>
              <input
                type="text"
                name="duration"
                value={form.duration}
                onChange={handleChange}
                required
                className={`w-full rounded-lg border-gray-300 focus:border-blue-500 focus:ring-blue-500 text-sm p-2 ${errors.duration ? 'border-red-400' : ''}`}
                placeholder="e.g. 6 months"
              />
              {errors.duration && (
                <div className="flex items-center gap-1 text-xs text-red-500 mt-1">
                  <ExclamationCircleIcon className="h-4 w-4" /> {errors.duration}
                </div>
              )}
            </div>
            <div className="flex-1">
              <label className="block text-sm font-medium text-gray-700 mb-1">Stipend</label>
              <input
                type="number"
                name="stipend"
                value={form.stipend}
                onChange={handleChange}
                required
                min="0"
                className={`w-full rounded-lg border-gray-300 focus:border-blue-500 focus:ring-blue-500 text-sm p-2 ${errors.stipend ? 'border-red-400' : ''}`}
                placeholder="e.g. 15000"
              />
              {errors.stipend && (
                <div className="flex items-center gap-1 text-xs text-red-500 mt-1">
                  <ExclamationCircleIcon className="h-4 w-4" /> {errors.stipend}
                </div>
              )}
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Required Skills</label>
            <div className="flex flex-wrap gap-2 mb-2">
              {form.skills.map((skill, idx) => (
                <span
                  key={idx}
                  className="bg-blue-100 text-blue-700 px-2 py-1 rounded text-xs font-medium flex items-center gap-1"
                >
                  {skill}
                  <button
                    type="button"
                    className="ml-1 text-blue-400 hover:text-red-500 focus:outline-none"
                    onClick={() => removeSkill(skill)}
                  >
                    &times;
                  </button>
                </span>
              ))}
            </div>
            <input
              type="text"
              name="skillInput"
              value={form.skillInput}
              onChange={handleSkillInput}
              onKeyDown={handleSkillKeyDown}
              className={`w-full rounded-lg border-gray-300 focus:border-blue-500 focus:ring-blue-500 text-sm p-2 ${errors.skills ? 'border-red-400' : ''}`}
              placeholder="Type a skill and press Enter"
            />
            {errors.skills && (
              <div className="flex items-center gap-1 text-xs text-red-500 mt-1">
                <ExclamationCircleIcon className="h-4 w-4" /> {errors.skills}
              </div>
            )}
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Detailed Description</label>
            <textarea
              name="description"
              value={form.description}
              onChange={handleChange}
              required
              rows={4}
              className={`w-full rounded-lg border-gray-300 focus:border-blue-500 focus:ring-blue-500 text-sm p-2 ${errors.description ? 'border-red-400' : ''}`}
              placeholder="Describe the internship role, responsibilities, and expectations."
            />
            {errors.description && (
              <div className="flex items-center gap-1 text-xs text-red-500 mt-1">
                <ExclamationCircleIcon className="h-4 w-4" /> {errors.description}
              </div>
            )}
          </div>
          <div className="flex gap-4">
            <div className="flex-1">
              <label className="block text-sm font-medium text-gray-700 mb-1">Application Deadline</label>
              <input
                type="date"
                name="deadline"
                value={form.deadline}
                onChange={handleChange}
                required
                className={`w-full rounded-lg border-gray-300 focus:border-blue-500 focus:ring-blue-500 text-sm p-2 ${errors.deadline ? 'border-red-400' : ''}`}
              />
              {errors.deadline && (
                <div className="flex items-center gap-1 text-xs text-red-500 mt-1">
                  <ExclamationCircleIcon className="h-4 w-4" /> {errors.deadline}
                </div>
              )}
            </div>
            <div className="flex-1">
              <label className="block text-sm font-medium text-gray-700 mb-1">Company Contact Email</label>
              <input
                type="email"
                name="contactEmail"
                value={form.contactEmail}
                onChange={handleChange}
                required
                className={`w-full rounded-lg border-gray-300 focus:border-blue-500 focus:ring-blue-500 text-sm p-2 ${errors.contactEmail ? 'border-red-400' : ''}`}
                placeholder="e.g. hr@company.com"
              />
              {errors.contactEmail && (
                <div className="flex items-center gap-1 text-xs text-red-500 mt-1">
                  <ExclamationCircleIcon className="h-4 w-4" /> {errors.contactEmail}
                </div>
              )}
            </div>
          </div>
          {error && <div className="text-red-500 text-sm">{error}</div>}
          {success && <div className="text-green-600 text-sm">Internship posted successfully!</div>}
          <button
            type="submit"
            className="w-full rounded-lg bg-blue-600 text-white font-medium py-2 transition-colors hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-60"
            disabled={submitting}
          >
            {submitting ? "Posting..." : "Post Internship"}
          </button>
        </form>
      </div>
      {/* Success Modal */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40">
          <div className="bg-white rounded-2xl shadow-2xl max-w-sm w-full p-8 relative animate-fadeIn text-center">
            <CheckCircleIcon className="h-12 w-12 text-green-500 mx-auto mb-2" />
            <h2 className="text-xl font-bold text-gray-900 mb-2">Internship posted successfully!</h2>
            <p className="text-gray-600 mb-4">Your internship is pending verification and will appear in your job posts soon.</p>
            <div className="text-xs text-gray-400">Redirecting to Manage Job Posts...</div>
          </div>
        </div>
      )}
    </div>
  );
} 