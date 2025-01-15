import React, { ComponentProps } from 'react'
import styles from '../styles/components/TextField.module.css'

type TextFieldProps = ComponentProps<'input'> & {
  label: string;
  fullWidth?: boolean;
}

export const TextField: React.FC<TextFieldProps> = ({
  label,
  name,
  fullWidth = false,
  ...props
}) => {
  const finalInputMode = props.type === 'number' ? 'numeric': props.inputMode

  return (
    <div className={styles['form-group']} data-fullwidth={fullWidth ? 'true' : 'false'}>
      <label htmlFor={name} className={styles.label}>
        {label}
      </label>
      <input
        id={name}
        name={name}
        className={styles.input}
        inputMode={finalInputMode}
        {...props}
      />
    </div>
  )
}