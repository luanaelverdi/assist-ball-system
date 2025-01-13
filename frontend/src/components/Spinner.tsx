import React from 'react'
import styles from '../styles/components/Spinner.module.css'

const Spinner = ({
  wholePage = false,
  style
}: { wholePage?: boolean; style?: React.CSSProperties }) => {
  return (
    <div className={styles.spinner} style={{ ...style, margin: wholePage ? 'initial' : 'auto' }} />
  )
}

export default Spinner