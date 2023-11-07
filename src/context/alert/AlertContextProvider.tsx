import { FC, ReactNode, useState } from 'react'

import { AlertContextState, alertContext } from '.'

import Alert from '../../components/Alert.component'

interface Props {
  children: ReactNode
}

export const AlertContextProvider: FC<Props> = ({ children }) => {
  const [alerts, setAlerts] = useState<AlertContextState['alerts']>([])

  const showAlert: AlertContextState['showAlert'] = newToast => {
    setAlerts(prevToasts => [
      ...prevToasts,
      { id: crypto.randomUUID(), ...newToast },
    ])
  }

  const closeAlert: AlertContextState['closeAlert'] = toastId => {
    setAlerts(prevToasts => prevToasts.filter(toast => toast.id !== toastId))
  }

  return (
    <alertContext.Provider value={{ alerts, showAlert, closeAlert }}>
      {children}
      <div className='position-fixed bottom-0 start-0 z-3 w-25 ps-3'>
        {alerts.map(alert => (
          <Alert key={alert.id} {...alert} />
        ))}
      </div>
    </alertContext.Provider>
  )
}
