import React from 'react'
import ReactDOM from 'react-dom/client'

import { RouterProvider } from 'react-router-dom'

import router from './router'

import { QueryClientProvider, QueryClient } from '@tanstack/react-query'

import { AlertContextProvider } from './context/alert/AlertContextProvider'

import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/dist/js/bootstrap.bundle'

const queryClient = new QueryClient()

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <AlertContextProvider>
        <RouterProvider router={router} />
      </AlertContextProvider>
    </QueryClientProvider>
  </React.StrictMode>
)
