const fs = require('fs');
const express = require('express');
const router  = express.Router()
const PATH_ROUTES = __dirname;

const remove = (filename) => {
    return filename.split('.').shift();
}

fs.readdirSync( PATH_ROUTES).filter( (file)=>{
    const name = remove(file);
    if( name !== 'index'){
        router.use(`/${name}`, require(`./${file}`))
    }
})

module.exports = router;
