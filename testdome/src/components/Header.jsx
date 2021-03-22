import React from 'react'
import { connect } from 'react-redux'
import userActions from '../redux/actions/userActions'

const Header = ({loggedUser, signOut}) => {
    return (
        <>
        {loggedUser && (
                <header style={{display: 'flex'}}>
                    <div className='user'>
                        <div className='userImg' style={{backgroundImage: `url(${loggedUser.picUrl})`, backgroundSize: 'cover', borderRadius: '100%'}}></div>
                        <p>Hola {loggedUser.firstName}!</p>
                    </div>
                    <p onClick={()=>signOut()} className='link'>Cerrar sesión</p>
        </header>
            )}
        </>
    )
}

const mapStateToProps = state =>{
    return{
        loggedUser: state.users.loggedUser
    }
}
const mapDispatchToProps ={
    signOut: userActions.signOut
}

export default connect(mapStateToProps, mapDispatchToProps)(Header)
