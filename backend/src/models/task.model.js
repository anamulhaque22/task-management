const mongoose = require('mongoose')
const { taskStageEnum, taskPriorityEnum } = require('./enum/taskEnum')

const TaskSchema = new mongoose.Schema(
    {
        title: {
            type: String,
            required: true
        },
        description: {
            type: String
        },
        dueDate: {
            type: Date
        },
        priority: {
            type: String,
            enum: taskPriorityEnum,
            default: 'Normal'
        },
        stage: {
            type: String,
            enum: taskStageEnum,
            default: 'To-Do'
        },
        assets: [
            {
                type: String
            }
        ],
        assignedUsers: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'User'
            }
        ],
        createdBy: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            required: true
        },
        createdAt: {
            type: Date,
            default: Date.now
        }
    },
    {
        versionKey: false,
        timestamps: true
    }
)

const Task = mongoose.model('Task', TaskSchema)

module.exports = Task
