import { db } from "../libs/db.js";
import { getJudge0LanguageId, submitBatch, pollBatchResults, getLanguageName } from "../libs/judge0.lib.js"
export const executeCode = async (req, res) => {
    try {
        const { source_code, language_id, stdin, expected_outputs, problemId } = req.body;
        const userId = req.user.id;
        //validate test cases
        if (!Array.isArray(stdin) || stdin.length === 0 || !Array.isArray(expected_outputs) || expected_outputs.length !== stdin.length) {
            return res.status(400).json({
                error: "invalid or missing testcases"
            })
        }
        //2 prepare each testcases for judge0 batch submission
        const submissons = stdin.map((input) => ({
            source_code,
            language_id,
            stdin: input


        }));
        //3 submit the batch to judge0
        const submitResponse = await submitBatch(submissons);
        const tokens = submitResponse.map((res) => res.token)
        //4 poll judge0 for the results all testcases
        const results = await pollBatchResults(tokens)
        console.log("result.........");
        console.log(results);
        //analyze testcases results
        let allPassed = true;
        const detailresults = results.map((result, i) => {
            const stdout = result.stdout?.trim();
            const expected_output = expected_outputs[i]?.trim();
            const passed = stdout === expected_output;
            if (!passed) allPassed = false;
            return {
                testCase: i + 1,
                passed,
                stdout,
                expected: expected_output,
                stderr: result.stderr || null,
                compile_output: result.compile_output || null,
                status: result.status.description,
                memory: result.memory ? `${result.memory} KB` : undefined,
                time: result.time ? `${result.time} s` : undefined


            }

            // console.log(`testcase #${i+1}`);
            // console.log(`input ${stdin[i]}`);
            // console.log(`expected output ${expected_output}`);
            // console.log(`stdout ${stdout}`);
            // console.log(`matteched for testcase ${i+1}: ${passed}`);



        })
        console.log(detailresults);
        //store submisson summery
        const submission = await db.submission.create({
            data: {
                userId,
                problemId,
                sourceCode: source_code,
                language: getLanguageName(language_id),
                stdin: stdin.join("\n"),
                stdout: JSON.stringify(detailresults.map((r) => r.stdout)),
                stderr: detailresults.some((r) => r.stderr)
                    ? JSON.stringify(detailresults.map((r) => r.stderr))
                    : null,
                compileOutput: detailresults.some((r) => r.compile_output)
                    ? JSON.stringify(detailresults.map((r) => r.compile_output))
                    : null,
                status: allPassed ? "Acceped" : "wrong",
                memory: detailresults.some((r) => r.memory)
                    ? JSON.stringify(detailresults.map((r) => r.memory))
                    : null,
                time: detailresults.some((r) => r.time)
                    ? JSON.stringify(detailresults.map((r) => r.time))
                    : null,




            },
        });
        //if all passed= true mark problem as solved for the user
        if(allPassed){
            await db.problemSolved.upsert({
                where:{
                    userId_problemId:{
                        userId,problemId
                    }
                },
                update:{},
                create:{
                    userId,problemId
                }

            })
        }
        //individualtest case results using detailedresult
       const testCaseResults=detailresults.map((result)=>({
        submissionId:submission.id,
        testCase:result.testCase,
        expected:result.expected,
        passed:result.passed,
        stdout:result.stdout,
        stderr:result.stderr,
        compileOutput:result.compile_output,
        status:result.status,
        memory:result.memory,
        time:result.time
        


       }))

       await db.testCaseResult.createMany({
        data:testCaseResults
       })

       const submissionwithtestCase=await db.submission.findUnique({
        where:{
            id:submission.id
        },
        include:{
            testCases:true
        }

       })




        res.status(200).json({

            sucess: true,
            message: "code executed successfully",
            results,
            submission:submissionwithtestCase
        })


    } catch (error) {
        console.log("error in executing code", error);
        res.status(500).json({
            error: "internal server error"
        })

    }

}