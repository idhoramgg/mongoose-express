
const express = require('express')
const router = express.Router()

const {
  addComment
} = require('../controllers/comment')




router.post('/comment',  addComment)

module.exports = router;
