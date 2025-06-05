'use client';

import { useState, useEffect, useRef } from 'react';
import { XMarkIcon, PlusIcon, DocumentIcon, ArrowUpTrayIcon, CheckCircleIcon } from '@heroicons/react/24/outline';
import { StudentProfile } from '@/types/student';

interface StudentProfile {
  fullName: string;
  email: string;
  institute: string;
  education: {
    degree: string;
    field: string;
    graduationYear: string;
  };
  skills: string[];
  preferences: {
    domains: string[];
    locations: string[];
    workMode: 'Remote' | 'On-site' | 'Hybrid' | '';
  };
  bio: string;
  resume?: {
    fileName: string;
    uploadedAt: string;
    url: string;
  };
}

// Mock data - Replace with actual API call
const mockProfile: StudentProfile = {
  fullName: 'John Doe',
  email: 'john.doe@university.edu',
  institute: 'University of Technology',
  education: {
    degree: 'Bachelor of Technology',
    field: 'Computer Science',
    graduationYear: '2025',
  },
  skills: ['React', 'JavaScript', 'Node.js'],
  preferences: {
    domains: ['Web Development', 'Machine Learning'],
    locations: ['Bangalore', 'Mumbai'],
    workMode: 'Hybrid',
  },
  bio: 'Passionate computer science student interested in web development and AI.',
  resume: {
    fileName: 'john-doe-resume.pdf',
    uploadedAt: '2024-03-15T10:30:00Z',
    url: '/uploads/resumes/john-doe-resume.pdf'
  }
};

