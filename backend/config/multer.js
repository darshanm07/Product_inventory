const multer = require("multer");
const multerS3 = require("multer-s3");
const path = require("path");
const { AWS_CONFIG } = require("../config/config");
const { S3Client } = require("@aws-sdk/client-s3");
const { Upload } = require("@aws-sdk/lib-storage");
const { FILE_URI } = require("./constants/fileConstant");

const s3 = new S3Client({
  region: AWS_CONFIG.REGION,
  credentials: {
    accessKeyId: AWS_CONFIG.S3_ACCESS_KEY,
    secretAccessKey: AWS_CONFIG.S3_SECRET_KEY,
  },
});

const AWSstorage = multerS3({
  s3,
  bucket: AWS_CONFIG.S3_BUCKET_NAME,
  contentType: multerS3.AUTO_CONTENT_TYPE,
  serverSideEncryption: "AES256",
  cacheControl: "max-age=1800",
  metadata: function (req, file, cb) {
    cb(null, { fieldName: file.fieldname });
  },
  key: function (req, file, cb) {
    let filePath;
    if (
      file.originalname.match(
        /\.(jpg|JPG|jpeg|webp|WEBP|JPEG|png|PNG|svg|SVG|GIF|gif|heic|heics|heif)$/
      )
    ) {
      filePath = FILE_URI.IMAGE;
    } else if (
      file.originalname.match(
        /\.(mp4|MP4|webm|WEBM|avi|AVI|MPV|mpv|OGG|M4V|M4P|m4v|m4p)$/
      )
    ) {
      filePath = FILE_URI.VIDEO;
    } else {
      filePath = FILE_URI.DOCUMENTS;
    }
    cb(null, filePath + Date.now() + file.originalname);
  },
});

const upload = multer({
  storage: AWSstorage,
});

module.exports = upload;
