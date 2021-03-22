const initState ={
    loggedUser: null
}

const userReducer = (state = initState, action) =>{
    switch(action.type){
        case 'USER_LOG':
            localStorage.setItem('firstName', action.payload.firstName)
            localStorage.setItem('picUrl', action.payload.picUrl)
            localStorage.setItem('token', action.payload.token)
            return{
                ...state,
                loggedUser: action.payload
            }
        case 'SIGN_OUT':
            localStorage.clear()
            return{
                ...state,
                loggedUser: null
            }
        default :
        return state
    }
}

export default userReducer