import axios from 'axios'
import React, { useEffect, useState } from 'react'

function MyBookings({ currentUser }) {
    const [expiredBookingArray, setExpiredBookingArray] = useState([]);
    const [futureBookingArray, setFutureBookingArray] = useState([]);
    useEffect(() => {
        const fetchExpiredBooking = async () => {
            try {
                const expiredBookingRes = await axios.get(`http://localhost:8000/api/v1/bookings/user/${currentUser.id}/expired`,
                    {
                        withCredentials: true,
                        headers: {
                            'Content-Type': 'multipart/form-data',
                        },
                    }
                )
                console.log(expiredBookingRes.data.data)
                setExpiredBookingArray(() => (expiredBookingRes.data.data))
            } catch (error) {
                console.log('Could not fetch expired bookings.')
            }
        }

        const fetchFutureBooking = async () => {
            try {
                const futureBookingRes = await axios.get(`http://localhost:8000/api/v1/bookings/user/${currentUser.id}/future`,
                    {
                        withCredentials: true,
                        headers: {
                            'Content-Type': 'multipart/form-data',
                        },
                    }
                )
                console.log(futureBookingRes.data.data)
                setFutureBookingArray(() => (futureBookingRes.data.data))
            } catch (error) {
                console.log('Could not fetch future bookings.');
            }
        }

        fetchExpiredBooking();
        fetchFutureBooking();
    }, [currentUser])


    return (
        <div>
            <div className='my-5'>
                <div className='m-5'>
                    <h1 className='text-7xl text-center text-white'>My Bookings</h1>
                </div>
                <p className='text-3xl text-gray-500'>Your all bookings till date are listed below.</p>
            </div>
            <hr />

            {/* for expired bookings */}
            <div>
                <div className='my-5'>
                    <h1 className='text-3xl text-gray-500'>Expired Bookings</h1>
                </div>

                <div className='items-center m-auto my-10'>
                    <table className='border border-gray-500'>
                        <thead>
                            <tr className='border border-gray-500'>
                                <td className='border border-gray-500'><h1 className='text-customLime text-center text-3xl px-2'>SN</h1></td>
                                <td className='border border-gray-500'><h1 className='text-customLime text-center text-3xl px-2'>Name</h1></td>
                                <td className='border border-gray-500'><h1 className='text-customLime text-center text-3xl px-2'>Location</h1></td>
                                <td className='border border-gray-500'><h1 className='text-customLime text-center text-3xl px-2'>Booking Date</h1></td>
                                <td className='border border-gray-500'><h1 className='text-customLime text-center text-3xl px-2'>Time Slot</h1></td>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                expiredBookingArray.length ? (
                                    expiredBookingArray.map((eachBooking) => (
                                        <tr key={eachBooking.id} className='border border-gray-500'>
                                            <td className='border border-gray-500'><h1 className='text-white text-center text-2xl px-2'>{expiredBookingArray.indexOf(eachBooking) + 1}</h1></td>
                                            <td className='border border-gray-500'><h1 className='text-white text-center text-2xl px-2'>{eachBooking.name}</h1></td>
                                            <td className='border border-gray-500'><h1 className='text-white text-center text-2xl px-2'>{eachBooking.location}</h1></td>
                                            <td className='border border-gray-500'><h1 className='text-white text-center text-2xl px-2'>{eachBooking.booking_date}</h1></td>
                                            <td className='border border-gray-500'><h1 className='text-white text-center text-2xl px-2'>{eachBooking.timeslot}</h1></td>
                                        </tr>
                                    ))) : (
                                    <tr>
                                        <td>
                                            <h1 className='text-white text-center text-2xl px-2'>No previous bookings made...</h1>
                                        </td>
                                    </tr>
                                )
                            }
                        </tbody>
                    </table>
                </div>
            </div>


            <hr />
            {/* for future bookings */}
            <div>
                <div className='my-5'>
                    <h1 className='text-3xl text-gray-500'>Future Bookings</h1>
                </div>

                <div className='items-center m-auto my-10'>
                    <table className='border border-gray-500'>
                        <thead>
                            <tr className='border border-gray-500'>
                                <td className='border border-gray-500'><h1 className='text-customLime text-center text-3xl px-2'>SN</h1></td>
                                <td className='border border-gray-500'><h1 className='text-customLime text-center text-3xl px-2'>Name</h1></td>
                                <td className='border border-gray-500'><h1 className='text-customLime text-center text-3xl px-2'>Location</h1></td>
                                <td className='border border-gray-500'><h1 className='text-customLime text-center text-3xl px-2'>Booking Date</h1></td>
                                <td className='border border-gray-500'><h1 className='text-customLime text-center text-3xl px-2'>Time Slot</h1></td>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                futureBookingArray.length ? (
                                    futureBookingArray.map((eachBooking) => (
                                        <tr key={eachBooking.id} className='border border-gray-500'>
                                            <td className='border border-gray-500'><h1 className='text-white text-center text-2xl px-2'>{futureBookingArray.indexOf(eachBooking) + 1}</h1></td>
                                            <td className='border border-gray-500'><h1 className='text-white text-center text-2xl px-2'>{eachBooking.name}</h1></td>
                                            <td className='border border-gray-500'><h1 className='text-white text-center text-2xl px-2'>{eachBooking.location}</h1></td>
                                            <td className='border border-gray-500'><h1 className='text-white text-center text-2xl px-2'>{eachBooking.booking_date}</h1></td>
                                            <td className='border border-gray-500'><h1 className='text-white text-center text-2xl px-2'>{eachBooking.timeslot}</h1></td>
                                        </tr>
                                    ))) : (
                                    <tr>
                                        <td>
                                            <h1 className='text-white text-center text-2xl px-2'>No previous bookings made...</h1>
                                        </td>
                                    </tr>
                                )
                            }
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    )
}

export default MyBookings;