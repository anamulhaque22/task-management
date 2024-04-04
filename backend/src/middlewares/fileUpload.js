const uploader = require('../utils/createFileUploadMiddleware')

function taskAssetsUpload(req, res, next) {
    const upload = uploader(
        'tasks',
        ['image/jpeg', 'image/jpg', 'image/png', 'application/pdf'],
        1000000,
        5,
        'Only .jpg, jpeg or .png and .pdf format allowed!'
    )

    // call the middleware function
    upload.any()(req, res, (err) => {
        if (err) {
            res.status(500).json({
                errors: {
                    avatar: {
                        msg: err.message
                    }
                }
            })
        } else {
            next()
        }
    })
}

function userAvatarUpload(req, res, next) {
    const upload = uploader(
        'avatars',
        ['image/jpeg', 'image/jpg', 'image/png'],
        1000000,
        1,
        'Only .jpg, jpeg or .png  format allowed!'
    )

    // call the middleware function
    upload.any()(req, res, (err) => {
        if (err) {
            res.status(500).json({
                errors: {
                    avatar: {
                        msg: err.message
                    }
                }
            })
        } else {
            next()
        }
    })
}

module.exports = {
    taskAssetsUpload,
    userAvatarUpload
}
