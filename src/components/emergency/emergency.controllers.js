const Emergency = require('./emergency.model');

exports.createEmergency = async (req, res, next) => {
  const { issue, location, voice_note } = req.body
  const { userId }= req.user
  try {
    const emergency = new Emergency({
      issue,
      location,
      voice_note,
      user: userId
    })

    await emergency.save()
    return res.status(201).send({
      status: 'success',
      message: 'Emergency Created',
      data: {
        emergency
      }
    })
  } catch(err){
    return next(err);
  }
}

exports.getEmergencies = async ( req, res, next) => {
  try {
    const emergencies = await Emergency.find({}).populate('user')
    return res.send({
      status: 'success',
      message: 'All emergencies',
      data: {
        emergencies
      }
    })
  } catch(err){
    return next(err)
  }
}
