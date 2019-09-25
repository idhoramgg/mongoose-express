const express = require('express')
const router = express.Router()

const {
  addUser,
  showDataById,
  showAll,
  deleteUser,
  updateUser
} = require('../controllers/user')

router.post('/user', addUser)
router.get('/user/:userId', showDataById)
router.get('/user', showAll)
router.delete('/user/:userId', deleteUser)
router.put('/user/:userId', updateUser)

module.exports = router;