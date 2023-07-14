const mongoose = require('mongoose')
const schema = mongoose.Schema

const product = new schema({
    picture:{type:String,default:'pic.jpg'},
    author:{type:String,default:'Đỗ Chí Tường'},
    productName:{type:String,default: ()=> { return this.id; }},
    price:{type:Number,default:100000},
    discount:{type:Number,default:0},
    feedback:{type:Number,default:5},
    created_at:{type:Date,default:Date.now}
})

module.exports =mongoose.model('product',product);
