import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import {db} from "../libs/db.js";


dotenv.config();

export const authMidleware=async(req,res,next)=>{
    try {
        console.log(req.cookies);
        const token=req.cookies.jwt;
        if(!token){
            return res.status(401).json({
                message:"Unauthorized no token provided"
            })
        }
        let decoded;
        try {
            decoded=jwt.verify(token,process.env.JWT_SECRET);
            console.log(decoded);
        } catch (error) {
            return res.status(401).json({
                message:"Unauthorized invalid token"
            })
        }
        const user=await db.user.findUnique({
            where:{id:decoded.id},
            select:{
                id:true,
                image:true,
                name:true,
                email:true,
                role:true
            }
        })

        if(!user){
            return res.status(401).json({
                message:"Unauthorized user not found"
            })
        }
        req.user=user;
        next();


      
    } catch (error) {
        console.log("error in auth middleware",error);
        res.status(500).json({
            message:"some problem occured "
        })
        
        
    }
}

export const checkAdmin=async(req,res,next)=>{
    try {
        const userId=req.user.id;
        const user= await db.user.findUnique({
            where:{
                id:userId
            },
            select:{
                role:true
            }
        })
    if(!user || user.role !=="ADMIN"){
        return res.status(403).json({
            message:"Unauthorized user is not admin"
        })

    }
    next();

    } catch (error) {
        console.log("error in auth admin",error);
        res.status(500).json({
            message:"some problem occured "
        })
        
        
    }
}