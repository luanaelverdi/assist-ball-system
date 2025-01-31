import { useNavigate, useSearchParams } from 'react-router-dom'
import '../styles/views/login-page.css'
import { MdOutlineRemoveRedEye } from 'react-icons/md'
import { FaEyeSlash } from 'react-icons/fa'
import { useContext, useState } from 'react'
import { UserContext, UserContextType } from '../hooks/UserContext'
import { useMutate } from '../hooks'

export const LoginPage = () => {
  const [params] = useSearchParams()
  const currentUser = useContext(UserContext) as UserContextType

  const navigate = useNavigate()
  const [error, setError] = useState('')
  const [isExpanded, setIsExpanded] = useState<boolean>(false)

  const login = useMutate<{ token: string }>({
    onSuccess: (data) => {
      localStorage.setItem('token', data.token)
      console.log("token de usuario " + data.token)
      currentUser.onLogin()

      console.log("holi")

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

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
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
    console.log("usuario autenticado")
  }

  const handleSetErrorFalse = () => {
    setError('')
  }

  const seePassword = () => {
    setIsExpanded(!isExpanded)
  }

  return (
    <div className="login-container">
      <div className="logo">
        <h1>JUVENTUD <span>UNIDA</span></h1>
        <img src="/ESCUDO_JUVE-removebg-preview.png" alt="logo" className="logo-img" />

      </div>
      <form className="login-form" onSubmit={handleLogin} >
        <label htmlFor="email">Correo electrónico</label>
        <input
          type="text"
          id="email"
          placeholder='correo@ejemplo.com'
          onChange={handleSetErrorFalse}
          required
        />
        <div className='input-password'>
          <label htmlFor="password">Contraseña</label>
          {!isExpanded ? (<input type="password" name="password" className="login-input" placeholder='******' required />) : (
            (<input type="text" name="password" className="login-input" required />)
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


