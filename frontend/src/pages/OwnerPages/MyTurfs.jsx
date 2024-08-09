import axios from 'axios';
import React, { useEffect, useState } from 'react'

function MyTurfs({ currentOwner }) {
    // console.log(currentOwner);
    const [turfArray, setTurfArray] = useState([]);

    useEffect(() => {
        const fetchTurfData = async () => {
            try {
                const turfData = await axios.get(`http://localhost:8000/api/v1/owners/get-turf-by-owner-id/${currentOwner.id}`,
                    {
                        withCredentials: true,
                        headers: {
                            'Content-Type': 'multipart/form-data',
                        },
                    }
                )

                if (turfData) {
                    setTurfArray(() => turfData.data.data)
                }
            } catch (error) {
                console.log('Cannot fetch turf data.')
            }
        }

        fetchTurfData();
        console.log(turfArray);
    }, [])

    return (
        <div>
            <div>
                <h1 className='text-7xl text-center text-white'>My Turfs</h1>
            </div>

            <div className='items-center m-auto my-10'>
                <table className='border border-gray-500'>
                    <thead>
                        <tr className='border border-gray-500'>
                            <td className='border border-gray-500'><h1 className='text-customLime text-center text-3xl px-2'>SN</h1></td>
                            <td className='border border-gray-500'><h1 className='text-customLime text-center text-3xl px-2'>Name</h1></td>
                            <td className='border border-gray-500'><h1 className='text-customLime text-center text-3xl px-2'>Location</h1></td>
                            <td className='border border-gray-500'><h1 className='text-customLime text-center text-3xl px-2'>Price</h1></td>
                            <td className='border border-gray-500'><h1 className='text-customLime text-center text-3xl px-2'>Created At</h1></td>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            turfArray.map((eachTurf) => (
                                <tr key={eachTurf.id} className='border border-gray-500'>
                                    <td className='border border-gray-500'><h1 className='text-white text-center text-2xl px-2'>{turfArray.indexOf(eachTurf) + 1}</h1></td>
                                    <td className='border border-gray-500'><h1 className='text-white text-center text-2xl px-2'>{eachTurf.name}</h1></td>
                                    <td className='border border-gray-500'><h1 className='text-white text-center text-2xl px-2'>{eachTurf.location}</h1></td>
                                    <td className='border border-gray-500'><h1 className='text-white text-center text-2xl px-2'>{'Rs.' + eachTurf.price}</h1></td>
                                    <td className='border border-gray-500'><h1 className='text-white text-center text-2xl px-2'>{eachTurf.createdat}</h1></td>
                                </tr>
                            ))
                        }
                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default MyTurfs