'use client';

import { useState, useEffect } from 'react';
import { EyeIcon, EyeSlashIcon } from '@heroicons/react/24/outline';
import Link from 'next/link';
import { useSearchParams, useRouter } from 'next/navigation';

type UserRole = 'student' | 'college' | 'company';

interface FormData {
  // Common fields
  email: string;
  password: string;
  confirmPassword: string;
  
  // Student fields
  fullName?: string;
  instituteName?: string;
  resume?: File | null;
  
  // College fields
  collegeName?: string;
  website?: string;
  collegeCode?: string;
  
  // Company fields
  companyName?: string;
  industryType?: string;
  companyWebsite?: string;
  description?: string;
}

export default function Register() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const roleParam = searchParams.get('role') as UserRole | null;
  const [selectedRole, setSelectedRole] = useState<UserRole>(roleParam || 'student');
  const [showRoleSelector, setShowRoleSelector] = useState(!roleParam);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [formData, setFormData] = useState<FormData>({
    // Common fields
    email: '',
    password: '',
    confirmPassword: '',
    
    // Student fields
    fullName: '',
    instituteName: '',
    resume: null,
    
    // College fields
    collegeName: '',
    website: '',
    collegeCode: '',
    
    // Company fields
    companyName: '',
    industryType: '',
    companyWebsite: '',
    description: '',
  });

  const [errors, setErrors] = useState<{[key: string]: string}>({});

  // Update URL when role changes
  useEffect(() => {
    router.push(`/register?role=${selectedRole}`);
  }, [selectedRole, router]);

  const validateForm = () => {
    let isValid = true;
    const newErrors: {[key: string]: string} = {};

    // Common validations
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
      isValid = false;
    } else if (!emailRegex.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
      isValid = false;
    }

    if (!formData.password) {
      newErrors.password = 'Password is required';
      isValid = false;
    } else if (formData.password.length < 8) {
      newErrors.password = 'Password must be at least 8 characters long';
      isValid = false;
    }

    if (!formData.confirmPassword) {
      newErrors.confirmPassword = 'Please confirm your password';
      isValid = false;
    } else if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
      isValid = false;
    }

    // Role-specific validations
    if (selectedRole === 'student') {
      if (!formData.fullName?.trim()) {
        newErrors.fullName = 'Full name is required';
        isValid = false;
      }
      if (!formData.instituteName?.trim()) {
        newErrors.instituteName = 'Institute name is required';
        isValid = false;
      }
    }

    if (selectedRole === 'college') {
      if (!formData.collegeName?.trim()) {
        newErrors.collegeName = 'College name is required';
        isValid = false;
      }
      if (!formData.website?.trim()) {
        newErrors.website = 'Website is required';
        isValid = false;
      }
      if (!formData.collegeCode?.trim()) {
        newErrors.collegeCode = 'College code is required';
        isValid = false;
      }
    }

    if (selectedRole === 'company') {
      if (!formData.companyName?.trim()) {
        newErrors.companyName = 'Company name is required';
        isValid = false;
      }
      if (!formData.industryType?.trim()) {
        newErrors.industryType = 'Industry type is required';
        isValid = false;
      }
      if (!formData.companyWebsite?.trim()) {
        newErrors.companyWebsite = 'Website is required';
        isValid = false;
      }
      if (!formData.description?.trim()) {
        newErrors.description = 'Description is required';
        isValid = false;
      }
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateForm()) {
      // Handle form submission
      console.log('Form submitted:', formData);
    }
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value, type } = e.target;
    if (type === 'file') {
      const files = (e.target as HTMLInputElement).files;
      setFormData(prev => ({
        ...prev,
        [name]: files?.[0] || null
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        [name]: value
      }));
    }
  };

  // Common input field component
  const InputField = ({
    label,
    name,
    type = 'text',
    placeholder = '',
    isTextArea = false
  }: {
    label: string;
    name: string;
    type?: string;
    placeholder?: string;
    isTextArea?: boolean;
  }) => {
    const isPassword = type === 'password';
    const showPasswordToggle = isPassword && name === 'password' ? showPassword : showConfirmPassword;
    const togglePassword = isPassword && name === 'password' 
      ? () => setShowPassword(!showPassword)
      : () => setShowConfirmPassword(!showConfirmPassword);

    const baseInputStyles = `mt-1 block w-full rounded-lg border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 text-base
      ${errors[name] ? 'border-red-500' : ''}
      transition-all duration-200
      hover:border-blue-400
      h-14 px-4`; // Increased height and padding

    const textAreaStyles = `mt-1 block w-full rounded-lg border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 text-base
      ${errors[name] ? 'border-red-500' : ''}
      transition-all duration-200
      hover:border-blue-400
      min-h-[120px] p-4`; // Increased height for textarea

    return (
      <div>
        <label htmlFor={name} className="block text-base font-medium text-gray-700 mb-2">
          {label}
        </label>
        <div className="relative">
          {isTextArea ? (
            <textarea
              id={name}
              name={name}
              value={formData[name as keyof FormData] as string || ''}
              onChange={handleInputChange}
              rows={4}
              className={textAreaStyles}
              placeholder={placeholder}
            />
          ) : (
            <>
              <input
                type={isPassword ? (showPasswordToggle ? 'text' : 'password') : type}
                id={name}
                name={name}
                value={formData[name as keyof FormData] as string || ''}
                onChange={handleInputChange}
                className={baseInputStyles}
                placeholder={placeholder}
              />
              {isPassword && (
                <button
                  type="button"
                  onClick={togglePassword}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                >
                  {showPasswordToggle ? (
                    <EyeSlashIcon className="h-6 w-6" aria-hidden="true" />
                  ) : (
                    <EyeIcon className="h-6 w-6" aria-hidden="true" />
                  )}
                </button>
              )}
            </>
          )}
        </div>
        {errors[name] && (
          <p className="mt-2 text-sm text-red-600">{errors[name]}</p>
        )}
      </div>
    );
  };

  // Get role-specific form title
  const getRoleTitle = () => {
    switch (selectedRole) {
      case 'student':
        return 'Student Registration';
      case 'college':
        return 'College Registration';
      case 'company':
        return 'Company Registration';
      default:
        return 'Create Your Account';
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        {/* Back to Home Link */}
        <div className="mb-8 flex justify-between items-center">
          <Link
            href="/"
            className="text-blue-600 hover:text-blue-500 flex items-center gap-2 text-lg"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M10 19l-7-7m0 0l7-7m-7 7h18"
              />
            </svg>
            Back to Home
          </Link>
          {!showRoleSelector && (
            <button
              onClick={() => setShowRoleSelector(true)}
              className="text-blue-600 hover:text-blue-500 text-lg font-medium"
            >
              Switch Role
            </button>
          )}
        </div>

        {/* Main Form Card */}
        <div className="bg-white rounded-xl shadow-lg p-8 sm:p-12">
          <h1 className="text-4xl font-bold text-center text-gray-900 mb-8">
            {getRoleTitle()}
          </h1>

          {/* Role Selection Tabs - Only show if coming from direct registration */}
          {showRoleSelector && (
            <div className="flex rounded-lg bg-gray-100 p-1.5 mb-8">
              {(['student', 'college', 'company'] as const).map((role) => (
                <button
                  key={role}
                  onClick={() => setSelectedRole(role)}
                  className={`flex-1 py-4 px-8 rounded-md text-base font-medium capitalize transition-all duration-200
                    ${selectedRole === role
                      ? 'bg-white text-blue-600 shadow-sm'
                      : 'text-gray-500 hover:text-gray-700'
                    }`}
                >
                  {role}
                </button>
              ))}
            </div>
          )}

          {/* Forms */}
          <form onSubmit={handleSubmit} className="space-y-8">
            {/* Student Form */}
            {selectedRole === 'student' && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="md:col-span-2">
                  <InputField label="Full Name" name="fullName" placeholder="John Doe" />
                </div>
                <div className="md:col-span-2">
                  <InputField label="Email" name="email" type="email" placeholder="you@example.com" />
                </div>
                <InputField label="Password" name="password" type="password" />
                <InputField label="Confirm Password" name="confirmPassword" type="password" />
                <div className="md:col-span-2">
                  <InputField label="Institute Name" name="instituteName" placeholder="Your University/College" />
                </div>
                
                {/* Resume Upload - Full Width */}
                <div className="md:col-span-2">
                  <label htmlFor="resume" className="block text-base font-medium text-gray-700 mb-2">
                    Upload Resume
                  </label>
                  <div className="mt-1 flex justify-center px-6 pt-8 pb-8 border-2 border-gray-300 border-dashed rounded-lg hover:border-blue-400 transition-colors">
                    <div className="space-y-2 text-center">
                      <svg
                        className="mx-auto h-14 w-14 text-gray-400" // Increased icon size
                        stroke="currentColor"
                        fill="none"
                        viewBox="0 0 48 48"
                        aria-hidden="true"
                      >
                        <path
                          d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
                          strokeWidth={2}
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                      <div className="flex text-base text-gray-600"> {/* Increased text size */}
                        <label
                          htmlFor="resume"
                          className="relative cursor-pointer rounded-md font-medium text-blue-600 hover:text-blue-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-blue-500"
                        >
                          <span>Upload a file</span>
                          <input
                            id="resume"
                            name="resume"
                            type="file"
                            className="sr-only"
                            accept=".pdf,.doc,.docx"
                            onChange={handleInputChange}
                          />
                        </label>
                        <p className="pl-1">or drag and drop</p>
                      </div>
                      <p className="text-sm text-gray-500">PDF, DOC up to 10MB</p>
                    </div>
                  </div>
                  {formData.resume && (
                    <p className="mt-2 text-base text-gray-600">
                      Selected file: {(formData.resume as File).name}
                    </p>
                  )}
                </div>
              </div>
            )}

            {/* College Form */}
            {selectedRole === 'college' && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="md:col-span-2">
                  <InputField label="College Name" name="collegeName" placeholder="University Name" />
                </div>
                <div className="md:col-span-2">
                  <InputField label="Email" name="email" type="email" placeholder="college@example.com" />
                </div>
                <InputField label="Password" name="password" type="password" />
                <InputField label="Confirm Password" name="confirmPassword" type="password" />
                <div className="md:col-span-2">
                  <InputField label="Official Website" name="website" type="url" placeholder="https://www.college.edu" />
                </div>
                <div className="md:col-span-2">
                  <InputField label="College Code / Approval ID" name="collegeCode" placeholder="e.g., UGC123456" />
                </div>
              </div>
            )}

            {/* Company Form */}
            {selectedRole === 'company' && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="md:col-span-2">
                  <InputField label="Company Name" name="companyName" placeholder="Company Name" />
                </div>
                <div className="md:col-span-2">
                  <InputField label="Email" name="email" type="email" placeholder="company@example.com" />
                </div>
                <InputField label="Password" name="password" type="password" />
                <InputField label="Confirm Password" name="confirmPassword" type="password" />
                <div className="md:col-span-2">
                  <InputField label="Industry Type" name="industryType" placeholder="e.g., Technology, Finance" />
                </div>
                <div className="md:col-span-2">
                  <InputField label="Company Website" name="companyWebsite" type="url" placeholder="https://www.company.com" />
                </div>
                <div className="md:col-span-2">
                  <InputField 
                    label="Company Description" 
                    name="description" 
                    isTextArea={true}
                    placeholder="Brief description of your company and what you do..."
                  />
                </div>
              </div>
            )}

            {/* Submit Button */}
            <div className="md:col-span-2">
              <button
                type="submit"
                className="w-full flex justify-center py-4 px-6 border border-transparent rounded-md shadow-sm text-lg font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors"
              >
                Create Account
              </button>
            </div>
          </form>

          {/* Footer */}
          <div className="mt-10 pt-8 border-t border-gray-200">
            <p className="text-center text-base text-gray-600">
              Already have an account?{' '}
              <Link href="/login" className="font-medium text-blue-600 hover:text-blue-500">
                Login
              </Link>
            </p>
            <p className="mt-4 text-center text-sm text-gray-500">
              &copy; {new Date().getFullYear()} Intern Portal. All rights reserved.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
} 