const express = require('express')



// initialise express app
const app = express()
app.use(express.json())


app.set('port', 3000)

app.get('/', (req, res) => {
  return res.send('Hello world')
})

module.exports = app