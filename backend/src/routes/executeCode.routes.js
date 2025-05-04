import express from 'express';
import {authMidleware} from "../middleware/auth.middleware.js"
import {executeCode} from "../controller/execute.controller.js"

const executionRoute = express.Router();


// Define your routes here...
executionRoute.post("/",authMidleware,executeCode)



export default executionRoute;
