import { Pantalla } from '../shared'
import styles from '../styles/components/ScreenCardMobile.module.css'
import { useNavigate } from 'react-router-dom'

export const ScreenCardMobile = ({
  screen
}: { screen: Pantalla }) => {
  const navigate = useNavigate()

  const handleGoToPath = () => {
    navigate(screen.path)
  }

  return (
    <div
      className={styles.card}
      onClick={handleGoToPath}>
      <div className={styles['card-overlay']}>
        <h3>{screen.nombre}</h3>
      </div>
    </div>
  )
}