import { createBrowserRouter } from 'react-router-dom'

import MainLayout from './layouts/MainLayout'
import AuthLayout from './layouts/AuthLayout'

import Login from './pages/Login.page'
import Register from './pages/Register.page'

import Home from './pages/Home.page'
import SearchEvents from './pages/SearchEvents.page'
import CreateEvent from './pages/CreateEvent.page'
import EventDetails from './pages/EventDetails.page'
import UserProfile from './pages/UserProfile.page'
import Network from './pages/Network.page'
import Notifications from './pages/Notifications.page'
import EditEvent from './pages/EditEvent.page'

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
        path: '/search',
        element: <SearchEvents />,
      },
      {
        path: '/create',
        element: <CreateEvent />,
      },
      {
        path: '/networks',
        element: <Network />,
      },
      {
        path: '/notifications',
        element: <Notifications />,
      },
      {
        path: '/events/:eventId',
        element: <EventDetails />,
      },
      {
        path: '/events/:eventId/edit',
        element: <EditEvent />,
      },
      {
        path: '/:accountId/profile',
        element: <UserProfile />,
      },
    ],
  },
])

export default router
