const express = require('express')
const router = express.Router()

const fileRoutes = require('./file')

router.use('/files', fileRoutes)

module.exports = router
