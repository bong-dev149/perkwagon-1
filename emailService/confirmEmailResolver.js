const tokenController = require("../reusable_module/tokenController");
const sendEmail = require("./sendMail");
const BlockedToken = require("../models/BlockedToken");
const confirmEmailResolver = async (user) => {
    return new Promise(async (resolve, reject) => {
        // if the user email is not confirmed
        if (!user.verified) {
            try {
                // generate the token for confirmation email valid for 30m
                const token = await tokenController.genToken(
                    { id: user.id, email: user.email },
                    process.env.JWT_VERIFY_EXPIRES_IN,
                    process.env.JWT_SECRET
                );
                const istOffset = 5.5 * 60 * 60 * 1000; // IST is UTC+5:30
                const tokenExpiry = Date.now() + parseInt(process.env.EXPIRES_IN_MILISECONDS);
                await BlockedToken.create({ token: token, tokenExpiry: tokenExpiry });

                const url = `${process.env.HOST}/api/auth?token=${token}`;

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
