import mongoose from "mongoose";

export const dbConnect = () =>{


    mongoose.connect(process.env.SERVER, {
    dbName: process.env.DATABASE
}).then(
    (c) => { console.log(`db connected with ${c.connection.host}`) }
).catch(
    (e) => { console.log(e) }
)


}