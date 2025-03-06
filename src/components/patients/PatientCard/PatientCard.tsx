import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Patient } from '../../../types/patient';
import Button from '../../common/Button/Button';
import styles from './PatientCard.module.css';

interface PatientCardProps {
  patient: Patient;
  onEdit: (patient: Patient) => void;
  onDelete: (id: string) => void;
}

const PatientCard: React.FC<PatientCardProps> = ({ patient, onEdit, onDelete }) => {
  const [expanded, setExpanded] = useState(false);

  const toggleExpand = () => {
    setExpanded(!expanded);
  };

  // Format date for better display
  const formatDate = (dateString: string) => {
    const options: Intl.DateTimeFormatOptions = { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit' 
    };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  // Get initials for avatar fallback
  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map(part => part[0])
      .join('')
      .toUpperCase();
  };

  return (
    <motion.div
      className={`${styles.card} ${expanded ? styles.expanded : ''}`}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      layout
    >
      <div className={styles.header}>
        <div className={styles.patientInfo}>
          <div className={styles.avatarContainer}>
            {patient.avatar ? (
              <img
                src={patient.avatar.startsWith('file://') 
                  ? 'https://ui-avatars.com/api/?name=' + encodeURIComponent(patient.name) + '&background=4361ee&color=fff'
                  : patient.avatar}
                alt={`${patient.name}`}
                className={styles.avatar}
                onError={(e) => {
                  // Replace broken images with a name-based avatar
                  (e.target as HTMLImageElement).src = `https://ui-avatars.com/api/?name=${encodeURIComponent(patient.name)}&background=4361ee&color=fff`;
                }}
              />
            ) : (
              <div className={styles.initialAvatar}>
                {getInitials(patient.name)}
              </div>
            )}
          </div>
          <div className={styles.nameAndDetails}>
            <h3 className={styles.name}>{patient.name}</h3>
            {patient.website && (
              <a href={patient.website} target="_blank" rel="noopener noreferrer" className={styles.website}>
                {patient.website.replace(/^https?:\/\//, '')}
              </a>
            )}
          </div>
        </div>
        <div className={styles.actions}>
          <Button
            variant="ghost"
            size="small"
            className={styles.actionButton}
            onClick={() => onEdit(patient)}
            aria-label="Edit patient"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className={styles.actionIcon}
            >
              <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path>
              <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path>
            </svg>
          </Button>
          <Button
            variant="ghost"
            size="small"
            className={styles.actionButton}
            onClick={() => onDelete(patient.id)}
            aria-label="Delete patient"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className={styles.actionIcon}
            >
              <polyline points="3 6 5 6 21 6"></polyline>
              <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
            </svg>
          </Button>
        </div>
      </div>

      <div className={styles.body}>
        <div className={styles.infoRow}>
          <div className={styles.infoGroup}>
            <span className={styles.infoLabel}>ID:</span>
            <span className={styles.infoValue}>{patient.id}</span>
          </div>
          <div className={styles.infoGroup}>
            <span className={styles.infoLabel}>Created:</span>
            <span className={styles.infoValue}>{formatDate(patient.createdAt)}</span>
          </div>
        </div>
        <div className={styles.infoRow}>
          <div className={styles.infoGroup}>
            <span className={styles.infoLabel}>Description:</span>
            <span className={styles.infoValue}>
              {patient.description 
                ? patient.description.length > 50 
                  ? patient.description.substring(0, 50) + '...' 
                  : patient.description
                : 'No description available.'}
            </span>
          </div>
        </div>
      </div>

      <div className={styles.footer}>
        <Button
          variant="secondary"
          size="small"
          onClick={toggleExpand}
          className={styles.expandButton}
        >
          {expanded ? 'Hide Details' : 'Show Details'}
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className={`${styles.expandIcon} ${expanded ? styles.rotated : ''}`}
          >
            <polyline points="6 9 12 15 18 9"></polyline>
          </svg>
        </Button>
      </div>

      <AnimatePresence>
        {expanded && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className={styles.expandedContent}
          >
            <div className={styles.detailSection}>
              <h4 className={styles.sectionTitle}>Full Description</h4>
              <p className={styles.detailContent}>
                {patient.description || 'No description available.'}
              </p>
            </div>

            <div className={styles.detailSection}>
              <h4 className={styles.sectionTitle}>Website</h4>
              {patient.website ? (
                <a 
                  href={patient.website} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className={styles.websiteLink}
                >
                  {patient.website}
                </a>
              ) : (
                <p className={styles.detailContent}>No website available.</p>
              )}
            </div>

            <div className={styles.detailSection}>
              <h4 className={styles.sectionTitle}>Record Info</h4>
              <div className={styles.recordInfo}>
                <div className={styles.infoGroup}>
                  <span className={styles.infoLabel}>Patient ID:</span>
                  <span className={styles.infoValue}>{patient.id}</span>
                </div>
                <div className={styles.infoGroup}>
                  <span className={styles.infoLabel}>Created At:</span>
                  <span className={styles.infoValue}>{formatDate(patient.createdAt)}</span>
                </div>
              </div>
            </div>

            <div className={styles.detailSection}>
              <h4 className={styles.sectionTitle}>Avatar URL</h4>
              <p className={styles.detailContent} style={{ wordBreak: 'break-all' }}>
                {patient.avatar || 'No avatar URL available.'}
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default PatientCard;