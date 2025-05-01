import express from "express";
import {register,login,logout,check} from "../controller/auth.controller.js"
import {authMidleware} from "../middleware/auth.middleware.js"


const authRoutes=express.Router();
authRoutes.post("/register" , register)
authRoutes.post("/login" , login)
authRoutes.post("/logout" ,authMidleware, logout)
authRoutes.get("/check" ,authMidleware, check)


export default authRoutes
