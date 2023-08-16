const cnfEmail = require("../emailService/confirmEmailResolver");
const Auth=require('../models/Auth');

const resendEmail=async(req,res)=>{
    try {
        // Get data from request body
        const {email}=req.body;

        // Check if user exists
        const user = await Auth.findOne({ where: { email } });
        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }

        //send confirmation email
        const msg = await cnfEmail(user);
        res.json({msg:msg});
        
    } catch (error) {
        res.status(500).json(error );
    }
};
module.exports=resendEmail;