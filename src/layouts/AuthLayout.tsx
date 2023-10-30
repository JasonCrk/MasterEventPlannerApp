import { Outlet } from 'react-router-dom'

function AuthLayout() {
  return (
    <div
      className='d-flex w-100 justify-content-center align-items-center'
      style={{
        height: '80vh',
      }}
    >
      <Outlet />
    </div>
  )
}

export default AuthLayout
