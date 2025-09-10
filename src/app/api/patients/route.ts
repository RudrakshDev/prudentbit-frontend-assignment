import { NextRequest, NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

export interface Contact {
  address: string | null;
  number: string | null;
  email: string | null;
}

export interface Patient {
  patient_id: number;
  patient_name: string;
  age: number;
  photo_url: string | null;
  contact: Contact[];
  medical_issue: string;
}

const readPatientsData = (): Patient[] => {
  const filePath = path.join(process.cwd(), 'public', 'data.json');
  const fileData = fs.readFileSync(filePath, 'utf8');
  return JSON.parse(fileData);
};

export async function GET(request: NextRequest) {
  try {
    const allPatients = readPatientsData();
    
    const searchParams = request.nextUrl.searchParams;
    const page = parseInt(searchParams.get('page') || '1');
    const limit = parseInt(searchParams.get('limit') || '10');
    const search = searchParams.get('search') || '';
    const medicalIssue = searchParams.get('medicalIssue') || '';
    const minAge = parseInt(searchParams.get('minAge') || '0');
    const maxAge = parseInt(searchParams.get('maxAge') || '200');
    const sortBy = searchParams.get('sortBy') || 'patient_id';
    const sortOrder = searchParams.get('sortOrder') || 'asc';
    
    let filteredPatients = allPatients.filter(patient => {

      const matchesSearch = search ? 
        patient.patient_name.toLowerCase().includes(search.toLowerCase()) : true;
      
      const matchesMedicalIssue = medicalIssue ? 
        patient.medical_issue.toLowerCase() === medicalIssue.toLowerCase() : true;
      
      const matchesAgeRange = patient.age >= minAge && patient.age <= maxAge;
      
      return matchesSearch && matchesMedicalIssue && matchesAgeRange;
    });
    
    filteredPatients.sort((a: any, b: any) => {
      if (sortOrder === 'asc') {
        return a[sortBy] > b[sortBy] ? 1 : -1;
      } else {
        return a[sortBy] < b[sortBy] ? 1 : -1;
      }
    });
    
    const startIndex = (page - 1) * limit;
    const endIndex = page * limit;
    const paginatedPatients = filteredPatients.slice(startIndex, endIndex);
    
    const response = {
      patients: paginatedPatients,
      pagination: {
        total: filteredPatients.length,
        page,
        limit,
        totalPages: Math.ceil(filteredPatients.length / limit)
      },
      filters: {
        search,
        medicalIssue,
        minAge,
        maxAge,
        sortBy,
        sortOrder
      }
    };
    
    return NextResponse.json(response);
  } catch (error) {
    console.error('Error fetching patients data:', error);
    return NextResponse.json(
      { error: 'Failed to fetch patients data' },
      { status: 500 }
    );
  }
}