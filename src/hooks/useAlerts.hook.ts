import { useContext } from 'react'

import { alertContext } from '../context/alert'

export const useAlerts = () => {
  const { closeAlert, showAlert } = useContext(alertContext)

  return {
    closeAlert,
    showAlert,
  }
}
