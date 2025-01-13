import { Pantalla } from '../shared'
import styles from '../styles/components/ScreenCardDesktop.module.css'
import { useNavigate } from 'react-router-dom'

export const ScreenCardDesktop = ({
  screen
}: { screen: Pantalla }) => {
  const navigate = useNavigate()

  const handleGoToPath = () => {
    navigate(screen.path)
  }

  return (
    <div className={styles.card} onClick={handleGoToPath}>
      <div className={styles['image-container']}>
        <img src={screen.path_imagen} alt={screen.nombre} />
        <div className={styles['image-overlay']}></div>
      </div>
      <div className={styles['title-container']}>
        <button className={styles['title-button']}>
          {screen.nombre}
        </button>
      </div>
    </div>
  )
}