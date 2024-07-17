import React, { useEffect, useState } from 'react'
import axios from 'axios';

function Turfs() {
    const [data, setData] = useState([]);
    useEffect(() => async () => {
        try {
            const response = await axios.get('http://localhost:8000/api/v1/turfs/', {}, {
                withCredentials: true,
                headers: {
                    'Content-Type': 'application/json'
                }
            })
            console.log(response.status);
            if (response.status === 200) {

                const turfsArray = Object.values(response.data.data);
                console.log(turfsArray);
                setData(turfsArray);
            }
        } catch (error) {
            console.log("Could not fetch turf data");
        }
    }, [])


    function EachTurf({ turf }) {
        const { id, name, location, price, images_urls, isavailable } = turf;
        console.log(isavailable)
        // console.log(turf);
        return (
            <div className='m-2 h-48 border border-gray-700 flex'>
                <div className='w-48 h-full items-center m-auto justify-center'>
                    <div className="w-full h-full p-2">
                        <img
                            src={images_urls[0]}
                            alt="turf_image"
                            className="h-full w-full object-cover rounded-md"
                        />
                    </div>
                </div>
                <div className='w-4/5 h-full justify-center items-center mx-5 my-2'>
                    <div className='flex'>
                        <div className='w-5/6'>
                            <h1 className='text-left text-white text-3xl mb-5'>{name}</h1>


                            <div className='flex'>
                                <div className='w-1/5'>
                                    <h2 className='text-2xl text-left text-black'>Location</h2>
                                </div>
                                <div className='w-4/5'>
                                    <h2 className='text-2xl text-left text-black'>: {location}</h2>
                                </div>
                            </div>

                            <div className='flex'>
                                <div className='w-1/5'>
                                    <h2 className='text-2xl text-left text-black'>Status</h2>
                                </div>
                                <div className='w-4/5'>
                                    <h2 className='text-2xl text-left text-black'>: {isavailable ? "Opened" : "Clossed"}</h2>
                                </div>
                            </div>


                        </div>
                        <div className="w-1/6 justify-center">
                            <h1 className='text-right text-yellow-400 text-3xl'> Rs. {price}</h1>
                        </div>
                    </div>
                </div>
            </div>
        )
    }

    return (
        <div className='relative h-screen w-screen  m-auto'>
            <div className='relative z-10 flex flex-col items-center justify-center'>
                <h1 className='py-5 top-5 text-5xl text-white'>Turfs</h1>
                <p> Booking service will be available soon!</p>
            </div>
            <div className='w-4/5 border border-gray-300 m-auto block h-5/6 overflow-y-auto'>
                {
                    data.map((turf) => (
                        <EachTurf key={turf.id} turf={turf} />
                    ))
                }
            </div>
        </div>
    )
}

export default Turfs