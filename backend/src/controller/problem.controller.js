import { db } from "../libs/db.js";
import { getJudge0LanguageId, submitBatch, pollBatchResults } from "../libs/judge0.lib.js"
export const createProblem = async (req, res) => {
    //going to get all the data from req body
    //going to chexk user role again
    //going to loopr throw each and every solution
    const { title, description, difficulty, tags, examples, constraints, testcases, codeSnippets, referenceSolutions } = req.body;
    if (req.user.role !== "ADMIN") {
        return res.status(403).json({
            error: "user not authorised to create problem you are not admin"
        })
    }
    try {//it becames array of key and value paires language and corrosponding solution code
        for (const [language, solutionCode] of Object.entries(referenceSolutions)) {
            //get judge0 language id for the current language
            const languageId = getJudge0LanguageId(language);
            if (!languageId) {
                return res.status(400).json({
                    error: `Language ${language} is not suppoeted`,
                    message: "invalid language"
                })
            }
            //proper judge0 submission for all the testcases it return
            //  {
        //     source_code: "a + b",       // example solutionCode
        //         language_id: 63,            // JavaScript
        //             stdin: "2 3",
        //                 expected_output: "5"
        // },

        const submission = testcases.map(({ input, output }) => ({
            source_code: solutionCode,
            language_id: languageId,
            stdin: input,
            expected_output: output
        }))
        const submissionresults = await submitBatch(submission)
        const tokens = submissionresults.map((res) => res.token)
        //submission all the testcases
        const results = await pollBatchResults(tokens)
        for (let i = 0; i < results.length; i++) {


            const result = results[i];
            console.log("results", result);
            if (result.status.id !== 3) {
                return res.status(400).json({
                    error: `testcase ${i + 1} failed for language ${language}`
                })
            }
        }
        //save the problem to the database





    }
        const newProblem = await db.problem.create({
        data: {
            title,
            description,
            difficulty,
            tags,
            examples,
            constraints,
            testcases,
            codeSnippets,
            referenceSolutions,
            userId: req.user.id

        }
    })
    return res.status(201).json({
        sucess: true,
        message: "problem Created Successfully",
        problem: newProblem,
    })
} catch (error) {
    console.log("error in creating problem", error);

    return res.status(400).json({
        message: "some error occured while creating problem",
    })

}

}
export const getAllProblems = async (req, res) => {
    try {
        const problems = await db.problem.findMany();
        if (!problems || problems.length === 0) {
            return res.status(400).json({
                error: "no problems found"
            })

        }
        res.status(200).json({
            sucess: true,
            message: "all problems fetched successfully",
            problems
        })
    } catch (error) {
        console.log("error in getting all problems", error);
        return res.status(400).json({
            error: "some error occured while getting all problems",
        })



    }
}
export const getProblembyId = async (req, res) => {
    const { id } = req.params;
    try {

        const problem = await db.problem.findUnique({
            where: {
                id: id

            }
        })
        if (!problem) {
            return res.status(400).json({
                error: "problem not found"
            })
        }
        res.status(200).json({
            sucess: true,
            message: "problem fetched succesfully",
            problem
        })
    } catch (error) {
        console.log("error in getting problem by id", error);
        return res.status(404).json({
            error: "some error occured while getting problem by id",
        })


    }
}
export const updateProblem = async (req, res) => {
    const { id } = req.params;
    try {
        const problem = await db.problem.findUnique({
            where: {
                id: id
            }
        })
        if (!problem) {
            return res.status(400).json({
                error: "problem not found"
            })
        }
        const { title, description, difficulty, tags, examples, constraints, testcases, codeSnippets, referenceSolutions } = req.body;
        for (const [language, solutionCode] of Object.entries(referenceSolutions)) {
            //get judge0 language id for the current language
            const languageId = getJudge0LanguageId(language);
            if (!languageId) {
                return res.status(400).json({
                    error: `Language ${language} is not suppoeted`,
                    message: "invalid language"
                })
            }
            //proper judge0 submission for all the testcases
            const submission = testcases.map(({ input, output }) => ({
                source_code: solutionCode,
                language_id: languageId,
                stdin: input,
                expected_output: output
            }))
            const submissionresults = await submitBatch(submission)
            const tokens = submissionresults.map((res) => res.token)
            //submission all the testcases
            const results = await pollBatchResults(tokens)
            for (let i = 0; i < results.length; i++) {


                const result = results[i];
                console.log("results", result);
                if (result.status.id !== 3) {
                    return res.status(400).json({
                        error: `testcase ${i + 1} failed for language ${language}`
                    })
                }
            }
            //save the problem to the database





        }
        const updateProblem = await db.problem.update({
            where: {
                id: id
            },
            data: {
                title,
                description,
                difficulty,
                tags,
                examples,
                constraints,
                testcases,
                codeSnippets,
                referenceSolutions,
                userId: req.user.id

            }
        })
        return res.status(201).json({
            sucess: true,
            message: "problem Updated Successfully",
            problem: updateProblem,
        })

    } catch (error) {
        console.log("error in updating problem", error);

        return res.status(400).json({
            message: "some error occured while updating problem",
        })

    }
}
export const Deleteproblem = async (req, res) => {
    const { id } = req.params;
    try {
        const problem = await db.problem.findUnique({
            where: { id: id }
        })
        if (!problem) {
            return res.status(400).json({
                error: "problem not found"
            })
        }
        await db.problem.delete({
            where: {
                id
            }
        })
        res.status(200).json({
            sucess: true,
            message: "problem deleted successfully",


        })

    } catch (error) {
        console.log("error in deleting problem", error);
        return res.status(400).json({
            error: "some error occured while deleting problem",
        })


    }
}
export const getAllProblemssolvedbyUser = async (req, res) => {
    res.send("get all problems solved by user")
}