const express = require('express')

const router = express.Router()
const validator = require('../../middlewares/validator')
const { createUserBodySchema, authBodySchema } = require('./user_schemas')
const { createUser, getAllUsers, authUser } = require('./user_controllers')

router.post('/', validator(createUserBodySchema), createUser)
router.get('/', getAllUsers)
router.post('/auth', validator(authBodySchema), authUser )
module.exports = router