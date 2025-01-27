import React from 'react'
import styles from '../styles/components/Tab.module.css'

interface TabProps {
  label: string;
  isActive: boolean;
  onClick: () => void;
}

const Tab: React.FC<TabProps> = ({ label, isActive, onClick }) => (
  <div
    className={`${styles.tab} ${isActive ? styles.tabActive : ''}`}
    onClick={onClick}
  >
    {label}
  </div>
)

export default Tab