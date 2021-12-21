const express = require('express')

const router = express.Router()
const validator = require('../../middlewares/validator')
const { createUserBodySchema, authBodySchema } = require('./user_schemas')
const { getAllProfiles: getAllStageOneProfiles } = require('../stage_one_vp/stage_one_vp.controllers')
const { getAllProfiles: getAllStageTwoProfiles } = require('../stage_two_vp/stage_two_vp.controllers')
const { createUser, getAllUsers, authUser, ResetPassword, getResetCode, verifyToken } = require('./user_controllers')
const { auth } = require ('../../middlewares/auth')
const stageOneVpRouter  = require('../stage_one_vp/stage_one_vp.routes')
const stageTwoVpRouter  = require('../stage_two_vp/stage_two_vp.routes')

router.post('/', validator(createUserBodySchema), createUser)
router.get('/', getAllUsers)
router.post('/auth', validator(authBodySchema), authUser )
router.post('/resetpassword',auth,  ResetPassword )
router.post('/verify_code', verifyToken )
router.post('/send_code', getResetCode )


router.get('/stage_one_vp/all', getAllStageOneProfiles )
router.get('/stage_two_vp/all', getAllStageTwoProfiles )
router.use('/:Id/stage_one_vp', stageOneVpRouter  )
router.use('/:Id/stage_two_vp', stageTwoVpRouter  )
module.exports = router