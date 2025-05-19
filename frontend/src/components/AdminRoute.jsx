import React from 'react'
import { Navigate, Outlet } from "react-router-dom"
import { useAuthStore } from '../store/useAuthStore';
const AdminRoute = () => {
    const { authUser, isChekingAuth } = useAuthStore()

    if (isChekingAuth) {
        return <div className="flex items-center justify-center h-screen"><Loader className="size-10 animate-spin" /></div>;
    }
    if(!authUser || authUser.role!== "ADMIN"){
        return <Navigate to="/"/>;

    }
    return <Outlet/>
}

export default AdminRoute