const router = require('express').Router()
const { getAllNotes, createNote, updateNote, deleteNote } = require('../../controllers/noteController')

const verifyJWT = require('../../middleware/verifyJWT')

router.use(verifyJWT) // this will apply every routes below

router.route('/')
  .get(getAllNotes)
  .post(createNote)
  .patch(updateNote)
  .delete(deleteNote)

module.exports = router