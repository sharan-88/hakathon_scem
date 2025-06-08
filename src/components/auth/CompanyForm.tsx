'use client';

import { useState, FormEvent } from 'react';
import { EyeIcon, EyeSlashIcon } from '@heroicons/react/24/outline';

interface FormData {
  companyName: string;
  email: string;
  password: string;
  confirmPassword: string;
  industryType: string;
  website: string;
  description: string;
}

interface FormErrors {
  [key: string]: string;
}

const industryTypes = [
  'Technology',
  'Finance',
  'Healthcare',
  'Education',
  'Manufacturing',
  'Retail',
  'Services',
  'Other'
];

const CompanyForm = () => {
  const [formData, setFormData] = useState<FormData>({
    companyName: '',
    email: '',
    password: '',
    confirmPassword: '',
    industryType: '',
    website: '',
    description: ''
  });

  const [errors, setErrors] = useState<FormErrors>({});
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};

    if (!formData.companyName.trim()) {
      newErrors.companyName = 'Company name is required';
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

    if (!formData.confirmPassword) {
      newErrors.confirmPassword = 'Please confirm your password';
    } else if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }

    if (!formData.industryType) {
      newErrors.industryType = 'Please select an industry type';
    }

    if (!formData.website.trim()) {
      newErrors.website = 'Website is required';
    } else if (!/^(https?:\/\/)?([\da-z.-]+)\.([a-z.]{2,6})[/\w .-]*\/?$/.test(formData.website)) {
      newErrors.website = 'Invalid website URL';
    }

    if (!formData.description.trim()) {
      newErrors.description = 'Company description is required';
    } else if (formData.description.length < 50) {
      newErrors.description = 'Description must be at least 50 characters';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (validateForm()) {
      // Handle form submission
      console.log('Form submitted:', formData);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6" noValidate>
      {/* Company Name */}
      <div>
        <label htmlFor="companyName" className="block text-sm font-medium text-gray-700">
          Company Name
        </label>
        <input
          type="text"
          id="companyName"
          value={formData.companyName}
          onChange={(e) => setFormData({ ...formData, companyName: e.target.value })}
          className={`mt-1 block w-full rounded-md shadow-sm
            ${errors.companyName ? 'border-red-300' : 'border-gray-300'}
            focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm`}
        />
        {errors.companyName && (
          <p className="mt-1 text-sm text-red-600">{errors.companyName}</p>
        )}
      </div>

      {/* Email */}
      <div>
        <label htmlFor="email" className="block text-sm font-medium text-gray-700">
          Email
        </label>
        <input
          type="email"
          id="email"
          value={formData.email}
          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
          className={`mt-1 block w-full rounded-md shadow-sm
            ${errors.email ? 'border-red-300' : 'border-gray-300'}
            focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm`}
        />
        {errors.email && (
          <p className="mt-1 text-sm text-red-600">{errors.email}</p>
        )}
      </div>

      {/* Password */}
      <div>
        <label htmlFor="password" className="block text-sm font-medium text-gray-700">
          Password
        </label>
        <div className="relative">
          <input
            type={showPassword ? 'text' : 'password'}
            id="password"
            value={formData.password}
            onChange={(e) => setFormData({ ...formData, password: e.target.value })}
            className={`mt-1 block w-full rounded-md shadow-sm pr-10
              ${errors.password ? 'border-red-300' : 'border-gray-300'}
              focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm`}
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute inset-y-0 right-0 pr-3 flex items-center"
          >
            {showPassword ? (
              <EyeSlashIcon className="h-5 w-5 text-gray-400" />
            ) : (
              <EyeIcon className="h-5 w-5 text-gray-400" />
            )}
          </button>
        </div>
        {errors.password && (
          <p className="mt-1 text-sm text-red-600">{errors.password}</p>
        )}
      </div>

      {/* Confirm Password */}
      <div>
        <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700">
          Confirm Password
        </label>
        <div className="relative">
          <input
            type={showConfirmPassword ? 'text' : 'password'}
            id="confirmPassword"
            value={formData.confirmPassword}
            onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
            className={`mt-1 block w-full rounded-md shadow-sm pr-10
              ${errors.confirmPassword ? 'border-red-300' : 'border-gray-300'}
              focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm`}
          />
          <button
            type="button"
            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
            className="absolute inset-y-0 right-0 pr-3 flex items-center"
          >
            {showConfirmPassword ? (
              <EyeSlashIcon className="h-5 w-5 text-gray-400" />
            ) : (
              <EyeIcon className="h-5 w-5 text-gray-400" />
            )}
          </button>
        </div>
        {errors.confirmPassword && (
          <p className="mt-1 text-sm text-red-600">{errors.confirmPassword}</p>
        )}
      </div>

      {/* Industry Type */}
      <div>
        <label htmlFor="industryType" className="block text-sm font-medium text-gray-700">
          Industry Type
        </label>
        <select
          id="industryType"
          value={formData.industryType}
          onChange={(e) => setFormData({ ...formData, industryType: e.target.value })}
          className={`mt-1 block w-full rounded-md shadow-sm
            ${errors.industryType ? 'border-red-300' : 'border-gray-300'}
            focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm`}
        >
          <option value="">Select an industry</option>
          {industryTypes.map((type) => (
            <option key={type} value={type}>
              {type}
            </option>
          ))}
        </select>
        {errors.industryType && (
          <p className="mt-1 text-sm text-red-600">{errors.industryType}</p>
        )}
      </div>

      {/* Website */}
      <div>
        <label htmlFor="website" className="block text-sm font-medium text-gray-700">
          Website
        </label>
        <input
          type="url"
          id="website"
          value={formData.website}
          onChange={(e) => setFormData({ ...formData, website: e.target.value })}
          placeholder="https://www.example.com"
          className={`mt-1 block w-full rounded-md shadow-sm
            ${errors.website ? 'border-red-300' : 'border-gray-300'}
            focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm`}
        />
        {errors.website && (
          <p className="mt-1 text-sm text-red-600">{errors.website}</p>
        )}
      </div>

      {/* Description */}
      <div>
        <label htmlFor="description" className="block text-sm font-medium text-gray-700">
          Company Description
        </label>
        <textarea
          id="description"
          rows={4}
          value={formData.description}
          onChange={(e) => setFormData({ ...formData, description: e.target.value })}
          className={`mt-1 block w-full rounded-md shadow-sm
            ${errors.description ? 'border-red-300' : 'border-gray-300'}
            focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm`}
          placeholder="Tell us about your company..."
        />
        {errors.description && (
          <p className="mt-1 text-sm text-red-600">{errors.description}</p>
        )}
      </div>

      {/* Submit Button */}
      <div>
        <button
          type="submit"
          className="w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-colors"
        >
          Create Account
        </button>
      </div>
    </form>
  );
};

export default CompanyForm; 