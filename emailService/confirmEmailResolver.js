const tokenController = require("../Reusable module/tokenController");
const sendEmail = require("./sendMail");

const confirmEmailResolver = async (user) => {
    return new Promise(async (resolve, reject) => {
        // if the user email is not confirmed
        if (!user.verified) {
            try {
                // generate the token for confirmation email valid for 30m
                let token = await tokenController.genToken(
                    { id: user.id, email: user.email },
                    "30m",
                    process.env.JWT_SECRET
                );
                let url = `http://localhost:${process.env.PORT}/api/auth?token=${token}`;

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
