'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import {
  BuildingOfficeIcon,
  MapPinIcon,
  CurrencyRupeeIcon,
  ClockIcon,
  CalendarIcon,
  UserGroupIcon,
  DocumentTextIcon,
  AcademicCapIcon,
  BriefcaseIcon,
  ArrowLeftIcon,
  ShareIcon,
  BookmarkIcon,
  ExclamationTriangleIcon
} from '@heroicons/react/24/outline';
import { CheckBadgeIcon } from '@heroicons/react/24/solid';
import { useAuth } from '@/hooks/useAuth';
import StatusModal from '@/components/ui/StatusModal';

// Mock data - Replace with API call
const mockInternship = {
  id: 1,
  title: "Frontend Developer Intern",
  company: "TechCorp Solutions",
  companyDescription: "TechCorp Solutions is a leading software development company specializing in creating innovative web applications and digital solutions for businesses worldwide.",
  domain: "Web Development",
  locationType: "Remote",
  stipend: 15000,
  duration: "3 months",
  startDate: "2024-04-01",
  positions: 3,
  verifiedBy: "ABC College",
  verificationDate: "2024-02-20",
  logo: null,
  description: `We are looking for a passionate Frontend Developer Intern to join our dynamic team. This is an excellent opportunity to gain hands-on experience in modern web development technologies and best practices.

Key Responsibilities:
• Develop and maintain responsive web applications
• Collaborate with the design team to implement user interfaces
• Write clean, efficient, and reusable code
• Participate in code reviews and team meetings
• Assist in troubleshooting and debugging

Learning Opportunities:
• Work with modern JavaScript frameworks
• Learn best practices in web development
• Gain experience with version control systems
• Understanding of CI/CD pipelines
• Exposure to agile development methodologies`,
  skills: [
    { name: "React", level: "Required" },
    { name: "TypeScript", level: "Required" },
    { name: "Tailwind CSS", level: "Preferred" },
    { name: "Git", level: "Required" },
    { name: "JavaScript", level: "Required" },
    { name: "HTML/CSS", level: "Required" }
  ],
  perks: [
    "Flexible working hours",
    "Certificate of completion",
    "Letter of recommendation",
    "Performance-based PPO",
    "Mentorship program"
  ],
  applicationDeadline: "2024-03-15",
  applicationProcess: [
    "Resume screening",
    "Technical assessment",
    "Interview with team lead",
    "HR discussion"
  ]
};

