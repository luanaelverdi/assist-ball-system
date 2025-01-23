import { HomepageContent } from '../containers/homepage/HomepageContent'
import { View } from '../containers/View'
import { useDataFetching } from '../hooks'
import { Pantalla } from '../shared'
import '../styles/views/homepage.css'

export const HomePage = () => {
  const roleOptions = useDataFetching<Pantalla[]>('pantalla')

  return (
    <View error={roleOptions.error} status={roleOptions.status} data={roleOptions.data}>
      <HomepageContent screens={roleOptions.data ?? null} />
    </View>
  )
}