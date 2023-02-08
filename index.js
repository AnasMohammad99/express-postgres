import express, { json } from "express";
import cors from "cors";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import {dirname, join} from "path";
import { fileURLToPath } from "url";
import userRouter from "./routes/users-routes.js" 
import authRouter from "./routes/auth-routes.js" 

dotenv.config();
const __dirname = dirname(fileURLToPath(import.meta.url));

const app = express();
const PORT = process.env.PORT||5000;
const corsoptions = {credentials: true, origin:process.env.url||"*"}
app.use(cors(corsoptions))
app.use(json())
app.use(cookieParser())
app.use("/", express.static(join(__dirname,'public')))
app.use('/api/users',userRouter)
app.use('/api/auth', authRouter)

app.listen(PORT, ()=>{
    console.log("server is running...");
})