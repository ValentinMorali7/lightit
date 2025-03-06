import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Patient, PatientFormData } from '../../../types/patient';
import { patientSchema, PatientFormSchema } from '../../../utils/validationSchema';
import FormInput from '../../common/FormInput/FormInput';
import FormTextarea from '../../common/FormTextarea/FormTextarea';
import Button from '../../common/Button/Button';
import styles from './PatientForm.module.css';

interface PatientFormProps {
  patient?: Patient;
  onSubmit: (data: PatientFormData) => void;
  onCancel: () => void;
  isLoading?: boolean;
}

const PatientForm: React.FC<PatientFormProps> = ({
  patient,
  onSubmit,
  onCancel,
  isLoading = false,
}) => {
  const isEditMode = !!patient;
  const defaultValues: PatientFormSchema = {
    name: '',
    avatar: '',
    description: '',
    website: '',
  };

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<PatientFormSchema>({
    resolver: zodResolver(patientSchema),
    defaultValues,
  });

  // Initialize form with patient data when editing
  useEffect(() => {
    if (patient) {
      reset({
        name: patient.name || '',
        avatar: patient.avatar || '',
        description: patient.description || '',
        website: patient.website || '',
      });
    }
  }, [patient, reset]);

  const onFormSubmit = (data: PatientFormSchema) => {
    const formData: PatientFormData = {
      name: data.name,
      avatar: data.avatar,
      description: data.description,
      website: data.website,
    };
    onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit(onFormSubmit)} className={styles.form}>
      <div className={styles.formSection}>
        <h3 className={styles.sectionTitle}>Basic Information</h3>
        
        <FormInput
          label="Full Name"
          {...register('name')}
          error={errors.name?.message}
          placeholder="Enter patient's full name"
          required
        />

        <FormInput
          label="Website"
          {...register('website')}
          error={errors.website?.message}
          placeholder="https://example.com"
          helper="Patient's personal or professional website"
        />
      </div>

      <div className={styles.formSection}>
        <h3 className={styles.sectionTitle}>Profile</h3>
        
        <FormInput
          label="Avatar URL"
          {...register('avatar')}
          error={errors.avatar?.message}
          placeholder="https://example.com/avatar.jpg"
          helper="URL to the patient's profile image"
        />

        <FormTextarea
          label="Description"
          {...register('description')}
          error={errors.description?.message}
          placeholder="Enter patient information, medical history, etc."
          rows={6}
        />
      </div>

      {isEditMode && patient && (
        <div className={styles.formSection}>
          <h3 className={styles.sectionTitle}>Record Information</h3>
          <div className={styles.readOnlyInfo}>
            <div className={styles.infoItem}>
              <span className={styles.infoLabel}>Patient ID:</span>
              <span className={styles.infoValue}>{patient.id}</span>
            </div>
            <div className={styles.infoItem}>
              <span className={styles.infoLabel}>Created At:</span>
              <span className={styles.infoValue}>
                {new Date(patient.createdAt).toLocaleString()}
              </span>
            </div>
          </div>
        </div>
      )}

      <div className={styles.formActions}>
        <Button
          type="button"
          variant="secondary"
          onClick={onCancel}
          disabled={isLoading}
        >
          Cancel
        </Button>
        <Button
          type="submit"
          variant="primary"
          isLoading={isLoading}
        >
          {isEditMode ? 'Update Patient' : 'Add Patient'}
        </Button>
      </div>
    </form>
  );
};

export default PatientForm;