import React, { useEffect } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';


import Homepage from './page/Homepage';
import Loginpage from './page/Loginpage';
import SingUpPage from './page/SingUpPage';
import { useAuthStore } from './store/useAuthStore';
import { Loader } from "lucide-react";
import Layout from './layout/Layout'
import AdminRoute from './components/AdminRoute';
import AddProblem from './page/AddProblem';

const App = () => {
  const { authUser, checkauth, isChekingAuth } = useAuthStore()
  useEffect(() => {
    checkauth()
  }, [checkauth])

  if (isChekingAuth && !authUser) {
    return (
      <div className='flex items-center justify-center h-screen'>
        <Loader className="size-10 animate-spin" />

      </div>
    )
  }

  return (
    <div className='flex items-center justify-center '>
      <Toaster />
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route
            index
            element={authUser ? <Homepage /> : <Navigate to={"/login"} />}
          />

        </Route>


        <Route
          path='/login'
          element={!authUser ? <Loginpage /> : <Navigate to={"/"} />}
        />

        <Route
          path='/Singup'
          element={!authUser ? <SingUpPage /> : <Navigate to={"/"} />}
        />
        <Route element={<AdminRoute />}>
          <Route
            path="/add-problem"
            element={authUser ? <AddProblem /> : <Navigate to="/" />}
          />
        </Route>


      </Routes>
    </div>
  )
};


export default App