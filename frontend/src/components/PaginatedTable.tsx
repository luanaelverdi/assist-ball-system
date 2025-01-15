import React, { useState } from 'react'
import styles from '../styles/components/Table.module.css'

interface TableProps<T> {
  columns: string[];
  data: T[];
  renderRow: (item: T) => React.ReactNode;
  rowsPerPage: 20
}

export function PaginatedTable <T>({
  columns,
  data,
  renderRow,
  rowsPerPage = 20
}: TableProps<T>) {
  const [ currentPage, setCurrentPage ] = useState(1)

  const handlePrevious = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1)
  }

  const handleNext = () => {
    if (currentPage < totalPages) setCurrentPage(currentPage + 1)
  }

  const totalPages = Math.ceil(data.length / rowsPerPage)
  const startIndex = (currentPage - 1) * rowsPerPage
  const endIndex = startIndex + rowsPerPage
  const currentRows = data.slice(startIndex, endIndex)

  return (
    <div className={`${styles['table-wrapper']}`}>
      <div className={styles['table-scroll']}>
        <table className={styles['table']}>
          <thead>
            <tr>
              {columns.map(column => (<th key={column}>{column}</th>))}
            </tr>
          </thead>
          <tbody>
            {currentRows.map(renderRow)}
          </tbody>
        </table>
      </div>
      <div className={styles.pagination}>
        <button
          onClick={handlePrevious}
          disabled={currentPage === 1}
          className={styles.button}
        >
        Anterior
        </button>
        <span className={styles.pageInfo}>
        Página {currentPage} de {totalPages}
        </span>
        <button
          onClick={handleNext}
          disabled={currentPage === totalPages}
          className={styles.button}
        >
        Siguiente
        </button>
      </div>
    </div>
  )
}