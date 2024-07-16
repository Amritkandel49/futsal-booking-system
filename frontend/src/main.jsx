import React from 'react'
import ReactDOM from 'react-dom/client'
import Layout from './Layout.jsx'
// import App from './App.jsx'
import './index.css'
import { RouterProvider, createBrowserRouter, Route, createRoutesFromElements} from 'react-router-dom'
import Home from './pages/Home.jsx'
import Login from './pages/Login.jsx'
import SignUp from './pages/SignUp.jsx'



const router = createBrowserRouter(createRoutesFromElements(
  <Route path='/' element = {<Layout />}>
    <Route path='/' element = {<Home />} />
    <Route exact
      path='/login'
      element = {<Login />} />
    <Route exact
      path='/signup'
      element = {<SignUp />} />
  </Route>
))


ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router}/>
  </React.StrictMode>,
)
