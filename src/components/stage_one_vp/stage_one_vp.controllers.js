const stageOneVp = require('./stage_one_vp.model');
const UserModel = require('../user/user_model');
const responseHandler = require("../../util/response_handler");
const { APIError } = require("../../util/error_handler");
const { nanoid } = require('nanoid')


exports.getProfile = async (req, res, next) => {
  try {

    const { userId } = req.user
    const { Id } = req.params
    if (Id != userId){
      throw new APIError(403, 'Not allowed')
    }
    const vp = await stageOneVp.findOne({ user: userId}).populate('user');
    if (!vp){
      throw new APIError(404, 'User does not have a verification profile for step one')
    }

    return responseHandler(res, 200, 'Profile', { profile: vp })
  } catch(err){
    return next(err)
  }
}


exports.updateProfile = async (req, res, next) => {
  try {
    
    const { userId } = req.user
    const { Id } = req.params
    if (Id != userId){
      throw new APIError(403, 'Not allowed')
    }
    const update = req.body
    const vp = await stageOneVp.findOneAndUpdate({ user: userId}, update );
    if (!vp){
      throw new APIError(404, 'User does not have a verification profile for step one')
    }
    return responseHandler(res, 200, 'Updated Profile')
  } catch(err){
    return next(err)
  }
}

exports.getAllProfiles = async (req, res, next) => {
  try {

    let { status } = req.query
    status = ['incomplete', 'inreview', 'declined', 'complete'].includes(status) ? status : null
    const query = status ? { status } : {}
    const profiles = await stageOneVp.find(query).populate('user')
    return responseHandler(res, 200, 'All profiles', { profiles })
  } catch(err){
    return next(err)
  }
}

exports.submitProfile = async( req, res, next ) => {
  try {
    const { userId } = req.user
    const { Id } = req.params
    if (Id != userId){
      throw new APIError(403, 'Not allowed')
    }
    const update = req.body
    update.status = 'in review'
    const vp = await stageOneVp.findOneAndUpdate({ user: userId}, update );
    if (!vp){
      throw new APIError(404, 'User does not have a verification profile for step one')
    }
    return responseHandler(res, 200, 'Verification profile submitted')
  } catch(err){
    return next(err)
  }
}

exports.acceptProfile = async (req, res, next) => {
  try {
    const { Id: userId } = req.params
    const profile = await stageOneVp.findOne({ user: userId})
    if (!profile){
      throw new APIError(404, 'User does not have a verification profile for step one')
    }
    const hcid = 'HC-' + nanoid(5)
    console.log('hcid', hcid)
    await profile.update({ status: 'complete'})
    const result = await UserModel.updateOne({ id: userId }, { $set: { health_center_id: hcid }} )
    console.log('result', result);
    return responseHandler(res, 200, 'Accepted verification profile')
  } catch(err){
    return next(err)
  }
}


exports.declineProfile = async (req, res, next) => {
  try {
    const { Id: userId } = req.params
    const { comments } = req.body
    const profile = await stageOneVp.findOne({ user: userId})
    if (!profile){
      throw new APIError(404, 'User does not have a verification profile for step one')
    }
    await profile.update({ status: 'declined', comments: comments });
    return responseHandler(res, 200, 'Declined verification profile')
  } catch(err){
    return next(err)
  }
}