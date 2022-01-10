module.exports = (() => {
  
  const env = process.env.NODE_ENV

  if (env == 'production'){
    return {
      DATABASE_URL: process.env.DATABASE_URL,
      PORT: process.env.PORT,
      JWT_SECRET: process.env.JWT_SECRET,
      EMAIL:process.env.EMAIL,
      PASSWORD:process.env.PASSWORD
    }
  }
  return {
      DATABASE_URL: "mongodb://localhost:27017/swep-db",
      JWT_SECRET: "evruyvryeyryevruer",
      PORT: 3001,
      EMAIL:'owolabihammed2001@gmail.com',
      PASSWORD:'olalekan2019...'
    }
})()