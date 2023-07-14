const mongoose = require('mongoose')
const schema = mongoose.Schema

const store = new schema({
    userid: { type: String, require: true },
    products: [
        {
            productID: { type: String,require: true },
            quantity:{type:Number,default:1}            
        }
    ]
})

module.exports = mongoose.model('store', store);
