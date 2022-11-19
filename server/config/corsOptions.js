const allowedOrigins = require('./allowedOrigins')
// https://www.npmjs.com/package/cors
const corsOptions = {
  origin: (origin, callback) => {
    // !origin this allow postman
    if (allowedOrigins.indexOf(origin) !== -1 || !origin) {
      callback(null, true)
    } else {
      callback(new Error('Not Allowed by CORS'))
    }
  },
  credential: true,
  optioinsSuccessStatus: 200
}

module.exports = corsOptions