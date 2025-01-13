import { useEffect, useRef } from 'react'
import styles from '../styles/components/DropdownOptions.module.css'

interface DropdownOptionsProps {
  handleClose: () => void;
  options: { option: string; label: string; }[];
  handleClickOption: (option: string) => void;
}

export const DropdownOptions = ({
  handleClose,
  options,
  handleClickOption
}: DropdownOptionsProps) => {
  const dropdownRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        handleClose()
      }
    }

    // Add event listener
    document.addEventListener('mousedown', handleClickOutside)
    
    // Cleanup the event listener
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [ dropdownRef, handleClose ])

  return (
    <div className={styles['options-dropdown']} ref={dropdownRef} onBlur={handleClose}>
      {options.map(option => (
        <button onClick={() => handleClickOption(option.option)}>{option.label}</button>
      ))}
    </div>
  )
}