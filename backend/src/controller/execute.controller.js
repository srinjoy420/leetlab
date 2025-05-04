import {db} from "../libs/db.js";
import { getJudge0LanguageId, submitBatch, pollBatchResults } from "../libs/judge0.lib.js"
export const executeCode=async(req,res)=>{
   try {
    const {source_code,language_id,stdin,expected_outputs,problemId} = req.body;
    const userId=req.user.id;
    //validate test cases
    if(!Array.isArray(stdin)||stdin.length===0||!Array.isArray(expected_outputs)||expected_outputs.length!==stdin.length){
        return res.status(400).json({
            error:"invalid or missing testcases"
        })
    }
    //2 prepare each testcases for judge0 batch submission
    const submissons=stdin.map((input)=>({
        source_code,
        language_id,
        stdin:input
      

    }));
    //3 submit the batch to judge0
    const submitResponse=await submitBatch(submissons);
    const tokens = submitResponse.map((res) => res.token)
    //4 poll judge0 for the results all testcases
    const results = await pollBatchResults(tokens)
    console.log("result.........");
    console.log(results);
    res.status(200).json({
        sucess:true,
        message:"code executed successfully",
        results
    })
    
    
   } catch (error) {
    console.log("error in executing code",error);
    res.status(500).json({
        error:"internal server error"
    })
    
   }

}