import axios, { AxiosRequestConfig } from 'axios'

export const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
})

interface Request<T extends string | undefined> {
  endpoint: string
  method?: T
  data?: T extends 'get' ? undefined : Record<string, unknown> | Record<string, unknown>[]
}

export const request = async<T extends string | undefined>({
  endpoint,
  method = 'get',
  data
}: Request<T>) => {
  try {
    const config: AxiosRequestConfig = {
      method,
      headers: {
        'Content-type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('token')}`
      },
    }
    
    if (method !== 'get') config.data = data
    
    const response = await axiosInstance(endpoint, config)
    
    return {
      data: response.data.data,
      statusCode: response.status,
      error: null
    }
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    return {
      data: null,
      statusCode: error.status,
      error: error.response.data.error.message
    }
  }
}