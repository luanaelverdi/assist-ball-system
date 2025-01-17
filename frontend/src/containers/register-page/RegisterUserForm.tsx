import { TextField } from '../../components/TextField'
import { useDataFetching, useMutate } from '../../hooks'
import { CreateUser, Users } from '../../shared'
import { useFormState } from '../../hooks/useFormState'
import { Select } from '../../components/Select'
import Spinner from '../../components/Spinner'
import { useNavigate } from 'react-router-dom'
import { firePopup } from '../../utils'
import { useState } from 'react'

export const RegisterUserForm = () => {
  const navigate = useNavigate()
  const [error, setError] = useState('')

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
      firePopup('El usuario ha sido creado correctamente.', 'success')
      navigate('/gestion-usuarios')
    },
    onError: () => {
      firePopup('La creación del usuario no fue exitosa.', 'error')
    }
  })

  const { state: newUser, ...formHandlers } = useFormState<CreateUser>({
    dni_user: 0,
    fullname_user: '',
    email_user: '',
    password_user: '',
    category_user: '',
    type_user: ''
  }, registerClient.clear)

  const handleRegisterUser: React.FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault()

    if (!validarEmail(newUser.email_user)) {
      setError('Por favor, ingresa un email válido.')
      return
    }

    if (!validarContraseña(newUser.password_user)) {
      setError('La contraseña debe tener por lo menos 8 digitos.')
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
      <h1>Usuario a registrar</h1>
      <form onSubmit={handleRegisterUser} className='form'>
        <TextField 
          name="dni_user"
          label="DNI del usuario"
          value={newUser.dni_user}
          onChange={formHandlers.handleInputChange}
          className='input'

          required />
        <TextField
          name="fullname_user"
          label="Nombre del usuario"
          value={newUser.fullname_user}
          onChange={formHandlers.handleInputChange}
          className='input'

          required />
        <TextField
          name="email_user"
          label="Email del usuario"
          value={newUser.email_user}
          onChange={formHandlers.handleInputChange}
          className='input'
          required />
        <TextField
          name="password_user"
          label="Contraseña del usuario"
          value={newUser.password_user}
          onChange={formHandlers.handleInputChange}
          className='input'

          required />
        <Select 
          label='Rol del usuario'
          name='type_user'
          onChange={(e) => formHandlers.handleSelectChange(e, 'text')}
          value={newUser.type_user}
          required>
          <option className='option' value="">Selecciona un rol</option>
          <option className='option' value="dt">DT</option>
          <option className='option' value="player">Jugador</option>

        </Select>
        <TextField
          name="category_user"
          label="Categoría del usuario"
          value={newUser.category_user}
          onChange={formHandlers.handleInputChange}
          className='input'

          required />
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
