import axios from 'axios'

const taskActions = {
    getTasks: ()=>{
        return async (dispatch, getState) =>{
            try {
                const response = await axios.get('http://localhost:4000/api/tasks')
                dispatch({
                    type: 'GET_TASKS',
                    payload: response.data.response
                })
            } catch (error) {
                console.log(error)
            }
        }
    },
    postTask: (task) =>{
        return async (dispatch, getState) =>{
            try {
                const response = await axios.post('http://localhost:4000/api/tasks', task)
                dispatch({
                    type: 'POST_TASK',
                    payload: response.data.response
                })
                console.log(response)
            } catch (error) {
                console.log(error)
            }
        }
    },
    deleteTask:(id) =>{
        return async (dispatch, getState) =>{
            try {
         await axios.delete('http://localhost:4000/api/task/'+ id)
                dispatch({
                    type: 'DELETE_TASK',
                    payload: id
                })
                
            } catch (error) {
                console.log(error)
            }
        }
    },
    taskStatus:(id) =>{
        
        return async (dispatch, getState) =>{
            try {
                const response = await axios.post('http://localhost:4000/api/task/'+ id)
                console.log(response.data)
                dispatch({
                    type:'TASK_STATUS',
                    payload: response.data.response
                })
            } catch (error) {
                console.log(error)
            }
        }
    }

}

export default taskActions