import express from "express";
import cookieParser from "cookie-parser";
import { dbConnect } from "./data/dbConfig.js";
import {config} from "dotenv"
import userRouter from "./routers/user.js"
import taskRouter from "./routers/task.js"
import { errorMiddleware } from "./middleware/error.js";
import cors from "cors"



const app = express();
config({
    path:"./data/config.env",
})
// if not uses middle ware before , then unusable for its above ones


// db connection
dbConnect();


// req middlewares ( MIDDLEWARES ARE NOT REQ TO SEND TO MKVs )
app.use(express.json())
app.set("view engine", "ejs"); // for ejs
app.use(express.urlencoded({ extended: true })); // to get data from form in body object
app.use(cookieParser()) // to get req.cookies
app.use(cors(
    {
        origin: [process.env.FROENT_URL],
        methods: ["GET" , "POST" , "PUT" , "DELETE"],
        credentials:true,
    }
))

// routes middlewares
app.use("/api/v1/user", userRouter)
app.use("/api/v1/task", taskRouter)



app.get("/", (req,res)=>{
res.send("Api working fine")
})

app.use(errorMiddleware)


app.listen(process.env.PORT, () => {
    console.log(`server is working on port ${process.env.PORT} in ${process.env.NODE_ENV} mode `);

});