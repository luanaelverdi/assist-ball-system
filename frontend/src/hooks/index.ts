import { useCallback, useEffect, useState } from 'react'
import { request } from '../libraries/axios-lib'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { debounce } from '../utils'

export interface FetchData<T> {
    data: T | null;
    status: OperationStatus;
    error: string | null;
    fetch: (endpoint?: string, rewrite?: boolean) => Promise<void>
}

export type OperationStatus = 'IDLE' | 'LOADING' | 'ERROR' | 'SUCCESS'

export const useDataFetching = <T>(baseEndpoint: string, onDemand = false, onSuccess?: (data: T) => void): FetchData<T> => {
  const navigate = useNavigate()
  const [ data, setData ] = useState<T | null>(null)
  const [ status, setStatus ] = useState<OperationStatus>('IDLE')
  const [ error, setError ] = useState<string | null>(null)

  const fetchData = useCallback(async (endpoint = '', rewrite = false) => {
    setStatus('LOADING')

    const response = await request({ method: 'GET', endpoint: rewrite ? endpoint: baseEndpoint + endpoint })

    if (response.statusCode === 401){
      localStorage.removeItem('token')
      navigate('/login')
    }

    if (response.error === null && response.data !== null){
      setData(response.data)
      setStatus('SUCCESS')

      if (onSuccess) onSuccess(response.data)
    }

    if (response.error !== null && response.data === null){
      setError(response.error)
      setStatus('ERROR')
    }
  }, [])

  useEffect(() => {
    if (!onDemand)
      fetchData()
  }, [ fetchData, onDemand ])

  return { data, status, error, fetch: fetchData }
}

export const useMutate = <T>({
  onSuccess,
  onError
}: { onSuccess?: (data: T) => void; onError?: (errorMessage: string) => void;}) => {
  const navigate = useNavigate()
  const [ data, setData ] = useState<T | null>(null)
  const [ status, setStatus ] = useState<OperationStatus>('IDLE')
  const [ error, setError ] = useState<string | null>(null)

  const mutate = useCallback(async ({ 
    endpoint, 
    data, 
    method 
  } : { 
    endpoint: string, 
    data: Record<string, unknown> | Record<string, unknown>[] | undefined, 
    method: 'POST' | 'PUT' | 'DELETE' 
  }) => {
    setStatus('LOADING')

    const response = await request({ method, endpoint, data })

    if (response.statusCode === 401){
      localStorage.removeItem('token')
      navigate('/login')
    }

    if (response.error === null && response.data !== null){
      setData(response.data)
      setStatus('SUCCESS')

      if (onSuccess) onSuccess(response.data)
    }

    if (response.error !== null && response.data === null){
      setError(response.error)
      setStatus('ERROR')

      if (onError) onError(response.error)
    }
  }, [])

  const clear = () => {
    setError(null)
    setData(null)
    setStatus('IDLE')
  }

  return { mutate, data, status, error, clear }
}

export const useSearchBar = (fetch: (endpoint: string) => void) => {
  const [ searchParams, setSearchParams ] = useSearchParams()

  const debouncedFetch = useCallback(
    debounce((searchValue: string) => {
      fetch(`?search=${encodeURIComponent(searchValue)}`)
    }, 2000),
    []
  )

  useEffect(() => {
    const searchTerm = searchParams.get('search') || ''
    debouncedFetch(searchTerm)
  }, [ searchParams, debouncedFetch ])

  const handleSearch: React.ChangeEventHandler<HTMLInputElement> = (e) => {
    const searchTerm = e.target.value
    setSearchParams({ search: searchTerm })
  }

  return { handleSearch }
}