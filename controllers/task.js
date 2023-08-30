import { Task } from "../models/task.js";
import jwt from "jsonwebtoken";
import { User } from "../models/user.js";
import { ErrorClass } from "../middleware/error.js";

export const createTask = async (req, res, next) => {

    const { title, description } = req.body
    const { token } = req.cookies
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decoded._id)

    const newTask = await Task.create({
        title, description, user
    })

    res.status(201).json({
        success: true,
        message: "task created successfully"
    })

}


export const showTasks = async (req, res, next) => {

    const { token } = req.cookies
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decoded._id)

    const tasks = await Task.find({
        user: user._id
    })

    res.status(200).json({
        success: true,
        tasks
    })

}



export const deleteTask = async (req, res, next) => {

try {
    
    
    const taskId = req.params.id
    const task = await Task.findById(taskId)

    if (!task) return next(new ErrorClass("invalid task id", 404))

    await task.deleteOne()

    res.status(200).json({
        success: true,
        message: "task deleted successfully"

    })

} catch (error) {
    return next(new ErrorClass("invalid task id", 404))
}

}



export const updateTask = async (req, res, next) => {

    const taskId = req.params.id

    try {
        const task = await Task.findById(taskId)

        task.isCompleted = !(task.isCompleted)
        task.save();


        res.status(200).json({
            success: true,
            message: "task updated successfully"

        })

    } catch (error) {
        return next(new ErrorClass("invalid task id", 404))
    }



} 