const User = require('../models/user.model.js')
const { generateToken } = require('../policies/authToken.js')

const login = async (email, password) => {
    try {
        let user = await User.findOne({ email });
        if (!user) {
            return { flag: false, data: 'auth.accountNotFound' }
        }
        let isPasswordMatched = await user.comparePassword(password)
        if (!isPasswordMatched) {
            return { flag: false, data: 'auth.passwordWrong' }
        }
        const payload = {
            id: user._id,
            email: user.email,
        }
        const token = await generateToken(payload)

        // Return user data (excluding password)
        const userData = {
            id: user.id,
            name: user.name,
            email: user.email,
        }

        return { flag: true, data: { user: userData, token: token } }
    } catch (error) {
        logger.error('Error - login Service', error)
        throw new Error(error)
    }
}

const register = async (name, email, password) => {
    try {
       let user = await User.findOne({ email });
        if (user) {
            return { flag: false, data: 'auth.emailExists' }
        }
       
        user = new User({
            name,
            email,
            password
        });

        await user.save(); 

        // Return user data (excluding password)
        const userData = {
            id: user._id,
            name: user.name,
            email: user.email,
            createdAt: user.createdAt,
        }

        const payload = {
            id: user._id,
            email: user.email,
        }

        const token = await generateToken(payload)

        return { flag: true, data: { user: userData, token: token } }
    } catch (error) {
        logger.error('Error - register Service', error)
        throw new Error(error)
    }
}

module.exports = {
    login,
    register,
}