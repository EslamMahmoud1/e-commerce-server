const product = require('../model/productsSchema')

const getAllProducts = async (req,res) => {
    try {
        const allProducts = await product.find({})
        res.status(200).json({allProducts})
    } catch (error) {
        
    }
}
const getProduct = async (req,res) => {
    try {
        prodcutId = req.params.id
        const singleProduct = await product.findOne({_id:prodcutId})
        if(!singleProduct)
            return res.status(404).json({msg : `no product with id ${prodcutId}`})
        res.status(200).json({singleProduct})
    } catch (error) {
        res.json(error)
    }
}
const createProduct = async (req,res) => {
    try {
        const newProduct = await product.create(req.body)
        res.status(201).json({newProduct})
    } catch (error) {
        res.status(500).json({msg : error})
    }
}
const updateProduct = async (req,res) => {
    try {
        prodcutId = req.params.id
        const data = req.body
        const updateItem = await product.findOneAndUpdate({_id:prodcutId},data,{
            new:true,
            runValidators:true
        })
        if(!updateItem)
            return res.status(404).json({msg:`no product with id ${prodcutId}`})
        res.status(200).json({updateItem})
    } catch (error) {
        res.status(500).json({msg:error})
    }
}
const deleteProduct = async (req,res) => {
    try {
        prodcutId = req.params.id
        const deleteProduct = await product.findOneAndDelete({_id:prodcutId})
        if(!deleteProduct)
            return res.status(404).json({msg:`no product with id ${prodcutId}`})
        res.status(200).json({deleteProduct})
    } catch (error) {
        res.status(500).json({msg:error})
    }
    
}

module.exports = {getAllProducts,getProduct,createProduct,updateProduct,deleteProduct}