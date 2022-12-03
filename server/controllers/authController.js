const User = require('../models/User')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const asynceHandler = require('express-async-handler')

const login = asynceHandler(async (req, res) => {

})

const refresh = (req, res) => {

}

const logout = (req, res) => {

}

module.exports = { login, refresh, logout }