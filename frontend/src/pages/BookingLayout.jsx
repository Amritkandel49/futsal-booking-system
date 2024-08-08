import React, { useState, useEffect } from "react";
import axios from "axios";
import "../turf.css";
import Turfs from "./Turfs.jsx";
import { useNavigate, useParams } from "react-router-dom";

export default function BookingLayout({ isAuthenticated, currentUser }) {
    const navigate = useNavigate();
    const { id } = useParams();
    const [turfData, setTurfData] = useState(null); // State to hold the turf data

    useEffect(() => {
        const fetchTurf = async () => {
            try {
                const turfResponse = await axios.get(`http://localhost:8000/api/v1/turfs/get-turf-by-id/${id}`, {
                    withCredentials: true,
                    headers: {
                        "Content-Type": "application/json",
                    },
                });

                if (turfResponse.status === 200) {
                    setTurfData(turfResponse.data.data); // Save the turf data to state
                    console.log(turfResponse.data.data);
                }
            } catch (error) {
                console.log("Could not fetch turf data.");
            }
        };

        fetchTurf(); // Fetch the turf data when the component mounts

        if (!isAuthenticated) navigate("/login");
    }, [id, isAuthenticated, navigate]);

    const UserDashBoardBtnHandler = (e) => {
        e.preventDefault();
        navigate("/user");
    };

    const ViewBookingBtnHandler = (e) => {
        e.preventDefault();
        navigate("/bookings");
    };

    return (
        <div className="flex h-screen">
            <div className="w-1/4 border-r-2 overflow-y-auto">
                <Turfs className="w-full h-full" />
            </div>
            <div className="w-3/4 p-4">
                <div className="flex m-auto">
                    <h1 className="py-5 top-5 text-5xl text-white text-center w-3/4">Booking Page</h1>
                    <div className="m-auto">
                        <button onClick={UserDashBoardBtnHandler} className="border rounded-md bg-gray-500 my-1 px-2 mx-2">
                            User Dashboard
                        </button>
                        <button onClick={ViewBookingBtnHandler} className="border rounded-md bg-gray-500 my-1 px-2 mx-2">
                            View Bookings
                        </button>
                    </div>
                </div>

                {/* div for main part */}
                <br />

                <div className="block">
                    {/* for photo section. For now there is only one photo */}
                    {turfData ? (
                        <div>
                        {/* for images section */}
                            <div className="overflow-y-scroll border-4 border-gray-500 h-50 flex">
                                {turfData.images_urls.map((image, index) => (
                                    <div key={index} className="turf-image-container rounded-none">
                                        <img
                                            src={image}
                                            alt={`${turfData.name} image`}
                                            className="turf-image rounded-none"
                                        />
                                    </div>
                                ))}
                            </div>

                            {/* header section */}
                            <div>
                                <h1 className="text-customYellow text-5xl">{turfData.name}</h1>
                            </div>

                        </div>

                    ) : (
                        <div>Loading...</div> // Display a loading message while fetching data
                    )}
                </div>
            </div>
        </div>
    );
}
