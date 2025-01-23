import { useContext } from 'react'
//import { HomepageContent } from '../containers/homepage/HomepageContent'
//import { View } from '../containers/View'
import { useDataFetching } from '../hooks'
import { UserContext, UserContextType } from '../hooks/UserContext'
//import { Pantalla } from '../shared'
import '../styles/views/homepage.css'
//import { MechanicHomepage } from './MechanicHomepage'

export const HomePage = () => {
  //const roleOptions = useDataFetching<Pantalla[]>('pantalla')
  const currentUser = useContext(UserContext) as UserContextType

  return (
    <h1>HOME </h1>
  )
}