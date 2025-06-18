// const AWS = require('aws-sdk')
const { SESClient, SendRawEmailCommand } = require('@aws-sdk/client-ses')
const path = require('path')
const nodemailer = require('nodemailer')
const { AWS_CONFIG } = require('../../config/config')
const { createJob } = require('./jobs/index')
const { JOB_NAME } = require('../../config/constants/queueConstant')

const sendEmail = async (obj) => {
    try {
        const sesClient = new SESClient({
            region: AWS_CONFIG.REGION,
            credentials: {
                accessKeyId: AWS_CONFIG.AWS_ACCESS_KEY,
                secretAccessKey: AWS_CONFIG.AWS_SECRET_KEY,
            },
        })

        // Configure nodemailer transporter with SES
        let transporter = nodemailer.createTransport({
            SES: { ses: sesClient, aws: { SendRawEmailCommand } },
        })

        await transporter.sendMail(
            {
                from: AWS_CONFIG.SENDER_EMAIL,
                to: obj.email,
                cc: obj?.ccEmails,
                bcc: obj?.bccEmails,
                subject: obj.subject,
                html: obj.htmlData,
                attachments: obj.attachments || [], // attachments: [{filename: change with filename,path: change with file path}]
            },
            async function (err, response) {
                if (err) {
                    logger.error('error', err)
                    throw err
                } else {
                    logger.info(
                        'Mail response :- ' +
                            response.response +
                            '-' +
                            response.envelope.to
                    )
                }
            }
        )
    } catch (error) {
        logger.error('Error - sendEmail', error)
    }
}

const sendSESEmail = async (
    email,
    subjectData,
    htmlContentData,
    attachments = [],
    ccOrBcc = {}
) => {
    let mailObj = {
        email: email,
        subject: subjectData,
        htmlData: htmlContentData,
        attachments: attachments,
        ...ccOrBcc,
    }
    await createJob(JOB_NAME.SENDMAIL, mailObj, {})
}

module.exports = {
    sendSESEmail,
    sendEmail,
}
