import { Users } from '../shared'
import '../styles/components/PlayerCard.module.css'
import { useNavigate } from 'react-router-dom'

export const PlayerCard = ({ player }: { player: Users }) => {
  const navigate = useNavigate()
  return(
    <div className='card'>
      <h1>{player.fullname_user}</h1>
      <h2>Datos personales</h2>
      <h3>DNI: {player.dni_user}</h3>
      <h3>Email: {player.email_user}</h3>
      <h3>Categoría: {player.category_user}</h3>
      <button onClick={() => navigate(`/asistencias/${player.id_user}`)}>Ver asistencias</button>
    </div>
    
  )
}
