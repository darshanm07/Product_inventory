const express = require('express')
const router = express.Router()
const adminRoutes = require('./admin')
const clientRoutes = require('./client')
const deviceRoutes = require('./device')
const commonRoutes = require('./common')

router.use('/admin', adminRoutes)
router.use('/client/api/v1', clientRoutes)
router.use('/device/api/v1', deviceRoutes)
router.use('/', commonRoutes)

module.exports = router