export default function InternshipDetails({ params }: { params: { id: string } }) {
  const router = useRouter();
  const { isAuthenticated, userRole, isLoading } = useAuth();
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [showStatusModal, setShowStatusModal] = useState(false);
  const [modalConfig, setModalConfig] = useState<{
    status: 'success' | 'error';
    title: string;
    message: string;
    actionButton?: {
      label: string;
      onClick: () => void;
    };
  }>({
    status: 'success',
    title: '',
    message: ''
  });

  // Format date to readable string
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  // Handle application submission
  const handleApply = async () => {
    if (!isAuthenticated) {
      setModalConfig({
        status: 'error',
        title: 'Authentication Required',
        message: 'Please log in as a student to apply for this internship.',
        actionButton: {
          label: 'Log In',
          onClick: () => router.push('/login')
        }
      });
      setShowStatusModal(true);
      return;
    }

    if (userRole !== 'student') {
      setModalConfig({
        status: 'error',
        title: 'Student Account Required',
        message: 'Only students can apply for internships. Please log in with a student account.',
        actionButton: {
          label: 'Switch Account',
          onClick: () => router.push('/login')
        }
      });
      setShowStatusModal(true);
      return;
    }

    try {
      // Mock API call - Replace with actual API integration
      await new Promise(resolve => setTimeout(resolve, 1000));

      // Simulate successful application
      setModalConfig({
        status: 'success',
        title: 'Application Submitted',
        message: 'Your application has been successfully submitted. You can track its status in your dashboard.',
        actionButton: {
          label: 'View Applications',
          onClick: () => router.push('/dashboard/student/applications')
        }
      });
      setShowStatusModal(true);
    } catch (error) {
      setModalConfig({
        status: 'error',
        title: 'Application Failed',
        message: 'There was an error submitting your application. Please try again.',
      });
      setShowStatusModal(true);
    }
  };

  // Handle share functionality
  const handleShare = async () => {
    try {
      await navigator.share({
        title: mockInternship.title,
        text: `Check out this internship opportunity at ${mockInternship.company}`,
        url: window.location.href
      });
    } catch (error) {
      // Fallback for browsers that don't support native sharing
      navigator.clipboard.writeText(window.location.href);
      setModalConfig({
        status: 'success',
        title: 'Link Copied',
        message: 'The internship link has been copied to your clipboard.',
      });
      setShowStatusModal(true);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Back Button */}
        <button
          onClick={() => router.back()}
          className="flex items-center text-gray-600 hover:text-gray-900 mb-6"
        >
          <ArrowLeftIcon className="h-5 w-5 mr-2" />
          Back to Internships
        </button>

        {/* Header Section */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-6">
          <div className="flex items-start justify-between">
            <div className="flex-1">
              <h1 className="text-3xl font-bold text-gray-900 mb-2">
                {mockInternship.title}
              </h1>
              <div className="flex items-center mb-4">
                <BuildingOfficeIcon className="h-5 w-5 text-gray-400 mr-2" />
                <span className="text-lg text-gray-700">{mockInternship.company}</span>
                <CheckBadgeIcon className="h-5 w-5 text-green-600 ml-2" />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                <div className="flex items-center text-gray-600">
                  <MapPinIcon className="h-5 w-5 text-gray-400 mr-2" />
                  <span>{mockInternship.locationType}</span>
                </div>
                <div className="flex items-center text-gray-600">
                  <CurrencyRupeeIcon className="h-5 w-5 text-gray-400 mr-2" />
                  <span>₹{mockInternship.stipend.toLocaleString()}/month</span>
                </div>
                <div className="flex items-center text-gray-600">
                  <ClockIcon className="h-5 w-5 text-gray-400 mr-2" />
                  <span>{mockInternship.duration}</span>
                </div>
                <div className="flex items-center text-gray-600">
                  <CalendarIcon className="h-5 w-5 text-gray-400 mr-2" />
                  <span>Starts {formatDate(mockInternship.startDate)}</span>
                </div>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <button
                onClick={() => setIsBookmarked(!isBookmarked)}
                className={`p-2 rounded-lg ${
                  isBookmarked ? 'text-blue-600 bg-blue-50' : 'text-gray-400 hover:text-gray-600'
                }`}
                aria-label={isBookmarked ? 'Remove from bookmarks' : 'Add to bookmarks'}
              >
                <BookmarkIcon className="h-6 w-6" />
              </button>
              <button
                onClick={handleShare}
                className="p-2 rounded-lg text-gray-400 hover:text-gray-600"
                aria-label="Share internship"
              >
                <ShareIcon className="h-6 w-6" />
              </button>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* About Company */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">About Company</h2>
              <p className="text-gray-600">{mockInternship.companyDescription}</p>
            </div>

            {/* Job Description */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">Internship Description</h2>
              <div className="prose prose-blue max-w-none">
                {mockInternship.description.split('\n\n').map((paragraph, index) => (
                  <div key={index} className="mb-4">
                    {paragraph.startsWith('•') ? (
                      <ul className="list-disc pl-4">
                        {paragraph.split('\n').map((item, i) => (
                          <li key={i} className="text-gray-600">
                            {item.replace('•', '').trim()}
                          </li>
                        ))}
                      </ul>
                    ) : (
                      <p className="text-gray-600">{paragraph}</p>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Skills Required */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">Skills Required</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {mockInternship.skills.map((skill, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
                  >
                    <span className="text-gray-700">{skill.name}</span>
                    <span className={`text-sm px-2 py-1 rounded ${
                      skill.level === 'Required'
                        ? 'bg-blue-100 text-blue-700'
                        : 'bg-gray-100 text-gray-600'
                    }`}>
                      {skill.level}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Perks & Benefits */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">Perks & Benefits</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {mockInternship.perks.map((perk, index) => (
                  <div key={index} className="flex items-center text-gray-600">
                    <CheckBadgeIcon className="h-5 w-5 text-green-600 mr-2" />
                    <span>{perk}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Application Details */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 sticky top-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">Application Details</h2>
              <div className="space-y-4">
                <div className="flex items-center text-gray-600">
                  <UserGroupIcon className="h-5 w-5 text-gray-400 mr-2" />
                  <span>{mockInternship.positions} positions available</span>
                </div>
                <div className="flex items-center text-gray-600">
                  <CalendarIcon className="h-5 w-5 text-gray-400 mr-2" />
                  <span>Apply by {formatDate(mockInternship.applicationDeadline)}</span>
                </div>

                {/* Application Warning */}
                {!isAuthenticated && (
                  <div className="flex items-start space-x-2 text-yellow-700 bg-yellow-50 p-3 rounded-lg">
                    <ExclamationTriangleIcon className="h-5 w-5 flex-shrink-0" />
                    <p className="text-sm">
                      Please log in as a student to apply for this internship.
                    </p>
                  </div>
                )}

                {/* Apply Button */}
                <button
                  onClick={handleApply}
                  className={`w-full py-3 px-4 rounded-lg transition-colors ${
                    isAuthenticated && userRole === 'student'
                      ? 'bg-blue-600 text-white hover:bg-blue-700'
                      : 'bg-gray-100 text-gray-400 cursor-not-allowed'
                  }`}
                  disabled={!isAuthenticated || userRole !== 'student'}
                >
                  Apply Now
                </button>
              </div>
            </div>

            {/* Verification Details */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">Verification Details</h2>
              <div className="space-y-4">
                <div className="flex items-center text-gray-600">
                  <AcademicCapIcon className="h-5 w-5 text-gray-400 mr-2" />
                  <span>Verified by {mockInternship.verifiedBy}</span>
                </div>
                <div className="flex items-center text-gray-600">
                  <CalendarIcon className="h-5 w-5 text-gray-400 mr-2" />
                  <span>Verified on {formatDate(mockInternship.verificationDate)}</span>
                </div>
              </div>
            </div>

            {/* Application Process */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">Application Process</h2>
              <div className="space-y-3">
                {mockInternship.applicationProcess.map((step, index) => (
                  <div key={index} className="flex items-start">
                    <div className="flex-shrink-0 h-6 w-6 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center text-sm font-medium">
                      {index + 1}
                    </div>
                    <span className="ml-3 text-gray-600">{step}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Status Modal */}
      <StatusModal
        isOpen={showStatusModal}
        onClose={() => setShowStatusModal(false)}
        {...modalConfig}
      />
    </div>
  );
} 