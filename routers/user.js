import express from "express"
import { getMyProfile, loginPostApi, logoutGetApi, registerPostApi } from "../controllers/user.js"
import { isAuthenticated } from "../middleware/auth.js"

const router = express.Router()

router.post("/login" , loginPostApi)
router.post("/register" , registerPostApi)
router.get("/logout" , logoutGetApi)
router.get("/me" , isAuthenticated , getMyProfile)

export default router