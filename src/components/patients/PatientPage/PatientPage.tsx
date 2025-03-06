import React, { useState } from 'react';
import { PatientFormData } from '../../../types/patient';
import { useCreatePatient } from '../../../hooks/usePatients';
import { useNotification } from '../../../hooks/useNotification';
import PatientList from '../PatientList/PatientList';
import Modal from '../../common/Modal/Modal';
import Button from '../../common/Button/Button';
import PatientForm from '../PatientForm/PatientForm';
import styles from './PatientPage.module.css';

const PatientPage: React.FC = () => {
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const createPatient = useCreatePatient();
  const { showNotification } = useNotification();

  const handleAddClick = () => {
    setIsAddModalOpen(true);
  };

  const handleAddSubmit = (data: PatientFormData) => {
    createPatient.mutate(data, {
      onSuccess: () => {
        setIsAddModalOpen(false);
        showNotification('success', 'Patient added successfully');
      },
      onError: () => {
        showNotification('error', 'Failed to add patient');
      },
    });
  };

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <div className={styles.titleSection}>
          <h1 className={styles.title}>Patient Management</h1>
          <p className={styles.subtitle}>Manage and track all your patients in one place</p>
        </div>
        <Button
          variant="primary"
          onClick={handleAddClick}
          className={styles.addButton}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className={styles.addIcon}
          >
            <line x1="12" y1="5" x2="12" y2="19"></line>
            <line x1="5" y1="12" x2="19" y2="12"></line>
          </svg>
          Add Patient
        </Button>
      </div>

      <div className={styles.content}>
        <PatientList />
      </div>

      {/* Add Patient Modal */}
      <Modal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        title="Add New Patient"
        size="medium"
      >
        <PatientForm
          onSubmit={handleAddSubmit}
          onCancel={() => setIsAddModalOpen(false)}
          isLoading={createPatient.isPending}
        />
      </Modal>
    </div>
  );
};

export default PatientPage;