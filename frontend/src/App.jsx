import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Homepage from './page/Homepage';
import Loginpage from './page/Loginpage';
import SingUpPage from './page/SingUpPage';

const App = () => {
  let authUser = null;
  return (
    <div className='flex items-center justify-center '>
      <Routes>

        <Route
          path='/'
          element={authUser ? <Homepage /> : <Navigate to={"/login"} />}
        />
        <Route
          path='/login'
          element={!authUser ? <Loginpage /> : <Navigate to={"/"} />}
        />

        <Route
          path='/Singup'
          element={!authUser ? <SingUpPage /> : <Navigate to={"/"} />}
        />
      </Routes>
    </div>
  )
}

export default App