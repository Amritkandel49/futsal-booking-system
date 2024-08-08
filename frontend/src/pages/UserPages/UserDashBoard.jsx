import React, {useEffect} from 'react'
import UserSidebar from '../../components/UserSidebar.jsx'
// import RegisterTurf from './RegisterTurf.jsx'
import { Outlet, useNavigate } from 'react-router-dom'

function UserDashboard({isAuthenticated, currentUser}) {
    const navigate = useNavigate();

  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/login');
    }
  }, [isAuthenticated]);
    return (
        <div className="flex h-screen">
            <div className="w-1/4 p-4 border-r-2 border-white bg-transparent">
                <UserSidebar />
            </div>

            <div className="w-3/4 p-8">
                <Outlet />
            </div>
        </div>
    )
}

export default UserDashboard