const mongoose = require('mongoose');
const Schema = mongoose.Schema;

var commentSchema = new Schema({
  email: {
    type: String,
    default: 'Anonymous'
  },
  comment: {
    type: String
  }
}, {
  timestamps: true
});

const Comment = mongoose.model('comment', commentSchema)


module.exports = Comment; 
