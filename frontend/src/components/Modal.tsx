import React from 'react'
import styles from '../styles/components/Modal.module.css'

export const Modal = ({
  children,
  isActive
}: { children: React.ReactNode; isActive: boolean; }) => {
  return (
    <div className={`${styles['modal-overlay']} ${isActive ? '' : styles.closing}`}>
      {children}    
    </div>
  )
}