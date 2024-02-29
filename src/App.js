import React, { Suspense, useContext, useEffect } from 'react'
import Navbar from './Components/Navbar/Navbar'
import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import Layout from './Components/Layout'
import Login from './Components/Home/Login/Login'
import Register from './Components/Register/Register'
import Home from './Components/Home/Home'
// import Products from './Components/Home/Products/Products'
import Categories from './Components/Categories/Categories'
import NotFound from './Components/NotFound'
import Brands from './Components/Brands/Brands'
import Parent from './Components/Parent'
import { CounterContextProvider } from './CounterContext'
import { userContext } from './UserContext'
import ProtectedRoute from './Components/ProtectedRoute'
import Cart from './Components/Cart/Cart'
import productDetails from './Components/productDetails'
import ProductDetails from './Components/productDetails'
// import Orders from './Orders'
import { lazy } from 'react';
import Loading from './Components/Loading'
const Products = lazy(() => import('./Components/Home/Products/Products'));
const Orders = lazy(() => import('./Orders'));



export default function App() {

  let {setIsUser,setLogin} = useContext(userContext)

  //Handel el Refresh!!
  useEffect(()=>{
    if(localStorage.getItem('userToken'))
    setIsUser(localStorage.getItem('userToken'))
    setLogin(localStorage.getItem('userName'))
  },[])

  const routes = createBrowserRouter([
    {path:'',element:<Layout></Layout>, children:[
      {index:true,element:<Login></Login>},
      {path:'register',element:<Register></Register>},
      {path:'home',element:<ProtectedRoute><Home></Home></ProtectedRoute>},
      {path:'allorders',element:<ProtectedRoute><Suspense fallback={<Loading></Loading>}><Orders></Orders></Suspense></ProtectedRoute>},
     {path:'cart',element:<ProtectedRoute><Cart></Cart></ProtectedRoute>},
      {path:'products',element:<ProtectedRoute><Suspense fallback={<Loading></Loading>}><Products></Products></Suspense></ProtectedRoute>},
      {path:'productDetails/:id',element:<ProductDetails></ProductDetails>},
      
      {path:'brands',element:<ProtectedRoute><Brands></Brands></ProtectedRoute>},
      {path:'categories',element:<ProtectedRoute><Categories></Categories></ProtectedRoute>},
      {path:'*',element:<NotFound></NotFound>},
    ]}
  ])



  return (
   <RouterProvider router={routes}></RouterProvider>
  
  )
}

