const user = require('../model/usersSchema')

const getAllUsers = async (req,res) => {
    try {
        const allUsers = await user.find({})
        res.status(200).json({allUsers})
    } catch (error) {
        res.status(500).json({error})
    }
}

const createUser = async (req,res) => {
    try {
        const newUser = await user.create(req.body)
        res.status(201).json({newUser})
    } catch (error) {
        res.status(500).json({error})
    }
}

const getUser = async (req,res) => {
    try {
        const userId = req.params.id
        const oneUser = await user.find({_id:userId})
        if(!oneUser)
            return res.status(404).json({msg:`no user with id ${userId}`})
        res.status(200).json({oneUser})
    } catch (error) {
        
    }
}

const deleteUser = async (req,res) => {
    try {
        const userId = req.params.id
        const delUser = await user.findOneAndDelete({_id:userId}) 
        if(!delUser)
            return res.status(404).json({msg:`no user with id ${userId}`})
        res.status(200).json({delUser})
    } catch (error) {
        res.status(500).json({error})
    }
}

module.exports = {getAllUsers,createUser,getUser,deleteUser}