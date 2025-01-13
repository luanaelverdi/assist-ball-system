import { Pantalla } from '../shared'
import styles from '../styles/components/ScreenCardMobile.module.css'
import { FaList as ListIcon } from 'react-icons/fa'
import { FaMap as MapIcon } from 'react-icons/fa'
import { SlDocs as DocsIcon } from 'react-icons/sl'
import { FaCar as CarIcon } from 'react-icons/fa'
import { FaBox as StockIcon } from 'react-icons/fa'
import { FaRegChartBar as ChartIcon } from 'react-icons/fa6'
import { CiShoppingBasket as ShopIcon } from 'react-icons/ci'
import { FaWrench as WrenchIcon } from 'react-icons/fa'
import { useNavigate } from 'react-router-dom'

const IconPerIconName = {
  LIST: <ListIcon />,
  MAP: <MapIcon />,
  DOCS: <DocsIcon />,
  CAR: <CarIcon />,
  STOCK: <StockIcon />,
  CHART: <ChartIcon />,
  SHOP: <ShopIcon />,
  WRENCH: <WrenchIcon />
}

export const ScreenCardMobile = ({
  screen
}: { screen: Pantalla }) => {
  const navigate = useNavigate()

  const handleGoToPath = () => {
    navigate(screen.path)
  }

  return (
    <div 
      style={{ backgroundImage: `url(${screen.path_imagen})` }}
      className={styles.card}
      onClick={handleGoToPath}>
      <div className={styles['card-overlay']}>
        <span className={styles['card-icon']}>
          {IconPerIconName[screen.nombre_icono as keyof typeof IconPerIconName]}
        </span>
        <h3>{screen.nombre}</h3>
      </div>
    </div>
  )
}