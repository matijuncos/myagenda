  
const express = require('express')
const router = express.Router()
const userController = require('../controllers/userController')
const taskController = require('../controllers/tasksController')
const passport = require('passport')
require('../config/passport')

router.route('/tasks')
.get(taskController.getTasks)
.post(taskController.postTask)

router.route('/task/:id')
.delete(taskController.deleteTask)
.put(taskController.updateTask)
.post(taskController.taskStatus)

router.route('/user/signup')
.post(userController.signUp) 

router.route('/user/signin')
.post(userController.signIn)

router.route('/user/preserve')
.post(passport.authenticate('jwt', {session:false}), userController.preserveLog)

module.exports = router