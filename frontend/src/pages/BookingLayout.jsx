import React, { useState, useEffect } from "react";
import axios from "axios";
import "../turf.css";
import Turfs from "./Turfs.jsx";
import { useNavigate, useParams } from "react-router-dom";
import Calendar from "react-calendar";
import 'react-calendar/dist/Calendar.css';

export default function BookingLayout({ isAuthenticated, currentUser }) {
    const options = { year: 'numeric', month: 'long', day: 'numeric' }; //date option
    const initDate = new Date().toLocaleDateString('en-US', options);
    const navigate = useNavigate();
    const { id } = useParams();
    const [turfData, setTurfData] = useState(null); // State to hold the turf data
    const [selectedDate, setSelectedDate] = useState(initDate);//to store the selected data
    const [selectedTimeSlot, setSelecetedTimeSlot] = useState('');

    const [bookedTimeSlotsArray, setBookedTimeSlotsArray] = useState([]);  //to store booked time slots
    const [availableTimeSlotsArray, setAvailableTimeSlotsArray] = useState([]);

    const totalTimeSlots = ["6-7", "7-8", "8-9", "9-10", "10-11", "11-12", "12-13", "13-14", "14-15", "15-16", "16-17", "17-18", "18-19", "19-20"];

    const handleDateChange = (date) => {
        const formattedDate = date.toLocaleDateString('en-US', options);
        setSelectedDate(formattedDate);
    };

    const timeSlotButtonHandler = (e) => {
        e.preventDefault();
        const selectedValue = e.target.getAttribute('data-value');
        setSelecetedTimeSlot(selectedValue);
    };

    const BookTurfBtnHandler = async (e) => {
        alert('Test')
        e.preventDefault();

        try {
            const response = await axios.post('http://localhost:8000/api/v1/bookings/create-booking',
                {
                    "user_id": currentUser.id,
                    "turf_id": id,
                    "booking_date": selectedDate,
                    "time_slot": selectedTimeSlot
                }, {
                withCredentials: true,
                headers: {
                    "Content-Type": "application/json",
                },
            });

            // Update the booked time slots after successful booking
            setBookedTimeSlotsArray(prevState => [...prevState, selectedTimeSlot]);

            // Recompute the available time slots
            setAvailableTimeSlotsArray(prevState =>
                prevState.filter(slot => slot !== selectedTimeSlot)
            );

            setSelectedDate(initDate);
            setSelecetedTimeSlot('');

            console.log('It has reached Alert....');
            alert('Booking Successful!');
            // console.log(response.data.data);
        } catch (error) {
            console.error("Booking failed", error);
            alert('Booking Failed.');
        }
    };

    useEffect(() => {
        const fetchTimeSlot = async () => {
            try {
                const bookedTimeSlots = await axios.get(`http://localhost:8000/api/v1/bookings/turf/${id}/booked-time-slots`, {
                    params: {
                        booking_date: selectedDate
                    },
                    withCredentials: true,
                    headers: {
                        "Content-Type": "application/json"
                    }
                });

                const bookedSlots = bookedTimeSlots.data.data.map((item) => item.timeslot.trim());
                setBookedTimeSlotsArray(bookedSlots);

                const availableTimes = totalTimeSlots.filter(slot => !bookedSlots.includes(slot));
                setAvailableTimeSlotsArray(availableTimes);
            } catch (error) {
                console.error("Failed to fetch booked time slots", error);
            }
        };

        fetchTimeSlot();
    }, [selectedDate, turfData, id]);

    useEffect(() => {
        const fetchTurf = async () => {
            try {
                const turfResponse = await axios.get(`http://localhost:8000/api/v1/turfs/get-turf-by-id/${id}`,
                    {
                        withCredentials: true,
                        headers: {
                            "Content-Type": "application/json",
                        },
                    });

                if (turfResponse.status === 200) {
                    setTurfData(turfResponse.data.data); // Save the turf data to state
                }
            } catch (error) {
                console.log("Could not fetch turf data.", error);
            }
        };

        fetchTurf();

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
        <div className="lg:flex h-screen md:block">
            <div className="w-3/5 border-r-2 overflow-y-auto">
                <Turfs className="w-full h-full overflow-x-scroll" />
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

                <div className="block">
                    {turfData ? (
                        <div>
                            <div className="overflow-y-scroll border-4 border-gray-500 h-50 flex">
                                {turfData.images_urls ?
                                    turfData.images_urls.map((image, index) => (
                                        <div key={index} className="turf-image-container rounded-none">
                                            <img
                                                src={image}
                                                alt={`${turfData.name} image`}
                                                className="turf-image rounded-none"
                                            />
                                        </div>
                                    )) :
                                    (<p>Images not found.</p>)}
                            </div>

                            <div>
                                <br />
                                <div>
                                    <h1 className="text-customYellow text-5xl">{turfData.name}</h1>
                                </div>
                                <br />

                                <div>
                                    <table className="border border-gray-700 w-1/2">
                                        <tbody>
                                            <tr >
                                                <td className="py-2 text-center items-center border border-gray-700">
                                                    <h2 className="text-customLime text-3xl">
                                                        Location
                                                    </h2>
                                                </td>
                                                <td className="py-2 text-center items-center border border-gray-700">
                                                    <h2 className="text-customLime text-3xl">
                                                        {turfData.location}
                                                    </h2>
                                                </td>
                                            </tr>

                                            <tr >
                                                <td className="py-2 text-center items-center border border-gray-700">
                                                    <h2 className="text-customLime text-3xl">
                                                        Price
                                                    </h2>
                                                </td>
                                                <td className="py-2 text-center items-center border border-gray-700">
                                                    <h2 className="text-customLime text-3xl">
                                                        {'Rs. ' + turfData.price}
                                                    </h2>
                                                </td>
                                            </tr>

                                            <tr >
                                                <td className="py-2 text-center items-center border border-gray-700">
                                                    <h2 className="text-customLime text-3xl">
                                                        Status
                                                    </h2>
                                                </td>
                                                <td className="py-2 text-center items-center border border-gray-700">
                                                    <h2 className="text-customLime text-3xl">
                                                        {turfData.isavailable ? 'Opened' : 'Closed'}
                                                    </h2>
                                                </td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>

                            </div>

                            <div className="flex my-5">
                                <div className="button-container">
                                    <div className="button-container py-5 mt-5">
                                        {availableTimeSlotsArray.length > 0 ? (
                                            availableTimeSlotsArray.map((timeSlot) => (
                                                <button
                                                    key={timeSlot}
                                                    onClick={timeSlotButtonHandler}
                                                    className={`button w-20 h-16 ${bookedTimeSlotsArray.includes(timeSlot) ? 'bg-red-500' : ''}`}
                                                    data-value={timeSlot}
                                                    disabled={bookedTimeSlotsArray.includes(timeSlot)}
                                                >
                                                    {`${timeSlot.split('-')[0]}${parseInt(timeSlot.split('-')[0], 10) < 12 ? 'AM' : 'PM'}-${timeSlot.split('-')[1]}${parseInt(timeSlot.split('-')[1], 10) < 12 ? 'AM' : 'PM'}`}
                                                </button>
                                            ))
                                        ) : (
                                            <p className="text-red-500">No available time slots for the selected date.</p>
                                        )}
                                    </div>
                                </div>
                                <div>
                                    <Calendar
                                        onChange={handleDateChange}
                                        value={new Date(selectedDate)}
                                        className="custom-calendar rounded-xl"
                                    />
                                </div>
                            </div>

                            <div className="w-3/5 mt-10 flex">
                                <div className="block">
                                    <div className="">
                                        <h2 className="text-white text-2xl">
                                            Selected Date : <span className="text-customLime"><u>{String(selectedDate)}</u></span>
                                        </h2>
                                    </div>
                                    <br />
                                    <div className="">
                                        <h2 className="text-white text-2xl">
                                            Selected Time : <span className="text-customLime"><u>{String(selectedTimeSlot)}</u></span>
                                        </h2>
                                    </div>
                                    <br />

                                </div>

                                <div className="items-center m-auto">
                                    <button
                                        onClick={BookTurfBtnHandler}
                                        className='rounded-md border px-2 py-2 bg-blue-500'
                                        type="submit">
                                        <h1 className="text-white text-2xl">Book Turf</h1>
                                    </button>
                                </div>

                            </div>

                        </div>

                    ) : (
                        <div>Loading...</div> // Display a loading message while fetching data
                    )}
                </div>
            </div>
        </div >
    );
}
