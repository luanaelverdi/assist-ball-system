import { useDataFetching } from '../../hooks'
import '../../styles/views/suppliers-page.css'
import { Users } from '../../shared'
import { PlayerPageContent } from '../../containers/players-page/PlayerPageContent'
import { ViewWithHeader } from '../../containers/ViewWithHeader'

export const PlayersPage = () => {
  const players = useDataFetching<Users[]>('user/searchUserByType/player')

  return (
    <ViewWithHeader
      title="JUGADORES"
      status={players.status}
      error={players.error}
      icon={undefined}>
      <PlayerPageContent
        players={players.data}
      />

    </ViewWithHeader>
  )
}