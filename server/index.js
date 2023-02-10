const express = require('express')
const app = express()
const mongoose = require('mongoose')
const path = require('path')
require('dotenv').config()
const { logger, logEvents } = require('./middleware/logger')
const errorHandler = require('./middleware/errorHandler')
const cookieParser = require('cookie-parser')
const cors = require('cors')
const { corsOptions, corsOptionsDelegate } = require('./config/corsOptions')
const connectDB = require('./config/dbConnection')
const fileUpload = require('express-fileupload') // reading req.files object


const PORK = 3002


connectDB()

//logger needs to at the beginning
app.use(logger)
// for deployment
app.use(cors(corsOptions))
// app.use(cors(corsOptionsDelegate))


// https://www.youtube.com/watch?v=PNtFSVU-YTI 
// about  cors

// for development
// app.use(cors({
//   origin: 'http://localhost:3000',
//   // methods:['GET','POST'] only accept
//   credentials: true // cookies
// }))

// Use JSON parser for all non-webhook routes
app.use((req, res, next) => {
  if (req.originalUrl === '/webhook') {
    next()
  } else {
    express.json()(req, res, next)
  }
})


// app.use(express.json())
app.use(fileUpload())
app.use(cookieParser())
app.use('/', require('./routes/root'))

// app.use(express.static('public'))
app.use('/', express.static(path.join(__dirname, 'public')))
app.all('*', (req, res) => {
  res.status(404)
  if (req.accepts('html')) {
    res.sendFile(path.join(__dirname, 'views', '404.html'))
  } else if (req.accepts('json')) {
    res.json({ message: '404 Not Found' })
  } else {
    res.type('txt').send('404 Not Found')
  }
})

// errorHandler needs to at the end
app.use(errorHandler)

mongoose.connection.once('open', () => {
  console.log('Connected to MongoDB')
  app.listen(PORK, () => {
    console.log(`Server is running on: ${PORK}`)
  })
})

mongoose.connection.on('error', error => {
  console.log(error)
  logEvents(`${error.no}: ${error.code}\t${error.syscall}\t${error.hostname}`, 'mongoErrorLog.log')
})