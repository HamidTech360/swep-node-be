const express = require('express')

const router = express.Router()
const validator = require('../../middlewares/validator')
const { createUserBodySchema, authBodySchema } = require('./user_schemas')
const { createUser, getAllUsers, authUser, ResetPassword, getResetCode, verifyToken } = require('./user_controllers')
const { auth } = require ('../../middlewares/auth')
const stageOneVpRouter  = require('../stage_one_vp/stage_one_vp.routes')

router.post('/', validator(createUserBodySchema), createUser)
router.get('/', getAllUsers)
router.post('/auth', validator(authBodySchema), authUser )
router.post('/resetpassword',auth,  ResetPassword )
router.post('/verify_code', verifyToken )
router.post('/send_code', getResetCode )
router.use('/stage_one_vp', stageOneVpRouter  )
module.exports = router