import Spinner from '../components/Spinner'
import '../styles/index.css'

interface ViewProps<T> {
  children: React.ReactNode;
  status?: string;
  data?: T | null;
  error?: string | null;
}

export function View <T>({
  children,
  status = 'SUCCESS',
  data = null,
  error = null
}: ViewProps<T>) {
  if (status === 'LOADING') {
    return (
      <div className='view loading'>
        <h4>Cargando...</h4>
        <Spinner wholePage/>
      </div>
    )
  }

  if (status === 'ERROR' && data === null){
    return (
      <div className='view error'>
        <h4>{error !== null ? error : 'Ocurrio un error al cargar la pagina.'}</h4>
      </div>
    )
  }

  return (
    <div className="view">
      {children}
    </div>
  )
}