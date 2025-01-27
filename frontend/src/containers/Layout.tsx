import { Outlet, useNavigate } from 'react-router-dom'
import '../styles/index.css'
import { Navbar } from './Navbar'
import { UserContext, UserContextType } from '../hooks/UserContext'
import { useContext } from 'react'

export const Layout = () => {

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
      <Navbar handleGoToPath={handleGoToPath} handleLogout={handleLogout} />
      <Outlet />
    </div>
  )
}