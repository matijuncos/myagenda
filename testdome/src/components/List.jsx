import React, { useState, useEffect } from 'react'
import Task from './Task'
import {connect } from 'react-redux'
import taskActions from '../redux/actions/taskActions'

const List = ({getTasks, allTasks, postTask, deleteTask, updateTask, loggedUser}) => {
    const [sortedByDate, setStortedByDate] = useState([])
    const [task, setTask] = useState({
        title:'',
        time:'',
        date:'',
        description:''
    })

    useEffect(()=>{
        getTasks()
    },[getTasks])


    useEffect(()=>{
        if(allTasks.length!==0){
           const sortByDate = allTasks.sort((a, b)=>{
               return (
                   a.date.split('-').join('') - b.date.split('-').join('')
               )
           })
           setStortedByDate(sortByDate)
        }
    },[allTasks])

    const handleInput = (e) =>{
        setTask({
            ...task,
            [e.target.name]: e.target.value
        })
    }

    const sendData = ()=>{
        if(task.title==='' || task.time==='' || task.date==='' || task.description===''){
            alert('No blank inputs')
        }else{
            postTask({task, userId: loggedUser._id})
            setTask({
                title:'',
                time:'',
                date:'',
                description:''
            })
        }
    }
    return (
    <>
            <h1 style={{marginTop: '1vh', textAlign:'center', marginBottom: '6vh'}}>Agenda 2021</h1>
        <div className='bigContainer'>
                
            <div className='container'>
                <div className='inputs'>
                    <input type='text' name='title' placeholder='Título' className='input' onChange={handleInput} value={task.title}/>
                    <input type="time" name="time" placeholder='Hora' className='input' onChange={handleInput} value={task.time}/>
                    <input type="date" name="date" placeholder='fecha' className='input' onChange={handleInput} value={task.date}/>
                    <textarea name='description' placeholder='Descripción de la tarea' className='input' onChange={handleInput} value={task.description}/>
                    <button onClick={sendData} className='sendBtn'>Enviar</button>
                </div>
            </div>
            <div className="tasksContainer">
                {allTasks.length=== 0 &&(
                    <div className='noTasks'>
                    <h1>Aún no tienes tareas</h1>
                    <h2>Agrega una nueva</h2>
                    </div>
                )}
                {allTasks.length !== 0 && sortedByDate.map((task, idx) =>{
                    if(loggedUser.email === task.userId.email){
                        return (
                            <Task     
                                task={task} 
                                key={task._id} 
                                deleteTask={deleteTask} 
                                updateTask={updateTask}
                                idx={idx}/>
                        )
                    }} 
                    )}
            </div>
        </div>
        </>
    )
}
const mapStateToProps = state =>{
    return{
        allTasks: state.tasks.allTasks,
        loggedUser: state.users.loggedUser
    }
}

const mapDispatchToProps ={
    getTasks: taskActions.getTasks,
    postTask: taskActions.postTask,
    deleteTask: taskActions.deleteTask,
    updateTask: taskActions.updateTask
}
export default connect(mapStateToProps, mapDispatchToProps)(List)
