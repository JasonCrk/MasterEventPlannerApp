import { createBrowserRouter } from 'react-router-dom'

import MainLayout from './layouts/MainLayout'
import AuthLayout from './layouts/AuthLayout'

import Login from './pages/Login.page'
import Register from './pages/Register.page'

import Home from './pages/Home.page'
import CreateEvent from './pages/CreateEvent.page'

import { isAuthenticatedLoader, isNotAuthenticatedLoader } from './loaders'

const router = createBrowserRouter([
  {
    path: '/auth',
    loader: isNotAuthenticatedLoader,
    element: <AuthLayout />,
    children: [
      {
        path: '/auth/login',
        element: <Login />,
      },
      {
        path: '/auth/register',
        element: <Register />,
      },
    ],
  },
  {
    path: '/',
    loader: isAuthenticatedLoader,
    element: <MainLayout />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: '/create',
        element: <CreateEvent />,
      },
    ],
  },
])

export default router
