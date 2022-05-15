const Order = require('../models/Order');
const handdleError = require('../middlewares/handleErrors');
const OrderItem = require('../models/OrderItem');
const { default: mongoose } = require('mongoose');


const getAll = async (req, res) =>{
    try {
       const order = await Order.find().populate('user', "name");
       if(!order){
           return handdleError(res, 404, "Order_NOT_FIND");
       }  
       res.send({
           order,
       })
    } catch (error) {
        console.log(error)
        handdleError(res, 500, "INTERNAL_SERVER_ERR");
    }
}
const getById = async (req, res) =>{

    const { id } = req.params;

    if( !mongoose.isValidObjectId( id ) ){
        handdleError(res, 400, "The id is not vaidate object id");
    }

    try {
    //  concatenation of populate is greate!!!!!
       const order = await Order.findById({ _id: id })
            .populate('user', "name")
            .populate({
                path: "orderItems", 
                populate: {
                    path: "product",
                    populate: "category"
                }
            });
      
       if(!order){
           return handdleError(res, 404, "Order_NOT_FIND");
       }  

       res.send({
           order,
       })

    } catch (error) {
        console.log(error)
        handdleError(res, 500, "INTERNAL_SERVER_ERR");
    }
}

const createOrder =  async (req, res) =>{
    const { body } = req;

    try {
        // create array with orderitems id
        const idOrderItems = body.orderItems.map( async order =>{

            const orderItem = new OrderItem( order );
            await orderItem.save()

            console.log( orderItem ); 

            return orderItem._id
        })
    
        body = { ...body, orderItems: idOrderItems }
    
        console.log( body );
    
        // TODO: calcular el total de la orden

        const order = new Order( body );
 
        await order.save();

        res.status(201).json({
            order,
        })
    } catch (error) {
        console.log(error)
        handdleError(res, 500, "INTERNAL_SERVER_ERR");
    }
}

const updateOrder = async ()=> { 
    const { id } = req.params;

    if( !mongoose.isValidObjectId( id ) ){
        handdleError(res, 400, "The id is not vaidate object id");
    }

    try {
        const order = await Order.findByIdAndUpdate({
            _id: id 
        },{
            status: req.body.status
        });
      
       if(!order){
           return handdleError(res, 404, "Order_NOT_FIND");
       }  

       res.send({
           order,
       })

    } catch (error) {
        console.log(error)
        handdleError(res, 500, "INTERNAL_SERVER_ERR");
    }
}
const deleteOrder = async ()=> { 
    const { id: _id } = req.params;

    if( !mongoose.isValidObjectId( id ) ){
        handdleError(res, 400, "The id is not vaidate object id");
    }

    Order.findById({ _id })
        .then(async (order)=>{
            if(order){
                const orderItem = order.orderItem;
                
                orderItem.forEach( async id => {
                    await OrderItem.findByIdAndRemove(id);
                });

                await order.remove();

                return res.status(200).send({ 
                    msg: "order deleted success"
                })
            }
            return handdleError(res, 404, "ERR_Order no exist")
        }).catch( err => handdleError(res, 500, "INTERNAL_SERVER_ERR"))
}

const getCount = async (req, res) =>{
    try {
        const orderCount = await Order.countDocuments( count => count );

        if( !orderCount ){
            return res.status(404).send({ 
                msg: "the document is empty"
            })
        }
    } catch (error) {
        handdleError(res, 500, "INTERNAL_SERVER_ERR");
    }
}


const getUsersOrder = async ( req, res )=>{
    // this is user`s id
    const { id } = req.params;

    if( !mongoose.isValidObjectId( id ) ){
        handdleError(res, 400, "The id is not vaidate object id");
    }

    try {
       const order = await Order.find({ user: id })
            .populate({
                path: "orderItems", 
                populate: {
                    path: "product",
                    populate: "category"
                }
            });
      
       if(!order){
           return handdleError(res, 404, "Order_NOT_FIND");
       }  

       res.send({
           order,
       })

    } catch (error) {
        console.log(error)
        handdleError(res, 500, "INTERNAL_SERVER_ERR");
    }
}

module.exports = { 
    createOrder,
    getAll,
    getById,
    updateOrder,
    deleteOrder,
    getCount,
    getUsersOrder
}