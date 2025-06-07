'use client';

import { useState, useEffect, FormEvent } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import { EyeIcon, EyeSlashIcon } from '@heroicons/react/24/outline';

type UserRole = 'student' | 'college' | 'company';

interface FormData {
  role: UserRole;
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
  // Student specific fields
  resume?: File;
  skills?: string;
  // College specific fields
  collegeId?: string;
  department?: string;
  // Company specific fields
  companySize?: string;
  industry?: string;
}

const getRoleSpecificTitle = (role: UserRole) => {
  switch (role) {
    case 'student':
      return {
        title: 'Student Registration',
        subtitle: 'Start your journey towards great opportunities'
      };
    case 'college':
      return {
        title: 'College Registration',
        subtitle: 'Connect your students with opportunities'
      };
    case 'company':
      return {
        title: 'Company Registration',
        subtitle: 'Find talented interns for your organization'
      };
    default:
      return {
        title: 'Create Your Account',
        subtitle: 'Join our community and start your journey'
      };
  }
};

export default function Register() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const role = searchParams.get('role') as UserRole;

  // Redirect to landing page if no role is specified
  useEffect(() => {
    if (!role || !['student', 'college', 'company'].includes(role)) {
      router.push('/');
    }
  }, [role, router]);

  const [formData, setFormData] = useState<FormData>({
    role: role || 'student',
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {};

    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Invalid email format';
    }

    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else if (formData.password.length < 8) {
      newErrors.password = 'Password must be at least 8 characters';
    }

    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }

    // Role-specific validation
    if (role === 'student') {
      if (!formData.skills?.trim()) {
        newErrors.skills = 'Please enter at least one skill';
      }
    } else if (role === 'college') {
      if (!formData.collegeId?.trim()) {
        newErrors.collegeId = 'College ID is required';
      }
      if (!formData.department?.trim()) {
        newErrors.department = 'Department is required';
      }
    } else if (role === 'company') {
      if (!formData.companySize?.trim()) {
        newErrors.companySize = 'Company size is required';
      }
      if (!formData.industry?.trim()) {
        newErrors.industry = 'Industry type is required';
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (validateForm()) {
      // Handle registration submission
      console.log('Form submitted:', formData);
    }
  };

  const inputClasses = `
    mt-2 block w-full rounded-lg border-2 px-4 py-3 text-lg text-gray-900 placeholder-gray-500
    focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500
    transition-colors duration-200
  `;

  const labelClasses = "text-lg font-semibold text-gray-800";

  const { title, subtitle } = getRoleSpecificTitle(role);

  if (!role || !['student', 'college', 'company'].includes(role)) {
    return null; // Return null while redirecting
  }

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-indigo-50 to-blue-50">
      <main className="flex-grow flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl w-full">
          {/* Header */}
          <div className="text-center mb-10">
            <h1 className="text-4xl font-extrabold text-gray-900 mb-4">
              {title}
            </h1>
            <p className="text-xl text-gray-600">
              {subtitle}
            </p>
          </div>

          {/* Registration Form */}
          <div className="bg-white rounded-xl shadow-xl overflow-hidden">
            <div className="p-8 sm:p-10">
              <form onSubmit={handleSubmit} className="space-y-8" noValidate>
                {/* Common Fields */}
                <div>
                  <label htmlFor="name" className={labelClasses}>
                    {role === 'student' ? 'Full Name' :
                     role === 'college' ? 'College Name' :
                     'Company Name'}
                  </label>
                  <input
                    type="text"
                    id="name"
                    placeholder={`Enter ${
                      role === 'student' ? 'your full name' :
                      role === 'college' ? 'college name' :
                      'company name'
                    }`}
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className={`${inputClasses}
                      ${errors.name ? 'border-red-300 bg-red-50' : 'border-gray-300'}`}
                  />
                  {errors.name && (
                    <p className="mt-2 text-sm text-red-600">{errors.name}</p>
                  )}
                </div>

                <div>
                  <label htmlFor="email" className={labelClasses}>
                    Email Address
                  </label>
                  <input
                    type="email"
                    id="email"
                    placeholder="your.email@example.com"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className={`${inputClasses}
                      ${errors.email ? 'border-red-300 bg-red-50' : 'border-gray-300'}`}
                  />
                  {errors.email && (
                    <p className="mt-2 text-sm text-red-600">{errors.email}</p>
                  )}
                </div>

                <div>
                  <label htmlFor="password" className={labelClasses}>
                    Password
                  </label>
                  <div className="relative">
                    <input
                      type={showPassword ? 'text' : 'password'}
                      id="password"
                      placeholder="Create a strong password"
                      value={formData.password}
                      onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                      className={`${inputClasses} pr-12
                        ${errors.password ? 'border-red-300 bg-red-50' : 'border-gray-300'}`}
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-4 top-1/2 -translate-y-1/2"
                    >
                      {showPassword ? (
                        <EyeSlashIcon className="h-6 w-6 text-gray-400 hover:text-gray-600" />
                      ) : (
                        <EyeIcon className="h-6 w-6 text-gray-400 hover:text-gray-600" />
                      )}
                    </button>
                  </div>
                  {errors.password && (
                    <p className="mt-2 text-sm text-red-600">{errors.password}</p>
                  )}
                </div>

                <div>
                  <label htmlFor="confirmPassword" className={labelClasses}>
                    Confirm Password
                  </label>
                  <div className="relative">
                    <input
                      type={showConfirmPassword ? 'text' : 'password'}
                      id="confirmPassword"
                      placeholder="Confirm your password"
                      value={formData.confirmPassword}
                      onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
                      className={`${inputClasses} pr-12
                        ${errors.confirmPassword ? 'border-red-300 bg-red-50' : 'border-gray-300'}`}
                    />
                    <button
                      type="button"
                      onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                      className="absolute right-4 top-1/2 -translate-y-1/2"
                    >
                      {showConfirmPassword ? (
                        <EyeSlashIcon className="h-6 w-6 text-gray-400 hover:text-gray-600" />
                      ) : (
                        <EyeIcon className="h-6 w-6 text-gray-400 hover:text-gray-600" />
                      )}
                    </button>
                  </div>
                  {errors.confirmPassword && (
                    <p className="mt-2 text-sm text-red-600">{errors.confirmPassword}</p>
                  )}
                </div>

                {/* Role-specific Fields */}
                {role === 'student' && (
                  <>
                    <div>
                      <label htmlFor="skills" className={labelClasses}>
                        Skills
                      </label>
                      <input
                        type="text"
                        id="skills"
                        placeholder="Enter your skills (comma separated)"
                        value={formData.skills || ''}
                        onChange={(e) => setFormData({ ...formData, skills: e.target.value })}
                        className={`${inputClasses}
                          ${errors.skills ? 'border-red-300 bg-red-50' : 'border-gray-300'}`}
                      />
                      {errors.skills && (
                        <p className="mt-2 text-sm text-red-600">{errors.skills}</p>
                      )}
                    </div>
                    <div>
                      <label htmlFor="resume" className={labelClasses}>
                        Resume (Optional)
                      </label>
                      <input
                        type="file"
                        id="resume"
                        accept=".pdf,.doc,.docx"
                        onChange={(e) => {
                          const file = e.target.files?.[0];
                          if (file) {
                            setFormData({ ...formData, resume: file });
                          }
                        }}
                        className={`${inputClasses} file:mr-4 file:py-2 file:px-4
                          file:rounded-md file:border-0 file:text-sm file:font-medium
                          file:bg-indigo-50 file:text-indigo-700 hover:file:bg-indigo-100`}
                      />
                    </div>
                  </>
                )}

                {role === 'college' && (
                  <>
                    <div>
                      <label htmlFor="collegeId" className={labelClasses}>
                        College ID
                      </label>
                      <input
                        type="text"
                        id="collegeId"
                        placeholder="Enter your college ID"
                        value={formData.collegeId || ''}
                        onChange={(e) => setFormData({ ...formData, collegeId: e.target.value })}
                        className={`${inputClasses}
                          ${errors.collegeId ? 'border-red-300 bg-red-50' : 'border-gray-300'}`}
                      />
                      {errors.collegeId && (
                        <p className="mt-2 text-sm text-red-600">{errors.collegeId}</p>
                      )}
                    </div>
                    <div>
                      <label htmlFor="department" className={labelClasses}>
                        Department
                      </label>
                      <input
                        type="text"
                        id="department"
                        placeholder="Enter your department"
                        value={formData.department || ''}
                        onChange={(e) => setFormData({ ...formData, department: e.target.value })}
                        className={`${inputClasses}
                          ${errors.department ? 'border-red-300 bg-red-50' : 'border-gray-300'}`}
                      />
                      {errors.department && (
                        <p className="mt-2 text-sm text-red-600">{errors.department}</p>
                      )}
                    </div>
                  </>
                )}

                {role === 'company' && (
                  <>
                    <div>
                      <label htmlFor="companySize" className={labelClasses}>
                        Company Size
                      </label>
                      <select
                        id="companySize"
                        value={formData.companySize || ''}
                        onChange={(e) => setFormData({ ...formData, companySize: e.target.value })}
                        className={`${inputClasses}
                          ${errors.companySize ? 'border-red-300 bg-red-50' : 'border-gray-300'}`}
                      >
                        <option value="">Select company size</option>
                        <option value="1-10">1-10 employees</option>
                        <option value="11-50">11-50 employees</option>
                        <option value="51-200">51-200 employees</option>
                        <option value="201-500">201-500 employees</option>
                        <option value="501+">501+ employees</option>
                      </select>
                      {errors.companySize && (
                        <p className="mt-2 text-sm text-red-600">{errors.companySize}</p>
                      )}
                    </div>
                    <div>
                      <label htmlFor="industry" className={labelClasses}>
                        Industry Type
                      </label>
                      <select
                        id="industry"
                        value={formData.industry || ''}
                        onChange={(e) => setFormData({ ...formData, industry: e.target.value })}
                        className={`${inputClasses}
                          ${errors.industry ? 'border-red-300 bg-red-50' : 'border-gray-300'}`}
                      >
                        <option value="">Select industry type</option>
                        <option value="technology">Technology</option>
                        <option value="finance">Finance</option>
                        <option value="healthcare">Healthcare</option>
                        <option value="education">Education</option>
                        <option value="manufacturing">Manufacturing</option>
                        <option value="retail">Retail</option>
                        <option value="other">Other</option>
                      </select>
                      {errors.industry && (
                        <p className="mt-2 text-sm text-red-600">{errors.industry}</p>
                      )}
                    </div>
                  </>
                )}

                {/* Submit Button */}
                <div>
                  <button
                    type="submit"
                    className="w-full flex justify-center py-4 px-6 border border-transparent rounded-lg
                      text-base font-medium text-white bg-indigo-600 hover:bg-indigo-700 
                      focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 
                      transition-colors duration-200 shadow-lg hover:shadow-xl"
                  >
                    Create Account
                  </button>
                </div>
              </form>
            </div>
          </div>

          {/* Login Link */}
          <div className="mt-8 text-center">
            <p className="text-base text-gray-600">
              Already have an account?{' '}
              <Link
                href="/login"
                className="font-medium text-indigo-600 hover:text-indigo-500 transition-colors"
              >
                Sign in here
              </Link>
            </p>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="py-6 bg-white border-t border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col items-center justify-between sm:flex-row">
            <p className="text-base text-gray-500">
              © {new Date().getFullYear()} Free Internship Portal. All rights reserved.
            </p>
            <div className="mt-4 sm:mt-0">
              <Link
                href="/privacy"
                className="text-base text-gray-500 hover:text-gray-600 mr-6"
              >
                Privacy Policy
              </Link>
              <Link
                href="/terms"
                className="text-base text-gray-500 hover:text-gray-600"
              >
                Terms of Service
              </Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
} 