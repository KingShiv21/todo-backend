import mongoose from "mongoose";

export const dbConnect = () =>{


    mongoose.connect(process.env.SERVER, {
    dbName: "api"
}).then(
    (c) => { console.log(`db connected with ${c.connection.host}`) }
).catch(
    (e) => { console.log(e) }
)


}