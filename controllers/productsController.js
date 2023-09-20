const product = require('../model/productsSchema')

const getAllProducts = async (req,res) => {
    try {
        const {name,brand,sort,numericFilters} = req.query
        const queryObject = {}

        if(name)
        queryObject.name={$regex : name , $options : 'i'}
       
        if(brand)
        queryObject.brand=brand
        
        if(numericFilters)
        {
            const operatorMap = {
                '>': '$gt',
                '>=': '$gte',
                '=': '$eq',
                '<': '$lt',
                '<=': '$lte',
              };
              const regEx = /\b(<|>|>=|=|<|<=)\b/g;
              let filters = numericFilters.replace(
                regEx,
                (match) => `-${operatorMap[match]}-`
              );
              const options = ['price', 'rating'];
              filters = filters.split(',').forEach((item) => {
                const [field, operator, value] = item.split('-');
                if (options.includes(field)) {
                  queryObject[field] = { [operator] : Number(value) };
                }
              });
        }
        console.log(queryObject)

        let result = product.find(queryObject)
        
        if(sort)
        {
            const sortList = sort.split(',').join(' ')
            result = result.sort(sortList)
        }
        
        const page = Number(req.query.page) || 1
        const limit = Number(req.query.limit) || 10 
        const skip = (page-1) * limit
        
        result = result.limit(limit).skip(skip)

        const allProducts = await result
        res.status(200).json({allProducts})
    } catch (error) {
        res.status(500).json({msg : error})
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
        res.status(500).json(error)
    }
}
const createProduct = async (req,res) => {
    try {
        const newProduct = await product.create(req.body)
        res.status(201).json({newProduct})
    } catch (error) {
        res.status(500).json(error)
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