const mongoose = require('mongoose')

const schema = new mongoose.Schema({
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
    },
    brand : {
        type:String,
    } 
})

module.exports = schema