const e = require('express')
const nodemailer = require('nodemailer')
const { SMTP_EMAIL, SMTP_PASS, SMTP_PORT, SMTP_HOST } = process.env

// common send mail controller
const sendMail = (email, mailSubject, mailBody) => {
    return new Promise((resolve, reject) => {
        try {
            // create transport
            const transporter = nodemailer.createTransport({
                host: SMTP_HOST,
                port: SMTP_PORT,
                secureConnection: true,
                requireTLS: true,
                auth: {
                    user: SMTP_EMAIL,
                    pass: SMTP_PASS
                },
                tls: {
                    ciphers: 'SSLv3'
                }
            })
            // mail options
            const mailOptions = {
                from: SMTP_EMAIL,
                to: email,
                subject: mailSubject,
                html: mailBody
            }  

            console.log(mailOptions);
            // send email
            transporter.sendMail(mailOptions, (err, info) => {
                if (err) {
                    console.log(err)
                    throw err
                } else {
                    console.log(info);
                    resolve("Mail sent successfully!")
                }
            })

        } catch (err) {
            reject(err.message)
        }
    })
}

module.exports = sendMail;