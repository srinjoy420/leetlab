import axios from "axios"
import dotenv from "dotenv";
dotenv.config();
//It takes a programming language name (like "Python" or "javaScript") and returns the corresponding Judge0 language ID
export const getJudge0LanguageId=(Language) => {
    const languageMap={
        "PYTHON":71,
        "JAVA":62,
        "JAVASCRIPT":63
    }
    return languageMap[Language.toUpperCase()]

    
}
const sleep=(ms)=>new Promise((resolve)=>setTimeout(resolve,ms))
export const pollBatchResults=async(tokens)=>{
    while(true){
        const {data}=await axios.get(`${process.env.JUDGE0_API_URL}/submissions/batch`,{
            params:{
                tokens:tokens.join(","),
                ase64_encoded:false
            }
        })
        const results=data.submissions
        // console.log(results);
        
        //if all true thwn return true
        const isAllDone=results.every(
            (r)=>r.status.id !==1 && r.status.id !==2
        )
        if(isAllDone) return results
        await sleep(1000)
    }
    
}
// hit judge0 api submisson
//This function sends multiple code submissions to the Judge0 API — one for each test case — and gets back tokens (tracking IDs) for each.
export const submitBatch=async(submissions)=>{
    const {data}=await axios.post(`${process.env.JUDGE0_API_URL}/submissions/batch?base64_encoded=false`,{
        submissions
    })
    console.log("submission Results",data);

    return data //[{token}]
    

}
export function getLanguageName(languageId){
    const LANGUAGE_NAMES={
        74:"Typescript",
        "PYTHON":71,
        "JAVA":62,
        "JAVASCRIPT":63
    }
    return LANGUAGE_NAMES[languageId] || "unknown"

}
