import { ButtonIcon } from '../components/ButtonIcon'
import { IoIosLogOut as LogoutIcon } from 'react-icons/io'
import { UserContext, UserContextType } from '../hooks/UserContext'
import { useContext } from 'react'
import { Avatar } from '../containers/Avatar'


export const Navbar = ({
  handleGoToPath,
  handleLogout
}: { handleGoToPath: (path: string) => void; handleLogout: () => void}) => {
  const currentUser = useContext(UserContext) as UserContextType

  return (
    <nav>
      <ButtonIcon handleOnClick={() => handleGoToPath('/')}>
        <img src='/ESCUDO_JUVE-removebg-preview.png' alt="logo" className="logo-img" />
      </ButtonIcon>
      <Avatar user={currentUser.user} />
      <div>
          <ButtonIcon handleOnClick={handleLogout}>
            <LogoutIcon />
          </ButtonIcon>
        </div>
    </nav>
  )
}