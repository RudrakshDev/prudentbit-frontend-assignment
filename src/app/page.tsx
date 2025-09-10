'use client';

import { useState, useEffect } from 'react';
import Header from '@/components/Header';
import SearchBar from '@/components/SearchBar';
import TableView from '@/components/TableView';
import CardView from '@/components/CardView';
import Pagination from '@/components/Pagination';
import { Patient, FilterParams, ApiResponse } from '@/types';

export default function Home() {
  // State for view mode
  const [activeView, setActiveView] = useState<'table' | 'card'>('table');
  
  // State for patients data
  const [patients, setPatients] = useState<Patient[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
  // State for pagination
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalPatients, setTotalPatients] = useState(0);
  const [limit] = useState(10);
  
  // State for filters
  const [filters, setFilters] = useState<FilterParams>({
    search: '',
    medicalIssue: '',
    minAge: undefined,
    maxAge: undefined,
    sortBy: 'patient_id',
    sortOrder: 'asc'
  });
  
  // Count active filters
  const countActiveFilters = () => {
    return Object.entries(filters).filter(([key, value]) => {
      if (key === 'sortBy' && value === 'patient_id') return false;
      if (key === 'sortOrder' && value === 'asc') return false;
      return value !== undefined && value !== '';
    }).length;
  };
  
  // Fetch patients data
  const fetchPatients = async () => {
    setIsLoading(true);
    setError(null);
    
    try {
      // Build query string from filters
      const queryParams = new URLSearchParams();
      queryParams.append('page', currentPage.toString());
      queryParams.append('limit', limit.toString());
      
      if (filters.search) queryParams.append('search', filters.search);
      if (filters.medicalIssue) queryParams.append('medicalIssue', filters.medicalIssue);
      if (filters.minAge !== undefined) queryParams.append('minAge', filters.minAge.toString());
      if (filters.maxAge !== undefined) queryParams.append('maxAge', filters.maxAge.toString());
      if (filters.sortBy) queryParams.append('sortBy', filters.sortBy);
      if (filters.sortOrder) queryParams.append('sortOrder', filters.sortOrder);
      
      const queryString = queryParams.toString();
      console.log('Fetching patients with query:', queryString);
      
      const response = await fetch(`/api/patients?${queryString}`);
      
      if (!response.ok) {
        throw new Error(`Error: ${response.status}`);
      }
      
      const data: ApiResponse = await response.json();
      console.log('API Response:', data);
      
      if (data && data.patients) {
        setPatients(data.patients);
        setTotalPages(data.pagination.totalPages);
        setTotalPatients(data.pagination.total);
      } else {
        console.error('Invalid API response format:', data);
        setError('Received invalid data format from server');
      }
    } catch (err) {
      setError('Failed to fetch patients data. Please try again.');
      console.error('Error fetching patients:', err);
    } finally {
      setIsLoading(false);
    }
  };
  
  // Fetch data when filters or pagination changes
  useEffect(() => {
    fetchPatients();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentPage, JSON.stringify(filters)]);
  
  // Handle search
  const handleSearch = (search: string) => {
    setFilters(prev => ({ ...prev, search }));
    setCurrentPage(1); // Reset to first page on new search
  };
  
  // Handle filter changes
  const handleFilter = (newFilters: Partial<FilterParams>) => {
    setFilters(prev => ({ ...prev, ...newFilters }));
    setCurrentPage(1); // Reset to first page on new filter
  };
  
  // Handle clearing a filter
  const handleClearFilter = (filterName: string) => {
    setFilters(prev => {
      const newFilters = { ...prev };
      // @ts-ignore
      newFilters[filterName] = filterName === 'sortBy' ? 'patient_id' : 
                              filterName === 'sortOrder' ? 'asc' : '';
      return newFilters;
    });
    setCurrentPage(1); // Reset to first page on filter clear
  };
  
  // Handle page change
  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };
  
  return (
    <div className="min-h-screen bg-gray-100">
      <Header 
        activeView={activeView} 
        setActiveView={setActiveView} 
        totalPatients={totalPatients}
        activeFilters={countActiveFilters()}
      />
      
      <div className="container mx-auto px-4 py-6">
        <SearchBar 
          onSearch={handleSearch} 
          onFilter={handleFilter} 
          onClearFilter={handleClearFilter}
          activeFilters={filters}
        />
        
        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
            {error}
          </div>
        )}
        
        {activeView === 'table' ? (
          <TableView patients={patients} isLoading={isLoading} />
        ) : (
          <CardView patients={patients} isLoading={isLoading} />
        )}
        
        <Pagination 
          currentPage={currentPage} 
          totalPages={totalPages} 
          onPageChange={handlePageChange} 
        />
      </div>
    </div>
  );
}
