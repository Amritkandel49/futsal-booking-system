import React, { useState, useEffect } from 'react';
import Layout from './pages/Layout.jsx';
import './index.css';
import { RouterProvider, createBrowserRouter, Route, createRoutesFromElements } from 'react-router-dom';
import Home from './pages/Home.jsx';
import Login from './pages/Login.jsx';
import SignUp from './pages/SignUp.jsx';
import Turfs from './pages/Turfs.jsx';
import BookingLayout from './pages/BookingLayout.jsx';
import OwnerDashboard from './pages/OwnerPages/OwnerDashboard.jsx';
import UserHome from './pages/UserPages/UserHome.jsx';

import axios from 'axios';
import RegisterTurf from './pages/OwnerPages/RegisterTurf.jsx';
import OwnerHome from './pages/OwnerPages/OwnerHome.jsx';
import UserDashBoard from './pages/UserPages/UserDashBoard.jsx';
import MyTurfs from './pages/OwnerPages/MyTurfs.jsx';
import MyBookings from './pages/UserPages/MyBookings.jsx';


export default function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [authenticatedResponse, setAuthenticatedResponse] = useState({});

  const setAuth = (boolean) => {
    setIsAuthenticated(boolean);
  };

  const checkAuthenticated = async () => {
    try {
      try {
        const userAuthRes = await axios.get(`http://localhost:8000/api/v1/users/get-current-user`, {
          withCredentials: true,
          headers: {
            'Content-Type': 'application/json',
          },
        });

        if (userAuthRes.data.success) {
          setIsAuthenticated(true);
          // console.log("App  ", userAuthRes.data.data);
          setAuthenticatedResponse(userAuthRes.data.data);
          return;
        }
      } catch (error) {

      }

      try {
        const ownerAuthRes = await axios.get(`http://localhost:8000/api/v1/owners/get-current-owner`, {
          withCredentials: true,
          headers: {
            'Content-Type': 'application/json',
          },
        });


        if (ownerAuthRes.data.success) {
          setIsAuthenticated(true);
          // console.log("App  ", userAuthRes.data.data);
          setAuthenticatedResponse(ownerAuthRes.data.data);
          return;
        }
      } catch (error) {

      }

      console.log("App  + ", authenticatedResponse);
      setIsAuthenticated(false);
      return;
    } catch (error) {
      console.log("Could not fetch data : ", error.message);
    }
  };

  useEffect(() => {
    checkAuthenticated();
  }, [isAuthenticated]);


  const router = createBrowserRouter(
    createRoutesFromElements(<>
      <Route path="/" element={<Layout authenticatedResponse={authenticatedResponse} setAuth={setAuth} isAuthenticated={isAuthenticated} />}>

        <Route path="/" element={<Home />} />
        <Route exact path="/login" element={<Login setAuth={setAuth} />} />
        <Route exact path="/signup" element={<SignUp />} />
        <Route path="/turfs" element={<Turfs />} />


        {/* for user section */}
        <Route path='/user' element={<UserDashBoard isAuthenticated={isAuthenticated} currentUser={authenticatedResponse.data} />}>
          <Route exact path='/user' element={<UserHome currentUser={authenticatedResponse.data} />} />
          <Route exact path='/user/my-bookings' element={<MyBookings currentUser={authenticatedResponse.data} />} />
        </Route>



        <Route path="/user/booking/:id" element={<BookingLayout isAuthenticated={isAuthenticated} currentUser = {authenticatedResponse.data} />} />



        {/* for owner section */}
        <Route path='/owner' element={<OwnerDashboard isAuthenticated={isAuthenticated} currentOwner={authenticatedResponse.data} />}>
          <Route exact path='/owner' element={<OwnerHome currentOwner={authenticatedResponse.data} />} />
          <Route exact path='/owner/register-turf' element={<RegisterTurf />} />
          <Route exact path='/owner/my-turfs' element={<MyTurfs currentOwner = {authenticatedResponse.data} />} />

        </Route>

      </Route>
    </>
    )
  );

  return (
    <>
      <RouterProvider router={router}></RouterProvider>
    </>
  );
}
