import { useDataFetching, useSearchBar } from '../hooks'
import '../styles/views/users-page.css'
import { Users } from '../shared'
//import { View } from '../containers/View'
import { UsersPageContent } from '../containers/users-page/UsersPageContent'

export const UsersPage = () => {
  const users = useDataFetching<Users[]>('user')
  const { handleSearch } = useSearchBar(users.fetch)

  return (
    //<View data={users.data} status={users.status} error={users.error}>
      <UsersPageContent 
        handleSearch={handleSearch} 
        users={users.data} 
        refetchUsers={users.fetch}/>
    //</View>
  )
}