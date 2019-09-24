const mongoose = require('mongoose');
const {MONGOOSE_DB} = require('./envir')

const MONGOOSE_CONNECTION = process.env.MONGOOSE_CONNECTION || `mongodb://localhost:27017/${MONGOOSE_DB}`;

mongoose.connect(MONGOOSE_CONNECTION, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})

const db = mongoose.connection;
module.exports = db;