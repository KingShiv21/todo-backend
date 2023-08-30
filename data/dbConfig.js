import mongoose from "mongoose";
import { config } from "dotenv";

export const dbConnect = () =>{


    mongoose.connect(process.env.SERVER, {
    dbName: process.env.DATABASE
}).then(
    () => { console.log("db connected") }
).catch(
    (e) => { console.log(e) }
)


}