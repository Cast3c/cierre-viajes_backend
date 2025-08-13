const userService = require('../services/user.service')

const getUsers = async (req, res) => {
    try{
        const users = await userService.getAllUsers();
        res.json(users)
    }catch(error){
        res.status(500).json({ message: error.message})
    }
}

const createUser = async ( res, req) => {
    try{
        const user = await userService.createUser(req.body);
        res.status(201).json(user)
    }catch(error){
        res.status(500).json({message: error.message })
    }
}

module.exports= { getUsers, createUser}