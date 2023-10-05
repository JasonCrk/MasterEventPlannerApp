import { createBrowserRouter } from 'react-router-dom'

import MainLayout from './layouts/MainLayout'

import Home from './pages/Home'
import Login from './pages/Login'
import Register from './pages/Register'

const router = createBrowserRouter([
  {
    path: '/login',
    element: <Login />,
  },
  {
    path: '/register',
    element: <Register />,
  },
  {
    element: <MainLayout />,
    children: [
      {
        path: '/',
        element: <Home />,
      },
    ],
  },
])

export default router
