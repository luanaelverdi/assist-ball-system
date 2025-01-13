import React from 'react'
import styles from '../styles/components/Select.module.css'

interface SelectProps {
  name: string;
  label: string;
  value: string | number;
  onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  children: React.ReactNode;
  defaultValue?: string | number;
  required?: boolean;
}

export const Select: React.FC<SelectProps> = ({
  name,
  label,
  value,
  onChange,
  children,
  required = false,
}) => {
  return (
    <div className={styles['form-group']}>
      <label htmlFor={name} className={styles.label}>
        {label}
      </label>
      <select
        id={name}
        name={name}
        value={value || ''}
        onChange={onChange}
        required={required}
        className={styles.select}>
        {children}
      </select>
    </div>
  )
}