import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

import {db} from "../libs/db.js";
import {UserRole} from '../generated/prisma/index.js'

dotenv.config();

export const register= async(req,res)=>{
    const {email,password,name}=req.body;
    if(!email || !password || !name){
        return res.status(400).json({
            message:"All fields are required"
        })
    }
    try {
        const existuser=await db.user.findUnique({
            where:{email}
        })
        if(existuser){
            return res.status(400).json({
                message:"User already exist"
            })
        }
        const hashedPassword=await bcrypt.hash(password,10);
        const newuser=await db.user.create({
            data:{
                email,
                password:hashedPassword,
                name,
                role:UserRole.USER
                
            }
        })

        // create jwt token
        const token=jwt.sign({id:newuser.id},process.env.JWT_SECRET,{
            expiresIn:"7d"
        });
        const cookieoptions={
            httpOnly:true,
            sameSite:"strict",
            secure:process.env.NODE_ENV !=="production",
            maxAge:1000*60*60*24*7, //7days

        }
        res.cookie("jwt",token,cookieoptions);
        res.status(201).json({
            message:"User created successfully",
            sucess:true,
            user:{
                id:newuser.id,
                name:newuser.name,
                email:newuser.email,
                role:newuser.role,
                image:newuser.image
            }
        })

       
    } catch (error) {
        console.log("error creating user",error);
        res.status(500).json({
            message:"user not create "
        })
        
        
    }

    
}

export const login=async(req,res)=>{
    const{email,password}=req.body;
    if(!email || !password){
        return res.status(400).json({
            message:"All fields are required"
        })
    }
    try {
        const user=await db.user.findUnique({
            where:{email}
        })
        if(!user){
            return res.status(400).json({
                message:"user not found"
            })
        }
        //compare password
        const ispasswordmatch=await bcrypt.compare(password,user.password)
        if(!ispasswordmatch){
            return res.status(401).json({
                message:"invalid credentials"
            })
        }

        //create jwt token
        const token=jwt.sign({id:user.id},process.env.JWT_SECRET,{
            expiresIn:"7d"
        });
        //cokkie options
        const cookieoptions={
            httpOnly:true,
            sameSite:"strict",
            secure:process.env.NODE_ENV !=="production",
            maxAge:1000*60*60*24*7, //7days

        }
        res.cookie("jwt",token,cookieoptions);

        res.status(200).json({
            message:"User logged in successfully",
            user:{
                id:user.id,
                name:user.name,
                email:user.email,
                role:user.role,
                image:user.image
            }
        })

        
    } catch (error) {
        console.log("error creating user",error);
        res.status(500).json({
            message:"user not create "
        })
        
    }

}

export const logout=async(req,res)=>{
    try {
        res.clearCookie("jwt",{
            httpOnly:true,
            sameSite:"strict",
            secure:process.env.NODE_ENV !=="production",

        });
        res.status(200).json({
            sucess:true,
            message:"User logged out successfully"
        })
    } catch (error) {
        console.log("error creating user",error);
        res.status(500).json({
            message:"some problem occured "
        })
        
    }
}

export const check=async(req,res)=>{
    try {
        res.status(200).json({
            sucess:true,
            message:"User authenticated successfully",
            user:req.user
        })
    } catch (error) {
        console.log("error creating user",error);
        res.status(500).json({
            message:"some problem occured "
        })
        
    }
}