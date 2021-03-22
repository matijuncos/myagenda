import {combineReducers} from 'redux'
import taskReducer from './taskReducer'
import userReducer from './userReducer'

const rootReducer = combineReducers({
    tasks: taskReducer,
    users: userReducer
})

export default rootReducer