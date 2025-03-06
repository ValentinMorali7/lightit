import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import {
  fetchPatients,
  fetchPatientById,
  createPatient,
  updatePatient,
  deletePatient,
} from '../services/api'; // Import from the actual API service
import { Patient, PatientFormData } from '../types/patient';

export const usePatients = () => {
  return useQuery<Patient[]>({
    queryKey: ['patients'],
    queryFn: fetchPatients,
  });
};

export const usePatient = (id: string) => {
  return useQuery<Patient>({
    queryKey: ['patient', id],
    queryFn: () => fetchPatientById(id),
    enabled: !!id, // Only fetch when ID is provided
  });
};

export const useCreatePatient = () => {
  const queryClient = useQueryClient();
  
  return useMutation<Patient, Error, PatientFormData>({
    mutationFn: (newPatient: PatientFormData) => createPatient(newPatient),
    onSuccess: () => {
      // Invalidate and refetch the patients list
      queryClient.invalidateQueries({ queryKey: ['patients'] });
    },
  });
};

export const useUpdatePatient = () => {
  const queryClient = useQueryClient();
  
  return useMutation<Patient, Error, { id: string; data: PatientFormData }>({
    mutationFn: ({ id, data }: { id: string; data: PatientFormData }) => updatePatient(id, data),
    onSuccess: (updatedPatient) => {
      // Update both the list and the individual patient data
      queryClient.invalidateQueries({ queryKey: ['patients'] });
      queryClient.invalidateQueries({ queryKey: ['patient', updatedPatient.id] });
    },
  });
};

export const useDeletePatient = () => {
  const queryClient = useQueryClient();
  
  return useMutation<void, Error, string>({
    mutationFn: (id: string) => deletePatient(id),
    onSuccess: () => {
      // Invalidate and refetch the patients list
      queryClient.invalidateQueries({ queryKey: ['patients'] });
    },
  });
};