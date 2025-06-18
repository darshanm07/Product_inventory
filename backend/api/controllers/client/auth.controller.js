const authService = require('../../services/auth.service')

const login = catchAsync(async (req, res) => {
    const { email, password } = req.body
    const result = await authService.login(email, password)
    if (result.flag) {
        res.message = _localize('auth.loginSuccess', req)
        return utils.successResponse(result.data, res)
    } else {
        message = _localize(result.data, req)
        return utils.failureResponse(message, res)
    }
})

const register = catchAsync(async (req, res) => {
    const { name, email, password } = req.body
    const result = await authService.register(name, email, password)
    if (result.flag) {
        res.message = _localize('auth.registerSuccess', req)
        return utils.successResponse(result?.data, res)
    } else {
        message = _localize(result.data, req)
        return utils.failureResponse(message, res)
    }
})

module.exports = {
    login,
    register,
}