import React from 'react'
import { connect } from 'react-redux'
import taskActions from '../redux/actions/taskActions'
import {AiOutlineFileDone} from 'react-icons/ai'
import {FaRegTrashAlt} from 'react-icons/fa'

const Task = ({task, deleteTask, idx, taskStatus}) => {

    const setStatus = () =>{
        taskStatus(task._id)
    }

      return (
        <div className={task.done ? 'taskContainer opacity' : 'taskContainer'}>
            <div className="taskInfo">
                <h2>{task.title}</h2>
                <p><span className='bold'>Fecha:</span> {task.date.split('-').reverse().join('/')}</p>
                <p><span className='bold'>Hora:</span> {task.time}</p>
                <p>{task.description}</p>
            </div>
            <div className="controls">
                <button className='btnControl' onClick={setStatus}><AiOutlineFileDone className='icons'/></button>
                <button className='btnControl' onClick={()=>deleteTask(task._id, idx)}><FaRegTrashAlt className='icons'/></button>
            </div>
        </div>
    )
}
const mapDispatchToProps = {
    taskStatus: taskActions.taskStatus
}
export default connect(null, mapDispatchToProps)(Task)
