import {create} from "zustand";
import { axiosInstance } from "../lib/axios";
import {toast} from "react-hot-toast";
// import { getAllProblemssolvedbyUser, getProblembyId } from "../../../backend/src/controller/problem.controller";
// import { getAllProblems } from "../../../backend/src/controller/problem.controller";


export const useProblemStore=create((set)=>({
    problems:[],
    problem:null,
    solvedProblems:[],
    isproblemsLoading:false,
    isProblemLoading:false,

    getAllProblems:async()=>{
        try {
            set({isproblemsLoading:true})
            const res=await axiosInstance.get("/problem/get-all-problems");
            set({problems:res.data.problems})
        } catch (error) {
            console.log("error getting all problem",error);
            toast.error("error in getting all problems")
            
        }
        finally{
             set({isproblemsLoading:false})
        }
    },
    getProblembyId:async(id)=>{
        try {
             set({isproblemsLoading:true});
             const res=await axiosInstance.get(`/problem/get-problem/${id}`);
             set({problem:res.data.problem})
             toast.success(res.data.message || "get the problem using id")

            
        } catch (error) {
            console.log("error getting all problem",error);
            toast.error("error in getting all problems")
            
        }
        finally{
            set({isproblemsLoading:false})

        }
    },
    getAllProblemssolvedbyUser:async()=>{
        try {
            set({isproblemsLoading:true});
            const res=await axiosInstance.get(`/problem/get-solved-problems`);
             set({solvedProblems:res.data.problems})
             toast.success(res.data.message || "get the problem solved by user")


            
        } catch (error) {
            console.log("error getting all problem",error);
            toast.error("error in getting all problems")
            
        }
        finally{
            set({isproblemsLoading:false});

        }

    }


}))