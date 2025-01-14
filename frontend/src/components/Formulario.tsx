import './Formulario.css'


export function Formulario(){
  return (
    <div className='formulario'>
        <h1>Login</h1>
        <form className='form'>
            <label htmlFor="email">Email</label>
            <input type="email" />
            <label htmlFor="password">Password</label>
            <input type="password" />
            <button>Login</button>
        </form>
    </div>
  )
}