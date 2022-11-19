const express = require('express')
const app = express()
const mongoose = require('mongoose')
const path = require('path')
require('dotenv').config()
const { logger } = require('./middleware/logger')
const errorHandler = require('./middleware/errorHandler')
const cookieParser = require('cookie-parser')
const cors = require('cors')
const corsOptions = require('./config/corsOptions')

const PORK = 3002
const DB = process.env.MONGODB_URL


//logger needs to at the beginning
app.use(logger)
app.use(cors(corsOptions))
app.use(express.json())
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

mongoose
  .connect(DB)
  .then(() => {
    console.log('Connected to MongoDB')
    app.listen(PORK, () => {
      console.log(`connected to server: ${PORK}`)
    })
  })
