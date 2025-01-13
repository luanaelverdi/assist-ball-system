import { HomepageCards } from './HomepageCards'
import { Pantalla } from '../../shared'
// import { UserContext, UserContextType } from '../../hooks/UserContext'
// import { useContext } from 'react'

export const HomepageContent = ({
  screens
}: { screens: Pantalla[] | null }) => {
  //const currentUser = useContext(UserContext) as UserContextType

  if (screens === null)
    return null

  return (
    <div className="homepage-content">
      <HomepageCards screens={screens}/>
    </div>
  )
}