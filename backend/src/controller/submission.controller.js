import { db } from "../libs/db.js";

export const getallSubmission=async(req,res)=>{
   try {
    const userId=req.user.id;
    if(!userId){
        return  res.status(400).json({
        message:"unuthorized",
        success:false
    })

    }
    const submissions=await db.submission.findMany({
        where:{
            userId:userId
        }
    })
    res.status(200).json({
        message:"submission get succesfully",
        success:true,
        submissions
    })
   } catch (error) {
    console.log("error to get");
     res.status(400).json({
        message:"cant get id succesfully",
        success:false
    })

    
    
   }
}
export const getSubmissionforProblem=async(req,res)=>{
    try {
        const userId=req.user.id;
        const problemId=req.params.problemId;
        if(!userId){
            return res.status(400).json({
                message:"unauthorized",
                success:false
            })
        }
        const submissions=await db.submission.findMany({
            where:{
                userId:userId,
                problemId:problemId
            }
        })
        res.status(200).json({
                message:"succesfully fetched",
                success:true,
                submissions
            })

    } catch (error) {
        console.log("the problem",error);
         res.status(400).json({
                message:" cant succesfully fetched",
                success:false
            })
        
        
    }
}
export const getalltheSubmissionforProblem=async(req,res)=>{
    try {
        const problemId=req.params.problemId;
        const submissions=await db.submission.count({
            where:{
                problemId:problemId

            }
            

        })
        res.status(200).json({
                message:"  succesfully fetched",
                success:true,
                count:submissions
            })
    } catch (error) {
        console.log("fetch error",error);
          res.status(400).json({
                message:" cant succesfully fetched",
                success:false
            })
        
        
    }
}