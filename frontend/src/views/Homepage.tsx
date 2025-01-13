import { useContext } from 'react'
import { HomepageContent } from '../containers/homepage/HomepageContent'
import { View } from '../containers/View'
import { useDataFetching } from '../hooks'
import { UserContext, UserContextType } from '../hooks/UserContext'
import { Pantalla } from '../shared'
import '../styles/views/homepage.css'

export const Homepage = () => {
  const roleOptions = useDataFetching<Pantalla[]>('pantalla')
  const currentUser = useContext(UserContext) as UserContextType

  return (
    <View error={roleOptions.error} status={roleOptions.status} data={roleOptions.data}>
      <HomepageContent screens={roleOptions.data ?? null} />
    </View>
  )
}