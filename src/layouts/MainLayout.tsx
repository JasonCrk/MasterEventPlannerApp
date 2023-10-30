import { Outlet } from 'react-router-dom'

import Navbar from '../components/Navbar.component'

const MainLayout = () => {
  return (
    <>
      <Navbar />
      <div className='d-flex justify-content-center'>
        <div style={{ width: '60%' }}>
          <Outlet />
        </div>
      </div>
    </>
  )
}

export default MainLayout
