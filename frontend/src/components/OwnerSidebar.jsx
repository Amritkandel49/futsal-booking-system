import React from 'react'
import { Link } from 'react-router-dom'

function OwnerSidebar() {
    return (
        <div>
            <div>
                <Link to="/owner">
                    <div
                        className={'border-gray-700 border hover:bg-gray-500 h-16 py-2'}
                    >
                        <h2 className="text-3xl px-5 text-white">Home</h2>
                    </div>
                </Link>
            </div>

            <div>
                <Link to="/owner/register-turf">
                    <div
                        className={'border-gray-700 border hover:bg-gray-500 h-16 py-2'}
                    >
                        <h2 className="text-3xl px-5 text-white">Register Turf</h2>
                    </div>
                </Link>
            </div>
        </div>
    )
}

export default OwnerSidebar