import React from 'react';

interface HeaderProps {
  activeView: 'table' | 'card';
  setActiveView: (view: 'table' | 'card') => void;
  totalPatients: number;
  activeFilters: number;
}

const Header: React.FC<HeaderProps> = ({ 
  activeView, 
  setActiveView, 
  totalPatients,
  activeFilters 
}) => {
  return (
    <div className="bg-blue-500 text-white p-4">
      <div className="container mx-auto">
        <h1 className="text-2xl font-bold mb-1">Patient Directory</h1>
        <p className="text-sm">{totalPatients} Patient Found</p>
        
        <div className="flex justify-between items-center mt-4">
          <div className="flex space-x-2">
            <button 
              className={`px-3 py-1 text-sm ${activeView === 'table' ? 'border-b-2 border-white font-medium' : 'text-blue-100'}`}
              onClick={() => setActiveView('table')}
            >
              Table View
            </button>
            <button 
              className={`px-3 py-1 text-sm ${activeView === 'card' ? 'border-b-2 border-white font-medium' : 'text-blue-100'}`}
              onClick={() => setActiveView('card')}
            >
              Card View
            </button>
          </div>
          
          <div className="flex items-center">
            <span className="text-sm mr-2">Active Filters: {activeFilters}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;