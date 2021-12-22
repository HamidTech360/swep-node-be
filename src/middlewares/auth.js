const config = require('../config')
const jwt = require('jsonwebtoken')

function auth (req, res, next){
    const token = req.header('x-auth')
    if(!token) return res.status(403).send('Access Denied. Please supply a token')

    try{
        const decoded = jwt.verify(token, config.JWT_SECRET)
        req.user= decoded
        next()
    }catch(ex){
        res.status(403).send('Invalid token supplied')
    }
}

function authRole(role){
  return (req, res, next) => {
    try {
      const user = req.user;
      if(!user) return res.status(403).send('Not allowed')
      if(user.role != role) return res.status(403).send('Not allowed')
      return next()
    } catch(err){
      return res.status(403).send('Not allowed')
    }
  }
}
module.exports = {  
  auth, 
  authRole }