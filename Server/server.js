import express from "express"
import mongoose from "mongoose"
import cors from "cors"
import bodyParser from "body-parser"
import dotenv from "dotenv"
import userRoutes from "./routes/userRoutes.js"
import todoRoutes from "./routes/todoRoutes.js"



const server = express();
server.use(bodyParser.json())
server.use(cors())
dotenv.config()


const PORT = process.env.PORT || 4000;
const URL = process.env.DATABASE_URL;

mongoose.connect(URL)
.then(() => {

    console.log("Connected to DATABASE");

    server.listen(PORT,()=>{
        console.log(`Server is running on port ${PORT}`)
    })

})
.catch((err) => console.log(err.message) );


server.use("/api/user",userRoutes)
server.use("/api/todo",todoRoutes)