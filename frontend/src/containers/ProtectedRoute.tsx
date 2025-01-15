import React from 'react'
import { Navigate } from 'react-router-dom'

export const ProtectedRoute = ({ 
  element 
}: { element: React.ReactNode; }) => {
  const isAuthenticated = Boolean(localStorage.getItem('token'))

  if (!isAuthenticated) {
    return <Navigate to={`/login?callback=${window.location.href}`} replace />
  }

  return element 
}
