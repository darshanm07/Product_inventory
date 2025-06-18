const { FILE_STATUS } = require('../../config/constants/fileConstant')
const { AWS_CONFIG } = require('../../config/config')
const { S3Client, DeleteObjectCommand } = require('@aws-sdk/client-s3')

const s3 = new S3Client({
    region: AWS_CONFIG.REGION,
    credentials: {
        accessKeyId: AWS_CONFIG.S3_ACCESS_KEY,
        secretAccessKey: AWS_CONFIG.S3_SECRET_KEY,
    },
})

const fileData = async (file) => {
    if (
        !file.originalname.match(
            /\.(jpg|JPG|jpeg|JPEG|png|PNG|pdf|PDF|docx|DOCX|mp4|MP4|doc|DOC|webm|WEBM|avi|AVI|svg|SVG|gif|GIF)$/
        )
    ) {
        return { flag: false, data: 'file.fileType' }
    }
    const dimensions = file.originalname.match(
        /\.(jpg|JPG|jpeg|JPEG|png|PNG|svg|SVG|gif|GIF)$/
    )
        ? file.size
        : undefined

    const data = {
        nm: file.originalname,
        oriNm: file.originalname,
        type: file.mimetype,
        exten: file.originalname.split('.').pop(),
        mimeType: file.mimetype,
        size: file.size,
        sts: FILE_STATUS.UPLOADED,
        dimensions: dimensions,
        uri: `${file.location}`,
    }
    return { flag: true, data: data }
}

const removeFileFromS3 = async (fileUri) => {
    try {
        const urlParts = new URL(fileUri)
        const key = decodeURIComponent(urlParts.pathname.substring(1))
        const command = new DeleteObjectCommand({
            Bucket: AWS_CONFIG.S3_BUCKET_NAME,
            Key: key,
        })
        await s3.send(command)
    } catch (error) {
        console.error(`Error deleting file: ${error}`)
        throw error
    }
}

module.exports = {
    fileData,
    removeFileFromS3,
}
