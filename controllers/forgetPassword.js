const { genToken } = require("../reusable_module/tokenController");
const sendMail = require("../emailService/sendMail");
const Auth = require("../models/Auth");


const forgotPassword = async (req, res) => {
    try {
        // get the user email from body
        const { email } = req.body;

        // check if the user exists or not
        const user = await Auth.findOne({ where: { email } });
        if (!user) {
            return res.status(404).json({ msg: 'User not found' });
        }
    
        //user not verified
        if(user.verified===false){
            return res.status(401).json({ msg: 'Email not verified' });
        }
        // if exists, generate token
        const resetToken = await genToken(
            { auth_id: user.auth_id, email: user.email },
            process.env.JWT_VERIFY_EXPIRES_IN,
            process.env.JWT_SECRET
        );


        // reset password link url
        const url = `${process.env.HOST}/api/auth/resetPassword/${resetToken}`;

        const mailHTML = `Hi! ${email} please click on the link below to reset your password <a href=${url}>Reset Password</a>`
        const mailSubject = "Reset Password"
        

        const emailResponse = await sendMail(email, mailSubject, mailHTML)

        //send respond
        res.status(200).send({msg:emailResponse})

    } catch (err) {
        res.status(500).json({msg: 'Internal Server Error'});
    }
};

module.exports = forgotPassword;