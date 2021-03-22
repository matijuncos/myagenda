const mongoose = require('mongoose')

const taskSchema = new mongoose.Schema({
  title: String,
  time: String,
  date: String,
  description: String,
  done: {type: Boolean, default: false},
  userId:{type: mongoose.Schema.Types.ObjectId, ref: 'user', required: true}
})

const Task = mongoose.model('task', taskSchema)

module.exports = Task //importo en controlado