'use client';

import * as React from 'react';
import { useState } from 'react';
import InternshipCard from './components/InternshipCard';
import InternshipFilters from './components/InternshipFilters';
import { MagnifyingGlassIcon } from '@heroicons/react/24/outline';

// Mock data - replace with API call later
const MOCK_INTERNSHIPS = Array.from({ length: 50 }, (_, i) => ({
  id: `intern-${i + 1}`,
  title: [
    'Frontend Developer Intern',
    'Data Science Intern',
    'Marketing Intern',
    'UI/UX Design Intern',
    'Business Development Intern',
  ][Math.floor(Math.random() * 5)],
  company: [
    'TechCorp',
    'DataViz Solutions',
    'Marketing Pro',
    'Design Studio',
    'Growth Ventures',
  ][Math.floor(Math.random() * 5)],
  location: [
    'Bangalore',
    'Mumbai',
    'Delhi',
    'Hyderabad',
    'Pune',
  ][Math.floor(Math.random() * 5)],
  locationType: ['remote', 'on-site', 'hybrid'][Math.floor(Math.random() * 3)] as 'remote' | 'on-site' | 'hybrid',
  stipend: Math.floor(Math.random() * 40000) + 10000,
  duration: ['1-3', '3-6', '6+'][Math.floor(Math.random() * 3)],
  domain: [
    'Software Development',
    'Data Science',
    'Marketing',
    'Design',
    'Business Development',
  ][Math.floor(Math.random() * 5)],
  skills: [
    'React',
    'Python',
    'JavaScript',
    'Data Analysis',
    'Digital Marketing',
    'UI/UX Design',
    'Content Writing',
    'Social Media',
    'Excel',
  ].sort(() => 0.5 - Math.random()).slice(0, Math.floor(Math.random() * 4) + 2),
  isVerified: Math.random() > 0.2,
  postedDate: `${Math.floor(Math.random() * 7) + 1}d ago`,
}));

interface Filters {
  search: string;
  domains: string[];
  locationTypes: string[];
  duration: string;
  stipendRange: [number, number];
  skills: string[];
}

export default function InternshipsPage() {
  const [filters, setFilters] = useState<Filters>({
    search: '',
    domains: [],
    locationTypes: [],
    duration: '',
    stipendRange: [0, 50000],
    skills: [],
  });
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState('');

  // Filter internships based on current filters
  const filteredInternships = MOCK_INTERNSHIPS.filter((internship) => {
    const matchesSearch =
      !searchQuery ||
      internship.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      internship.company.toLowerCase().includes(searchQuery.toLowerCase()) ||
      internship.domain.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesDomain =
      filters.domains.length === 0 || filters.domains.includes(internship.domain);

    const matchesLocationType =
      filters.locationTypes.length === 0 ||
      filters.locationTypes.includes(internship.locationType);

    const matchesDuration =
      !filters.duration || internship.duration === filters.duration;

    const matchesStipend =
      internship.stipend >= filters.stipendRange[0] &&
      internship.stipend <= filters.stipendRange[1];

    const matchesSkills =
      filters.skills.length === 0 ||
      filters.skills.some((skill) => internship.skills.includes(skill));

    return (
      matchesSearch &&
      matchesDomain &&
      matchesLocationType &&
      matchesDuration &&
      matchesStipend &&
      matchesSkills
    );
  });

  // Calculate pagination
  const ITEMS_PER_PAGE = 10; // Adjusted for two-column layout
  const totalPages = Math.ceil(filteredInternships.length / ITEMS_PER_PAGE);
  const paginatedInternships = filteredInternships.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  const handleFiltersChange = (newFilters: Filters) => {
    setFilters(newFilters);
    setCurrentPage(1);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Search Bar - Fixed at Top */}
      <div className="sticky top-0 z-10 border-b border-gray-200 bg-white px-4 py-4 shadow-sm sm:px-6 lg:px-8">
        <div className="relative mx-auto max-w-7xl">
          <div className="flex items-center">
            <div className="flex-grow">
              <label htmlFor="search" className="sr-only">
                Search internships
              </label>
              <div className="relative">
                <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                  <MagnifyingGlassIcon className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type="search"
                  id="search"
                  className="block w-full rounded-lg border-0 py-3 pl-10 pr-4 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  placeholder="Search internships by title, company, or keywords..."
                  value={searchQuery}
                  onChange={(e) => {
                    setSearchQuery(e.target.value);
                    setCurrentPage(1);
                  }}
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="py-6">
          {/* Main Grid */}
          <div className="lg:grid lg:grid-cols-12 lg:gap-8">
            {/* Filters - Left Sidebar */}
            <div className="hidden lg:col-span-3 lg:block">
              <div className="sticky top-[5.5rem]">
                <InternshipFilters onFiltersChange={handleFiltersChange} />
              </div>
            </div>

            {/* Internship List - Right Side */}
            <main className="lg:col-span-9">
              {/* Results Info */}
              <div className="mb-6 flex items-center justify-between">
                <p className="text-sm text-gray-600">
                  Showing {paginatedInternships.length} of {filteredInternships.length} internships
                </p>
                {totalPages > 1 && (
                  <p className="text-sm text-gray-600">
                    Page {currentPage} of {totalPages}
                  </p>
                )}
              </div>

              {/* Internship Grid */}
              {paginatedInternships.length > 0 ? (
                <div className="grid gap-6 sm:grid-cols-2">
                  {paginatedInternships.map((internship) => (
                    <InternshipCard key={internship.id} {...internship} />
                  ))}
                </div>
              ) : (
                <div className="flex min-h-[400px] items-center justify-center rounded-lg border border-dashed border-gray-300 bg-white px-6 py-12 text-center">
                  <div className="space-y-2">
                    <p className="text-lg font-medium text-gray-900">No internships found</p>
                    <p className="text-sm text-gray-600">
                      Try adjusting your filters to find more opportunities
                    </p>
                  </div>
                </div>
              )}

              {/* Pagination */}
              {totalPages > 1 && (
                <div className="mt-8 flex items-center justify-center space-x-2">
                  <button
                    onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                    disabled={currentPage === 1}
                    className="rounded-lg border border-gray-300 px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-50"
                  >
                    Previous
                  </button>
                  {Array.from({ length: totalPages }, (_, i) => i + 1)
                    .filter(
                      (pageNum) =>
                        pageNum === 1 ||
                        pageNum === totalPages ||
                        Math.abs(pageNum - currentPage) <= 1
                    )
                    .map((pageNum, i, arr) => (
                      <React.Fragment key={pageNum}>
                        {i > 0 && arr[i - 1] !== pageNum - 1 && (
                          <span className="px-2 text-gray-500">...</span>
                        )}
                        <button
                          onClick={() => setCurrentPage(pageNum)}
                          className={`rounded-lg px-4 py-2 text-sm font-medium ${
                            currentPage === pageNum
                              ? 'bg-indigo-600 text-white'
                              : 'text-gray-700 hover:bg-gray-50'
                          }`}
                        >
                          {pageNum}
                        </button>
                      </React.Fragment>
                    ))}
                  <button
                    onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
                    disabled={currentPage === totalPages}
                    className="rounded-lg border border-gray-300 px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-50"
                  >
                    Next
                  </button>
                </div>
              )}
            </main>
          </div>
        </div>
      </div>
    </div>
  );
} 