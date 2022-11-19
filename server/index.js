const express = require('express')
const app = express()
const mongoose = require('mongoose')
const path = require('path')
require('dotenv').config()

const PORK = 3002
const DB = process.env.MONGODB_URL

mongoose
  .connect(DB)
  .then(() => {
    console.log('Connected to MongoDB')
    app.listen(PORK, () => {
      console.log(`connected to server: ${PORK}`)
    })
  })

app.use('/', require('./routes/root'))
app.use('/', express.static(path.join(__dirname, '/public')))
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