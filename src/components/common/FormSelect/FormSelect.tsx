import { SelectHTMLAttributes, forwardRef } from 'react';
import styles from './FormSelect.module.css';

interface SelectOption {
  value: string;
  label: string;
}

interface FormSelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
  label: string;
  options: SelectOption[];
  error?: string;
  helper?: string;
}

const FormSelect = forwardRef<HTMLSelectElement, FormSelectProps>(
  ({ label, options, error, helper, id, className, ...props }, ref) => {
    const selectId = id || `select-${label.toLowerCase().replace(/\s+/g, '-')}`;

    return (
      <div className={styles.formControl}>
        <label htmlFor={selectId} className={styles.label}>
          {label}
        </label>
        <select
          ref={ref}
          id={selectId}
          className={`
            ${styles.select}
            ${error ? styles.hasError : ''}
            ${className || ''}
          `}
          {...props}
        >
          <option value="">Select {label}</option>
          {options.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
        {helper && !error && <p className={styles.helper}>{helper}</p>}
        {error && <p className={styles.error}>{error}</p>}
      </div>
    );
  }
);

FormSelect.displayName = 'FormSelect';

export default FormSelect;