const express = require('express')
// const handleValidationErrors = require('../middlewares/handleValidationErrors')
const { TasksController } = require('../controllers/tasks.controller')
const { taskAssetsUpload } = require('../middlewares/fileUpload')
const { taskValidator } = require('../middlewares/validation/task.validation')
const handleValidationErrors = require('../middlewares/validation/handleValidationErrors')
const authVerifyMiddleware = require('../middlewares/authVerifyMiddleware')

const router = express.Router()

router.post(
    '/',
    authVerifyMiddleware,
    taskAssetsUpload,
    taskValidator,
    handleValidationErrors,
    TasksController.createTask
)
router.get('/', authVerifyMiddleware, TasksController.getTasks)
router.get(
    '/details/:taskId',
    authVerifyMiddleware,
    TasksController.getTaskById
)
router.put(
    '/:taskId',
    authVerifyMiddleware,
    taskAssetsUpload,
    TasksController.updateTask
)
router.get(
    '/:taskId/assign/:userEmail',
    authVerifyMiddleware,
    TasksController.assignTask
)

router.get('/summery', authVerifyMiddleware, TasksController.taskCountByStage)
router.delete('/:taskId', authVerifyMiddleware, TasksController.deleteTask)

module.exports = router
