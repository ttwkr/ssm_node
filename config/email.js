require('dotenv').config()
const nodemailer = require('nodemailer')


const smtpTransport = nodemailer.createTransport(
    {
        service: process.env.MAIL_SERVICE,
        host: 'smtp.gmail.com',
        port: 587,
        secure: false,
        auth:{
            user:process.env.MAIL_ACCOUNT,
            pass:process.env.MAIL_PASSWORD
        },
        tls:{
            rejectUnauthorized:false
        }
    }
)

module.exports = {
    smtpTransport
}
