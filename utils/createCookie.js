import jwt from "jsonwebtoken";


export const createCookie =  (res , user ,message = "cookie created" , statuscode = 200) =>{

    const token = jwt.sign({ "_id": user._id}, process.env.JWT_SECRET);


    // save in cookie
    res.cookie("token", token, {
        httpOnly : true ,
        maxAge:  (60 * 60 * 1000),
        sameSite : process.env.NODE_ENV === "Development" ? "lax" : "none" ,
        secure : process.env.NODE_ENV === "Development" ? false : true 
    })
    .json({
        success : true , 
        message : message
    })
    .status(statuscode)


}