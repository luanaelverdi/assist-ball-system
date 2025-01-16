import { Users } from '../shared'
import styles from '../styles/components/SupplierCard.module.css'

interface PlayerCardProps {
  player: Users;
  index: number;
  handleModify: (id_user: number) => void;
  handleDelete: (id_user: number) => void;
  handleOpenDetail: (id_user: number) => void;
}

export const PlayerCard = ({
  player,
  handleModify,
  handleDelete,
  handleOpenDetail
}: PlayerCardProps) => {
  return (
    <div 
      className={styles.card}
      onClick={() => handleOpenDetail(player.id_user)}>
      <div className={styles.header}>
        <h3>{player.fullname_user}</h3>
      </div>
      <div className={styles.content}>
        <span>DNI: {player.dni_user}</span>
        <span>Mail: {player.email_user}</span>
      </div>
      <div className={styles.footer}>
        <button className={styles.deleteButton} onClick={() => handleDelete(player.id_user)}>
          ELIMINAR
        </button>
        <button className={styles.modifyButton} onClick={() => handleModify(player.id_user)}>
          MODIFICAR
        </button>
      </div>
    </div>
  )
}