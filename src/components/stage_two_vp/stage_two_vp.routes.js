const express = require('express')

const router = express.Router({ mergeParams: true})
const validator = require('../../middlewares/validator')
const { updateVp2BodySchema } = require('./stage_two_vp.schema')
const { updateProfile, getProfile, declineProfile, submitProfile, acceptProfile, getAllProfiles } = require('./stage_two_vp.controllers')
const { auth, authRole } = require ('../../middlewares/auth')

router.post('/decline', auth, authRole('admin'), declineProfile)
router.post('/accept', auth, authRole('admin'), acceptProfile)
router.put('/', auth, validator(updateVp2BodySchema), updateProfile )
router.post('/submit', auth, validator(updateVp2BodySchema), submitProfile )
router.get('/', auth, getProfile );
// router.get('/all', getAllProfiles)

module.exports = router