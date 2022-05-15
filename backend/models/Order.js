const mongoose = require('mongoose');
// const User = require('./User');

const orderSchema = mongoose.Schema({
    orderItems:[{
        type: mongoose.Types.ObjectId,
        reference: "orderItem",
        require: true
    }],
    shippingAddress1: String,
    shippingAddress2: String,
    city: String,
    zip: String,
    country: String,
    phone: Number,  
    status: {
        type: String,
        required: true,
        default: "Pending..."
    },
    totalPrice: Number,
    user: {
        type: mongoose.Types.ObjectId,
        reference: "user",
        require: true
    },
    dateOrdered: {
        type: Date,
        default: Date.now
    }
})

const Order = mongoose.model('order', orderSchema);

module.exports = Order;