import './App.css';
import List from './components/List';
import { BrowserRouter as Router, Switch, Route, Redirect } from "react-router-dom";
import Register from './components/Register'
import { connect } from 'react-redux';
import Header from './components/Header';
import { useEffect } from 'react';
import userActions from './redux/actions/userActions';

function App({loggedUser, preserve}) {

  useEffect(() => {
    if(!loggedUser && localStorage.getItem('token')){
      preserve(localStorage.getItem('token'))
    }
  }, [])


  return (
    <Router>
      <Header/>
      <Switch>
        {!loggedUser ? (
          <>
        <Route exact path='/' component={Register} />
        <Redirect to='/'/>

        </>
        ) :(
          <>
          <Redirect to='agenda'/>
          <Route path='/agenda' component={List}/>
          </>
        )}
      </Switch>
    </Router>
  );
}
const mapStateToProps = state =>{
  return{
    loggedUser: state.users.loggedUser
  }
}

const mapDispatchToProps = {
  preserve: userActions.preserve
}
export default connect(mapStateToProps, mapDispatchToProps)(App);
