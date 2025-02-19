const httpStatus = require('http-status')
const ApiError = require('../utils/ApiError')
const { User } = require('../models')

const createUser = async (userBody) => {
    if (await User.isEmailTaken(userBody.email)) {
        throw new ApiError(httpStatus.BAD_REQUEST, 'Email already taken')
    }
    return User.create(userBody)
}

const getUserById = async (id) => {
    return User.findById(id)
}

const getUserByEmail = async (email) => {
    return User.findOne({ email })
}

const updateUserById = async (userId, updateBody) => {
    const user = await getUserById(userId)
    if (!user) {
        throw new ApiError(httpStatus.NOT_FOUND, 'User not found')
    }
    if (
        updateBody.email &&
        (await User.isEmailTaken(updateBody.email, userId))
    ) {
        throw new ApiError(httpStatus.BAD_REQUEST, 'Email already taken')
    }
    Object.assign(user, updateBody)
    await user.save()
    return user
}

module.exports = {
    createUser,
    getUserById,
    getUserByEmail,
    updateUserById
}
