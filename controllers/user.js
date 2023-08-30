
import { User } from "../models/user.js";
import bcrypt from "bcrypt";
import { createCookie } from "../utils/createCookie.js";
import jwt from "jsonwebtoken"
import {ErrorClass} from "../middleware/error.js"



export const registerPostApi = async (req, res) => {
    const { name, email, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);

    // save data in db
    const user = await User.create(
        {
            name: name,
            email: email,
            password: hashedPassword
        }
    );

    // create token
    createCookie(res, user, "cookie created", 201)

}


export const loginPostApi = async (req, res ,next) => {

    const { email, password } = req.body;
    const user = await User.findOne({ email });


    // compare email
    if (user) {

        // compare password
        const isMatch = await bcrypt.compare(password, user.password)

        if (isMatch) {
            // create token
            createCookie(res, user, `welcome back , ${user.name} `, 200)

            // NOTE : DOUBLE RESPONSE NOT ALLOWED !!!!!!


        }
        else {
            return next(new ErrorClass("incorrect password", 404))
        }

    }
    else {
        return next(new ErrorClass("incorrect email or password", 404))
    }

}


export const logoutGetApi = async (req, res) => {

    const { token } = req.cookies
    const decoded = jwt.verify(token, process.env.JWT_SECRET)
    const user = await User.findById(decoded._id)

    res.cookie("token", null, {
        expires: new Date(Date.now()),
        httpOnly : true ,
        sameSite : process.env.NODE_ENV === "Development" ? "lax" : "none" ,
        secure : process.env.NODE_ENV === "Development" ? false : true 

    })
        .status(200).json({
            success: true,
            user: user
        })
}



export const getMyProfile = async (req, res, next) => {

    const { token } = req.cookies
    const decoded = jwt.verify(token, process.env.JWT_SECRET)
    const user = await User.findById(decoded._id)

    res.status(200).json({
        success: true,
        user: user
    })
}
