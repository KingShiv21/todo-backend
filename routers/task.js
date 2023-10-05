import express from "express"
import { isAuthenticated } from "../middleware/auth.js"
import { createTask, deleteTask, showTasks, updateTask } from "../controllers/task.js"

const router = express.Router()


router.post("/new" , isAuthenticated , createTask)
router.get("/my" ,isAuthenticated ,  showTasks)


router.route("/:id")
.put(isAuthenticated, updateTask)
.delete(isAuthenticated, deleteTask)

export default router