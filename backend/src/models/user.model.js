const mongoose = require('mongoose')
const validator = require('validator')
const bcrypt = require('bcrypt')

const userSchema = mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
            trim: true
        },
        email: {
            type: String,
            required: true,
            unique: true,
            trim: true,
            lowercase: true,
            validate(value) {
                if (!validator.isEmail(value)) {
                    throw new Error('Invalid email')
                }
            }
        },
        password: {
            type: String,
            required: true,
            trim: true,
            minlength: 6
        }
    },
    {
        timestamps: true,
        versionKey: false
    }
)

// Method to compare passwords
userSchema.methods.comparePassword = async function (password) {
    try {
        return await bcrypt.compare(password, this.password)
    } catch (error) {
        throw new Error(error)
    }
}

userSchema.statics.isEmailTaken = async function (email, excludeUserId) {
    const user = await this.findOne({ email, _id: { $ne: excludeUserId } })
    return !!user
}

// Hash the password before saving the user model
userSchema.pre('save', async function (next) {
    try {
        if (!this.isModified('password')) {
            return next()
        }
        const salt = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(this.password, salt)
        this.password = hashedPassword

        next()
    } catch (error) {
        next(error)
    }
})

const User = mongoose.model('User', userSchema)

module.exports = User
