const { fileData, removeFileFromS3 } = require('../../services/file')

const fileUpload = catchAsync(async (req, res) => {
    if (req.files.length) {
        let result = []
        const files = req.files
        await Promise.all(
            _.map(files, async (file) => {
                const data = await fileData(file)
                if (!data.flag) {
                    throw new Error(_localize(data.data, req))
                }
                result.push(data.data)
            })
        )
        res.message = _localize('file.upload', req)
        return utils.createdDocumentResponse(result, res)
    }
    return utils.failureResponse(
        {
            message: _localize('file.fileNotUploaded', req),
        },
        res
    )
})

const removeFiles = catchAsync(async (req, res) => {
    const { fileUri } = req.body
    if (fileUri) {
        await removeFileFromS3(fileUri)
        res.message = _localize('file.remove', req)
        return utils.successResponse({}, res)
    } else {
        res.message = _localize('file.noFileFound', req)
        return utils.failureResponse(res.message, res)
    }
})

module.exports = {
    fileUpload,
    removeFiles,
}
