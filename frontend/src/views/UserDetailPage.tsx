import '../styles/views/user-detail.css'
import { View } from '../containers/View'
import { useDataFetching } from '../hooks'
import { Users } from '../shared'
import { useParams } from 'react-router-dom'
import { UserDetailPageContent } from '../containers/user-page/UserDetailPageContent'

export const UserDetailPage = () => {
  const params = useParams()
  const userId = params.usuarioId ?? ''
  const user = useDataFetching<Users>(`user/${encodeURIComponent(userId)}`)


  return (
    <View data={user.data} status={user.status} error={user.error}>
      <UserDetailPageContent user={user.data} />
    </View>
  )
}