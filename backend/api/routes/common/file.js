const express = require('express')
const routes = express.Router()
const fileController = require('../../controllers/common/fileControllers')
const upload = require('../../../config/multer')
const { ARRAY_LIMIT } = require('../../../config/config')

// // Add Middlware

routes.post(
    '/upload',
    upload.array('file', ARRAY_LIMIT),
    fileController.fileUpload
)

routes.post('/remove', fileController.removeFiles)

module.exports = routes
