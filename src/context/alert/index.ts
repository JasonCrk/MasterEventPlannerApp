import { createContext } from 'react'

import { NewAlert, BootstrapAlert } from '../../models/bootstrap.model'

export interface AlertContextState {
  alerts: BootstrapAlert[]
  showAlert: (toast: NewAlert) => void
  closeAlert: (toastId: string) => void
}

export const alertContext = createContext<AlertContextState>({
  alerts: [],
  showAlert: () => {},
  closeAlert: () => {},
})
