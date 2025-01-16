import { useNavigate, useSearchParams } from 'react-router-dom'
import '../styles/views/login-page.css'
import { MdOutlineRemoveRedEye } from 'react-icons/md'
import { FaEyeSlash } from 'react-icons/fa'
import { useContext, useState } from 'react'
import { UserContext, UserContextType } from '../hooks/UserContext'
import { useMutate } from '../hooks'

export const LoginPage = () => {
  const [ params ] = useSearchParams()
  const currentUser = useContext(UserContext) as UserContextType

  const navigate = useNavigate()
  const [ error, setError ] = useState('')
  const [ isExpanded, setIsExpanded ] = useState<boolean>(false)

  const login = useMutate<{ token:string }>({
    onSuccess: (data) => {
      localStorage.setItem('token', data.token)
      currentUser.onLogin()
      
      const callback = params.get('callback')

      if (callback != null)
        window.location.href = callback
      else
        navigate('/')
    },
  })

  const validarEmail = (email: string) => {
    const regex = /^[^\s@]+@[^\s@]+\.com$/
    return regex.test(email)
  }

  const handleLogin = async(e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const form = e.target as HTMLFormElement
    const values = {
      email: form.email.value,
      password: form.password.value,
    }

    if (!validarEmail(values.email)) {
      setError('Por favor, ingresa un email válido.')
      return
    }

    setError('')

    await login.mutate({
      endpoint: 'auth',
      data: values,
      method: 'POST',
    })
  }

  const handleSetErrorFalse = () => {
    setError('')
  }

  const seePassword = () =>{
    setIsExpanded(!isExpanded)
  }

  return (
    <div className="login-container">
      <form className="login-form" onSubmit={handleLogin} >
        <h1>Iniciar sesión</h1>
        <input 
          type="text"
          placeholder="Ingrese su email" 
          name="email" 
          className="login-input" 
          onChange={handleSetErrorFalse}  
        />
        <div className='input-password'>
          {!isExpanded ? (<input type="password" placeholder="Ingrese su contraseña" name="password"  className="login-input" />) : (
            (<input type="text" placeholder="Ingrese su contraseña" name="password"  className="login-input" />)
          )}
          <button type='button' onClick={seePassword} className="see-password-button">
            {isExpanded ? <FaEyeSlash /> : <MdOutlineRemoveRedEye />}
          </button>
        </div>

        {login.status === 'ERROR' && (
          <span className='error'>{login.error}</span>
        )}
        <a href="/password-reset" className="forgot-password">Olvidé mi contraseña</a>
        {error && <span className="error">{error}</span>}
        <button className="login-button">Entrar</button>
      </form>
    </div>
  )
}
