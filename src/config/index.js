module.exports = (() => {
  const env = process.env.NODE_ENV
  if (env == 'development'){
    return {
      DATABASE_URL: ""
    }
  }
  return {
      DATABASE_URL: "mongodb://localhost:27017/swep-db",
      JWT_SECRET: "evruyvryeyryevruer"
    }
})()