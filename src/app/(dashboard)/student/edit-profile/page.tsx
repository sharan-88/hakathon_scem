"use client";

import { useState } from "react";
import { UserCircleIcon, DocumentArrowUpIcon, CheckCircleIcon } from "@heroicons/react/24/outline";

const mockProfile = {
  name: "John Doe",
  email: "john.doe@university.edu",
  institute: "University of Technology",
  hasResume: false,
};

export default function EditProfilePage() {
  const [profile, setProfile] = useState(mockProfile);
  const [resume, setResume] = useState(null);
  const [errors, setErrors] = useState({});
  const [success, setSuccess] = useState(false);

  const validate = () => {
    const errs = {};
    if (!profile.name.trim()) errs.name = "Name is required";
    if (!profile.email.trim()) errs.email = "Email is required";
    if (!profile.institute.trim()) errs.institute = "Institute is required";
    return errs;
  };

  const handleChange = (e) => {
    setProfile({ ...profile, [e.target.name]: e.target.value });
  };

  const handleResume = (e) => {
    setResume(e.target.files[0]);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const errs = validate();
    setErrors(errs);
    if (Object.keys(errs).length === 0) {
      setSuccess(true);
      setTimeout(() => setSuccess(false), 2000);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">Edit My Profile</h1>
        <form onSubmit={handleSubmit} className="bg-white rounded-xl shadow p-8 space-y-8 border border-gray-100">
          <div className="flex items-center gap-4 mb-4">
            <UserCircleIcon className="h-16 w-16 text-gray-300" />
            <div>
              <div className="font-semibold text-xl text-gray-900">{profile.name}</div>
              <div className="text-gray-600 text-base">{profile.email}</div>
            </div>
          </div>
          <div>
            <label className="block text-base font-semibold text-gray-800 mb-2">Full Name</label>
            <input
              type="text"
              name="name"
              value={profile.name}
              onChange={handleChange}
              className={`w-full max-w-lg rounded-lg border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 text-lg text-gray-900 px-5 py-3 ${errors.name ? 'border-red-300 bg-red-50' : ''}`}
            />
            {errors.name && <p className="text-red-600 text-sm mt-1">{errors.name}</p>}
          </div>
          <div>
            <label className="block text-base font-semibold text-gray-800 mb-2">Email</label>
            <input
              type="email"
              name="email"
              value={profile.email}
              onChange={handleChange}
              className={`w-full max-w-lg rounded-lg border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 text-lg text-gray-900 px-5 py-3 ${errors.email ? 'border-red-300 bg-red-50' : ''}`}
            />
            {errors.email && <p className="text-red-600 text-sm mt-1">{errors.email}</p>}
          </div>
          <div>
            <label className="block text-base font-semibold text-gray-800 mb-2">Institute</label>
            <input
              type="text"
              name="institute"
              value={profile.institute}
              onChange={handleChange}
              className={`w-full max-w-lg rounded-lg border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 text-lg text-gray-900 px-5 py-3 ${errors.institute ? 'border-red-300 bg-red-50' : ''}`}
            />
            {errors.institute && <p className="text-red-600 text-sm mt-1">{errors.institute}</p>}
          </div>
          <div>
            <label className="block text-base font-semibold text-gray-800 mb-2">Resume (PDF, optional)</label>
            <div className="flex items-center gap-2">
              <input
                type="file"
                accept="application/pdf"
                onChange={handleResume}
                className="block w-full max-w-lg text-base text-gray-700 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-base file:font-semibold file:bg-indigo-50 file:text-indigo-700 hover:file:bg-indigo-100"
              />
              {resume && <span className="text-sm text-gray-700">{resume.name}</span>}
            </div>
          </div>
          <button
            type="submit"
            className="w-full max-w-lg rounded-lg bg-indigo-600 text-white font-semibold text-lg py-3 transition-colors hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
          >
            Save Changes
          </button>
          {success && (
            <div className="flex items-center gap-2 text-emerald-600 mt-2 text-base font-medium">
              <CheckCircleIcon className="h-6 w-6" /> Profile updated successfully!
            </div>
          )}
        </form>
      </div>
    </div>
  );
} 