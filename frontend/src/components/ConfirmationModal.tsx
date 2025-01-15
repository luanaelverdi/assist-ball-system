import React from 'react'
import styles from '../styles/components/ConfirmationModal.module.css'
import parse from 'html-react-parser'
import { OperationStatus } from '../hooks'
import Spinner from './Spinner'

interface ConfirmationModal {
  onConfirm: (e: React.MouseEvent<HTMLButtonElement>) => void;
  onCancel: () => void;
  elementText: string;
  actionText: string;
  status?: OperationStatus;
  children?: React.ReactNode;
}

export const ConfirmationModal: React.FC<ConfirmationModal> = ({
  onConfirm,
  onCancel,
  elementText,
  actionText,
  status = 'IDLE',
  children = null
}) => {
  return (
    <div className={styles['confirmation-container']}>
      <h2>{actionText}</h2>
      {parse(elementText)}
      {children}
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