const mongoose = require('mongoose');
const Schema = mongoose.Schema;

var userSchema = new Schema({
  name: String,
  password: String,
  email: String,
  phoneNumber:String
}, 
{timestamps: true}
);

const User = mongoose.model('users', userSchema)


module.exports = User;