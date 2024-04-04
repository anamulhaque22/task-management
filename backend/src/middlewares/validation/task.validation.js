const { check } = require('express-validator')
// const { default: mongoose } = require('mongoose')

const taskValidator = [
    check('title').notEmpty().withMessage('Title is required'),
    // check('description').notEmpty().withMessage('Description is required'),=
    check('dueDate').notEmpty().withMessage('Due date is required'),
    check('priority').notEmpty().withMessage('Priority is required'),
    check('stage').notEmpty().withMessage('Stage is required')
    // check('createdBy')
    //     .notEmpty()
    //     .withMessage('CreatedBy is required')
    //     .custom((value) => {
    //         if (!mongoose.Types.ObjectId.isValid(value)) {
    //             throw new Error('Invalid value. Must be a valid ObjectId')
    //         }
    //         return true
    //     })
]

module.exports = {
    taskValidator
}
