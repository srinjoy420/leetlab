import express from 'express';
import {authMidleware} from "../middleware/auth.middleware.js"
import {getallSubmission,getSubmissionforProblem,getalltheSubmissionforProblem} from "../controller/submission.controller.js"
const submissionRoutes=express.Router();
submissionRoutes.get("/get-all-submission",authMidleware,getallSubmission);
submissionRoutes.get("/get-submission/:problemId",authMidleware,getSubmissionforProblem);
submissionRoutes.get("/get-submission-count/:problemId",authMidleware,getalltheSubmissionforProblem);

export default  submissionRoutes;