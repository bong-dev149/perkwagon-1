const jwt = require('jsonwebtoken');

const tokenController = {
    genToken: async (data, expiry, SECRET) => {
        const token = jwt.sign(data, SECRET, { expiresIn: expiry });
        return token;
    },
    verifyToken: async (token, SECRET) => {
        try {
            const payload = jwt.verify(token, SECRET);
            return payload;
        } catch (error) {
            throw new Error(err)
        }
    }
}
module.exports = tokenController;