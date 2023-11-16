import { createContext } from 'react'

import { NewAlert, BootstrapAlert } from '../../models/bootstrap.model'

export interface AlertContextState {
  alerts: BootstrapAlert[]
  showAlert: (alert: NewAlert) => void
  closeAlert: (alertId: string) => void
}

export const alertContext = createContext<AlertContextState>({
  alerts: [],
  showAlert: () => {},
  closeAlert: () => {},
})
