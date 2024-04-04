const httpStatus = require('http-status')
const { Task } = require('../models')
const ApiError = require('../utils/ApiError')
const fs = require('fs')
const { getUserByEmail } = require('./user.service')
const { taskStageEnum } = require('../models/enum/taskEnum')
const { default: mongoose } = require('mongoose')
const createTask = async (taskBody) => {
    return Task.create(taskBody)
}

const getTaskById = async (id) => {
    return Task.findById(id)
        .populate({
            path: 'createdBy',
            select: 'name email _id'
        })
        .populate({
            path: 'assignedUsers',
            select: 'name email _id'
        })
}

// return total tasks and task count by stage. completed, in-progress, pending count
const getTaskCountByStage = async (userId) => {
    console.log({ userId })
    const objectId = new mongoose.Types.ObjectId(userId)
    const taskCounts = await Task.aggregate([
        { $match: { createdBy: objectId } },
        {
            $group: {
                _id: '$stage', // Group by stage field
                count: { $sum: 1 } // Count documents in each group
            }
        }
    ])

    console.log({ taskCounts })

    // Convert result to an object with stage counts
    const stageCounts = {}
    taskStageEnum.forEach((stage) => {
        const countObj = taskCounts.find((item) => item._id === stage)
        stageCounts[stage] = countObj ? countObj.count : 0
    })

    // Calculate total tasks
    const totalTasks = taskCounts.reduce(
        (total, stageCount) => total + stageCount.count,
        0
    )

    return {
        totalTasks,
        ...stageCounts
    }
}

// return the tasks based on user id with pagination
const getUserTasksByUserId = async (userId, stage, page = 1, limit = 10) => {
    // Calculate skip value based on page and limit
    const skip = (page - 1) * limit

    const query = { createdBy: userId }
    if (stage) {
        query.stage = stage
    }

    const tasks = await Task.find(query)
        .populate({
            path: 'createdBy',
            select: 'name email _id'
        })
        .skip(skip)
        .limit(limit)
        .exec()

    const totalTasks = await Task.countDocuments(query)

    return {
        tasks,
        totalPages: Math.ceil(totalTasks / limit),
        currentPage: page
    }
}

const updateTaskById = async (taskId, updateBody) => {
    console.log({ updateBody })
    const task = await getTaskById(taskId)
    if (!task) {
        throw new ApiError(httpStatus.NOT_FOUND, 'Task not found')
    }
    Object.assign(task, updateBody)
    console.log({ task })
    await task.save()
    return task
}

const deleteTaskById = async (taskId) => {
    const task = await Task.findOne({ _id: taskId })
    console.log(task)
    if (!task) {
        throw new ApiError(httpStatus.NOT_FOUND, 'Task not found')
    }

    const deletedTask = await Task.deleteOne({ _id: taskId })
    if ((await deletedTask.deletedCount) > 0) {
        if (task.assets && task.assets.length > 0) {
            task.assets.forEach((asset) => {
                fs.unlinkSync(`./public/uploads/tasks/${asset}`) // Remove the asset file
            })
        }
        return true
    }
    return false
}

const assignTask = async (taskId, userId) => {
    const task = await Task.findById(taskId)
    const user = await getUserByEmail(userId)

    if (!task || !user) {
        throw new ApiError(httpStatus.NOT_FOUND, 'Task or User not found')
    }

    const taskAssignedUserIds = task.assignedUsers.map((userId) =>
        userId.toString()
    )
    const userAssignedId = user._id.toString()

    const isUserAssigned = taskAssignedUserIds.includes(userAssignedId)

    if (isUserAssigned) {
        throw new ApiError(
            httpStatus.BAD_REQUEST,
            'User already assigned to task'
        )
    }

    task.assignedUsers.push(user._id)
    await task.save()

    // Return the updated task
    return getTaskById(taskId)
}

module.exports.TaskService = {
    createTask,
    getTaskById,
    getUserTasksByUserId,
    updateTaskById,
    deleteTaskById,
    assignTask,
    getTaskCountByStage
}
