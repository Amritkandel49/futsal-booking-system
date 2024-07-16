import React, { useCallback, useEffect, useState } from 'react'
import Layout from './Layout.jsx'
import './index.css'
import { RouterProvider, createBrowserRouter, Route, createRoutesFromElements } from 'react-router-dom'
import Home from './pages/Home.jsx'
import Login from './pages/Login.jsx'
import SignUp from './pages/SignUp.jsx'
import axios from 'axios'


export default function App() {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [authenticatedResponse, setAuthenticatedResponse] = useState({});
    const setAuth = (boolean) => {
        setIsAuthenticated(true);
    }
    const checkAuthenticated = async () => {
        try {
            const userAuthRes = await axios.get(`http://localhost:8000/api/v1/users/get-current-user`, {
                withCredentials: true,
                headers: {
                    'Content-Type': 'application/json',
                }
            })
            const ownerAuthRes = await axios.get(`http://localhost:8000/api/v1/owners/get-current-owner`, {
                withCredentials: true,
                headers: {
                    'Content-Type': 'application/json',
                }
            })
            //     console.log("------");
            //   console.log(userAuthRes.data);
            //   console.log(ownerAuthRes.data);

            if (userAuthRes.data.success) {
                setIsAuthenticated(true)
                setAuthenticatedResponse(userAuthRes.data.data)
                return;
            }

            if (ownerAuthRes.data.success) {
                setIsAuthenticated(true)
                setAuthenticatedResponse(ownerAuthRes.data.data)
                return;
            };

            setIsAuthenticated(false);
            return;

        }
        catch (error) {
            console.log("Could not fetch data : ", error.message);
        }
    }

    useEffect(() => async () => {
        checkAuthenticated(isAuthenticated);
    }, [  ])



    const router = createBrowserRouter(createRoutesFromElements(
        <Route 
        path='/' 
        element={<Layout authenticatedResponse= {authenticatedResponse} setAuth = {setAuth} isAuthenticated = {isAuthenticated} />}
        
        >
            <Route 
            path='/' 
            element={<Home />} 
            />
            <Route exact
                path='/login'
                element={<Login />} />
            <Route exact
                path='/signup'
                element={<SignUp />} />
        </Route>
    ))

    return (
        <>
            <RouterProvider router={router}></RouterProvider>
        </>
    )
}