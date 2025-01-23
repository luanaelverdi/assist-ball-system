import { LoginPage } from '../views/LoginPage'
import { HomePage } from '../views/HomePage';
import { useState } from 'react';
import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import { ProtectedRoute } from './ProtectedRoute'
import { Layout } from './Layout';
import { RegisterPage } from '../views/RegisterPage';
import { UsersPage } from '../views/UsersPage';
import { PlayersPage } from '../views/dt/PlayersPage';
import { QrCodePage } from '../views/player/QrCodePage';

const adminRoutes = [
  {
    path: '/',
    element: <ProtectedRoute element={<HomePage />} />,
  },
  {
    path: '/registro-usuario',
    element: <ProtectedRoute element={<RegisterPage />} />,
  },
  {
    path: '/gestion-usuarios',
    element: <ProtectedRoute element={<UsersPage />} />
  }
]

const dtRoutes = [
  {
    path: '/jugadores',
    element: <ProtectedRoute element={<PlayersPage />} />
  },
  {
    path: '/asistencias',
    element: <h1>Asistencias</h1>
  }
]

const playerRoutes = [
  {
    path: '/asistencias',
    element: <h1>Asistencias</h1>
  },
  {
    path: '/qr-code',
    element: <ProtectedRoute element={<QrCodePage />} />
  }
]

const router = createBrowserRouter([
  {
    path: '/login',
    element: <LoginPage />
  },
  {
    element: <Layout />,
    children: [
      ...adminRoutes,
      ...dtRoutes,
      ...playerRoutes
    ]
  }]);

export const AppRouter = () => <RouterProvider router={router} />