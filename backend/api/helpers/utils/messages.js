const responseStatusCode = require('./responseCode')
const {
    RESPONSE_CODE,
} = require('../../../config/constants/responseCodeConstant')

exports.unAuthenticated = (res) => {
    return res.status(responseStatusCode.unAuthorized).json({
        code: RESPONSE_CODE.UNAUTHENTICATED,
        message: res.message,
        data: {},
    })
}

exports.successResponse = (data, res) => {
    return res.status(responseStatusCode.success).json({
        code: RESPONSE_CODE.DEFAULT,
        message: res.message,
        data: data,
    })
}

exports.createdDocumentResponse = (data, res) => {
    return res.status(responseStatusCode.create).json({
        code: RESPONSE_CODE.DEFAULT,
        message: res.message,
        data: data,
    })
}

exports.emailSendSuccessfully = (res) => {
    return res.status(responseStatusCode.success).json({
        code: RESPONSE_CODE.DEFAULT,
        message: res.message,
        data: {},
    })
}

exports.emailVerifySuccess = (res) => {
    return res.status(responseStatusCode.success).json({
        CODE: RESPONSE_CODE.DEFAULT,
        MESSAGE: res.message,
        data: {},
    })
}

exports.linkInvalid = (res) => {
    return res.status(responseStatusCode.validationError).json({
        code: RESPONSE_CODE.ERROR,
        message: res.message,
        data: {},
    })
}

exports.changePasswordResponse = (res) => {
    return res.status(responseStatusCode.success).json({
        code: RESPONSE_CODE.DEFAULT,
        message: res.message,
        data: {},
    })
}

exports.wrongPassword = (res) => {
    return res.status(responseStatusCode.success).json({
        code: RESPONSE_CODE.ERROR,
        message: res.message,
        data: {},
    })
}

exports.failureResponse = (data, res) => {
    let i = 0
    if (data.name === 'ValidationError') {
        Object.keys(data.errors).forEach((key) => {
            if (i !== 1) {
                data.message = data.errors[key].message
            }
            i++
        })
    }
    res.message = data.message
    return res.status(responseStatusCode.validationError).json({
        code: RESPONSE_CODE.ERROR,
        message: data.message ? data.message : data,
    })
}

exports.badRequest = (data, res) => {
    return res.status(responseStatusCode.validationError).json({
        code: RESPONSE_CODE.ERROR,
        message: res.message,
        data: data,
    })
}

exports.recordNotFound = (res) => {
    return res.status(responseStatusCode.success).json({
        code: RESPONSE_CODE.DEFAULT,
        message: res.message,
        data: {},
    })
}

exports.notFound = (err, res) => {
    return res.status(responseStatusCode.notFound).json({
        code: RESPONSE_CODE.DEFAULT,
        message: err,
        data: {},
    })
}

exports.inValidParam = (message, res) => {
    message = message.replace(/\"/g, '')
    res.message = message
    return res.status(responseStatusCode.validationError).json({
        code: RESPONSE_CODE.ERROR,
        message: message,
        data: {},
    })
}

exports.unAuthorizedRequest = (message, res) => {
    return res.status(responseStatusCode.unAuthorizedRequest).json({
        code: RESPONSE_CODE.ERROR,
        message: message,
        data: {},
    })
}

exports.loginSuccess = async (result, res) => {
    return res.status(responseStatusCode.success).json({
        code: RESPONSE_CODE.LOGIN,
        message: res.message,
        data: result,
    })
}

exports.verificationOTP = (result, res) => {
    return res.status(responseStatusCode.success).json({
        code: RESPONSE_CODE.OTP,
        message: res.message,
        data: result.token ? result : { message: result },
    })
}

exports.passwordEmailWrong = (res) => {
    return res.status(responseStatusCode.unAuthorized).json({
        code: RESPONSE_CODE.ERROR,
        message: res.message,
        data: {},
    })
}

exports.loginOtpVerificationFailed = (res) => {
    return res.status(responseStatusCode.success).json({
        code: RESPONSE_CODE.ERROR,
        message: res.message,
        data: {},
    })
}

exports.successListResponse = (result, res) => {
    return res.status(responseStatusCode.success).json({
        code: RESPONSE_CODE.DEFAULT,
        message: result.message,
        data: result.data,
        paginator: result.paginator,
    })
}

exports.updateDocumentResponse = (data, res) => {
    return res.status(responseStatusCode.success).json({
        code: RESPONSE_CODE.DEFAULT,
        message: res.message,
        data: data,
    })
}

exports.accountNotVerified = (res) => {
    return res.status(responseStatusCode.success).json({
        code: RESPONSE_CODE.NOT_VERIFIED,
        message: res.message,
    })
}

exports.chatFoundResponse = (data, res) => {
    return res.status(responseStatusCode.success).json({
        code: RESPONSE_CODE.CHAT_FOUND,
        message: res.message,
        data: data,
    })
}
