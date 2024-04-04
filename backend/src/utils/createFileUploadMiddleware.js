// external imports
const multer = require('multer')
const path = require('path')
const createError = require('http-errors')

/**
 * Create a file upload middleware
 * @param {string} subfolder_path - The subfolder path where the files will be stored
 * @param {Array} allowed_file_types - The allowed file types
 * @param {number} max_file_size - The maximum file size
 * @param {number} max_number_of_files - The maximum number of files
 * @param {string} error_msg - The error message
 * @returns {Object} - The multer upload object
 * @example
 * const upload = uploader(
 *    'products',
 *   ['image/jpeg', 'image/jpg', 'image/png'],
 *  1000000,
 * 2,
 * 'Only .jpg, jpeg or .png format allowed!'
 * )
 */

function uploader(
    subfolder_path,
    allowed_file_types,
    max_file_size,
    max_number_of_files,
    error_msg
) {
    // define the storage
    const storage = multer.diskStorage({
        destination: (_req, _file, cb) => {
            cb(null, './public/uploads/' + subfolder_path)
        },
        filename: (_req, file, cb) => {
            const fileExt = path.extname(file.originalname)
            const fileName =
                file.originalname
                    .replace(fileExt, '')
                    .toLowerCase()
                    .split(' ')
                    .join('-') +
                '-' +
                Date.now()

            cb(null, fileName + fileExt)
        }
    })

    // preapre the final multer upload object
    const upload = multer({
        storage: storage,
        limits: {
            fileSize: max_file_size
        },
        fileFilter: (req, file, cb) => {
            if (req.files.length > max_number_of_files) {
                cb(
                    console.log('max_number_of_files', max_number_of_files),
                    createError(
                        `Maximum ${max_number_of_files} files are allowed to upload!`
                    )
                )
            } else {
                if (allowed_file_types.includes(file.mimetype)) {
                    cb(null, true)
                } else {
                    cb(createError(error_msg))
                }
            }
        }
    })

    return upload
}

module.exports = uploader
