import express from "express";
import dotenv from 'dotenv';
import path from 'path';
import cors from 'cors'
import router from './src/routes/index.js'
import {connectDatabase} from "./src/config/db.js"
// import {currentConf} from "./src/config/current-config.js";
import morgan from "morgan";

const app = express()
const port  = process.env.PORT || '3000';


dotenv.config();

// app.use(cors());

//Body Parsing
app.use(express.urlencoded({ extended: true }));
connectDatabase()

// Morgan
// if (process.env.NODE_ENV === "development") {
//     app.use(morgan("dev"));
//   }

app.use(cors());

app.use(express.json());
app.use('/api',router)


app.listen(port,()=>{
    console.log(`server Listening at http://localhost:${port}`)
})