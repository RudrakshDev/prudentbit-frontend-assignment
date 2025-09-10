import React from 'react';
import { Patient } from '@/types';

interface TableViewProps {
  patients: Patient[];
  isLoading: boolean;
}

const TableView: React.FC<TableViewProps> = ({ patients, isLoading }) => {
  if (isLoading) {
    return (
      <div className="bg-white rounded-lg shadow overflow-hidden">
        <div className="animate-pulse p-4">
          <div className="h-6 bg-gray-200 rounded w-full mb-4"></div>
          {[...Array(5)].map((_, index) => (
            <div key={index} className="h-16 bg-gray-100 rounded mb-2"></div>
          ))}
        </div>
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
    <div className="bg-white rounded-lg shadow overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full text-sm text-left text-gray-500">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50">
            <tr>
              <th scope="col" className="px-6 py-3">ID</th>
              <th scope="col" className="px-6 py-3">Name</th>
              <th scope="col" className="px-6 py-3">Age</th>
              <th scope="col" className="px-6 py-3">Medical Issue</th>
              <th scope="col" className="px-6 py-3">Address</th>
              <th scope="col" className="px-6 py-3">Phone Number</th>
              <th scope="col" className="px-6 py-3">Email ID</th>
            </tr>
          </thead>
          <tbody>
            {patients.map((patient) => {
              const contact = patient.contact[0] || { address: null, number: null, email: null };
              
              return (
                <tr key={patient.patient_id} className="bg-white border-b hover:bg-gray-50">
                  <td className="px-6 py-4">ID-{patient.patient_id.toString().padStart(4, '0')}</td>
                  <td className="px-6 py-4 flex items-center">
                    <div className="h-8 w-8 rounded-full bg-gray-200 flex items-center justify-center mr-3 overflow-hidden">
                      {patient.photo_url ? (
                        <img src={patient.photo_url} alt={patient.patient_name} className="h-full w-full object-cover" />
                      ) : (
                        <span className="text-gray-500 text-xs">
                          {patient.patient_name.split(' ').map(name => name[0]).join('')}
                        </span>
                      )}
                    </div>
                    {patient.patient_name}
                  </td>
                  <td className="px-6 py-4">{patient.age}</td>
                  <td className="px-6 py-4">
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
                  </td>
                  <td className="px-6 py-4">{contact.address || 'N/A'}</td>
                  <td className="px-6 py-4">{contact.number || 'N/A'}</td>
                  <td className="px-6 py-4">{contact.email || 'N/A'}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default TableView;