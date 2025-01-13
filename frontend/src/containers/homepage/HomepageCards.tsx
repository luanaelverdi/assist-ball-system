import { ScreenCard } from '../../components/ScreenCard'
import { Pantalla } from '../../shared'

export const HomepageCards = ({
  screens
}: { screens: Pantalla[] }) => {
  return (
    <div className={`homepage-cards-container ${screens.length === 3 ? 'three' : 'four'}`}>
      {screens.length > 0 && screens.map((screen) => {
        return <ScreenCard screen={screen} />
      })
      }
    </div>
  )
}