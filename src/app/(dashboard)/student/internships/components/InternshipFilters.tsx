'use client';

import { useState } from 'react';
import { ChevronDownIcon } from '@heroicons/react/24/outline';
import { Slider } from '@/components/ui/Slider';

interface Filters {
  search: string;
  domains: string[];
  locationTypes: string[];
  duration: string;
  stipendRange: [number, number];
  skills: string[];
}

interface FiltersProps {
  onFiltersChange: (filters: Filters) => void;
}

const domains = [
  'Software Development',
  'Data Science',
  'Marketing',
  'Design',
  'Business Development',
  'Content Writing',
  'Human Resources',
  'Finance',
  'Operations',
];

const locationTypes = [
  { id: 'remote', label: 'Remote' },
  { id: 'on-site', label: 'On-site' },
  { id: 'hybrid', label: 'Hybrid' },
];

const durations = [
  { value: '1-3', label: '1-3 months' },
  { value: '3-6', label: '3-6 months' },
  { value: '6+', label: '6+ months' },
];

interface FilterSectionProps {
  title: string;
  children: React.ReactNode;
  defaultOpen?: boolean;
}

function FilterSection({ title, children, defaultOpen = true }: FilterSectionProps) {
  const [isOpen, setIsOpen] = useState(defaultOpen);

  return (
    <div className="border-b border-gray-200 py-6 last:border-0">
      <button
        type="button"
        className="flex w-full items-center justify-between text-sm font-medium text-gray-900 hover:text-indigo-600"
        onClick={() => setIsOpen(!isOpen)}
      >
        <span>{title}</span>
        <ChevronDownIcon
          className={`h-5 w-5 text-gray-500 transition-transform duration-200 ${
            isOpen ? 'rotate-180 transform' : ''
          }`}
        />
      </button>
      <div
        className={`mt-4 space-y-4 transition-all duration-200 ease-in-out ${
          isOpen ? 'block' : 'hidden'
        }`}
      >
        {children}
      </div>
    </div>
  );
}

export default function InternshipFilters({ onFiltersChange }: FiltersProps) {
  const [filters, setFilters] = useState<Filters>({
    search: '',
    domains: [],
    locationTypes: [],
    duration: '',
    stipendRange: [0, 50000],
    skills: [],
  });

  const handleFilterChange = (
    key: keyof Filters,
    value: string | string[] | [number, number]
  ) => {
    const newFilters = { ...filters, [key]: value };
    setFilters(newFilters);
    onFiltersChange(newFilters);
  };

  const toggleFilter = (key: 'domains' | 'locationTypes', value: string) => {
    const currentValues = filters[key];
    const newValues = currentValues.includes(value)
      ? currentValues.filter((v) => v !== value)
      : [...currentValues, value];
    handleFilterChange(key, newValues);
  };

  const clearFilters = () => {
    const newFilters = {
      search: '',
      domains: [],
      locationTypes: [],
      duration: '',
      stipendRange: [0, 50000],
      skills: [],
    };
    setFilters(newFilters);
    onFiltersChange(newFilters);
  };

  const hasActiveFilters =
    filters.domains.length > 0 ||
    filters.locationTypes.length > 0 ||
    filters.duration ||
    filters.stipendRange[0] > 0 ||
    filters.stipendRange[1] < 50000;

  return (
    <div className="rounded-lg bg-white p-6 shadow-sm ring-1 ring-black ring-opacity-5">
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-medium text-gray-900">Filters</h2>
        {hasActiveFilters && (
          <button
            type="button"
            onClick={clearFilters}
            className="text-sm font-medium text-indigo-600 hover:text-indigo-500"
          >
            Clear all
          </button>
        )}
      </div>

      <div className="mt-4">
        <FilterSection title="Domain">
          <div className="space-y-3 max-h-48 overflow-y-auto scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100">
            {domains.map((domain) => (
              <label key={domain} className="group relative flex items-start">
                <div className="flex h-5 items-center">
                  <input
                    type="checkbox"
                    checked={filters.domains.includes(domain)}
                    onChange={() => toggleFilter('domains', domain)}
                    className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600"
                  />
                </div>
                <div className="ml-3 text-sm leading-6">
                  <span className="text-gray-700 group-hover:text-gray-900">{domain}</span>
                </div>
              </label>
            ))}
          </div>
        </FilterSection>

        <FilterSection title="Location Type">
          <div className="space-y-3">
            {locationTypes.map((type) => (
              <label key={type.id} className="group relative flex items-start">
                <div className="flex h-5 items-center">
                  <input
                    type="checkbox"
                    checked={filters.locationTypes.includes(type.id)}
                    onChange={() => toggleFilter('locationTypes', type.id)}
                    className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600"
                  />
                </div>
                <div className="ml-3 text-sm leading-6">
                  <span className="text-gray-700 group-hover:text-gray-900">{type.label}</span>
                </div>
              </label>
            ))}
          </div>
        </FilterSection>

        <FilterSection title="Duration">
          <div className="space-y-3">
            {durations.map((duration) => (
              <label key={duration.value} className="group relative flex items-start">
                <div className="flex h-5 items-center">
                  <input
                    type="radio"
                    name="duration"
                    checked={filters.duration === duration.value}
                    onChange={() => handleFilterChange('duration', duration.value)}
                    className="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-600"
                  />
                </div>
                <div className="ml-3 text-sm leading-6">
                  <span className="text-gray-700 group-hover:text-gray-900">{duration.label}</span>
                </div>
              </label>
            ))}
          </div>
        </FilterSection>

        <FilterSection title="Stipend Range">
          <div className="px-2 pt-2">
            <Slider
              min={0}
              max={50000}
              step={1000}
              value={filters.stipendRange}
              onChange={(value) => handleFilterChange('stipendRange', value as [number, number])}
              formatLabel={(value) => `₹${value.toLocaleString('en-IN')}`}
            />
          </div>
        </FilterSection>
      </div>
    </div>
  );
} 