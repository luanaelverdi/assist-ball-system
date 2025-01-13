import { FaUser as UserIcon } from 'react-icons/fa'
import { IoMdHome as HomeIcon } from 'react-icons/io'
import { IoIosLogOut as LogoutIcon } from 'react-icons/io'
import { Outlet, useNavigate } from 'react-router-dom'
import { ButtonIcon } from '../components/ButtonIcon'
import '../styles/index.css'
import useWindowDimensions from '../hooks/useWindowDimensions'
import { Navbar } from './Navbar'
import { UserContext, UserContextType } from '../hooks/UserContext'
import { useContext } from 'react'


export const Layout = () => {
  const dimensions = useWindowDimensions()

  const currentUser = useContext(UserContext) as UserContextType

  const navigate = useNavigate()

  const handleGoToPath = (path: string) => {
    navigate(path)
  }

  const handleLogout = () => {
    currentUser.onLogout()
    localStorage.removeItem('token')
    navigate('/login')
  }

  return (
    <div className="layout">
      <Navbar handleGoToPath={handleGoToPath} handleLogout={handleLogout}/>
      <Outlet />
      {dimensions.width < 800 && (
        <footer>
          <ButtonIcon handleOnClick={() => {}}>
            <UserIcon />
          </ButtonIcon>
          <ButtonIcon handleOnClick={() => handleGoToPath('/')}>
            <HomeIcon style={{ fontSize : '40px' }}/>
          </ButtonIcon>
          <ButtonIcon handleOnClick={handleLogout}>
            <LogoutIcon style={{ fontSize : '40px' }}/>
          </ButtonIcon>
        </footer>
      )}
    </div>
  )
}