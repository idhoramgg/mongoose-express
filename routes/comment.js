
const express = require('express')
const router = express.Router()

const {
  addComment,
  getComment
} = require('../controllers/comment')




router.post('/',  addComment)
router.get('/', getComment)

module.exports = router;