export default function StudentProfile() {
  const [profile, setProfile] = useState<StudentProfile>(mockProfile);
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [newSkill, setNewSkill] = useState('');
  const [newDomain, setNewDomain] = useState('');
  const [newLocation, setNewLocation] = useState('');
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    // Replace with actual API call
    const fetchProfile = async () => {
      try {
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 1000));
        setProfile(mockProfile);
      } catch (error) {
        console.error('Error fetching profile:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchProfile();
  }, []);

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Validate file type
    if (file.type !== 'application/pdf') {
      alert('Please upload a PDF file');
      return;
    }

    // Validate file size (5MB limit)
    if (file.size > 5 * 1024 * 1024) {
      alert('File size should be less than 5MB');
      return;
    }

    try {
      // Simulate file upload
      const formData = new FormData();
      formData.append('resume', file);

      // Replace with actual API call
      // const response = await fetch('/api/student/resume', {
      //   method: 'POST',
      //   body: formData,
      // });
      // const data = await response.json();

      // Simulate API response
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      setProfile(prev => ({
        ...prev,
        resume: {
          fileName: file.name,
          uploadedAt: new Date().toISOString(),
          url: URL.createObjectURL(file)
        }
      }));
    } catch (error) {
      console.error('Error uploading resume:', error);
      alert('Failed to upload resume. Please try again.');
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Show success message
      setShowSuccess(true);
      setTimeout(() => setShowSuccess(false), 3000);
    } catch (error) {
      console.error('Error saving profile:', error);
      alert('Failed to save changes. Please try again.');
    } finally {
      setIsSaving(false);
    }
  };

  const addSkill = () => {
    if (newSkill && !profile.skills.includes(newSkill)) {
      setProfile(prev => ({
        ...prev,
        skills: [...prev.skills, newSkill],
      }));
      setNewSkill('');
    }
  };

  const removeSkill = (skillToRemove: string) => {
    setProfile(prev => ({
      ...prev,
      skills: prev.skills.filter(skill => skill !== skillToRemove),
    }));
  };

  const addDomain = () => {
    if (newDomain && !profile.preferences.domains.includes(newDomain)) {
      setProfile(prev => ({
        ...prev,
        preferences: {
          ...prev.preferences,
          domains: [...prev.preferences.domains, newDomain],
        },
      }));
      setNewDomain('');
    }
  };

  const removeDomain = (domainToRemove: string) => {
    setProfile(prev => ({
      ...prev,
      preferences: {
        ...prev.preferences,
        domains: prev.preferences.domains.filter(domain => domain !== domainToRemove),
      },
    }));
  };

  const addLocation = () => {
    if (newLocation && !profile.preferences.locations.includes(newLocation)) {
      setProfile(prev => ({
        ...prev,
        preferences: {
          ...prev.preferences,
          locations: [...prev.preferences.locations, newLocation],
        },
      }));
      setNewLocation('');
    }
  };

  const removeLocation = (locationToRemove: string) => {
    setProfile(prev => ({
      ...prev,
      preferences: {
        ...prev.preferences,
        locations: prev.preferences.locations.filter(location => location !== locationToRemove),
      },
    }));
  };

  if (isLoading) {
    return (
      <div className="animate-pulse">
        <div className="h-8 bg-gray-200 rounded w-1/4 mb-8"></div>
        <div className="space-y-4">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="h-10 bg-gray-200 rounded"></div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto">
      {/* Success Notification */}
      {showSuccess && (
        <div className="fixed top-4 right-4 flex items-center gap-2 bg-green-50 text-green-700 px-4 py-2 rounded-lg shadow-lg border border-green-100 animate-fade-in">
          <CheckCircleIcon className="h-5 w-5" />
          <span>Profile updated successfully</span>
        </div>
      )}

      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Your Profile</h1>
        <p className="mt-2 text-gray-600">
          Keep your profile updated to find the best internship matches
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-8">
        {/* Basic Information */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-6">Basic Information</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label htmlFor="fullName" className="block text-sm font-medium text-gray-700 mb-1">
                Full Name
              </label>
              <input
                type="text"
                id="fullName"
                value={profile.fullName}
                onChange={(e) => setProfile(prev => ({ ...prev, fullName: e.target.value }))}
                className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                required
              />
            </div>
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                Email
              </label>
              <input
                type="email"
                id="email"
                value={profile.email}
                className="w-full px-4 py-2 rounded-lg border border-gray-200 bg-gray-50 text-gray-500 cursor-not-allowed"
                disabled
              />
            </div>
            <div>
              <label htmlFor="institute" className="block text-sm font-medium text-gray-700 mb-1">
                Institute
              </label>
              <input
                type="text"
                id="institute"
                value={profile.institute}
                onChange={(e) => setProfile(prev => ({ ...prev, institute: e.target.value }))}
                className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                required
              />
            </div>
            <div>
              <label htmlFor="graduationYear" className="block text-sm font-medium text-gray-700 mb-1">
                Graduation Year
              </label>
              <input
                type="text"
                id="graduationYear"
                value={profile.education.graduationYear}
                onChange={(e) => setProfile(prev => ({
                  ...prev,
                  education: { ...prev.education, graduationYear: e.target.value }
                }))}
                className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                required
              />
            </div>
          </div>
        </div>

        {/* Education */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-6">Education</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label htmlFor="degree" className="block text-sm font-medium text-gray-700 mb-1">
                Degree
              </label>
              <input
                type="text"
                id="degree"
                value={profile.education.degree}
                onChange={(e) => setProfile(prev => ({
                  ...prev,
                  education: { ...prev.education, degree: e.target.value }
                }))}
                className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                required
              />
            </div>
            <div>
              <label htmlFor="field" className="block text-sm font-medium text-gray-700 mb-1">
                Field of Study
              </label>
              <input
                type="text"
                id="field"
                value={profile.education.field}
                onChange={(e) => setProfile(prev => ({
                  ...prev,
                  education: { ...prev.education, field: e.target.value }
                }))}
                className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                required
              />
            </div>
          </div>
        </div>

        {/* Skills */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-6">Skills</h2>
          <div className="space-y-4">
            <div className="flex gap-2">
              <input
                type="text"
                value={newSkill}
                onChange={(e) => setNewSkill(e.target.value)}
                placeholder="Add a skill"
                className="flex-1 px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addSkill())}
              />
              <button
                type="button"
                onClick={addSkill}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              >
                <PlusIcon className="h-5 w-5" />
              </button>
            </div>
            <div className="flex flex-wrap gap-2">
              {profile.skills.map((skill) => (
                <span
                  key={skill}
                  className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-blue-50 text-blue-700"
                >
                  {skill}
                  <button
                    type="button"
                    onClick={() => removeSkill(skill)}
                    className="ml-2 hover:text-blue-800"
                  >
                    <XMarkIcon className="h-4 w-4" />
                  </button>
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Preferences */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-6">Preferences</h2>
          
          {/* Work Mode */}
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Preferred Work Mode
            </label>
            <select
              value={profile.preferences.workMode}
              onChange={(e) => setProfile(prev => ({
                ...prev,
                preferences: { ...prev.preferences, workMode: e.target.value as StudentProfile['preferences']['workMode'] }
              }))}
              className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="">Select work mode</option>
              <option value="Remote">Remote</option>
              <option value="On-site">On-site</option>
              <option value="Hybrid">Hybrid</option>
            </select>
          </div>

          {/* Domains */}
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Preferred Domains
            </label>
            <div className="flex gap-2 mb-2">
              <input
                type="text"
                value={newDomain}
                onChange={(e) => setNewDomain(e.target.value)}
                placeholder="Add a domain"
                className="flex-1 px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addDomain())}
              />
              <button
                type="button"
                onClick={addDomain}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              >
                <PlusIcon className="h-5 w-5" />
              </button>
            </div>
            <div className="flex flex-wrap gap-2">
              {profile.preferences.domains.map((domain) => (
                <span
                  key={domain}
                  className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-purple-50 text-purple-700"
                >
                  {domain}
                  <button
                    type="button"
                    onClick={() => removeDomain(domain)}
                    className="ml-2 hover:text-purple-800"
                  >
                    <XMarkIcon className="h-4 w-4" />
                  </button>
                </span>
              ))}
            </div>
          </div>

          {/* Locations */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Preferred Locations
            </label>
            <div className="flex gap-2 mb-2">
              <input
                type="text"
                value={newLocation}
                onChange={(e) => setNewLocation(e.target.value)}
                placeholder="Add a location"
                className="flex-1 px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addLocation())}
              />
              <button
                type="button"
                onClick={addLocation}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              >
                <PlusIcon className="h-5 w-5" />
              </button>
            </div>
            <div className="flex flex-wrap gap-2">
              {profile.preferences.locations.map((location) => (
                <span
                  key={location}
                  className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-green-50 text-green-700"
                >
                  {location}
                  <button
                    type="button"
                    onClick={() => removeLocation(location)}
                    className="ml-2 hover:text-green-800"
                  >
                    <XMarkIcon className="h-4 w-4" />
                  </button>
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Bio */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-6">Bio</h2>
          <textarea
            value={profile.bio}
            onChange={(e) => setProfile(prev => ({ ...prev, bio: e.target.value }))}
            rows={4}
            className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder="Write a short bio about yourself..."
          />
        </div>

        {/* Resume Section */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-8">
          <h2 className="text-xl font-semibold text-gray-900 mb-6">Resume</h2>
          
          <div className="space-y-4">
            {/* Current Resume */}
            {profile.resume ? (
              <div className="flex items-center justify-between p-4 border border-gray-200 rounded-lg bg-gray-50">
                <div className="flex items-center gap-3">
                  <DocumentIcon className="h-8 w-8 text-blue-600" />
                  <div>
                    <p className="font-medium text-gray-900">{profile.resume.fileName}</p>
                    <p className="text-sm text-gray-500">
                      Uploaded on {new Date(profile.resume.uploadedAt).toLocaleDateString()}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <a
                    href={profile.resume.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 hover:text-blue-700 text-sm font-medium"
                  >
                    View Resume
                  </a>
                  <button
                    type="button"
                    onClick={() => fileInputRef.current?.click()}
                    className="text-gray-600 hover:text-gray-700 text-sm font-medium"
                  >
                    Replace
                  </button>
                </div>
              </div>
            ) : (
              <div
                onClick={() => fileInputRef.current?.click()}
                className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center cursor-pointer hover:border-gray-400 transition-colors"
              >
                <ArrowUpTrayIcon className="h-10 w-10 text-gray-400 mx-auto mb-3" />
                <p className="text-gray-600 mb-1">Click to upload your resume</p>
                <p className="text-sm text-gray-500">PDF format, max 5MB</p>
              </div>
            )}

            {/* Hidden File Input */}
            <input
              ref={fileInputRef}
              type="file"
              accept=".pdf"
              onChange={handleFileChange}
              className="hidden"
            />

            {/* File Requirements */}
            <div className="text-sm text-gray-500">
              <p>Requirements:</p>
              <ul className="list-disc list-inside ml-2">
                <li>PDF format only</li>
                <li>Maximum file size: 5MB</li>
                <li>Clear and professional formatting</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Save Button */}
        <div className="sticky bottom-0 bg-white border-t border-gray-200 py-4 px-6 -mx-6">
          <div className="max-w-4xl mx-auto flex justify-end">
            <button
              type="submit"
              disabled={isSaving}
              onClick={handleSubmit}
              className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:bg-blue-400 transition-colors duration-200"
            >
              {isSaving ? (
                <span className="flex items-center gap-2">
                  <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                  </svg>
                  Saving...
                </span>
              ) : (
                'Save Changes'
              )}
            </button>
          </div>
        </div>
      </form>
    </div>
  );
} 