const express = require('express')
const router = express.Router()


const {
  addUser,
  showDataById,
  showAll,
  deleteUser,
  updateUser,
  uploadImage
} = require('../controllers/user')

const upload = require('../config/multer')

router.post('/user',upload.any(), addUser)
router.post('/user-image', upload.any(), uploadImage);
router.get('/user/:userId', showDataById)
router.get('/user', showAll)
router.delete('/user/:userId', deleteUser)
router.put('/user/:userId', updateUser)


module.exports = router;