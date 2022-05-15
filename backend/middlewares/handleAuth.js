var { expressjwt: jwt } = require("express-jwt");

function authJwt(){
    const secret = process.env.JWT_KEY;

    return jwt({
        secret,
        algorithms: ['HS256'],
        isRevoked: isRevoked
    }).unless({
        path:[
            {
                url: "/\/api\/v1\/products(.*)/", methods: ['GET', "OPTIONS"],
               
            },
            { url: "/\/api\/v1\/categories(.*)/", methods: ['GET', "OPTIONS"]},
            '/api/v1/user/login',
            '/api/v1/user/register'
        ]
    })
}

async function isRevoked( req, payload, done){
    if( !payload.isAdmin){
        return done( null, true)
    }
    done();
}
module.exports = authJwt