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

const createNote = asynceHandler(async (req, res) => {
  const { user, title, text } = req.body

  if (!user || !title || !text) {
    return res.status(400).json({ message: 'All fields are required' })
  }

  const duplicate = await Note.findOne({ title }).lean().exec()

  if (duplicate) {
    return res.status(409).json({ message: 'Title already exist, please try again' })
  }

  const noteObject = { user, title, text }

  const note = await Note.create(noteObject)

  if (note) {
    res.status(201).json({ message: `note: ${title} created` })
  } else {
    res.status(400).json({ message: 'Invalid note data received' })
  }
})


const updateNote = asynceHandler(async (req, res) => { })
const deleteNote = asynceHandler(async (req, res) => { })

module.exports = { getAllNotes, createNote, updateNote, deleteNote }