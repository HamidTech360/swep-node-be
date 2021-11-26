const app = require('./app')


app.listen(app.get('port'), () => {
  console.log('Server is running and listening at port', app.get('port'))
})