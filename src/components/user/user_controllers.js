const userModel = require("./user_model");
const stageOneVpModel = require('../stage_one_vp/stage_one_vp.model')
const stageTwoVpModel = require('../stage_two_vp/stage_two_vp.model')
const responseHandler = require("../../util/response_handler");
const { APIError } = require("../../util/error_handler");
const {TokenModel, Validate} = require('./tokens_model')
const bcrypt = require('bcrypt')
const nodemailer = require('nodemailer')
const config = require('../../config')
const jwt = require('jsonwebtoken')

exports.getAllUsers = async (req, res, next) => {
  try {
    const users = await userModel.find({});
    return responseHandler(res, 200, "all users", {
      users,
    });
  } catch (err) {
    return next(err);
  }
};

exports.createUser = async (req, res, next) => {
  try {

    const userData = ({ firstName, lastName, password, registrationNumber, email } =
      req.body);

    // check if user with regNO alreay exists
    const existingUser = await userModel.findOne({ $or: [{ registrationNumber }, { email }] });
    if( existingUser ){
      throw new APIError(409, 'User with this registeration number or email already exists')
    }

    let user = new userModel(userData);
    //TODO: create a stage one and stage 2 vp
    user = await user.save();
    const userStageOneVp = await stageOneVpModel.create([{
      user: user._id
    }])
    const userStageTwoVp = await stageTwoVpModel.create([{
      user: user._id
    }])
    return responseHandler(res, 201, "Created user", { user });
  } catch (err) {
    return next(err);
  }
};



exports.authUser = async (req, res, next) => {
  try {
    const { registrationNumber, password } = req.body;

    const user = await userModel.findOne({
      registrationNumber,
    });

    if (!user) {
      throw new APIError(404, "User not found");
    }

    const compareResult = await user.comparePassword(password);

    if (!compareResult) {
      throw new APIError("403", "Invalid password");
    }

    const { accessToken } = await user.generateToken();
    res.set("x-auth", accessToken);
    return responseHandler(res, 200, "authentication successful", {
      user,
      token: accessToken,
    });
  } catch (err) {
    return next(err);
  }
};

exports.getResetCode = async (req, res, next)=>{
  const {error} = Validate(req.body)
  if(error) throw new APIError ("400", error.details[0].message )
  
  try{
      let transporter = nodemailer.createTransport({
        service:'gmail',
        auth:{
          user: config.EMAIL,
          pass: config.PASSWORD
        }
      })

      const code = Math.floor(Math.random()* (999999-100000) + 1000000)

      let mailOptions = {
        from:'MedEase Care',
        to: req.body.email,
        subject: 'MedEase Reset Code',
        html:`<div>
                  <h3>Your password reset verification token is</h3>
                   <h1> ${code}</h1>
              </div>`
      }

      transporter.sendMail(mailOptions, async function(err, data){
        if(err){
          // res.status(500).json({
          //   status:'failed',
          //   message:'Failed to send email. Please try again'
          // })
          throw new APIError("500", "failed to send email> please try again")
        }else{
          const newToken = new TokenModel({
              regNo:req.body.regNo,
              token:code,
              email:req.body.email
          })
          const saveToken = await newToken.save()
          // res.status(200).json({
          //   status:'success',
          //   message:'Email has been sent to you. Please check your email',
          //   data:{
          //     ...saveToken
          //   }
          // })
          return responseHandler(res, 200, "Email sent");

        }
      })
  }catch(ex){
    return next(ex)
  }
}


exports.verifyToken = async (req, res, next)=>{
  try{
      const checkToken = await TokenModel
        .find({token: req.body.token, email:req.body.email})
        .select({token:1, email:1, regNo:1})

      if(checkToken.length < 1) throw new APIError ("403", "Invalid token supplied")
      

      const latestToken = checkToken[checkToken.length-1]
      const payload = {
        token: latestToken.token,
        regNo: latestToken.regNo,
        email: latestToken.email
      }
      const auth_token =  jwt.sign(payload, config.JWT_SECRET)

      return responseHandler(res, 200, "Token verified", {
        auth_token:auth_token,
        data:payload
      });
      
  }catch(ex){
     return next(ex)
  }
}

exports.ResetPassword = async (req, res, next)=>{
  try{
    const {password} = req.body
    const hashedPassword = await bcrypt.hash(password, 10)

    await userModel.findOneAndUpdate({registrationNumber: req.user.regNo},
        { password:hashedPassword},
        {new:true}
    )

    return responseHandler(res, 200, "password successfully updated")

  }catch(ex){
    return next(err)
  }
}
