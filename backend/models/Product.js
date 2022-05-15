const mongoose = require('mongoose');

const productSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    image: String,
    countInStock: {
        type: Number,
        require: true,
        min: 0,
        max: 255
    },
    description: {
        type: String,
        required: true
    },
    richDescription: String,
    images: [{
        type: String
    }],
    brand: {
        type: String,
        default: ''
    },
    price: {
        type: Number,
        default: 0
    },
    category: {
        type: mongoose.Schema.Types.ObjectId, // id for the schema category
        ref: 'category',
        required: true
    },
    isFeatured: {
        type: Boolean,
        default: false
    },
    dateCreated: {
        type: Date,
        default: Date.now
    }
})

// productSchema.virtual('id').get( ()=>{
//     return this._id.toHexString();
// })

// productSchema.set("toJSON", {
//     virtuals: true
// })
const Product = mongoose.model("Product", productSchema);

module.exports = Product;