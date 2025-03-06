import { TextareaHTMLAttributes, forwardRef } from 'react';
import styles from './FormTextarea.module.css';

interface FormTextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  label: string;
  error?: string;
  helper?: string;
}

const FormTextarea = forwardRef<HTMLTextAreaElement, FormTextareaProps>(
  ({ label, error, helper, id, className, ...props }, ref) => {
    const textareaId = id || `textarea-${label.toLowerCase().replace(/\s+/g, '-')}`;

    return (
      <div className={styles.formControl}>
        <label htmlFor={textareaId} className={styles.label}>
          {label}
        </label>
        <textarea
          ref={ref}
          id={textareaId}
          className={`
            ${styles.textarea}
            ${error ? styles.hasError : ''}
            ${className || ''}
          `}
          {...props}
        />
        {helper && !error && <p className={styles.helper}>{helper}</p>}
        {error && <p className={styles.error}>{error}</p>}
      </div>
    );
  }
);

FormTextarea.displayName = 'FormTextarea';

export default FormTextarea;