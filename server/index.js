const express = require('express')
const app = express()
const mongoose = require('mongoose')
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

app.get('/', (req, res) => {
  res.send('Hello World')
})