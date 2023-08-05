const { genToken } = require("../reusable_module/tokenController");
const sendMail = require("../emailService/sendMail");
const Auth = require("../models/Auth");
const BlockedToken = require('../models/BlockedToken');

const forgotPassword = async (req, res) => {
    try {
        // get the user email from body
        const { email } = req.body;

        // check if the user exists or not
        const user = await Auth.findOne({ where: { email } });
        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }

        // if exists, generate token
        const resetToken = await genToken(
            { id: user.id, email: user.email },
            process.env.JWT_VERIFY_EXPIRES_IN,
            process.env.JWT_SECRET
        );

        // save token in database
       
        const resetTokenExpiry = Date.now() + parseInt(process.env.EXPIRES_IN_MILISECONDS);
        await BlockedToken.create({ token:resetToken, tokenExpiry: resetTokenExpiry });

        // reset password link url
        const url = `${process.env.HOST}/api/auth/resetPassword?token=${resetToken}`;

        const mailHTML = `Hi! ${email} please click on the link below to reset your password <a href=${url}>Reset Password</a>`
        const mailSubject = "Reset Password"


        const emailResponse = await sendMail(email, mailSubject, mailHTML)

        //send respond
        res.status(200).send(emailResponse)

    } catch (err) {
        res.status(500).json({message: err.message});
    }
};

module.exports = forgotPassword;