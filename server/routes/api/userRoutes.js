const router = require('express').Router()
const { getAllUsers, updateUser, createUser, deleteUser } = require('../../controllers/userController')

router.route('/')
  .get(getAllUsers)
  .post(createUser)
  .patch(updateUser)
  .delete(deleteUser)


module.exports = router