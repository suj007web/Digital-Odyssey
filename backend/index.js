import express from  "express"
import cookieParser from "cookie-parser"
import cors from "cors"
import dotenv from "dotenv"
import "./utils/db.js"
import connectDB from "./utils/db.js"
import userRouter from "./routes/user.route.js"
import companyRouter from "./routes/company.route.js"
import jobRouter from "./routes/job.route.js"
import applicationRouter from "./routes/appliction.route.js"
dotenv.config({})
// import { fileURLToPath } from 'url';
// import path, { dirname } from 'path';


const app = express();

// const __filename = fileURLToPath(import.meta.url);
// const __dirname = dirname(__filename);
// const staticDir = path.join(__dirname, '..', 'frontend', 'dist')

// app.use(express.static(staticDir))

const PORT = process.env.PORT || 3000;

//middleware 
app.use(express.json());
app.use(express.urlencoded({extended : true}));
app.use(cookieParser());
const corsOptions = {
    origin : process.env.FRONTEND,
    credentials : true,
}
app.use(cors(corsOptions));



//apis
app.use("/api/v1/user", userRouter);
app.use("/api/v1/company", companyRouter);
app.use("/api/v1/job", jobRouter);
app.use("/api/v1/application", applicationRouter)

app.get("/", (req, res)=>{
    return res.status(200).json({
        message : "server up",
        success : true
    })
})

// app.get('*', (req, res, next) => {
//     return res.sendFile(path.join(staticDir, 'index.html'))
//   });

app.listen(PORT, ()=>{
    connectDB();
    console.log(`App is running on port ${PORT}`);
})