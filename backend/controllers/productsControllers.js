const mongoose = require('mongoose');

const Product = require('../models/Product');
const Category = require('../models/Category');
const handdleError = require('../middlewares/handleErrors');

const getAll = async (req, res) =>{
    try {
       const product = await Product.find().select("name image price -_id");
       if(!product){
           return handdleError(res, 404, "PRODUCTS_NOT_FIND");
       }  
       res.send({
           product,
       })
    } catch (error) {
        console.log(error)
        handdleError(res, 500, "INTERNAL_SERVER_ERR");
    }
}
const getCount = async (req, res) =>{
    try {
       const productCount = await Product.countDocuments((error, count) => { return count} );

       if(!productCount){
           return handdleError(res, 404, "PRODUCTS_IS_EMPY");
       }  
       res.send({
           count: productCount,
       })
    } catch (error) {
        console.log(error)
        handdleError(res, 500, "INTERNAL_SERVER_ERR");
    }
}
const getFeatured = async (req, res) =>{
    const limit = req.query.limit ?(req.query.limit) : 10;
    try {
       const productCount = await Product.find({idFeatured: true}).limit(+limit);

       if(!productCount){
           return handdleError(res, 404, "PRODUCTS_IS_EMPY");
       }  
       res.send({
           count: productCount,
       })
    } catch (error) {
        console.log(error)
        handdleError(res, 500, "INTERNAL_SERVER_ERR");
    }
}
const getById = async (req, res) =>{

    const id = req.params.id
    if( !mongoose.isValidObjectId(id) ){
        return  handdleError(res, 400, "ID_NOT_VALIDATE");
    }

    try {
       const product = await Product.findById({_id: id}).populate("category");
       if(!product){
           return handdleError(res, 404, "PRODUCTS_NOT_FIND");
       }  
       res.send({
           product,
       })
    } catch (error) {
        console.log(error)
        handdleError(res, 500, "INTERNAL_SERVER_ERR");
    }
}

const createProducts =  async (req, res) =>{
    const { body } = req;
    const id = body.category;
    if( !mongoose.isValidObjectId(id)){
        return handdleError(res, 400, "Category Id is not validate");
    }
    try {

        const category = await Category.findById({_id: body.category});
        if( !category ){
            return handdleError(res, 404, "Category_NOT_EXIST", `category by id ${category}, dont exist`);
        }

       const product = new Product( body );
       await product.save();

       res.status(201).json({
           product,
       })

    } catch (error) {
        console.log(error)
        handdleError(res, 500, "INTERNAL_SERVER_ERR");
    }
}

const updateProducts = async (req, res)=> { 
    const id = req.params.id;
    if( !mongoose.isValidObjectId(id) ){
        return  handdleError(res, 400, "ID_NOT_VALIDATE");
    }
    const { body } = req;
    try {
        // validar que la categoria sea mayor a 12 caracteres y menos a 24
        const category = await Category.findById({_id: body.category});
        if( !category ){
            return handdleError(res, 404, "Category_NOT_EXIST", `category by id ${category}, dont exist`);
        }

       const product = await Product.findByIdAndUpdate( {
           _id: id
       },body,{
            new: true
       } );

       res.status(200).json({
           product,
       })

    } catch (error) {
        console.log(error)
        handdleError(res, 500, "INTERNAL_SERVER_ERR");
    }   
}
const deleteProducts = async (req, res)=> { 
    const id = req.params.id;
    if( !mongoose.isValidObjectId(id) ){
        return  handdleError(res, 400, "ID_NOT_VALIDATE");
    }
    try {
        const product = await Product.findByIdAndRemove(req.params.id);
        if( !product ){
            return handdleError(res, 404, "product_NOT_FIND");
        }
        console.log("product delete...");
        res.status(200).json({
            msg: "Product delete success"
        })
    } catch (error) {
        handdleError(res, 500, "INTERNAL_SERVER_ERR");
    }
}

module.exports = { 
    createProducts,
    getAll,
    getById,
    getFeatured,
    getCount,
    updateProducts,
    deleteProducts
}