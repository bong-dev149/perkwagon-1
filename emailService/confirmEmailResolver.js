const tokenController = require("../Reusable module/tokenController");
const sendEmail = require("./sendMail");
require('dotenv/config');
const port = process.env.PORT || 3000;
const confirmEmailResolver = async (user) => {

    // if the user email is not confirmed
    if (!user.verified) {
        try {
            // generate the token for confirmation email valid for 30m
            let token = await tokenController.genToken(
                { id: user.id, email: user.email },
                "30m",
                process.env.JWT_SECRET
            );
            let url = `http://localhost:${port}/api/auth?token=${token}`;

            // send the mail to the user
            mailInfo = {
                to: user.email,
                subject: "Confirm your email",
                html: `<h1>Hello ${user.email}</h1><p>Please click on the link below to confirm your email</p><a href="${url}">Confirm Email</a> within 30 minutes`,
            };
            sendEmail(user.email, mailInfo.subject, mailInfo.html);
        } catch (err) {
            console.log(err);
        }
    } else {
        console.log("User is already confirmed");
    }
}

module.exports = confirmEmailResolver