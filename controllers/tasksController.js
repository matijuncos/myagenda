const Task = require('../models/Task')

const taskController = {
    postTask: (req, res)=>{
        const {userId} = req.body
        const {title, time, date, description} = req.body.task
        const newTask = new Task({
            title, time, date, description, userId
        })
        newTask.save()
        .then(async newTask =>{
            const populatedTaks = await newTask.populate('userId').execPopulate()
            return res.json({
                success: true,
                response: populatedTaks
            })
        })
    },
    getTasks: (req, res)=>{
        Task.find().populate('userId')
        .then( allTasks =>{
            return res.json({
                success: true,
                response: allTasks
            })
        })
    },
    deleteTask:(req, res)=>{
        const {id} =req.params
        Task.findByIdAndDelete(id)
        .then(removed =>{
            return res.json({
                success: true,
                response: removed
            })
        })
    },
    updateTask: (req, res) =>{
        const {id} = req.params
        Task.findByIdAndUpdate(id, req.body)
        .then(updated =>{
            return res.json({
                success: true,
            })
        })
    },
    taskStatus: (req,res) =>{
        const {id} = req.params
        console.log(id)
        Task.findOneAndUpdate({_id: id},
            {$set:{done: true }},
            {new:true}).populate('userId')
        .then( newTask =>{
            return res.json({
                success: true,
                response: newTask
            })
        })

    }
}

module.exports = taskController