const mongoose = require('mongoose')
const Joi = require('joi-browser')
const jwt = require('jsonwebtoken')
const config = require('../../config')


const tokenSchema = new mongoose.Schema({
    token:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    regNo:{
        type:String,
        required:true 
    }
})


function Validate (user){
    const schema = {
        regNo: Joi.string().required(), 
        email:Joi.string().email().required()
    }
    return Joi.validate(user, schema)
}

const TokenModel = mongoose.model('token', tokenSchema)



module.exports.TokenModel= TokenModel
module.exports.Validate = Validate