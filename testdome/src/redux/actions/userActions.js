import axios from 'axios'

const userActions ={
    signIn:(user) =>{
        return async (dispatch, getState) =>{
            const response = await axios.post('https://organizateunpoco.herokuapp.com/api/user/signin', user)

            if(!response.data.success){
                return response.data
            }
            dispatch({
                type: 'USER_LOG',
                payload: response.data.response
            })
        }
    },
    signUp:(user) =>{
        return async (dispatch, getState) =>{
            const response = await axios.post('https://organizateunpoco.herokuapp.com/api/user/signup', user)
            if(response.data.success){
                dispatch({
                    type: 'USER_LOG',
                    payload: response.data.response
                })
                return response.data
            }
        }
    },
    signOut:()=>{
        return async (dispatch, getState)=>{
            dispatch({
                type:'SIGN_OUT'
            })
        }
    },
    preserve: (token) =>{
        return async (dispatch, getState) =>{
            const response = await axios.post('https://organizateunpoco.herokuapp.com/api/user/preserve', {token},{
                headers:{
                    Authorization: 'Bearer ' + token
                }
            })
            dispatch({
                type:'USER_LOG',
                payload: response.data.response
            })
        }
    }
}
export default userActions