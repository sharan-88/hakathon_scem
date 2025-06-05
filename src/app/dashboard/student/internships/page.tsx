'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { 
  MagnifyingGlassIcon, 
  AdjustmentsHorizontalIcon,
  MapPinIcon,
  CurrencyRupeeIcon,
  ClockIcon,
  BuildingOfficeIcon,
  ComputerDesktopIcon,
  XMarkIcon
} from '@heroicons/react/24/outline';
import { CheckBadgeIcon } from '@heroicons/react/24/solid';
import RangeSlider from '@/components/RangeSlider';

// Mock data - Replace with API call
const mockInternships = [
  {
    id: 1,
    title: "Frontend Developer Intern",
    company: "TechCorp Solutions",
    domain: "Web Development",
    locationType: "Remote",
    stipend: 15000,
    duration: "3 months",
    verifiedBy: "ABC College",
    postedDate: "2024-02-20",
    logo: null,
    description: "Join our team as a Frontend Developer Intern and work on exciting projects...",
    skills: ["React", "TypeScript", "Tailwind CSS"]
  },
  {
    id: 2,
    title: "Data Science Intern",
    company: "Analytics Pro",
    domain: "Data Science",
    locationType: "On-site",
    stipend: 20000,
    duration: "6 months",
    verifiedBy: "XYZ University",
    postedDate: "2024-02-19",
    logo: null,
    description: "Work on real-world data science projects and gain valuable experience...",
    skills: ["Python", "Machine Learning", "SQL"]
  },
  // Add more mock internships...
];

const domains = ["All Domains", "Web Development", "Data Science", "Machine Learning", "Mobile Development", "UI/UX Design"];
const locationTypes = ["All Locations", "Remote", "On-site", "Hybrid"];
const durations = ["All Durations", "1-3 months", "3-6 months", "6+ months"];
const skills = ["React", "TypeScript", "Python", "Java", "Node.js", "SQL", "Machine Learning", "UI/UX", "AWS"];

const ITEMS_PER_PAGE = 9;

