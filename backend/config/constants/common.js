const SYMBOLS = {
    ATRATE: '@',
    UNDERSCORE: '_',
    HYPHEN: '-',
}

const RANDOM_PASSWORD_CHAR =
    'ABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890abcdefghijklmnopqrstuvwxyz1234567890'
const PASSWORD_REGEX =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/

const GENDER = {
    MALE: 'Male',
    FEMALE: 'Female',
    OTHER_GENDER: 'Other',
}

const EMAIL_TYPE = {
    RESEND_OTP: 1,
    FORGOT_PASSWORD_OTP: 2,
}

module.exports = {
    SYMBOLS,
    RANDOM_PASSWORD_CHAR,
    PASSWORD_REGEX,
    GENDER,
    EMAIL_TYPE,
}
