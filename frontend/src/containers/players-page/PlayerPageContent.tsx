import { useState } from 'react'
import { PlayerCard } from '../../components/PlayerCard'
import { Modal } from '../../components/Modal'
import { Users } from '../../shared'
import { useMutate } from '../../hooks'
import { DeleteConfirmationModal } from '../../components/DeleteConfirmationModal'
import { firePopup } from '../../utils'
// import { useNavigate } from 'react-router-dom'

interface PlayerPageContentProps {
  players: Users[] | null;
  refetchPlayers: () => void;
}

export const PlayerPageContent = ({
    players,
    refetchPlayers
}: PlayerPageContentProps) => {
  const [ currentPlayer, setCurrentPlayer ] = useState<Users | null>(null)
  const [ modalContent, setModalContent ] = useState<{ id: number; type: string} | null>(null)

  const deleteSupplier = useMutate({
    onSuccess: () => {
      firePopup( 'El jugador ha sido dado de baja correctamente.', 'success')
      refetchPlayers()
      setModalContent(null)
    },
    onError: () => {
      firePopup('Ocurrió un error al dar de baja al proveedor.', 'error')
    }
  })

  const handleOpenModalDelete = (id: number) => {
    setCurrentPlayer(players?.find(x => x.id_user === id) ?? null)
    setModalContent({
      id,
      type: 'DELETE'
    })
  }

  const handleDeleteConfirm = async () => {
    if (currentPlayer === null)
      return

    await deleteSupplier.mutate({
      method: 'POST',
      endpoint: `user/delete/${currentPlayer.id_user}`,
      data: {}
    })
  }

  const handleOpenModalModify = (id: number) => {
    setCurrentPlayer(players?.find(x => x.id_user === id) ?? null)
    setModalContent({
      id,
      type: 'MODIFY'
    })
  }

  const handleOpenModalCreate = () => {
    setModalContent({
      id: 0, // 0 porque es un nuevo Proveedor
      type: 'CREATE'
    })
  }

  const handleCloseModal = (refetch = false) => {
    setModalContent(null)
    if (refetch)
        refetchPlayers()
  }

  if (players === null)
    return null

  return (
    <>
      <div className="supplier-page-content">
        {/* supplier cards */}
        <div className='cards-container'>
          {players
            .filter(player => player.state_user === 'alta') 
            .map((player, index) => (
              <PlayerCard 
                handleOpenDetail={() => {}}
                key={player.id_user}
                index={index}
                handleDelete={handleOpenModalDelete}
                handleModify={handleOpenModalModify}
                player={player}
              />
            ))}
        </div>
      </div>

      {/* editar Proveedor modal
      {modalContent !== null && modalContent.type === 'MODIFY' && currentPlayer !== null && (
        <Modal isActive={modalContent.type === 'MODIFY'}>
          <EditPlayerForm 
            onClose={handleCloseModal}
            supplier={currentPlayer}
            key={currentPlayer?.id_user}
          />
        </Modal>
      )} */}

      {/* confirmar eliminar Proveedor modal
      {modalContent !== null && modalContent.type === 'DELETE' && currentPlayer !== null && (
        <Modal isActive={modalContent.type === 'DELETE'}>
          <DeleteConfirmationModal
            status={deletePlayer.status}
            onConfirm={handleDeleteConfirm}
            onCancel={handleCloseModal}
            elementText={`El Proveedor ${currentPlayer?.id_user}`}
          />
        </Modal>
      )} */}

      {/* crear nueva Proveedor modal
      {modalContent !== null && modalContent.type === 'CREATE' && (
        <Modal isActive={modalContent.type === 'CREATE'}>
          <CreatePlayerForm onClose={handleCloseModal} />
        </Modal>
      )} */}
    </>
  )
}
