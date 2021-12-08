module.exports = (() => {
  const db = "mongodb+srv://aptcoder:wonderful.@cluster0.5gyf4.mongodb.net/swep-be?retryWrites=true&w=majority"
  const env = process.env.NODE_ENV
  if (env == 'development'){
    return {
      DATABASE_URL: ""
    }
  }

  if (env == 'production'){
    return {
      DATABASE_URL: process.env.DATABASE_URL,
      PORT: process.env.PORT,
      JWT_SECRET: process.env.JWT_SECRET

    }
  }
  return {
      DATABASE_URL: "mongodb://localhost:27017/swep-db",
      JWT_SECRET: "evruyvryeyryevruer",
      PORT: 3000
    }
})()