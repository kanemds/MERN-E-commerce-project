const User = require('../models/User')
const Note = require('../models/Note')
const asynceHandler = require('express-async-handler')

const getAllNotes = asynceHandler(async (req, res) => {
  const allNotes = await Note.find().lean()
  if (!allNotes?.length) {
    return res.status(400).json({ message: 'No notes found' })
  }
  res.json(allNotes)
})

const createNote = asynceHandler(async (req, res) => { })
const updateNote = asynceHandler(async (req, res) => { })
const deleteNote = asynceHandler(async (req, res) => { })

module.exports = { getAllNotes, createNote, updateNote, deleteNote }