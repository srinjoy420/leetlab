import express from 'express';
import dotenv from "dotenv";
import cookieParser from "cookie-parser"

// routes 
import authRoutes from "./routes/auth.routes.js"
import problemRoutes from "./routes/problem.routes.js";
import executionRoute from "./routes/executeCode.routes.js"


dotenv.config();

const app = express();

app.use(express.json())
app.use(cookieParser())

const port = process.env.PORT || 8080



app.get('/', (req, res) => {
  res.send('leeet lav is comming 🔥')
})

app.use("/api/v1/auth",authRoutes);
app.use("/api/v1/problem",problemRoutes);
app.use("/api/v1/execute-code",executionRoute)



app.listen(port, () => {
  console.log("surver is running on port ", port);

})