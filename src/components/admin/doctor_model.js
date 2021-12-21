const mongoose = require('mongoose')
const Joi = require('joi-browser')

const doctorSchema = new mongoose.Schema({
    title:{
        type:String,
        required:true,
        trim:true
    },
    firstName:{
        type:String,
        required:true,
        trim:true
    },
    lastName:{
        type:String,
        trim:true,
        required:true
    },
    specialization:{
        type:String,
        required:true
    },
    imgFileName:{
        type:String
    }
})
const DoctorModel = mongoose.model('doctor', doctorSchema)

function Validate (doctor){
    const schema = {
        title:Joi.string().required(),
        firstName:Joi.string().required(),
        lastName:Joi.string().required(),
        specialization:Joi.string().required(), 
        imgFileName:Joi.string()
    }
    return Joi.validate(doctor, schema)
}

module.exports.DoctorModel = DoctorModel
module.exports.ValidateDoctor = Validate