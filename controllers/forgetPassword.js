const { genToken } = require("../Reusable module/tokenController");
const sendMail = require("../emailService/sendMail");
const Auth = require("../models/Auth");
const forgotPassword = async (req, res) => {
    try {
        // res.send("forgot password")

        // get the user email
        const {email} = req.body;
  
        // check if the user exists or not
        const user = await Auth.findOne({ where: { email } });

        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }

        // generate token
        let token = await genToken(
            { id:user.id,email: user.email },
            "1d",
            process.env.PASS_RESET_SECRET
        );
        // send password reset link
        const url = `http://localhost:${process.env.PORT}/api/auth/resetPassword?token=${token}`;

        const mailHTML = `Hi! ${email} please click on the link below to reset your password <a href=${url}>Reset Password</a>`
        const mailSubject = "Reset Password"
        const emailResponse = await sendMail(email, mailSubject, mailHTML)

        res.send(emailResponse)

    } catch (err) {
        res.status(500).json({
            message: err.message,
        });
    }
};

module.exports = forgotPassword;