const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
  firstName: String,
  lastName: String,
  email: String,
  password: String,
  picUrl: String
})

const User = mongoose.model('user', userSchema)

module.exports = User //importo en controlado