export default function BrowseInternships() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedDomain, setSelectedDomain] = useState('All Domains');
  const [selectedLocationType, setSelectedLocationType] = useState('All Locations');
  const [selectedDuration, setSelectedDuration] = useState('All Durations');
  const [showFilters, setShowFilters] = useState(false);
  const [stipendRange, setStipendRange] = useState<[number, number]>([0, 50000]);
  const [selectedSkills, setSelectedSkills] = useState<string[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [activeFiltersCount, setActiveFiltersCount] = useState(0);

  // Filter internships based on all criteria
  const filteredInternships = mockInternships.filter(internship => {
    const matchesSearch = 
      internship.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      internship.company.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesDomain = selectedDomain === 'All Domains' || internship.domain === selectedDomain;
    const matchesLocation = selectedLocationType === 'All Locations' || internship.locationType === selectedLocationType;
    const matchesDuration = selectedDuration === 'All Durations' || internship.duration.includes(selectedDuration.split(' ')[0]);
    const matchesStipend = internship.stipend >= stipendRange[0] && internship.stipend <= stipendRange[1];
    const matchesSkills = selectedSkills.length === 0 || 
      selectedSkills.some(skill => internship.skills.includes(skill));

    return matchesSearch && matchesDomain && matchesLocation && matchesDuration && matchesStipend && matchesSkills;
  });

  // Calculate pagination
  const totalPages = Math.ceil(filteredInternships.length / ITEMS_PER_PAGE);
  const paginatedInternships = filteredInternships.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  // Update active filters count
  useEffect(() => {
    let count = 0;
    if (selectedDomain !== 'All Domains') count++;
    if (selectedLocationType !== 'All Locations') count++;
    if (selectedDuration !== 'All Durations') count++;
    if (stipendRange[0] > 0 || stipendRange[1] < 50000) count++;
    count += selectedSkills.length;
    setActiveFiltersCount(count);
  }, [selectedDomain, selectedLocationType, selectedDuration, stipendRange, selectedSkills]);

  // Reset filters
  const resetFilters = () => {
    setSelectedDomain('All Domains');
    setSelectedLocationType('All Locations');
    setSelectedDuration('All Durations');
    setStipendRange([0, 50000]);
    setSelectedSkills([]);
    setCurrentPage(1);
  };

  // Handle skill toggle
  const toggleSkill = (skill: string) => {
    setSelectedSkills(prev => 
      prev.includes(skill)
        ? prev.filter(s => s !== skill)
        : [...prev, skill]
    );
    setCurrentPage(1);
  };

  // Format stipend value
  const formatStipend = (value: number) => `₹${value.toLocaleString()}`;

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">
            Browse Verified Internships
          </h1>
          <p className="mt-2 text-sm text-gray-600">
            Explore internship opportunities verified by partner colleges
          </p>
        </div>

        {/* Search and Filters */}
        <div className="mb-8 space-y-4">
          {/* Search Bar */}
          <div className="flex items-center gap-4">
            <div className="flex-1 relative">
              <MagnifyingGlassIcon className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search by title or company..."
                value={searchTerm}
                onChange={(e) => {
                  setSearchTerm(e.target.value);
                  setCurrentPage(1);
                }}
                className="w-full pl-10 pr-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="inline-flex items-center px-4 py-3 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              <AdjustmentsHorizontalIcon className="h-5 w-5 mr-2" />
              Filters
              {activeFiltersCount > 0 && (
                <span className="ml-2 px-2 py-0.5 bg-blue-100 text-blue-600 rounded-full text-xs">
                  {activeFiltersCount}
                </span>
              )}
            </button>
          </div>

          {/* Filters Panel */}
          {showFilters && (
            <div className="bg-white rounded-lg border border-gray-200 p-6">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-medium text-gray-900">Filters</h3>
                <button
                  onClick={resetFilters}
                  className="text-sm text-blue-600 hover:text-blue-500"
                >
                  Reset all
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {/* Domain Filter */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Domain
                  </label>
                  <select
                    value={selectedDomain}
                    onChange={(e) => {
                      setSelectedDomain(e.target.value);
                      setCurrentPage(1);
                    }}
                    className="w-full rounded-lg border-gray-300 focus:ring-blue-500 focus:border-blue-500"
                  >
                    {domains.map(domain => (
                      <option key={domain} value={domain}>{domain}</option>
                    ))}
                  </select>
                </div>

                {/* Location Type Filter */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Location Type
                  </label>
                  <select
                    value={selectedLocationType}
                    onChange={(e) => {
                      setSelectedLocationType(e.target.value);
                      setCurrentPage(1);
                    }}
                    className="w-full rounded-lg border-gray-300 focus:ring-blue-500 focus:border-blue-500"
                  >
                    {locationTypes.map(type => (
                      <option key={type} value={type}>{type}</option>
                    ))}
                  </select>
                </div>

                {/* Duration Filter */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Duration
                  </label>
                  <select
                    value={selectedDuration}
                    onChange={(e) => {
                      setSelectedDuration(e.target.value);
                      setCurrentPage(1);
                    }}
                    className="w-full rounded-lg border-gray-300 focus:ring-blue-500 focus:border-blue-500"
                  >
                    {durations.map(duration => (
                      <option key={duration} value={duration}>{duration}</option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Stipend Range Filter */}
              <div className="mt-6">
                <label className="block text-sm font-medium text-gray-700 mb-3">
                  Monthly Stipend Range
                </label>
                <RangeSlider
                  min={0}
                  max={50000}
                  step={1000}
                  value={stipendRange}
                  onChange={(value) => {
                    setStipendRange(value);
                    setCurrentPage(1);
                  }}
                  formatValue={formatStipend}
                />
              </div>

              {/* Skills Filter */}
              <div className="mt-6">
                <label className="block text-sm font-medium text-gray-700 mb-3">
                  Required Skills
                </label>
                <div className="flex flex-wrap gap-2">
                  {skills.map(skill => (
                    <button
                      key={skill}
                      onClick={() => toggleSkill(skill)}
                      className={`inline-flex items-center px-3 py-1 rounded-full text-sm ${
                        selectedSkills.includes(skill)
                          ? 'bg-blue-100 text-blue-700'
                          : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                      }`}
                    >
                      {skill}
                      {selectedSkills.includes(skill) && (
                        <XMarkIcon className="w-4 h-4 ml-1" />
                      )}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Active Filters Display */}
        {activeFiltersCount > 0 && (
          <div className="mb-6 flex flex-wrap gap-2">
            {selectedDomain !== 'All Domains' && (
              <span className="inline-flex items-center px-3 py-1 rounded-full text-sm bg-blue-100 text-blue-700">
                {selectedDomain}
                <button
                  onClick={() => setSelectedDomain('All Domains')}
                  className="ml-1"
                >
                  <XMarkIcon className="w-4 h-4" />
                </button>
              </span>
            )}
            {selectedLocationType !== 'All Locations' && (
              <span className="inline-flex items-center px-3 py-1 rounded-full text-sm bg-blue-100 text-blue-700">
                {selectedLocationType}
                <button
                  onClick={() => setSelectedLocationType('All Locations')}
                  className="ml-1"
                >
                  <XMarkIcon className="w-4 h-4" />
                </button>
              </span>
            )}
            {/* Add more active filter chips as needed */}
          </div>
        )}

        {/* Results Count */}
        <div className="mb-6">
          <p className="text-sm text-gray-600">
            Showing {paginatedInternships.length} of {filteredInternships.length} internships
          </p>
        </div>

        {/* Internship Listings */}
        {isLoading ? (
          // Loading State
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3].map((n) => (
              <div key={n} className="animate-pulse bg-white rounded-lg p-6">
                <div className="h-4 bg-gray-200 rounded w-3/4 mb-4"></div>
                <div className="h-4 bg-gray-200 rounded w-1/2 mb-4"></div>
                <div className="h-4 bg-gray-200 rounded w-2/3"></div>
              </div>
            ))}
          </div>
        ) : filteredInternships.length > 0 ? (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {paginatedInternships.map((internship) => (
                <div
                  key={internship.id}
                  className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow duration-200"
                >
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900">
                        {internship.title}
                      </h3>
                      <div className="flex items-center mt-1">
                        <BuildingOfficeIcon className="h-4 w-4 text-gray-400 mr-1" />
                        <p className="text-sm text-gray-600">{internship.company}</p>
                      </div>
                    </div>
                    {internship.logo ? (
                      <img
                        src={internship.logo}
                        alt={`${internship.company} logo`}
                        className="h-12 w-12 rounded-full"
                      />
                    ) : (
                      <div className="h-12 w-12 rounded-full bg-gray-100 flex items-center justify-center">
                        <span className="text-xl font-medium text-gray-500">
                          {internship.company.charAt(0)}
                        </span>
                      </div>
                    )}
                  </div>

                  <div className="space-y-2">
                    <div className="flex items-center text-sm">
                      <ComputerDesktopIcon className="h-4 w-4 text-gray-400 mr-2" />
                      <span className="text-gray-600">{internship.domain}</span>
                    </div>
                    <div className="flex items-center text-sm">
                      <MapPinIcon className="h-4 w-4 text-gray-400 mr-2" />
                      <span className="text-gray-600">{internship.locationType}</span>
                    </div>
                    <div className="flex items-center text-sm">
                      <CurrencyRupeeIcon className="h-4 w-4 text-gray-400 mr-2" />
                      <span className="text-gray-600">₹{internship.stipend.toLocaleString()}/month</span>
                    </div>
                    <div className="flex items-center text-sm">
                      <ClockIcon className="h-4 w-4 text-gray-400 mr-2" />
                      <span className="text-gray-600">{internship.duration}</span>
                    </div>
                  </div>

                  {/* Skills */}
                  <div className="mt-4">
                    <div className="flex flex-wrap gap-2">
                      {internship.skills.map(skill => (
                        <span
                          key={skill}
                          className="px-2 py-1 text-xs font-medium bg-gray-100 text-gray-600 rounded"
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="mt-4 pt-4 border-t border-gray-100">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center text-sm text-green-600">
                        <CheckBadgeIcon className="h-4 w-4 mr-1" />
                        <span>Verified by {internship.verifiedBy}</span>
                      </div>
                      <div className="space-x-2">
                        <button
                          onClick={() => router.push(`/dashboard/student/internships/${internship.id}`)}
                          className="px-4 py-2 text-sm font-medium text-gray-600 hover:bg-gray-50 rounded-lg transition-colors"
                        >
                          View Details
                        </button>
                        <button className="px-4 py-2 text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 rounded-lg transition-colors">
                          Apply Now
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="mt-8 flex justify-center">
                <nav className="flex items-center space-x-2">
                  <button
                    onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                    disabled={currentPage === 1}
                    className={`px-3 py-2 rounded-lg ${
                      currentPage === 1
                        ? 'text-gray-400 cursor-not-allowed'
                        : 'text-gray-700 hover:bg-gray-100'
                    }`}
                  >
                    Previous
                  </button>
                  {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
                    <button
                      key={page}
                      onClick={() => setCurrentPage(page)}
                      className={`px-3 py-2 rounded-lg ${
                        currentPage === page
                          ? 'bg-blue-600 text-white'
                          : 'text-gray-700 hover:bg-gray-100'
                      }`}
                    >
                      {page}
                    </button>
                  ))}
                  <button
                    onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                    disabled={currentPage === totalPages}
                    className={`px-3 py-2 rounded-lg ${
                      currentPage === totalPages
                        ? 'text-gray-400 cursor-not-allowed'
                        : 'text-gray-700 hover:bg-gray-100'
                    }`}
                  >
                    Next
                  </button>
                </nav>
              </div>
            )}
          </>
        ) : (
          // No Results State
          <div className="text-center py-12">
            <div className="mb-4">
              <MagnifyingGlassIcon className="mx-auto h-12 w-12 text-gray-400" />
            </div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">
              No internships found
            </h3>
            <p className="text-gray-600">
              Try adjusting your search or filters to find more opportunities
            </p>
          </div>
        )}
      </div>
    </div>
  );
} 