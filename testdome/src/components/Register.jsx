//860837672559-v8rvkoo3q9bs4ln02uvpr3pileo394ta.apps.googleusercontent.com
import React from 'react'
import GoogleLogin from 'react-google-login';
import { connect } from 'react-redux';
import userActions from '../redux/actions/userActions';

const Register = ({signUp, signIn, history}) => {

    const googleSignUp = async (response) =>{
        const res = await signUp({
            firstName: response.profileObj.givenName,
            lastName: response.profileObj.familyName,
            email: response.profileObj.email,
            password: response.profileObj.googleId,
            picUrl: response.profileObj.imageUrl
        })
            if(res && res.success){
                history.push('/agenda')
            }    
            }
    const googleSignIn =  async (response) =>{

       const res=  await signIn({
            email: response.profileObj.email,
            password: response.profileObj.googleId,
        })
        if(res && !res.success){
            alert(res.response)
        }else{
            history.push('/agenda')
        }
    }
    return (
        <div className=' register'>
            <div className="left">
            <div className="googleContainer">
                    <h3>Ya tenés cuenta? Iniciá sesión</h3>
                    <GoogleLogin
                        clientId="860837672559-v8rvkoo3q9bs4ln02uvpr3pileo394ta.apps.googleusercontent.com"
                        buttonText="Inicia sesión con google"
                        onSuccess={googleSignIn}
                        onFailure={googleSignIn}
                        cookiePolicy={'single_host_origin'}
                        />
                </div>
                <div className="googleContainer">
                    <h3>No tenés cuenta? Registrate</h3>
                    <GoogleLogin
                        clientId="860837672559-v8rvkoo3q9bs4ln02uvpr3pileo394ta.apps.googleusercontent.com"
                        buttonText="Registrate con google"
                        onSuccess={googleSignUp}
                        onFailure={googleSignUp}
                        cookiePolicy={'single_host_origin'}
                        />
                </div>
               
            </div>
            <div className="right">
                <div className="text">
                    <h2>Hay mucho para hacer</h2>
                    <h2>Organizate</h2>
                </div>
            </div>
        </div>
    )
}

const mapDispatchToProps ={
    signUp: userActions.signUp,
    signIn: userActions.signIn
}

export default connect(null, mapDispatchToProps)(Register)
