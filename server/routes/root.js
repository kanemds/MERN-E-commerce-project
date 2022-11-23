const express = require('express')
const router = express.Router()
const path = require('path')
const user = require('./api/userRoutes')

router.get('^/$|/index(.html)?', (req, res) => {
  res.sendFile(path.join(__dirname, '../', 'views', 'index.html'))
})

router.use('/users', user)

module.exports = router