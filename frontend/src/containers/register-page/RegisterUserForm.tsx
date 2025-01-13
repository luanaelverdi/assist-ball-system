import { TextField } from '../../components/TextField'
import { useDataFetching, useMutate } from '../../hooks'
import { CreateUsers, Users } from '../../shared'
import { useFormState } from '../../hooks/useFormState'
import { Select } from '../../components/Select'
import Spinner from '../../components/Spinner'
import { useNavigate } from 'react-router-dom'
import { firePopup } from '../../utils'
import { useState } from 'react'

export const RegisterUserForm = () => {
  const navigate = useNavigate()
  const [ error, setError ] = useState('')

  function validarEmail(email: string) {
    const regex = /^[^\s@]+@[^\s@]+\.com$/
    return regex.test(email)
  }

  function validarContraseña(contraseña: string) {
    const regex = /^(?=.*[A-Za-z]{6,})(?=.*\d{2,}).*$/
    return regex.test(contraseña)
  }

  const registerClient = useMutate({
    onSuccess: () => {
      firePopup( 'El usuario ha sido creado correctamente.', 'success')
      navigate('/gestion-usuarios')
    },
    onError: () => {
      firePopup('La creación del usuario no fue exitosa.', 'error')
    }
  })

  const { state: newUser, ...formHandlers } = useFormState<CreateUsers>({
    email: '',
    password: '',
    type: ''
  }, registerClient.clear)


  const handleRegisterUser:React.FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault()

    if (!validarEmail(newUser.email)) {
      setError('Por favor, ingresa un email válido.')
      return
    }

    if (!validarContraseña(newUser.password)) {
      setError('La contraseña debe tener por lo menos 6 letras y 2 números.')
      return
    }

    setError('')
    await registerClient.mutate({
      method: 'POST',
      endpoint: 'user',
      data: newUser
    })
  }

  return (
    <div className="form-section">
      <h3>Usuario a registrar</h3>
      <form onSubmit={handleRegisterUser} className='form'>
        <TextField 
          name="email" 
          label="Email del usuario" 
          value={newUser.email}
          onChange={formHandlers.handleInputChange} 
          required />
        <TextField 
          name="password" 
          label="Contraseña del usuario" 
          value={newUser.password}
          onChange={formHandlers.handleInputChange} 
          required />
        <Select
          label='Rol del usuario'
          name='tipo'
          onChange={(e) => formHandlers.handleSelectChange(e, 'text')}
          value={newUser.type}
          required>
          <option value="">Selecciona un rol</option>
          <option value="operador">DT</option>
          <option value="administrador">Administrador</option>
          <option value="supervisor">Player</option>
        </Select>
        {registerClient.status === 'LOADING' && (
          <Spinner style={{ width: '2rem', height: '2rem' }} />
        )}
        {registerClient.status === 'ERROR' && (
          <span>ERROR: {registerClient.error}</span>
        )}
        {error && <span className="error">{error}</span>}
        <div className="form-actions">
          <button type="submit" disabled={registerClient.status === 'LOADING'}>Registrar Usuario</button>
          <button onClick={() => navigate('/')} type="button" disabled={registerClient.status === 'LOADING'}>Cancelar</button>
        </div>
      </form>
    </div>
  )
}
