// Purpose: Logout user

const loginUser = async(req, res) => {
    try {
        if(req.error) {
            throw req.error;
        }
        
        await res.clearCookie('refreshToken');
        res.status(200).json({ msg: "Logout successful" });

    } catch (error) {
        res.status(500).json({ msg: error });
    }
}

module.exports = loginUser;