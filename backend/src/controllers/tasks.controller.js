const httpStatus = require('http-status')
const { TaskService } = require('../services/tasks.service')
const catchAsync = require('../utils/catchAsync')

const createTask = catchAsync(async (req, res) => {
    let assets = null
    if (req.files && req.files.length > 0) {
        assets = req.files.map((file) => file.filename)
    }
    req.body.assets = assets
    const task = await TaskService.createTask(req.body)
    res.status(httpStatus.CREATED).send({ task })
})

// tasks based on user id
const getTasks = catchAsync(async (req, res) => {
    console.log(req.user)
    const { page, limit, stage } = req.query
    const result = await TaskService.getUserTasksByUserId(
        req.user.sub.id,
        stage,
        page,
        limit
    )
    res.status(httpStatus.OK).send(result)
})

// get single task based on task id
const getTaskById = catchAsync(async (req, res) => {
    const task = await TaskService.getTaskById(req.params.taskId)
    res.status(httpStatus.OK).send({ task })
})

// update task based on task id
const updateTask = catchAsync(async (req, res) => {
    const task = await TaskService.updateTaskById(req.params.taskId, req.body)
    res.status(httpStatus.OK).send({ task })
})

// delete task based on task id
const deleteTask = catchAsync(async (req, res) => {
    const isDeleted = await TaskService.deleteTaskById(req.params.taskId)
    res.status(httpStatus.OK).send({
        status: 'success',
        message: isDeleted ? 'Task deleted successfully' : 'Task not found'
    })
})

const assignTask = catchAsync(async (req, res) => {
    const task = await TaskService.assignTask(
        req.params.taskId,
        req.params.userEmail
    )
    res.status(httpStatus.OK).send({ task })
})

const taskCountByStage = catchAsync(async (req, res) => {
    const userId = req.user.sub.id
    const stageCounts = await TaskService.getTaskCountByStage(userId)
    res.status(httpStatus.OK).send({ ...stageCounts })
})

module.exports.TasksController = {
    createTask,
    getTasks,
    getTaskById,
    updateTask,
    deleteTask,
    assignTask,
    taskCountByStage
}
