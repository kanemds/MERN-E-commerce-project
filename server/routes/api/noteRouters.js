const router = require('express').Router()
const { getAllNotes, createNote, updateNote, deleteNote } = require('../../controllers/noteController')

router.route('/')
  .get(getAllNotes)
  .post(createNote)
  .patch(updateNote)
  .delete(deleteNote)

module.exports = router