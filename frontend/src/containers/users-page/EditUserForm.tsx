import React, { useState } from 'react'
import { useMutate } from '../../hooks'
import { Users } from '../../shared'
import { TextField } from '../../components/TextField'
import Spinner from '../../components/Spinner'
import { Select } from '../../components/Select'
import { firePopup } from '../../utils'

export const EditUserForm = ({
  user,
  onClose
}: {
  user: Users
  onClose: (refectch?: boolean) => void
}) => {
  const [ editedUser, setEditedUser ] = useState<Users>(user)
  const editUser = useMutate({
    onSuccess: () => {
      firePopup( 'El usuario ha sido modificado correctamente.', 'success')
      onClose(true)
    },
  })
  
  const handleConfirmEdition: React.FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault()
    await editUser.mutate({
      endpoint: `user/modify/${encodeURIComponent(user.id_user)}`,
      method: 'POST',
      data: editedUser,
    })
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    editUser.clear()
    const { name, value } = e.target

    let finalValue: number | string = value

    if (e.target.type === 'number' || e.target.type === 'select-one')
      finalValue = parseInt(value)

    setEditedUser(prev => ({ ...prev, [name]: finalValue }))
  }

  const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>, type: 'number' | 'text') => {
    editUser.clear()
    const { name, value } = e.target

    const finalValue = type === 'number' ? parseInt(value) : value

    setEditedUser(prev => ({ ...prev, [name]: finalValue }))
  }

  return (
    <div className="edit-supplier-form">
      <h2>Editar Usuario</h2>
      <form onSubmit={handleConfirmEdition} className='form'>
        <TextField
          name="nombre_usuario"
          label="Nombre del usuario"
          value={editedUser.fullname_user}
          onChange={handleInputChange}
          required
        />
        <TextField
          name="email_usuario"
          label="Email del usuario"
          value={editedUser.email_user}
          onChange={handleInputChange}
          required
        />
        <Select 
          label='Rol del usuario'
          name='tipo_usuario'
          value={editedUser.type_user}
          onChange={(e) => handleSelectChange(e, 'text')}
          required
        >
          <option value="operador">DT</option>
          <option value="administrador">Player</option>
          
        </Select>
        {editUser.status === 'LOADING' && (
          <Spinner style={{ width: '2rem', height: '2rem' }}/>
        )}
        {editUser.status === 'ERROR' && (
          <span>{editUser.error}</span>
        )}
        <div className="form-actions">
          <button type="submit" disabled={editUser.status === 'LOADING'}>Guardar cambios</button>
          <button type="button" onClick={() => onClose()} disabled={editUser.status === 'LOADING'}>Cancelar</button>
        </div>
      </form>
    </div>
  )
}