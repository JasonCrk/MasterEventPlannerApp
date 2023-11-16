import { FC, ReactNode, useState } from 'react'

import { AlertContextState, alertContext } from '.'

import Alert from '../../components/Alert.component'

interface Props {
  children: ReactNode
}

export const AlertContextProvider: FC<Props> = ({ children }) => {
  const [alerts, setAlerts] = useState<AlertContextState['alerts']>([])

  const showAlert: AlertContextState['showAlert'] = newAlert => {
    setAlerts(prevAlerts => [
      ...prevAlerts,
      { id: crypto.randomUUID(), ...newAlert },
    ])
  }

  const closeAlert: AlertContextState['closeAlert'] = alertId => {
    setAlerts(prevAlerts => prevAlerts.filter(alert => alert.id !== alertId))
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
