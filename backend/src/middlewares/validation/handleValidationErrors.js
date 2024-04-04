const { validationResult } = require('express-validator')
const fs = require('fs')
const handleValidationErrors = (req, res, next) => {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
        if (req.files && req.files.length > 0) {
            removeUploadedAssets(req.files)
        }
        const extractedErrors = []
        errors
            .array()
            .map((err) => extractedErrors.push({ [err.path]: err.msg }))
        return res.status(400).json({
            errors: extractedErrors
        })
    }

    next()
}

function removeUploadedAssets(files) {
    if (files && files.length > 0) {
        files.forEach((file) => {
            fs.unlinkSync(file.path) // Remove the file
        })
    }
}

module.exports = handleValidationErrors
