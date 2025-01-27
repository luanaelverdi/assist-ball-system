import { PlayerCard } from '../../components/PlayerCard'
import { Users } from '../../shared'

interface PlayerPageContentProps {
  players: Users[] | null;
}

export const PlayerPageContent = ({
  players
}: PlayerPageContentProps) => {

  if (players === null)
    return null

  return (
    <>
      <div className="supplier-page-content">
        <div className='cards-container'>
          {players
            .filter(player => player.state_user === 'alta')
            .map((player, index) => (
              <PlayerCard
                key={player.id_user}
                player={player}
              />
            ))}
        </div>
      </div>

    </>
  )
}
