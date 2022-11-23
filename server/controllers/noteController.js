const User = require('../models/User')
const Note = require('../models/Note')
const asynceHandler = require('express-async-handler')
const { json } = require('express')

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


const updateNote = asynceHandler(async (req, res) => {
  const { id, user, title, text, completed } = req.body

  if (!id || !user || !title || !text || typeof completed !== 'boolean') {
    return res.status(400).json({ message: 'All fields are required' })
  }

  const note = await Note.findById(id).exec()

  if (!note) {
    return res.status(400).json({ message: 'Note not Found' })
  }

  const duplicate = await Note.findOne({ title }).lean().exec()

  if (duplicate && duplicate?._id.toHexString() !== id) {
    return res.status(409).json({ message: 'Note already exist, please try another one' })
  }

  note.user = user
  note.title = title
  note.text = text
  note.completed = completed

  const update = await note.save()

  res.json({ message: 'update completed' })

})

const deleteNote = asynceHandler(async (req, res) => { })

module.exports = { getAllNotes, createNote, updateNote, deleteNote }