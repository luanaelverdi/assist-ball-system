import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './styles/index.css'
import { AppRouter } from './containers/AppRouter'
import { UserContextProvider } from './hooks/UserContext'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <UserContextProvider>
      <AppRouter />
    </UserContextProvider>
  </StrictMode>,
)
