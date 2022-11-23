const express = require('express')
const router = express.Router()
const path = require('path')
const user = require('./api/userRoutes')
const note = require('./api/noteRouters')

router.get('^/$|/index(.html)?', (req, res) => {
  res.sendFile(path.join(__dirname, '../', 'views', 'index.html'))
})


// routes
router.use('/users', user)
router.use('/notes', note)


module.exports = router