const User = require('../models/User')
const Note = require('../models/Note')
const asynceHandler = require('express-async-handler')


const getAllNotes = asynceHandler(async (req, res) => {
  const allNotes = await Note.find().lean()
  if (!allNotes?.length) {
    return res.status(400).json({ message: 'No notes found' })
  }

  const noteUser = await Promise.all(allNotes.map(async (note) => {
    const getUser = await User.findById(note.user).lean().exec()
    return { ...note, user: getUser.username }
  }))

  res.json(noteUser)
})

const createNote = asynceHandler(async (req, res) => {
  const { user, title, text } = req.body

  const existUser = await User.findById(user).exec()
  if (!existUser) return res.status(400).json({ message: 'User not Found' })

  if (!existUser || !title || !text) {
    return res.status(400).json({ message: 'All fields are required' })
  }

  const duplicate = await Note.findOne({ title }).lean().exec()

  if (duplicate) {
    return res.status(409).json({ message: 'Title already exist, please try again' })
  }

  const noteObject = { user: existUser, title, text }

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
  const assignedUser = await User.findOne({ username: user }).exec()

  if (!note) {
    return res.status(400).json({ message: 'Note not Found' })
  }

  if (!assignedUser) {
    return res.status(400).json({ message: 'Assigned User not exist' })
  }

  const duplicate = await Note.findOne({ title }).lean().exec()

  if (duplicate && duplicate?._id.toString() !== id) {
    return res.status(409).json({ message: 'Note already exist, please try another one' })
  }

  note.user = assignedUser
  note.title = title
  note.text = text
  note.completed = completed

  const update = await note.save()

  res.json({ message: `${update.title} updated ` })

})

const deleteNote = asynceHandler(async (req, res) => {
  const { id } = req.body

  if (!id) {
    return res.status(400).json({ message: 'note Id required' })
  }

  const note = await Note.findById(id).exec()

  if (!note) {
    return res.status(400).json({ message: 'Note not Found' })
  }

  const result = await note.deleteOne()

  const reply = `Note ${result.title} with ID ${result._id} deleted`

  res.json(reply)

})

module.exports = { getAllNotes, createNote, updateNote, deleteNote }