import React from 'react'
import { Link } from 'react-router-dom'

function UserSidebar() {
    return (
        <div>
            <h1 className='text-customYellow text-4xl px-1 py-2 text-center'>User Dashboard</h1>
            <br />
            <div className='m-1'>
                <Link to="/user">
                    <div
                        className={'border-gray-700 border hover:bg-gray-500 h-16 py-2'}
                    >
                        <h2 className="text-3xl px-5 text-white">Home</h2>
                    </div>
                </Link>
            </div>

            <div className='m-1'>
                <Link to="/turfs">
                    <div
                        className={'border-gray-700 border hover:bg-gray-500 h-16 py-2'}
                    >
                        <h2 className="text-3xl px-5 text-white">Book Turf</h2>
                    </div>
                </Link>
            </div>


            <div className='m-1'>
                <Link to="/user/my-bookings">
                    <div
                        className={'border-gray-700 border hover:bg-gray-500 h-16 py-2'}
                    >
                        <h2 className="text-3xl px-5 text-white">My Bookings</h2>
                    </div>
                </Link>
            </div>
        </div>
    )
}

export default UserSidebar