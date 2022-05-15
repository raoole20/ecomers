const bcryptjs = require('bcryptjs');

const hashPasword = async ( planeText ) =>{
    const  hash = await bcryptjs.hashSync(planeText, 10);
    return hash;
}

const comparePassword = async ( planeText, hash )=> {
    return bcryptjs.compareSync( planeText, hash );
}

module.exports = { 
    comparePassword,
    hashPasword
}