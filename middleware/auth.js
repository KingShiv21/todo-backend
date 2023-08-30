
export const isAuthenticated = async (req,res,next)=>{

    const {token} = req.cookies;

    if(!token) {
      return   res.status(400).json({
        success: false,
        message: "login first"
      })
    }

    next();
    } 