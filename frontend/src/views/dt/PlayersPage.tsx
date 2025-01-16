import { FaTruck as SupplierIcon } from 'react-icons/fa'
import { useDataFetching } from '../../hooks'
import '../../styles/views/suppliers-page.css'
import { Users } from '../../shared'
import { PlayerPageContent } from '../../containers/players-page/PlayerPageContent'

export const PlayersPage = () => {
  const players = useDataFetching<Users[]>('user/searchUserByType/player')

  return (
   /* <ViewWithHeader
      icon={<SupplierIcon />} 
      title="Proveedores"
      data={suppliers.data} status={suppliers.status} error={suppliers.error}>*/
      <PlayerPageContent 
        players={players.data} 
        refetchPlayers={players.fetch}/>
    /*</ViewWithHeader>*/
  )
}