const Category = require('../models/Category');
const handdleError = require('../middlewares/handleErrors');

const getAll = async (req, res) =>{
    try {
       const categories = await Category.find();
       if(!categories){
           return handdleError(res, 404, "Categories_NOT_FIND");
       }  
       res.send({
           categories,
       })
    } catch (error) {
        console.log(error)
        handdleError(res, 500, "INTERNAL_SERVER_ERR");
    }
}
const getId = async (req, res) =>{
    const id = req.params.id;
    try {
        const categories = await Category.findById({_id: id});
       if(!categories){
           return handdleError(res, 404, "Categories_NOT_FIND");
       }  
       res.send({
           categories,
       })
    } catch (error) {
        console.log(error)
        handdleError(res, 500, "INTERNAL_SERVER_ERR");
    }
}

const createCategories =  async (req, res) =>{
    const { body } = req;
    const categories = new Category( body );
    try {
       await categories.save();
       res.status(201).json({
           categories,
           success: true
       })
    } catch (error) {
        console.log(error)
        handdleError(res, 500, "INTERNAL_SERVER_ERR");
    }
}

const updateCategories = async (req, res)=> { 
    const { id } = req.params;
    const { body } = req;
    try {
        const category = await Category.findByIdAndUpdate({
            _id: id
        },bodym, {
            new: true
        });
        if( !category ){
            return handdleError(res, 404, "CATEGORY_NOT_FIND");
        }
        console.log("Category delete...");
        res.status(202).json({
            category,
            msg: "Categorry update success",
        })
    } catch (error) {
        console.log(error)
        handdleError(res, 500, "INTERNAL_SERVER_ERR");
    }
}
const deleteCategories = async (req, res)=> {   
    try {
        const category = await Category.findByIdAndRemove(req.params.id);
        if( !category ){
            return handdleError(res, 404, "CATEGORY_NOT_FIND");
        }
        console.log("Category delete...");
        res.status(200).json({
            msg: "Categorry delete success"
        })
    } catch (error) {
        handdleError(res, 500, "INTERNAL_SERVER_ERR");
    }
}

module.exports = { 
    createCategories,
    getAll,
    getId,
    updateCategories,
    deleteCategories
}