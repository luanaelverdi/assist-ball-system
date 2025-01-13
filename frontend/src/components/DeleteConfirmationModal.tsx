import React from 'react'
import styles from '../styles/components/DeleteConfirmationModal.module.css'
import { OperationStatus } from '../hooks'
import Spinner from './Spinner'

interface DeleteConfirmationModalProps {
  onConfirm: () => void;
  onCancel: () => void;
  elementText: string;
  additionalInfo?: React.ReactNode;
  status?: OperationStatus;
  actionText?: string;
}

export const DeleteConfirmationModal: React.FC<DeleteConfirmationModalProps> = ({
  onConfirm,
  onCancel,
  elementText,
  additionalInfo = null,
  status = 'IDLE',
  actionText = 'Confirmar eliminación'
}) => {
  return (
    <div className={styles['delete-confirmation']}>
      <h2>{actionText}</h2>
      <p>¿Estás seguro de que deseas dar de baja {elementText}?</p>
      {additionalInfo}
      <div className={styles['button-container']}>
        {status !== 'LOADING' && (
          <>
            <button className={styles['confirm-button']} onClick={onConfirm}>
          Confirmar
            </button>
            <button className={styles['cancel-button']} onClick={onCancel}>
          Cancelar
            </button>
          </>
        )}
        {status === 'LOADING' && (
          <Spinner />
        )}
      </div>
    </div>
  )
}