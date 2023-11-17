import { type FC, useEffect, useContext } from 'react'

import { BootstrapAlert } from '../models/bootstrap.model'

import { alertContext } from '../context/alert'

const Alert: FC<BootstrapAlert> = ({ id, message, type, timestamp }) => {
  const { closeAlert: closeToast } = useContext(alertContext)

  const handleCloseToast = () => {
    closeToast(id)
  }

  useEffect(() => {
    if (timestamp) {
      const timeout = setTimeout(() => closeToast(id), timestamp)
      return () => {
        clearTimeout(timeout)
      }
    }
  }, [timestamp, id, closeToast])

  return (
    <div
      className={`alert alert-${type}`}
      onClick={handleCloseToast}
      role='alert'
    >
      {message}
    </div>
  )
}

export default Alert
