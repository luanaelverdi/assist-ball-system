import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import { Layout } from './Layout'
import { Homepage } from '../views/Homepage'
import { LoginPage } from '../views/LoginPage'
import { ProtectedRoute } from './ProtectedRoute'
//import { UsersPage } from '../views/UsersPage'
//import { RegisterPage } from '../views/RegisterPage'
//import { SendMailPasswordPage } from '../views/SendMailPasswordPage'
//import { ModifyPassword } from '../views/ModifyPasswordPage'



const adminRoutes = [
  {
    path: '/',
    element: <ProtectedRoute element={<Homepage />} />,
  }
]

const playerRoutes = [
  
]

const dtRoutes = [
 
]

const router = createBrowserRouter([
  {
    path: '/login',
    element: <LoginPage />
  },
  {
    element: <Layout />,
    children: [
      ...adminRoutes
    ]
  },
])

export const AppRouter = () => <RouterProvider router={router} />