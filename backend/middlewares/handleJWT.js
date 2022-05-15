const jwt = require('jsonwebtoken');

const KEY = process.env.JWT_KEY;

const createJWT = ( user )=>{
    const token = jwt.sing(
        {
            userId: user.id,
            isAdmin: user.isAdmin
        },
        KEY,
        {
            expiresIn: "1d"
        }
    );
    return token;
}

module.exports = { 
    createJWT,
}