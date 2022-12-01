const allowedOrigins = require('./allowedOrigins')
// https://www.npmjs.com/package/cors
const corsOptions = {
  origin: (origin, callback) => {
    if (allowedOrigins.indexOf(origin) !== -1 || !origin) {
      callback(null, true)
    } else {
      callback(new Error('Not allowed by CORS'))
    }
  },
  credentials: true,
  optionsSuccessStatus: 200
}

// https://stackabuse.com/handling-cors-with-node-js/

const corsOptionsDelegate = (req, callback) => {
  let corsOptions

  let isDomainAllowed = allowedOrigins.indexOf(req.header('Origin')) !== -1
  // let isExtensionAllowed = req.path.endsWith('.jpg'); // img
  if (isDomainAllowed) {
    // Enable CORS for this request
    corsOptions = { origin: true }
  } else {
    // Disable CORS for this request
    corsOptions = { origin: false }
    callback(new Error('Not allowed by CORS'))
  }
  callback(null, corsOptions)
}


module.exports = { corsOptions, corsOptionsDelegate }