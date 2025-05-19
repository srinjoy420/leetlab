import React, { Children, use }  from "react";
import { useAuthStore } from "../store/useAuthStore";


const LogoutButton=({children})=>{
    const {logout}=useAuthStore()

    const onlogout=async()=>{
        await logout()
    }

    return(
        <button className="btn btn-primary" onClick={onlogout}>
            {children}
        </button>
    )

}
export default LogoutButton;