const tokenController = require("../reusable_module/tokenController");
const sendEmail = require("./sendMail");
const confirmEmailResolver = async (user) => {
    return new Promise(async (resolve, reject) => {
        // if the user email is not confirmed
        if (!user.verified) {
            try {
                // generate the token for confirmation email valid for 30m
                const token = await tokenController.genToken(
                    { auth_id: user.auth_id, email: user.email },
                    process.env.JWT_VERIFY_EXPIRES_IN,
                    process.env.JWT_SECRET
                );

                // const url = `${process.env.HOST}/auth/verifyEmail/${token}`;
                const url = `${process.env.HOST}/api/auth/verifyEmail?token=${token}`;
                // send the mail to the user
                mailInfo = {
                    to: user.email,
                    subject: "Confirm your email",
                    html: `<h1>Hello ${user.email}</h1><p>Please click on the link below to confirm your email</p><a href="${url}">Confirm Email</a> within 30 minutes`,
                };
                resolve(await sendEmail(user.email, mailInfo.subject, mailInfo.html))
            } catch (err) {
                reject(err)
            }
        } else {
            reject({ error: "email is already veified" })
        }
    })
}

module.exports = confirmEmailResolver
