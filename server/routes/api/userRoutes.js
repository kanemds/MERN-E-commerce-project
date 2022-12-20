const router = require('express').Router()
const { getAllUsers, updateUser, createUser, deleteUser } = require('../../controllers/userController')

const verifyJWT = require('../../middleware/verifyJWT')

router.post('/', createUser)

router.use(verifyJWT) // this will apply every routes below
router.route('/')
  .get(getAllUsers)
  // .post(createUser)
  .patch(updateUser)
  .delete(deleteUser)


module.exports = router