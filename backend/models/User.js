const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    name: String,
    email: String,
    passwordHash: String,
    street: {
        type: String,
        default: ''
    },
    apartament: {
        type: String,
        default: ''
    },
    city: {
        type: String,
        default: ''
    },
    zip: {
        type: String,
        default: ''
    },
    country: {
        type: String,
        default: ''
    },
    phone: Number,
    isAdmin: {
        type: Boolean,
        default: false
    }
})

// userSchema.virtual('id').get( ()=>{
//     return this._id.toHexString();
// })

// userSchema.set("toJSON", {
//     virtuals: true
// })

const User = mongoose.model('user', userSchema);

module.exports = User;