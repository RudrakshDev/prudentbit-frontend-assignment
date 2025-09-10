import React from 'react';
import { Patient } from '@/types';

interface CardViewProps {
  patients: Patient[];
  isLoading: boolean;
}

const CardView: React.FC<CardViewProps> = ({ patients, isLoading }) => {
  if (isLoading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {[...Array(8)].map((_, index) => (
          <div key={index} className="bg-white rounded-lg shadow p-4 animate-pulse">
            <div className="h-4 bg-gray-200 rounded w-1/4 mb-2"></div>
            <div className="h-6 bg-gray-200 rounded w-3/4 mb-4"></div>
            <div className="h-20 bg-gray-100 rounded mb-4"></div>
            <div className="h-4 bg-gray-200 rounded w-1/2"></div>
          </div>
        ))}
      </div>
    );
  }

  if (patients.length === 0) {
    return (
      <div className="bg-white rounded-lg shadow p-6 text-center">
        <p className="text-gray-500">No patients found matching your criteria.</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
      {patients.map((patient) => {
        const contact = patient.contact[0] || { address: null, number: null, email: null };
        
        return (
          <div key={patient.patient_id} className="bg-white rounded-lg shadow overflow-hidden">
            <div className="p-4">
              <div className="flex items-center mb-2">
                <div className="h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center mr-3 overflow-hidden">
                  {patient.photo_url ? (
                    <img src={patient.photo_url} alt={patient.patient_name} className="h-full w-full object-cover" />
                  ) : (
                    <span className="text-blue-500 font-medium">
                      {patient.patient_name.split(' ').map(name => name[0]).join('')}
                    </span>
                  )}
                </div>
                <div>
                  <h3 className="text-gray-900 font-medium">{patient.patient_name}</h3>
                  <p className="text-xs text-gray-500">ID-{patient.patient_id.toString().padStart(4, '0')}</p>
                </div>
                <div className="ml-auto bg-blue-100 text-blue-800 text-xs font-medium px-2 py-0.5 rounded">
                  Age {patient.age}
                </div>
              </div>
              
              <div className="mt-4">
                <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                  patient.medical_issue === 'fever' ? 'bg-red-100 text-red-800' :
                  patient.medical_issue === 'headache' ? 'bg-orange-100 text-orange-800' :
                  patient.medical_issue === 'sore throat' ? 'bg-yellow-100 text-yellow-800' :
                  patient.medical_issue === 'sprained ankle' ? 'bg-green-100 text-green-800' :
                  patient.medical_issue === 'rash' ? 'bg-pink-100 text-pink-800' :
                  patient.medical_issue === 'ear infection' ? 'bg-purple-100 text-purple-800' :
                  patient.medical_issue === 'allergic reaction' ? 'bg-blue-100 text-blue-800' :
                  'bg-gray-100 text-gray-800'
                }`}>
                  {patient.medical_issue}
                </span>
              </div>
            </div>
            
            <div className="border-t border-gray-200 px-4 py-3">
              <div className="flex items-center text-gray-500 text-sm mb-1">
                <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path>
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path>
                </svg>
                <span className="truncate">{contact.address || 'N/A'}</span>
              </div>
              
              <div className="flex items-center text-gray-500 text-sm mb-1">
                <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"></path>
                </svg>
                <span>{contact.number || 'N/A'}</span>
              </div>
              
              <div className="flex items-center text-gray-500 text-sm">
                <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path>
                </svg>
                <span className="truncate">{contact.email || 'N/A'}</span>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default CardView;