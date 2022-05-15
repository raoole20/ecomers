const mongoose = require('mongoose');
const Product = require('./Product');

const orderitemSchema = mongoose.Schema({
    product: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "product",
    },
    quantity: Number
})

const OrderItem = mongoose.model("orderitem", orderitemSchema);

module.exports = OrderItem;