const express = require('express')
const router = express.Router()


const {
  addUser,
  showDataById,
  showAll,
  deleteUser,
  updateUser,
  uploadImage,
  login
} = require('../controllers/user')

const upload = require('../config/multer')

const authentication = require('../helpers/auth')

router.post('/register', authentication.tokenValid, addUser)
router.post('/user-image', upload.single('files'), uploadImage);
router.post('/login', login)
router.get('/user/:userId', showDataById)
router.get('/user', showAll)
router.delete('/user/:userId', deleteUser)
router.put('/user/:userId', updateUser)



module.exports = router;