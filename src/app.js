const express = require('express')
const mongoose = require('mongoose')
const { handleError } = require('./util/error_handler')
const { DATABASE_URL, PORT } = require('../src/config')
const userRouter = require('../src/components/user/user_router')
const stageOneVpRouter = require('../src/components/stage_one_vp/stage_one_vp.routes')


// initialise express app
const app = express()
app.use(express.json())


mongoose.connect(DATABASE_URL, {
  useNewUrlParser: true
}).then(async () => {
  console.log('Connected to mongo db')
  const userModel =  mongoose.model('User')
  const admin = await userModel.findOne({ registrationNumber: 'general'});
  if (!admin){
    await mongoose.model('User').create({
      firstName: 'swep',
      lastName: 'admin',
      role: 'admin',
      password: 'password',
      registrationNumber: 'general'
    })
  }
}).catch((err) => {
  console.log('COuld not connect to mongo db', err)
})


app.post('/webhook', (req, res) => {
  console.log('result', res)
})

app.use('/users', userRouter)

app.get('/', (req, res) => {
  return res.send('Hello world')
})


app.use('*', (req, res) => {
  const url = req.originalUrl;
  res.status(404).send({
    status: 'error',
    message: `Oops. ${req.method} ${url} not found on this website`
  });
});

app.use((err, req, res, next) => {
  handleError(res, err);
});

module.exports = app