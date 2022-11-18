const express = require('express')
const app = express()
require('dotenv').config()

const PORK = 3002

app.listen(PORK, () => {
  console.log(`connected to server: ${PORK}`)
})

app.get('/', (req, res) => {
  res.send('Hello World')
})