const initState ={
    allTasks: []
}

const taskReducer = (state = initState, action) =>{
    switch(action.type){
        case 'GET_TASKS':
        return{
            ...state,
            allTasks: action.payload
        }
        case 'POST_TASK':
            return{
                ...state,
                allTasks: [...state.allTasks, action.payload]
            }
        case 'DELETE_TASK':
            return{
                ...state,
                allTasks: state.allTasks.filter(task => action.payload !== task._id)
            }
        case 'TASK_STATUS':
            return{
                ...state,
                allTasks: state.allTasks.map(task => task._id === action.payload._id ? action.payload : task)
            }
        default:
            return state
    }
}
export default taskReducer