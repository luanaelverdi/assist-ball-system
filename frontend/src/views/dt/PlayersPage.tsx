import { FaTruck as SupplierIcon } from 'react-icons/fa'
import { useDataFetching } from '../../hooks'
import '../../styles/views/suppliers-page.css'
import { Users } from '../../shared'
import { PlayerPageContent } from '../../containers/players-page/PlayerPageContent'
import { ViewWithHeader } from '../../containers/ViewWithHeader'

export const PlayersPage = () => {
  const players = useDataFetching<Users[]>('user/searchUserByType/player')

  return (
    <ViewWithHeader
      icon={<SupplierIcon />}
      title="JUGADORES"
      data={players.data} status={players.status} error={players.error}>*/
      <PlayerPageContent
        players={players.data}
        refetchPlayers={players.fetch} />
    </ViewWithHeader>
  )
}