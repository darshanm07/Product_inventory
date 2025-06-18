const jwt = require('jsonwebtoken')
const { JWT } = require('../../config/constants/authConstant')

const generateToken = (payload) => {
    return jwt.sign(payload, JWT.SECRET, { expiresIn: JWT.EXPIRES_IN })
}

const verifyToken = (token) => {
    return jwt.verify(token, JWT.SECRET)
}

module.exports = {
    generateToken,
    verifyToken,
}