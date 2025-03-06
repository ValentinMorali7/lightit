import { Patient, PatientFormData } from '../types/patient';

const API_URL = 'https://63bedcf7f5cfc0949b634fc8.mockapi.io';

export const fetchPatients = async (): Promise<Patient[]> => {
  try {
    const response = await fetch(`${API_URL}/users`);

    if (!response.ok) {
      throw new Error(`API error: ${response.status}`);
    }

    const data: Patient[] = await response.json();
    console.log('Fetched patients:', data); // For debugging
    return data;
  } catch (error) {
    console.error('Error fetching patients:', error);
    throw error;
  }
};

export const fetchPatientById = async (id: string): Promise<Patient> => {
  try {
    const response = await fetch(`${API_URL}/users/${id}`);

    if (!response.ok) {
      throw new Error(`API error: ${response.status}`);
    }

    const data: Patient = await response.json();
    return data;
  } catch (error) {
    console.error(`Error fetching patient with id ${id}:`, error);
    throw error;
  }
};

export const createPatient = async (patient: PatientFormData): Promise<Patient> => {
  try {
    const response = await fetch(`${API_URL}/users`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(patient),
    });

    if (!response.ok) {
      throw new Error(`API error: ${response.status}`);
    }

    const data: Patient = await response.json();
    return data;
  } catch (error) {
    console.error('Error creating patient:', error);
    throw error;
  }
};

export const updatePatient = async (id: string, patient: PatientFormData): Promise<Patient> => {
  try {
    const response = await fetch(`${API_URL}/users/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(patient),
    });

    if (!response.ok) {
      throw new Error(`API error: ${response.status}`);
    }

    const data: Patient = await response.json();
    return data;
  } catch (error) {
    console.error(`Error updating patient with id ${id}:`, error);
    throw error;
  }
};

export const deletePatient = async (id: string): Promise<void> => {
  try {
    const response = await fetch(`${API_URL}/users/${id}`, {
      method: 'DELETE',
    });

    if (!response.ok) {
      throw new Error(`API error: ${response.status}`);
    }
  } catch (error) {
    console.error(`Error deleting patient with id ${id}:`, error);
    throw error;
  }
};