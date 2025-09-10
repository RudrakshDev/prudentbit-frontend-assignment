import React, { useState, useEffect } from 'react';
import { FilterParams } from '@/types';

interface SearchBarProps {
  onSearch: (search: string) => void;
  onFilter: (filters: Partial<FilterParams>) => void;
  onClearFilter: (filterName: string) => void;
  activeFilters: Partial<FilterParams>;
}

const SearchBar: React.FC<SearchBarProps> = ({
  onSearch,
  onFilter,
  onClearFilter,
  activeFilters
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [debouncedSearchTerm, setDebouncedSearchTerm] = useState('');

  // Debounce search input
  useEffect(() => {
    const timerId = setTimeout(() => {
      setDebouncedSearchTerm(searchTerm);
    }, 300);

    return () => {
      clearTimeout(timerId);
    };
  }, [searchTerm]);

  useEffect(() => {
    if (debouncedSearchTerm !== activeFilters.search) {
      onSearch(debouncedSearchTerm);
    }
  }, [debouncedSearchTerm]);

  const medicalIssueOptions = [
    'fever',
    'headache',
    'sore throat',
    'sprained ankle',
    'rash',
    'ear infection',
    'allergic reaction',
    'sinusitis'
  ];

  return (
    <div className="bg-white p-4 rounded shadow-sm mb-4">
      <div className="flex flex-col md:flex-row gap-4">

        <div className="relative flex-grow">
          <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
            <svg className="absolute left-3 top-2 w-5 h-5 sm:top-2.5 lg:top-3 text-gray-500 pointer-events-none" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
              <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z" />
            </svg>
          </div>
          <input
            type="search"
            className="block w-full p-2 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500"
            placeholder="Search"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>


        <div className="flex-shrink-0">
          <label className="block text-sm font-medium text-gray-700 mb-1">Sort by:</label>
          <select
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2"
            value={activeFilters.sortBy || 'patient_id'}
            onChange={(e) => onFilter({ sortBy: e.target.value })}
          >
            <option value="patient_id">ID</option>
            <option value="patient_name">Name</option>
            <option value="age">Age</option>
            <option value="medical_issue">Medical Issue</option>
          </select>
        </div>

        <div className="flex-shrink-0">
          <label className="block text-sm font-medium text-gray-700 mb-1">Order:</label>
          <select
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2"
            value={activeFilters.sortOrder || 'asc'}
            onChange={(e) => onFilter({ sortOrder: e.target.value as 'asc' | 'desc' })}
          >
            <option value="asc">Ascending</option>
            <option value="desc">Descending</option>
          </select>
        </div>
      </div>

      <div className="mt-4">
        <div className="flex flex-wrap gap-2">
          <div className="flex-shrink-0">
            <select
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2"
              value={activeFilters.medicalIssue || ''}
              onChange={(e) => onFilter({ medicalIssue: e.target.value })}
            >
              <option value="">Medical Issue (All)</option>
              {medicalIssueOptions.map(issue => (
                <option key={issue} value={issue}>{issue}</option>
              ))}
            </select>
          </div>

          <div className="flex-shrink-0">
            <input
              type="number"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2"
              placeholder="Min Age"
              value={activeFilters.minAge || ''}
              onChange={(e) => onFilter({ minAge: e.target.value ? parseInt(e.target.value) : undefined })}
            />
          </div>

          <div className="flex-shrink-0">
            <input
              type="number"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2"
              placeholder="Max Age"
              value={activeFilters.maxAge || ''}
              onChange={(e) => onFilter({ maxAge: e.target.value ? parseInt(e.target.value) : undefined })}
            />
          </div>
        </div>
      </div>

      {Object.keys(activeFilters).length > 0 && (
        <div className="mt-4 flex flex-wrap gap-2">
          {activeFilters.search && (
            <div className="bg-blue-100 text-blue-800 text-xs font-medium px-2.5 py-0.5 rounded flex items-center">
              Search: {activeFilters.search}
              <button
                className="ml-1.5 text-blue-800 hover:text-blue-900"
                onClick={() => onClearFilter('search')}
              >
                ×
              </button>
            </div>
          )}
          {activeFilters.medicalIssue && (
            <div className="bg-blue-100 text-blue-800 text-xs font-medium px-2.5 py-0.5 rounded flex items-center">
              Issue: {activeFilters.medicalIssue}
              <button
                className="ml-1.5 text-blue-800 hover:text-blue-900"
                onClick={() => onClearFilter('medicalIssue')}
              >
                ×
              </button>
            </div>
          )}
          {activeFilters.minAge && (
            <div className="bg-blue-100 text-blue-800 text-xs font-medium px-2.5 py-0.5 rounded flex items-center">
              Min Age: {activeFilters.minAge}
              <button
                className="ml-1.5 text-blue-800 hover:text-blue-900"
                onClick={() => onClearFilter('minAge')}
              >
                ×
              </button>
            </div>
          )}
          {activeFilters.maxAge && (
            <div className="bg-blue-100 text-blue-800 text-xs font-medium px-2.5 py-0.5 rounded flex items-center">
              Max Age: {activeFilters.maxAge}
              <button
                className="ml-1.5 text-blue-800 hover:text-blue-900"
                onClick={() => onClearFilter('maxAge')}
              >
                ×
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default SearchBar;