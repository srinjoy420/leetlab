import express from "express";
import { authMidleware, checkAdmin } from "../middleware/auth.middleware.js"
import { createProblem, getAllProblems, getProblembyId, updateProblem, Deleteproblem, getAllProblemssolvedbyUser } from "../controller/problem.controller.js";

const problemRoutes = express.Router();
problemRoutes.post("/create-problem", authMidleware, checkAdmin, createProblem)
problemRoutes.get("/get-all-problems", authMidleware, getAllProblems)
problemRoutes.get("/get-problem/:id", authMidleware, getProblembyId)
problemRoutes.put("/update-problem/:id", authMidleware, checkAdmin, updateProblem)
problemRoutes.delete("/delete-problem/:id", authMidleware, checkAdmin, Deleteproblem)
problemRoutes.get("/get-solved-problems", authMidleware, getAllProblemssolvedbyUser)



export default problemRoutes