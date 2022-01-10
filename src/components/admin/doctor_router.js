const express = require('express')
const router = express.Router()
// const multer = require('multer')
const {createDoctor} = require('./doc_controller')


const upload = multer({dest: "./uploads/"})
router.post('/',upload.single('file'), createDoctor)


module.exports = router