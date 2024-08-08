import React from 'react'
import OwnerSidebar from '../../components/OwnerSidebar.jsx'
// import RegisterTurf from './RegisterTurf.jsx'
import { Outlet, useNavigate } from 'react-router-dom'

function OwnerDashboard({isAuthenticated}) {
    console.log(isAuthenticated);
    const navigate = useNavigate();

    if (!isAuthenticated) navigate('/login')
    return (
        <div className="flex h-screen">
            <div className="w-1/4 p-4 border-r-2 border-white bg-transparent">
                <OwnerSidebar />
            </div>

            <div className="w-3/4 p-8">
                <Outlet />
            </div>
        </div>
    )
}

export default OwnerDashboard