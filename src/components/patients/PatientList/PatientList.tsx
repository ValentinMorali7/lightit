import React, { useState } from 'react';
import { Patient, PatientFormData } from '../../../types/patient';
import { usePatients, useUpdatePatient, useDeletePatient } from '../../../hooks/usePatients';
import { useNotification } from '../../../hooks/useNotification';
import PatientCard from '../PatientCard/PatientCard';
import Modal from '../../common/Modal/Modal';
import Button from '../../common/Button/Button';
import PatientForm from '../PatientForm/PatientForm';
import styles from './PatientList.module.css';

const PatientList: React.FC = () => {
  const { data: patients = [], isLoading, isError } = usePatients();
  const updatePatient = useUpdatePatient();
  const deletePatient = useDeletePatient();
  const { showNotification } = useNotification();

  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [selectedPatient, setSelectedPatient] = useState<Patient | null>(null);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [patientToDelete, setPatientToDelete] = useState<string | null>(null);

  // Handle edit patient
  const handleEditClick = (patient: Patient) => {
    setSelectedPatient(patient);
    setIsEditModalOpen(true);
  };

  const handleEditSubmit = (data: PatientFormData) => {
    if (selectedPatient) {
      updatePatient.mutate(
        { id: selectedPatient.id, data },
        {
          onSuccess: () => {
            setIsEditModalOpen(false);
            setSelectedPatient(null);
            showNotification('success', 'Patient updated successfully');
          },
          onError: () => {
            showNotification('error', 'Failed to update patient');
          },
        }
      );
    }
  };

  // Handle delete patient
  const handleDeleteClick = (id: string) => {
    setPatientToDelete(id);
    setIsDeleteModalOpen(true);
  };

  const confirmDelete = () => {
    if (patientToDelete) {
      deletePatient.mutate(patientToDelete, {
        onSuccess: () => {
          setIsDeleteModalOpen(false);
          setPatientToDelete(null);
          showNotification('success', 'Patient deleted successfully');
        },
        onError: () => {
          showNotification('error', 'Failed to delete patient');
        },
      });
    }
  };

  // Render loading state
  if (isLoading) {
    return (
      <div className={styles.loadingState}>
        <div className={styles.loadingSpinner}></div>
        <p>Loading patients...</p>
      </div>
    );
  }

  // Render error state
  if (isError) {
    return (
      <div className={styles.errorState}>
        <svg 
          xmlns="http://www.w3.org/2000/svg" 
          width="24" 
          height="24" 
          viewBox="0 0 24 24" 
          fill="none" 
          stroke="currentColor" 
          strokeWidth="2" 
          strokeLinecap="round" 
          strokeLinejoin="round"
          className={styles.errorIcon}
        >
          <circle cx="12" cy="12" r="10"></circle>
          <line x1="12" y1="8" x2="12" y2="12"></line>
          <line x1="12" y1="16" x2="12.01" y2="16"></line>
        </svg>
        <p>Error loading patients. Please try again later.</p>
        <Button variant="secondary" onClick={() => window.location.reload()}>
          Refresh Page
        </Button>
      </div>
    );
  }

  // Render empty state
  if (!patients || patients.length === 0) {
    return (
      <div className={styles.emptyState}>
        <svg 
          xmlns="http://www.w3.org/2000/svg" 
          width="48" 
          height="48" 
          viewBox="0 0 24 24" 
          fill="none" 
          stroke="currentColor" 
          strokeWidth="2" 
          strokeLinecap="round" 
          strokeLinejoin="round"
          className={styles.emptyIcon}
        >
          <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
          <circle cx="9" cy="7" r="4"></circle>
          <path d="M23 21v-2a4 4 0 0 0-3-3.87"></path>
          <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
        </svg>
        <h3>No patients found</h3>
        <p>Add a new patient to get started.</p>
      </div>
    );
  }

  return (
    <div className={styles.container}>
      <div className={styles.patientGrid}>
        {patients.map((patient: Patient) => (
          <PatientCard
            key={patient.id}
            patient={patient}
            onEdit={handleEditClick}
            onDelete={handleDeleteClick}
          />
        ))}
      </div>

      {/* Edit Patient Modal */}
      <Modal
        isOpen={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
        title="Edit Patient"
        size="large"
      >
        <PatientForm
          patient={selectedPatient || undefined}
          onSubmit={handleEditSubmit}
          onCancel={() => setIsEditModalOpen(false)}
          isLoading={updatePatient.isPending}
        />
      </Modal>

      {/* Delete Confirmation Modal */}
      <Modal
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        title="Confirm Delete"
        size="small"
        footer={
          <>
            <Button
              variant="secondary"
              onClick={() => setIsDeleteModalOpen(false)}
              disabled={deletePatient.isPending}
            >
              Cancel
            </Button>
            <Button
              variant="danger"
              onClick={confirmDelete}
              isLoading={deletePatient.isPending}
            >
              Delete
            </Button>
          </>
        }
      >
        <div className={styles.deleteConfirmation}>
          <svg 
            xmlns="http://www.w3.org/2000/svg" 
            width="24" 
            height="24" 
            viewBox="0 0 24 24" 
            fill="none" 
            stroke="currentColor" 
            strokeWidth="2" 
            strokeLinecap="round" 
            strokeLinejoin="round"
            className={styles.warningIcon}
          >
            <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"></path>
            <line x1="12" y1="9" x2="12" y2="13"></line>
            <line x1="12" y1="17" x2="12.01" y2="17"></line>
          </svg>
          <p className={styles.deleteMessage}>
            Are you sure you want to delete this patient? This action cannot be undone.
          </p>
        </div>
      </Modal>
    </div>
  );
};

export default PatientList;