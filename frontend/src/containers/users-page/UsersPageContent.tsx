import { useState } from 'react'
import { Modal } from '../../components/Modal'
import { Users } from '../../shared'
import { useMutate } from '../../hooks'
import { DeleteConfirmationModal } from '../../components/DeleteConfirmationModal'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { HiDotsHorizontal as OptionsIcon } from 'react-icons/hi'
import { EditUserForm } from './EditUserForm'
import { firePopup } from '../../utils'
import { DropdownOptions } from '../../components/DropdownOptions'
import { PaginatedTable } from '../../components/PaginatedTable'

interface UsersPageContentProps {
  handleSearch: React.ChangeEventHandler<HTMLInputElement>;
  users: Users[] | null;
  refetchUsers: () => void;
}

const readableRoleByRole = {
  dt: 'Dt',
  player: 'Player',
  administrador: 'Administrador'
}

const clickOptions = [
  { option: 'eliminar', label: 'Dar de baja' },
  { option: 'modificar', label: 'Modificar' },
  { option: 'ver detalle', label: 'Ver Detalle' }
]

export const UsersPageContent = ({
  handleSearch,
  users,
  refetchUsers
}: UsersPageContentProps) => {
  const navigate = useNavigate()

  const [currentUser, setCurrentUser] = useState<Users | null>(null)
  const [modalContent, setModalContent] = useState<{ id: number; type: string } | null>(null)
  const [showOptions, setShowOptions] = useState(false)

  const toggleOptions = (id: number) => {
    setCurrentUser(users?.find(x => x.id_user === id) ?? null)
    setShowOptions(!showOptions)
  }

  const [searchParams] = useSearchParams()

  const deleteUser = useMutate({
    onSuccess: () => {
      firePopup('El usuario ha sido dado de baja correctamente.', 'success')
      setModalContent(null)
    },
    onError: () => {
      firePopup('Ocurrió un error al dar de baja el usuario.', 'error')
    }
  })

  const handleOpenModalDelete = (id: number) => {
    setCurrentUser(users?.find(x => x.id_user === id) ?? null)
    setModalContent({
      id,
      type: 'DELETE'
    })
  }

  const handleDeleteConfirm = async () => {
    if (currentUser === null)
      return

    await deleteUser.mutate({
      method: 'POST',
      endpoint: `user/delete/${encodeURIComponent(currentUser.id_user)}`,
      data: {}
    })
  }

  const handleOpenModalModify = (id: number) => {
    setCurrentUser(users?.find(x => x.id_user === id) ?? null)
    setModalContent({
      id,
      type: 'MODIFY'
    })
  }

  const handleCreateUser = () => {
    navigate('/registro-usuario')
  }

  const handleCloseModal = (refetch = false) => {
    setModalContent(null)
    if (refetch)
      refetchUsers()
  }

  const handleOptionClick = (id: number, action: string) => {
    switch (action) {
      case 'eliminar':
        handleOpenModalDelete(id)
        break
      case 'modificar':
        handleOpenModalModify(id)
        break
      case 'ver detalle':
        navigate(`/gestion-usuarios/${id}`)
        break
    }
    setShowOptions(false)
  }

  if (users === null)
    return null

  return (
    <>
      <div className="users-page-content">
        <input
          type="text"
          className='search-input'
          value={searchParams.get('search') ?? ''}
          placeholder="BUSCADOR"
          onChange={handleSearch}
        />
        <button className="create-btn" onClick={handleCreateUser} >+ Crear nuevo usuario</button>
        <PaginatedTable<Users>
          columns={['ID', 'Nombre', 'Email', 'Rol', 'Estado', 'Opciones',]}
          rowsPerPage={20}
          data={users}
          renderRow={(user) => (
            <tr key={user.id_user}>
              <td className="user-id">{user.id_user}</td>
              <td>{user.fullname_user}</td>
              <td>{user.email_user}</td>
              <td>{readableRoleByRole[user.type_user as keyof typeof readableRoleByRole]}</td>
              <td>{user.state_user}</td>
              <td style={{ textAlign: 'center' }}>
                <button onClick={() => toggleOptions(user.id_user)} className='user-options-button'>
                  <OptionsIcon />
                </button>
                {showOptions && currentUser?.id_usuario === user.id_usuario && (
                  <DropdownOptions
                    handleClose={() => setShowOptions(false)}
                    options={clickOptions}
                    handleClickOption={(option) => handleOptionClick(user.id_user, option)} />
                )}
              </td>
            </tr>
          )} >
        </PaginatedTable>
      </div>
      {modalContent !== null && modalContent.type === 'MODIFY' && currentUser !== null && (
        <Modal isActive={modalContent.type === 'MODIFY'}>
          <EditUserForm
            onClose={handleCloseModal}
            user={currentUser}
            key={currentUser?.id_user}
          />
        </Modal>
      )}
      {modalContent !== null && modalContent.type === 'DELETE' && currentUser !== null && (
        <Modal isActive={modalContent.type === 'DELETE'}>
          <DeleteConfirmationModal
            onConfirm={handleDeleteConfirm}
            onCancel={handleCloseModal}
            elementText={`el usuario ${currentUser?.fullname_user}`}
            status={deleteUser.status}
          />
        </Modal>
      )}
    </>
  )
}
