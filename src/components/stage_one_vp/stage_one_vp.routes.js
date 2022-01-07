const express = require('express')

const router = express.Router({ mergeParams: true})
const validator = require('../../middlewares/validator')
const { updateVp1BodySchema } = require('./stage_one_vp.schema')
const { updateProfile, getProfile, declineProfile, submitProfile, acceptProfile, getAllProfiles } = require('./stage_one_vp.controllers')
const { auth, authRole } = require ('../../middlewares/auth')

router.post('/decline', auth, authRole('admin'), declineProfile)
router.post('/accept', auth, authRole('admin'), acceptProfile)
router.put('/', auth, validator(updateVp1BodySchema), updateProfile )
router.post('/submit', auth, validator(updateVp1BodySchema), submitProfile )
router.get('/', auth, getProfile );

// router.get('/all', getAllProfiles)

module.exports = router