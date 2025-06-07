'use client';

import { useState, FormEvent } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { EyeIcon, EyeSlashIcon } from '@heroicons/react/24/outline';

interface LoginData {
  email: string;
  password: string;
}

// Mock user data - In a real app, this would come from your backend
const mockUsers = [
  {
    email: 'student@example.com',
    password: 'password123',
    role: 'student'
  },
  {
    email: 'college@example.com',
    password: 'password123',
    role: 'college'
  },
  {
    email: 'company@example.com',
    password: 'password123',
    role: 'company'
  }
];

export default function Login() {
  const router = useRouter();
  const [formData, setFormData] = useState<LoginData>({
    email: '',
    password: ''
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [showPassword, setShowPassword] = useState(false);
  const [loginError, setLoginError] = useState('');

  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {};

    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Invalid email format';
    }

    if (!formData.password) {
      newErrors.password = 'Password is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setLoginError('');

    if (validateForm()) {
      // Mock authentication - In a real app, this would be an API call
      const user = mockUsers.find(
        u => u.email === formData.email && u.password === formData.password
      );

      if (user) {
        // In a real app, you would:
        // 1. Store the auth token
        // 2. Update the user context
        // 3. Handle any other necessary auth state

        // Redirect based on user role
        switch (user.role) {
          case 'student':
            router.push('/student');
            break;
          case 'college':
            router.push('/college');
            break;
          case 'company':
            router.push('/company');
            break;
          default:
            router.push('/');
        }
      } else {
        setLoginError('Invalid email or password');
      }
    }
  };

  const inputClasses = `
    mt-2 block w-full rounded-lg border-2 px-4 py-3 text-lg text-gray-900 placeholder-gray-500
    focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500
    transition-colors duration-200
  `;

  const labelClasses = "text-lg font-semibold text-gray-800";

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-indigo-50 to-blue-50">
      <main className="flex-grow flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-lg w-full">
          {/* Header */}
          <div className="text-center mb-10">
            <h1 className="text-4xl font-extrabold text-gray-900 mb-4">
              Welcome Back
            </h1>
            <p className="text-xl text-gray-600">
              Sign in to your account
            </p>
          </div>

          {/* Form */}
          <div className="bg-white rounded-xl shadow-xl p-8 sm:p-10">
            <form onSubmit={handleSubmit} className="space-y-8" noValidate>
              {loginError && (
                <div className="rounded-lg bg-red-50 p-4">
                  <div className="flex">
                    <div className="flex-shrink-0">
                      <svg className="h-5 w-5 text-red-400" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.28 7.22a.75.75 0 00-1.06 1.06L8.94 10l-1.72 1.72a.75.75 0 101.06 1.06L10 11.06l1.72 1.72a.75.75 0 101.06-1.06L11.06 10l1.72-1.72a.75.75 0 00-1.06-1.06L10 8.94 8.28 7.22z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <div className="ml-3">
                      <h3 className="text-sm font-medium text-red-800">
                        {loginError}
                      </h3>
                    </div>
                  </div>
                </div>
              )}

              {/* Email */}
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

              {/* Password */}
              <div>
                <label htmlFor="password" className={labelClasses}>
                  Password
                </label>
                <div className="relative">
                  <input
                    type={showPassword ? 'text' : 'password'}
                    id="password"
                    placeholder="Enter your password"
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

              {/* Forgot Password Link */}
              <div className="flex items-center justify-end">
                <Link
                  href="/forgot-password"
                  className="text-base font-medium text-indigo-600 hover:text-indigo-500"
                >
                  Forgot your password?
                </Link>
              </div>

              {/* Submit Button */}
              <div>
                <button
                  type="submit"
                  className="w-full flex justify-center py-4 px-6 border border-transparent rounded-lg
                    text-base font-medium text-white bg-indigo-600 hover:bg-indigo-700 
                    focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 
                    transition-colors duration-200 shadow-lg hover:shadow-xl"
                >
                  Sign In
                </button>
              </div>
            </form>
          </div>

          {/* Register Link */}
          <div className="mt-8 text-center">
            <p className="text-base text-gray-600">
              Don't have an account?{' '}
              <Link
                href="/register"
                className="font-medium text-indigo-600 hover:text-indigo-500 transition-colors"
              >
                Create one now
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