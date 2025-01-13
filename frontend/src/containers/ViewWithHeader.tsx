import React from 'react'
import '../styles/index.css'
import Spinner from '../components/Spinner'

interface ViewProps<T> {
  children: React.ReactNode;
  icon: React.ReactNode;
  title: string;
  status?: string;
  error?: string | null;
  data?: T | null;
}

export function ViewWithHeader <T>({
  children,
  icon,
  title,
  status = 'SUCCESS',
  error = null,
  data = null
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
    <div className="view with-header">
      <div className='header'>
        {icon} {title}
      </div>
      {children}
    </div>
  )
}