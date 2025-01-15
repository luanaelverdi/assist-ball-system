import React, { ComponentProps } from 'react'
import styles from '../styles/components/Textarea.module.css'

type TextFieldProps = ComponentProps<'textarea'> & {
  label: string;
}

export const Textarea: React.FC<TextFieldProps> = ({
  name,
  label,
  ...props
}) => {
  return (
    <div className={styles.formGroup}>
      <label htmlFor={name} className={styles.label}>
        {label}
      </label>
      <textarea
        id={name}
        name={name}
        className={styles.input}
        {...props}
      />
    </div>
  )
}