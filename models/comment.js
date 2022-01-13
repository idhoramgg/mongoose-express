const mongoose = require('mongoose');
const Schema = mongoose.Schema;

var commentSchema = new Schema({
  comment: {
    type: String
  }
}, {
  timestamps: true
});

const Comment = mongoose.model('comment', commentSchema)


module.exports = Comment; 
