const mongoose = require('mongoose')

const productSchema = new mongoose.Schema({
    name : {
        type:String,
    },
    price : {
        type:Number,
    },
    rating : {
        type:Number,
    },
    createdAt : {
        type:Date,
        default:Date.now()
    },
    brand : {
        type:String,
    },
    image : {
        data:Buffer,
        type:String,
    }
})

module.exports = mongoose.model("product",productSchema)