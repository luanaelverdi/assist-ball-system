import { LoginPage } from '../views/LoginPage'
import { HomePage } from '../views/HomePage';
import { useState } from 'react';
import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import { ProtectedRoute } from './ProtectedRoute'
import { Layout } from './Layout';
import { RegisterPage } from '../views/RegisterPage';

const adminRoutes = [
  {
    path: '/',
    element: <ProtectedRoute element={<HomePage />} />,
  },
  {
    path: '/registro-usuario',
    element: <ProtectedRoute element={<RegisterPage />} />,
  },
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
  }]);

export const AppRouter = () => <RouterProvider router={router} />