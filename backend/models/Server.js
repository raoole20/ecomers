const express   = require('express');
const cors  = require('cors');

const router    = require('../routers/index');
const dbConnect = require('../config/mongo');
const authJwt   = require('../middlewares/handleAuth');

class Server { 

    constructor(){
        this.app = express();

        // global variables
        this.PORT    = process.env.PORT;
        this.API_URL = '/api/v1';

        // Middleware
        this.middleware();
        this.router()
    }

    middleware(){
        this.app.use( express.json() );
        this.app.use( cors() )
        // this.app.use( authJwt() );
        // this.app.use( (err, req, res, next) =>{
        //     if( err ){
        //         return res.status(401).json({ msg: "erro in the server"});
        //     }
        //     next();
        // })
        this.app.use( express.static('../uploads/*') );
    }
    router(){
        this.app.use( this.API_URL, router );
    }
    listen(){
        this.app.listen(this.PORT, ()=>{
            dbConnect();
            console.log("server is running in the port: " + this.PORT)
        })
    }
}   

module.exports = Server;