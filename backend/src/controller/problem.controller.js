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
    try {
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
            const submission = testcases.map(({input, output}) => ({
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
                if (result.status.id !== 3) {
                    return res.status(400).json({
                        error: `testcase ${i+1} failed for language ${language}`
                    })
                }
            }
            //save the problem to the database
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
                    userid: req.user.id

                }
            })
            return res.status(201).json(newProblem)


        }
    } catch (error) {

    }

}
export const getAllProblems = async (req, res) => {
    res.send("get all problems")
}
export const getProblembyId = async (req, res) => {
    res.send("get problem by id")
}
export const updateProblem = async (req, res) => {
    res.send("update problem")
}
export const Deleteproblem = async (req, res) => {
    res.send("delete problem")
}
export const getAllProblemssolvedbyUser = async (req, res) => {
    res.send("get all problems solved by user")
}