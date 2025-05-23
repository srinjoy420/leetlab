import express from 'express';
import dotenv from "dotenv";
import cookieParser from "cookie-parser"
import cors from "cors"

// routes 
import authRoutes from "./routes/auth.routes.js"
import problemRoutes from "./routes/problem.routes.js";
import executionRoute from "./routes/executeCode.routes.js"
import submissionRoutes from "./routes/submission.routes.js"
import playlistRoutes from "./routes/playlist.routes.js"


dotenv.config();

const app = express();

app.use(express.json())
app.use(cookieParser())

const port = process.env.PORT || 8080
 app.use(
  cors({
    origin: process.env.FRONTEND_URL,
    credentials: true,
    allowedHeaders: ["Content-Type", "Authorization"],
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS", "PATCH"],
  })
);



app.get('/', (req, res) => {
  res.send('leeet lav is comming 🔥')
})

app.use("/api/v1/auth",authRoutes);
app.use("/api/v1/problem",problemRoutes);
app.use("/api/v1/execute-code",executionRoute)
app.use("/api/v1/submission",submissionRoutes)
app.use("/api/v1/playlist",playlistRoutes)






app.listen(port, () => {
  console.log("surver is running on port ", port);

})