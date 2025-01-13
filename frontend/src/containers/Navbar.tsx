import { ButtonIcon } from '../components/ButtonIcon'
import { IoIosLogOut as LogoutIcon } from 'react-icons/io'
import useWindowDimensions from '../hooks/useWindowDimensions'
import { UserContext, UserContextType } from '../hooks/UserContext'
import { useContext } from 'react'
import { Avatar } from '../containers/Avatar'


export const Navbar = ({
  handleGoToPath,
  handleLogout
}: { handleGoToPath: (path: string) => void; handleLogout: () => void}) => {
  const dimensions = useWindowDimensions()
  const currentUser = useContext(UserContext) as UserContextType

  if (dimensions.width >= 800) {
    return (
      <nav>
        <ButtonIcon handleOnClick={() => handleGoToPath('/')}>
          <img src='/logo.png' /> 
        </ButtonIcon>
        <div>
          <Avatar user={currentUser.user} />
        </div>
        <div>
          <ButtonIcon handleOnClick={handleLogout}>
            <LogoutIcon />
          </ButtonIcon>
        </div>
      </nav>
    )
  }

  return (
    <nav>
      <ButtonIcon handleOnClick={() => handleGoToPath('/')}>
        <img src='/logo.png' /> 
      </ButtonIcon>
      <Avatar user={currentUser.user} />
    </nav>
  )
}