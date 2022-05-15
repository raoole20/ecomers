const User = require('../models/User');
const handdleError = require('../middlewares/handleErrors');
const { hashPasword, comparePassword } = require('../middlewares/handlePassword');
const {  createJWT } = require('../middlewares/handlePassword');

const getAll = async (req, res) =>{
    try {
       const user = await User.find().select("name phone email");
       if(!user){
           return handdleError(res, 404, "User_NOT_FIND");
       }  
       res.send({
           user,
       })
    } catch (error) {
        console.log(error)
        handdleError(res, 500, "INTERNAL_SERVER_ERR");
    }
}

const getById = async (req, res) =>{
    try {
       const user = await User.findOne({ _id: req.params.id }).select("-passwordHash");
       if(!user){
           return handdleError(res, 404, "User_NOT_FIND");
       }  
       res.send({
           user,
       })
    } catch (error) {
        console.log(error)
        handdleError(res, 500, "INTERNAL_SERVER_ERR");
    }
}
const getCount = async (req, res) =>{
    try {
       const user = await User.countDocuments( count => count);
       if(!user){
           return handdleError(res, 404, "This field is empty");
       }  
       res.send({
           user,
       })
    } catch (error) {
        console.log(error)
        handdleError(res, 500, "INTERNAL_SERVER_ERR");
    }
}

const login =  async ( req, res ) =>{

    let { email, password } = req.body;
    console.log( req.body )
    try {
        let user = await User.findOne({ email });
       
        if( !user ){
            return handdleError(res, 404, "The user not found");
        }

        // if( !comparePassword( password, user.passwordHash ) ){
        //     return handdleError(res, 400, "the pasword is worng")
        // }

        // creat JWT
        // const token = createJWT( user.id );

        return res.json({
            user,
            // token
        })
        
    } catch (error) {
        console.log(error)
        handdleError(res, 500, "INTERNAL_SERVER_ERR");
    }

}

const register =  async (req, res) =>{
    let { body } = req;

    let user = await User.findOne({email: body.email});

    if( user ){
       return handdleError(res, 400, "This email is redy use");
    }

    console.log( body );
    const hash = await hashPasword( body.password );
    body = { ...body, passwordHash: hash };

    user = new User( body );
    
    try {
       await user.save();
       user.passwordHash = null;

       res.status(201).json({
           user, 
       })
    } catch (error) {
        console.log(error)
        handdleError(res, 500, "INTERNAL_SERVER_ERR");
    }
}

const updateUser = async ()=> { 
    
}
const deleteUser = async ()=> { 

}

module.exports = { 
    getAll,
    updateUser,
    deleteUser,
    login,
    register,
    getById
}