import React, { createContext, useEffect, useState } from 'react'
import { Users, UsersWithData } from '../shared'
import { request } from '../libraries/axios-lib'

export interface UserContextType {
  user: Users | null;
  onLogout: () => void;
  onLogin: () => void;
}

export const UserContext = createContext<UserContextType | null>(null)

export const UserContextProvider = ({ children }: { children: React.ReactNode }) => {
  const [ user, setUser ] = useState<UsersWithData | null>()

  const isLoggedIn = localStorage.getItem('token')

  const fetchUserData = async () => {
    const response = await request({ method: 'GET', endpoint: 'user/getDatosWithToken' })

    if (response.error === null)
      setUser(response.data)
  }

  useEffect(() => {
    fetchUserData()
  }, [])

  return (
    <UserContext.Provider value={{
      user: !isLoggedIn ? null : user?.user ?? null,
      onLogout: () => { setUser(null) },
      onLogin: fetchUserData
    }}>
      {children}
    </UserContext.Provider>
  )
}