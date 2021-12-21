const { APIError } = require('../../util/error_handler')
const responseHandler = require('../../util/response_handler')
const {DoctorModel, ValidateDoctor} = require('./doctor_model')
const fs = require('fs')
const response = {}

exports.createDoctor = async (req, res, next)=>{
    const {error} = ValidateDoctor(req.body)
    console.log(error.details[0].message)
    // if(error) return res.status(400).send(error.details[0].message)
    if(error) throw new APIError ("400", error.details[0].message)
    
    const fileType = req.file.mimetype.split("/")[1]
    const rename = `${req.file.filename}.${fileType}`
    console.log(rename);
    try{
        
        
       
        fs.rename(`./uploads/${req.file.filename}`, `./uploads/${rename}`, function(){
            response.isImgUploaded = true
        })
        const {firstName, lastName, specialization, title} = req.body
        const newDoc = new DoctorModel({
            firstName, lastName, specialization, title, imgFileName:rename
        })
        const saveDoc = await newDoc.save()
        
        return responseHandler(res, 200, 'New Doctor created successfully',{newDoc})
    }catch(ex){
        return next(ex);
    }
}
