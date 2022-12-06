const jwt = require('jsonwebtoken')
require('dotenv').config()

const verifyJWT = (req, res, next) => {
  // in case lower or upper case for a    
  const authHeader = req.headers.authorization || req.headers.Authorization


  if (!authHeader?.startsWith('Bearer ')) {
    return res.status(401).json({ message: 'Unauthorzied' })
  }

  // 'Bearer ' it's [0]
  const token = authHeader.split(' ')[1]

  jwt.verify(
    token,
    process.env.ACCESS_TOKEN_SECRET,
    (error, decoded) => {
      if (error) return res.status(403).json({ message: ' Forbindden' })
      req.user = decoded.UserInfo.username
      req.roles = decoded.UserInfo.roles
      console.log(token)
      console.log('????')
      next()
    }
  )
}

module.exports = verifyJWT