import { LoginPage } from '../views/LoginPage'
import { HomePage } from '../views/HomePage';
import { useState } from 'react';
import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import { ProtectedRoute } from './ProtectedRoute'
import { Layout } from './Layout';
import { RegisterPage } from '../views/admin/RegisterPage';
import { UsersPage } from '../views/admin/UsersPage';
import { PlayersPage } from '../views/dt/PlayersPage';
import { PlayerPage } from '../views/player/PlayerPage';
import { UserDetailPage } from '../views/admin/UserDetailPage';
import { AssistancesPage } from '../views/dt/AssistancesPage';
import { QRScannerPage } from '../views/dt/QRScannerPage';
import { DtPage } from '../views/dt/DtPage';
import { QrCodePage } from '../views/player/QrCodePage'
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
  },
  {
    path: '/gestion-usuarios/:usuarioId',
    element: <ProtectedRoute element={< UserDetailPage />} />
  },
]

const dtRoutes = [
  {
    path: '/jugadores-asistencias/:dtId',
    element: <ProtectedRoute element={<DtPage />} />
  }
 /* {
    path: '/mis-jugadores',
    element: <ProtectedRoute element={<PlayersPage />} />
  },
  {
    path: '/asistencias',
    element: <ProtectedRoute element={<AssistancesPage />} />
  },
  {
    path: '/scanear-qr',
    element: <ProtectedRoute element={<QRScannerPage />} />
  }*/
]

const playerRoutes = [
  {
    path: '/mis-asistencias/:playerId',
   // element: <ProtectedRoute element={<AssistancesPage />} />
  },
  {
    path: '/mi-qr-code',
    element: <ProtectedRoute element={<QrCodePage />} />
  }
/* {
  path: 'mi-qr/asistencias',
  element: <ProtectedRoute element={<PlayerPage />} />
}*/
 
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