import mongoose from "mongoose";

const userSchema = new mongoose.Schema(  // new coz we are creating a new structure
    {
        name: {
        type: String,
        required : true
    },
        email: {
            type: String,
            required : true,
            unique:true
        },
        password: {
            type: String,
            required : true
        }
    }
)
export const User = mongoose.model("users", userSchema)